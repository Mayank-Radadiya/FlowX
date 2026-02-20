import Link from "next/link";
import { FOOTER_COLUMNS } from "../lib/constants";

function Footer() {
  return (
    <footer className="border-t-2 border-border bg-background pt-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand - Takes up 2 columns for Asymmetry */}
          <div className="md:col-span-2 flex flex-col items-start pr-8 lg:pr-12 border-r-0 lg:border-r-2 border-border">
            <Link
              href="/landing"
              className="inline-flex items-center gap-3 mb-6 group"
            >
              <div className="size-6 bg-primary" />
              <span className="text-xl font-black text-foreground tracking-tighter uppercase">
                FlowX
              </span>
            </Link>
            <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-sm uppercase tracking-wide">
              The high-performance workflow engine built for modern SaaS teams.
              No compromises. No bloat.
            </p>
          </div>

          {/* Dynamic columns - Takes up remaining 3 columns */}
          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8 w-full">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-sm font-bold tracking-widest uppercase text-foreground mb-6">
                  {col.title}
                </p>
                <ul className="flex flex-col gap-4">
                  {col.links.map((link) => {
                    const isAnchor = link.href.startsWith("#");
                    return (
                      <li key={link.label}>
                        {isAnchor ? (
                          <a
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 uppercase tracking-wider"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 uppercase tracking-wider"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t-2 border-border bg-muted">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-bold text-muted-foreground tracking-widest uppercase">
            © {new Date().getFullYear()} FlowX. All rights reserved.
          </p>
          <p className="text-xs font-bold text-muted-foreground tracking-widest uppercase flex items-center gap-2">
            <span>Powered by</span>
            <span className="text-foreground">FlowX</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
