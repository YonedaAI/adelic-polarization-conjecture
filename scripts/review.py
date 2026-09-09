#!/usr/bin/env python3
"""Run one external reviewer with a project mutex and preserve its final response."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import signal
import subprocess
import time

ROOT = Path(__file__).resolve().parents[1]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("reviewer", choices=["agy", "codex"])
    parser.add_argument("--prompt", type=Path, required=True)
    parser.add_argument("--document", type=Path)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--timeout", type=int, default=900)
    args = parser.parse_args()
    output = args.output.resolve()
    if output.exists():
        raise SystemExit(f"Refusing to overwrite an existing review: {output}")
    prompt = args.prompt.read_text()
    document = args.document.read_text() if args.document else ""
    env = os.environ.copy()
    codex = env.get("RESEARCH_CODEX_BIN", "/Users/mlong/.local/share/fnm/node-versions/v24.14.0/installation/bin/codex")
    agy = env.get("RESEARCH_GEMINI_BIN", "/Users/mlong/.local/bin/agy-review-shim")
    env["PATH"] = f"{Path(codex).parent}:{Path(agy).parent}:" + env["PATH"]
    if args.reviewer == "agy":
        command = [agy, "-m", env.get("RESEARCH_GEMINI_MODEL", "gemini-3.1-pro"), "-p", prompt]
    else:
        if args.document:
            prompt += "\nRead only this document and files explicitly named above: " + str(args.document.resolve())
        command = [codex, "exec", "-m", env.get("RESEARCH_CODEX_MODEL", "gpt-5.6-sol"),
                   "-c", 'model_reasoning_effort="' + env.get("RESEARCH_CODEX_EFFORT", "high") + '"',
                   "-s", "read-only", "--skip-git-repo-check", "-o", str(output), prompt]
    lock = ROOT / ".review.lock"
    deadline = time.monotonic() + args.timeout * 4
    while True:
        try:
            lock.mkdir()
            break
        except FileExistsError:
            if time.monotonic() > deadline:
                raise TimeoutError("Review mutex remains occupied; inspect its owner")
            time.sleep(2)
    try:
        (lock / "owner").write_text(str(os.getpid()))
        output.parent.mkdir(parents=True, exist_ok=True)
        log = output.with_suffix(".log")
        with log.open("w") as diagnostics:
            with (output.open("w") if args.reviewer == "agy" else open(os.devnull, "w")) as response:
                process = subprocess.Popen(command, cwd=ROOT, env=env, stdin=subprocess.PIPE,
                                           stdout=response if args.reviewer == "agy" else diagnostics,
                                           stderr=diagnostics, text=True, start_new_session=True)
                try:
                    process.communicate(document if args.reviewer == "agy" else "", timeout=args.timeout)
                except subprocess.TimeoutExpired:
                    os.killpg(process.pid, signal.SIGTERM)
                    try:
                        process.wait(timeout=10)
                    except subprocess.TimeoutExpired:
                        os.killpg(process.pid, signal.SIGKILL)
                        process.wait()
                    raise
        result = output.read_text() if output.exists() else ""
        verdicts = re.findall(r"(?im)^\s*(?:\*\*)?VERDICT\s*:\s*(?:\*\*)?\s*(ACCEPT|MINOR REVISIONS|MAJOR REVISIONS|REJECT|PASS|NEEDS_FIX)\b", result)
        receipt = {"reviewer": args.reviewer, "exit_code": process.returncode,
                   "document": str(args.document) if args.document else None,
                   "document_sha256": hashlib.sha256(document.encode()).hexdigest() if document else None,
                   "prompt_sha256": hashlib.sha256(prompt.encode()).hexdigest(),
                   "review_sha256": hashlib.sha256(result.encode()).hexdigest(),
                   "characters": len(result), "verdict": verdicts[-1] if verdicts else None}
        output.with_suffix(".receipt.json").write_text(json.dumps(receipt, indent=2) + "\n")
        print(json.dumps(receipt, indent=2))
        print(result[-2000:])
        if process.returncode or len(result) < 500 or not verdicts:
            raise SystemExit("External review failed to produce a substantive verdict; inspect diagnostics")
    finally:
        (lock / "owner").unlink(missing_ok=True)
        lock.rmdir()


if __name__ == "__main__":
    main()
