import type { Metadata } from 'next';
import '../public/site.css';
import { description, github, project, siteUrl } from '../lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), title: { default: project, template: `%s | ${project}` }, description,
  openGraph: { title: project, description, url: '/', siteName: project, type: 'website', images: [{ url: '/og/home.png', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: project, description, images: ['/og/home.png'] },
  alternates: { canonical: '/' },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <a href="#main" className="skip-link">Skip to content</a>
    <header className="site-header"><a className="brand" href="/">Adelic Polarization</a><nav aria-label="Main navigation"><a href="/#papers">Papers</a><a href="/#conjecture">Conjecture</a><a href={`${github}/tree/main/lean`}>Lean code</a></nav></header>
    {children}
    <footer className="site-footer"><p>Matthew Long<br/><span>The YonedaAI Collaboration</span></p><div><a href={github}>Repository</a><a href="https://yonedaai.com">YonedaAI</a></div></footer>
  </body></html>;
}
