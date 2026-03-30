import { useState, useEffect } from "react";
import type React from "react";
import "./App.css";

const STORYBOOK_URL =
  import.meta.env.VITE_STORYBOOK_URL ?? "https://github.com/malaksayed22/NEXUS";
// Set VITE_STORYBOOK_URL after Storybook deployment.

type StackItem = {
  n: string;
  d: string;
  c: string;
  url: string;
};

type ComponentItem = {
  name: string;
  desc: string;
  tag: string;
  emoji: string;
  storybookPath: string;
};

const stackItems: StackItem[] = [
  {
    n: "React 18",
    d: "Hooks · forwardRef · portals · concurrent",
    c: "#61DAFB",
    url: "https://react.dev",
  },
  {
    n: "TypeScript 5",
    d: "Strict mode · fully typed props & utils",
    c: "#3178C6",
    url: "https://www.typescriptlang.org/docs",
  },
  {
    n: "Framer Motion",
    d: "Springs · layout anim · AnimatePresence",
    c: "#BB4BFF",
    url: "https://www.framer.com/motion",
  },
  {
    n: "Storybook 7",
    d: "Autodocs · controls · MDX · dark mode",
    c: "#FF4785",
    url: "https://storybook.js.org/docs",
  },
  {
    n: "Vitest",
    d: "Unit tests · RTL · coverage reports",
    c: "#6E9F18",
    url: "https://vitest.dev",
  },
  {
    n: "CSS Modules",
    d: "Scoped styles · tokens · zero runtime",
    c: "#FFB347",
    url: "https://github.com/css-modules/css-modules",
  },
];

const components: ComponentItem[] = [
  {
    name: "Button",
    desc: "4 variants · 3 sizes · loading · icons",
    tag: "Core",
    emoji: "⚡",
    storybookPath: "?path=/docs/components-button--docs",
  },
  {
    name: "Input",
    desc: "Float label · addons · validation states",
    tag: "Form",
    emoji: "✏️",
    storybookPath: "?path=/docs/components-input--docs",
  },
  {
    name: "Textarea",
    desc: "Auto-resize · char count · error state",
    tag: "Form",
    emoji: "📝",
    storybookPath: "?path=/docs/components-textarea--docs",
  },
  {
    name: "Checkbox",
    desc: "Controlled · indeterminate · size variants",
    tag: "Form",
    emoji: "☑️",
    storybookPath: "?path=/docs/components-checkbox--docs",
  },
  {
    name: "Radio",
    desc: "Group context · keyboard nav · helper text",
    tag: "Form",
    emoji: "🔵",
    storybookPath: "?path=/docs/components-radio--docs",
  },
  {
    name: "Select",
    desc: "Native · label · error · placeholder · sizes",
    tag: "Form",
    emoji: "⬇️",
    storybookPath: "?path=/docs/components-select--docs",
  },
  {
    name: "Badge",
    desc: "6 variants · dot · removable pill",
    tag: "Display",
    emoji: "🏷️",
    storybookPath: "?path=/docs/components-badge--docs",
  },
  {
    name: "Avatar",
    desc: "Image · initials · status · group stack",
    tag: "Display",
    emoji: "👤",
    storybookPath: "?path=/docs/components-avatar--docs",
  },
  {
    name: "Spinner",
    desc: "5 sizes · aria-label · reduced motion",
    tag: "Feedback",
    emoji: "⏳",
    storybookPath: "?path=/docs/components-spinner--docs",
  },
  {
    name: "Card",
    desc: "Elevated · outlined · compound API",
    tag: "Layout",
    emoji: "🃏",
    storybookPath: "?path=/docs/components-card--docs",
  },
  {
    name: "Modal",
    desc: "Focus trap · ARIA · portal · 5 sizes",
    tag: "Overlay",
    emoji: "🪟",
    storybookPath: "?path=/docs/components-modal--docs",
  },
  {
    name: "Toast",
    desc: "Context API · progress bar · stacking",
    tag: "Feedback",
    emoji: "🔔",
    storybookPath: "?path=/docs/components-toast--docs",
  },
  {
    name: "Tooltip",
    desc: "4 placements · delay · keyboard a11y",
    tag: "Overlay",
    emoji: "💬",
    storybookPath: "?path=/docs/components-tooltip--docs",
  },
  {
    name: "Toggle",
    desc: "Spring physics · 3 sizes · label slots",
    tag: "Form",
    emoji: "🔘",
    storybookPath: "?path=/docs/components-toggle--docs",
  },
];

export default function App() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);

      const sections = ["components", "stack"];
      let found = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 140 && rect.bottom >= 140) {
          found = id;
          break;
        }
      }
      setActiveSection(found);
    };
    let rafId = 0;
    const onMouse = (e: MouseEvent) => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      rafId = window.requestAnimationFrame(() => {
        setMouse({
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        });
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(
      "section.comps, section.stack",
    );
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("section-visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.15 },
    );
    sections.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onOutside = () => setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onOutside);
    };
  }, [menuOpen]);

  const px = (mouse.x - 0.5) * 30;
  const py = (mouse.y - 0.5) * 30;
  const motionClassX =
    px > 10 ? "motion-x-pos" : px < -10 ? "motion-x-neg" : "motion-x-mid";
  const motionClassY =
    py > 10 ? "motion-y-pos" : py < -10 ? "motion-y-neg" : "motion-y-mid";

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const tags = ["All", ...Array.from(new Set(components.map((c) => c.tag)))];
  const filteredComponents = activeTag
    ? components.filter((c) => c.tag === activeTag)
    : components;

  return (
    <div className={`root ${motionClassX} ${motionClassY}`}>
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />
      <div className="noise" />

      <nav className={scrollY > 50 ? "nav nav-solid" : "nav"}>
        <div className="nav-inner">
          <div className="logo">
            <span className="logo-nex">NEX</span>
            <span className="logo-us">US</span>
          </div>
          <div className="nav-links">
            <a
              href="#components"
              onClick={scrollTo("components")}
              aria-label="Navigate to components section"
              className={
                activeSection === "components"
                  ? "nav-link nav-active"
                  : "nav-link"
              }
            >
              Components
            </a>
            <a
              href="#stack"
              onClick={scrollTo("stack")}
              aria-label="Navigate to stack section"
              className={
                activeSection === "stack" ? "nav-link nav-active" : "nav-link"
              }
            >
              Stack
            </a>
            <a
              href={`${STORYBOOK_URL}`}
              className="nav-cta"
              aria-label="Open Storybook"
              target="_blank"
              rel="noopener noreferrer"
            >
              Storybook ↗
            </a>
            {menuOpen ? (
              <button
                className="nav-hamburger"
                aria-label="Close menu"
                aria-expanded="true"
                aria-controls="mobile-menu"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen((o) => !o);
                }}
              >
                <span className="ham-line ham-line-1-open" />
                <span className="ham-line ham-line-2-open" />
                <span className="ham-line ham-line-3-open" />
              </button>
            ) : (
              <button
                className="nav-hamburger"
                aria-label="Open menu"
                aria-expanded="false"
                aria-controls="mobile-menu"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen((o) => !o);
                }}
              >
                <span className="ham-line" />
                <span className="ham-line" />
                <span className="ham-line" />
              </button>
            )}
          </div>
        </div>
        {menuOpen && (
          <div
            id="mobile-menu"
            className="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
            onClick={(e) => e.stopPropagation()}
          >
            <a
              href="#components"
              className="mobile-link"
              onClick={(e) => {
                scrollTo("components")(e);
                setMenuOpen(false);
              }}
            >
              Components
            </a>
            <a
              href="#stack"
              className="mobile-link"
              onClick={(e) => {
                scrollTo("stack")(e);
                setMenuOpen(false);
              }}
            >
              Stack
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-inner">
          <div className="eyebrow">
            <span className="pulse-dot" />
            NEXUS · React 18 · TypeScript 5
          </div>

          <h1 className="h1">
            <span className="h1-line">NEXUS.</span>
            <span className="h1-outline">Built different.</span>
          </h1>

          <p className="hero-sub">
            A production-grade component library. Animated with spring physics,
            fully typed, WCAG accessible, and dark-mode ready out of the box.
          </p>

          <div className="hero-actions">
            {/* TODO: replace STORYBOOK_URL with your NEXUS Storybook Vercel URL */}
            <a
              href={`${STORYBOOK_URL}`}
              className="btn-solid"
              aria-label="Open NEXUS Storybook documentation in a new tab"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Storybook
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </a>
            <a
              href="https://github.com/malaksayed22/NEXUS"
              className="btn-outline"
              aria-label="View NEXUS source code on GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              View on GitHub
            </a>
          </div>

          <div className="stats-row">
            {[
              ["14", "Components"],
              ["100%", "TypeScript"],
              ["WCAG AA", "Accessible"],
              ["✦", "Animated"],
            ].map(([v, l]) => (
              <div className="stat" key={l}>
                <span className="stat-v">{v}</span>
                <span className="stat-l">{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating UI preview */}
        <div className={`floaters ${scrollY > 120 ? "floaters-scrolled" : ""}`}>
          <div className="fcard f1">
            <div className="fcard-title">Button</div>
            <div className="frow frow8 mt10">
              <span className="fpill solid">Primary</span>
              <span className="fpill ghost">Ghost</span>
              <span className="fpill danger">Danger</span>
            </div>
          </div>
          <div className="fcard f2">
            <div className="fcard-title">Toggle</div>
            <div className="frow frow12 mt10 centerY">
              <div className="ftoggle on">
                <div className="fthumb" />
              </div>
              <div className="ftoggle">
                <div className="fthumb off" />
              </div>
            </div>
          </div>
          <div className="fcard f3">
            <div className="fcard-title">Badge</div>
            <div className="frow frow6 wrap mt10">
              {["Core", "Success", "Warning", "Danger"].map((t) => (
                <span key={t} className="fbadge">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPONENTS ── */}
      <section className="comps" id="components">
        <div className="section-inner">
          <p className="eyebrow eyebrow-left">— The library</p>
          <h2 className="h2">
            Everything you need.
            <br />
            <span className="dim">Nothing extra.</span>
          </h2>
          <div
            className="tag-filter"
            role="group"
            aria-label="Filter by category"
          >
            {tags.map((tag) =>
              (tag === "All" ? activeTag === null : activeTag === tag) ? (
                <button
                  key={tag}
                  className="tag-btn tag-btn-active"
                  onClick={() => setActiveTag(tag === "All" ? null : tag)}
                  aria-pressed="true"
                >
                  {tag}
                </button>
              ) : (
                <button
                  key={tag}
                  className="tag-btn"
                  onClick={() => setActiveTag(tag === "All" ? null : tag)}
                  aria-pressed="false"
                >
                  {tag}
                </button>
              ),
            )}
          </div>
          <div className="comp-grid">
            {filteredComponents.map((c) => {
              const originalIdx = components.indexOf(c);
              return (
                <a
                  key={c.name}
                  href={`${STORYBOOK_URL}${c.storybookPath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`comp-card tone${originalIdx % 6}${
                    hovered === c.name ? " comp-hov" : ""
                  }`}
                  aria-label={`View ${c.name} component in Storybook`}
                  onMouseEnter={() => setHovered(c.name)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(c.name)}
                  onBlur={() => setHovered(null)}
                >
                  <div className="cc-glow" />
                  <div className="cc-head">
                    <span className="cc-icon">{c.emoji}</span>
                    <span className="cc-tag">{c.tag}</span>
                  </div>
                  <div className="cc-name">{c.name}</div>
                  <div className="cc-desc">{c.desc}</div>
                  <div className="cc-rule" />
                  <div className="cc-hint">View in Storybook ↗</div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── STACK ── */}
      <section className="stack" id="stack">
        <div className="section-inner">
          <p className="eyebrow eyebrow-left">— Built with</p>
          <h2 className="h2">
            Modern stack.
            <br />
            <span className="dim">Zero shortcuts.</span>
          </h2>
          <div className="stack-grid">
            {stackItems.map((s, idx) => (
              <a
                className={`scard st${idx % 6}`}
                key={s.n}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Learn more about ${s.n}`}
              >
                <div className="scard-dot" />
                <div className="scard-name">{s.n}</div>
                <div className="scard-detail">{s.d}</div>
                <span className="scard-arrow">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta">
        <div className="cta-orb" />
        <div className="cta-inner">
          <span className="cta-tag">Ready?</span>
          <h2 className="cta-h2">
            See NEXUS in action.
            <br />
            Live in Storybook.
          </h2>
          <p className="cta-p">
            Click through variants, toggle props, switch themes — all
            interactive, all live.
          </p>
          <a
            href={`${STORYBOOK_URL}`}
            className="btn-solid btn-big"
            aria-label="Launch NEXUS Storybook in a new tab"
            target="_blank"
            rel="noopener noreferrer"
          >
            Launch Storybook
            <svg width="15" height="15" viewBox="0 0 13 13" fill="none">
              <path
                d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </a>
        </div>
      </section>

      <footer className="footer">
        <span>
          <strong>NEXUS</strong> — built by <span>Malak Sayed</span>
        </span>
        <span className="footer-mid">React · TypeScript · Storybook</span>
        <a
          href="https://github.com/malaksayed22/NEXUS"
          aria-label="View source code on GitHub"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub ↗
        </a>
      </footer>
    </div>
  );
}
