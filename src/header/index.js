import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { logotext } from "../content_option";
import Themetoggle from "../components/themetoggle";
import "./style.css";

const NAV_LINKS = [
  { to: "/",          label: "Home"      },
  { to: "/about",     label: "About"     },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact",   label: "Contact"   },
];

const Headermain = () => {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <>
      <header className={`nav_root${scrolled ? " scrolled" : ""}`}>
        <div className="nav_inner">

          {/* ── Logo ── */}
          <Link to="/" className="nav_logo">
            <span className="logo_main">{logotext}</span>
            <span className="logo_dot">.</span>
            <span className="logo_corp">CORP</span>
          </Link>

          {/* ── Desktop links ── */}
          <nav className="nav_links">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`nav_link${location.pathname === to ? " active" : ""}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* ── Right controls ── */}
          <div className="nav_right">
            <Themetoggle />
            <Link to="/contact" className="nav_cta">
              Enquire Now <span className="cta_arrow">→</span>
            </Link>
            <button
              className={`hamburger${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <div className={`mobile_drawer${menuOpen ? " open" : ""}`}>
        <div className="mobile_drawer_inner">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`mobile_link${location.pathname === to ? " active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link to="/contact" className="mobile_cta" onClick={() => setMenuOpen(false)}>
            Enquire Now →
          </Link>
        </div>
      </div>
      {menuOpen && <div className="drawer_overlay" onClick={() => setMenuOpen(false)} />}
    </>
  );
};

export default Headermain;
