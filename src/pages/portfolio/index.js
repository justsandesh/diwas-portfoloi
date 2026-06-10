import React, { useState } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { dataportfolio, meta } from "../../content_option";

const FILTERS = [
  { key: "all",        label: "All Work"     },
  { key: "it",         label: "IT Division"  },
  { key: "goods",      label: "Goods"        },
  { key: "corporate",  label: "Corporate"    },
  { key: "investment", label: "Investment"   },
];

export const Portfolio = () => {
  const [active, setActive] = useState("all");

  const filtered = active === "all"
    ? dataportfolio
    : dataportfolio.filter(p => p.category === active);

  return (
    <HelmetProvider>
      <div className="portfolio_page">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Portfolio | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>

        {/* ── Banner ── */}
        <div className="portfolio_banner" data-aos="fade-in">
          <div className="portfolio_banner_inner">
            <span className="portfolio_ghost">WORK</span>
            <span className="pf_eyebrow">Pandey Corporation</span>
            <h1>Our Portfolio</h1>
            <div className="pf_divider" />
            <p>A selection of key initiatives across IT, goods distribution, corporate strategy, and investment.</p>
          </div>
        </div>

        {/* ── Filter Tabs ── */}
        <div className="filter_bar" data-aos="fade-up">
          {FILTERS.map(f => (
            <button
              key={f.key}
              className={`filter_btn${active === f.key ? " active" : ""}`}
              onClick={() => setActive(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* ── Grid ── */}
        <div className="portfolio_grid">
          {filtered.map((item, i) => (
            <div
              className="pf_card"
              key={i}
              data-aos="fade-up"
              data-aos-delay={(i % 4) * 60}
            >
              <div className="pf_img_wrap">
                <img src={item.img} alt={item.description} loading="lazy" />
              </div>
              <div className="pf_overlay">
                <div className="pf_overlay_inner">
                  <span className="pf_category">{item.category?.toUpperCase()}</span>
                  <p className="pf_title">{item.description}</p>
                  <a href={item.link} className="pf_btn">View Project →</a>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="pf_empty">No projects in this category yet.</div>
          )}
        </div>

      </div>
    </HelmetProvider>
  );
};
