#!/usr/bin/env bash
slack_lint_msg() {
  local msg="$1" fail=0 bare angle bleed unb
  bare=$(printf '%s\n' "$msg" | grep -nE '(^|[^(<])https?://' || true)
  [ -n "$bare" ] && { echo "slack_lint: FAIL bare URL(s), use [label](url):"; printf '%s\n' "$bare"; fail=1; }
  angle=$(printf '%s\n' "$msg" | grep -nE '<https?://' || true)
  [ -n "$angle" ] && { echo "slack_lint: FAIL angle-bracket URL(s):"; printf '%s\n' "$angle"; fail=1; }
  bleed=$(printf '%s\n' "$msg" | grep -nE '\)[[:space:]]*\*' || true)
  [ -n "$bleed" ] && { echo "slack_lint: FAIL bold marker after link:"; printf '%s\n' "$bleed"; fail=1; }
  unb=$(printf '%s\n' "$msg" | awk '{ n=gsub(/\*\*/,"&"); if (n % 2) print NR": "$0 }' || true)
  [ -n "$unb" ] && { echo "slack_lint: FAIL unbalanced bold:"; printf '%s\n' "$unb"; fail=1; }
  return "$fail"
}

if [ "${BASH_SOURCE[0]}" = "$0" ]; then
  slack_lint_msg "$(< "$1")"
fi
