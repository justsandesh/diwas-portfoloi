import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import {
  introdata, meta, datastats, services,
  testimonials, industries,
} from "../../content_option";

export const Home = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Helmet>

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section className="hero">
        <div className="hero_left">
          <div className="hero_content">
            <span className="hero_eyebrow" data-aos="fade-up">Pandey Corporation</span>
            <h1 className="hero_name" data-aos="fade-up" data-aos-delay="80">
              <span className="name_line1">{introdata.title_line1}</span>
              <span className="name_line2">{introdata.title_line2}</span>
            </h1>
            <div className="hero_divider" data-aos="fade-up" data-aos-delay="160" />
            <div className="hero_typewriter" data-aos="fade-up" data-aos-delay="200">
              <Typewriter
                options={{
                  strings: [
                    introdata.animated.first,
                    introdata.animated.second,
                    introdata.animated.third,
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 12,
                }}
              />
            </div>
            <p className="hero_desc" data-aos="fade-up" data-aos-delay="260">
              {introdata.description}
            </p>
            <div className="hero_actions" data-aos="fade-up" data-aos-delay="320">
              <Link to="/portfolio" className="btn_primary">
                View Portfolio <span>→</span>
              </Link>
              <Link to="/contact" className="btn_outline">
                Get In Touch
              </Link>
            </div>
          </div>
        </div>

        <div className="hero_right">
          <div
            className="hero_img"
            style={{ backgroundImage: `url(${introdata.your_img_url})` }}
          />
          <div className="hero_img_overlay" />
        </div>

        <div className="hero_scroll_hint">
          <span>Scroll</span>
          <div className="scroll_line" />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MARQUEE STRIP
      ═══════════════════════════════════════ */}
      <div className="marquee_strip">
        <div className="marquee_track">
          {[...Array(3)].map((_, r) => (
            <span key={r} className="marquee_content">
              {["INFORMATION TECHNOLOGY", "CONSUMER GOODS", "INNOVATION",
                "LEADERSHIP", "PANDEY CORPORATION", "NEPAL", "BUILD & GROW",
                "ENTERPRISE", "STRATEGY"].map((word, i) => (
                <React.Fragment key={i}>
                  <span className="marquee_word">{word}</span>
                  <span className="marquee_dot">·</span>
                </React.Fragment>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════
          ABOUT STRIP — Stats + Intro
      ═══════════════════════════════════════ */}
      <section className="about_strip">
        <div className="about_strip_inner">
          <div className="stats_block" data-aos="fade-right">
            <div className="stats_grid">
              {datastats.map((s, i) => (
                <div className="stat_card" key={i}>
                  <span className="stat_num">{s.value}</span>
                  <span className="stat_label">{s.description}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about_text_block" data-aos="fade-left" data-aos-delay="100">
            <span className="section_eyebrow">About Binav Pandey</span>
            <h2 className="about_heading">
              A decade of building<br />industry-defining enterprises
            </h2>
            <p>
              I'm Binav Pandey — entrepreneur and founder of Pandey Corporation.
              With over ten years across IT and Consumer Goods, I've built a
              conglomerate rooted in long-term value, sustainable growth, and
              the belief that every great enterprise starts with a bold vision.
            </p>
            <Link to="/about" className="text_link">
              Read Full Story <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          INDUSTRIES — Two big cards
      ═══════════════════════════════════════ */}
      <section className="industries_section">
        <div className="industries_header" data-aos="fade-up">
          <span className="section_eyebrow">What We Do</span>
          <h2>Two Divisions. One Vision.</h2>
        </div>
        <div className="industries_grid">
          {industries.map((ind, i) => (
            <div
              className="industry_card"
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 120}
            >
              <span className="industry_icon">{ind.icon}</span>
              <div className="industry_tag">{ind.subtitle}</div>
              <h3>{ind.title}</h3>
              <p>{ind.description}</p>
              <Link to="/portfolio" className="industry_link">
                Explore Division →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SERVICES — 6 numbered cards
      ═══════════════════════════════════════ */}
      <section className="services_section">
        <div className="services_header" data-aos="fade-up">
          <span className="section_eyebrow">Services</span>
          <h2>Everything We Offer</h2>
          <p>From IT infrastructure to goods distribution — full-spectrum business solutions</p>
        </div>
        <div className="services_grid">
          {services.map((svc, i) => (
            <div
              className="service_card"
              key={i}
              data-aos="fade-up"
              data-aos-delay={(i % 3) * 80}
            >
              <span className="svc_number">{svc.number}</span>
              <h4>{svc.title}</h4>
              <p>{svc.description}</p>
              <div className="svc_bar" />
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════ */}
      <section className="testimonials_section">
        <div className="testimonials_header" data-aos="fade-up">
          <span className="section_eyebrow">Partners & Clients</span>
          <h2>What They Say</h2>
        </div>
        <div className="testimonials_grid">
          {testimonials.map((t, i) => (
            <div
              className="testi_card"
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 120}
            >
              <div className="testi_quote">"</div>
              <p className="testi_text">{t.text}</p>
              <div className="testi_author">
                <img src={t.avatar} alt={t.name} className="testi_avatar" />
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA BANNER
      ═══════════════════════════════════════ */}
      <section className="cta_section" data-aos="fade-up">
        <div className="cta_glow" />
        <span className="section_eyebrow">Let's Build Together</span>
        <h2 className="cta_heading">
          Have a Business Opportunity<br />or Partnership Proposal?
        </h2>
        <p className="cta_sub">We respond to every serious enquiry within 48 hours.</p>
        <Link to="/contact" className="btn_primary lg">
          Contact Pandey Corporation <span>→</span>
        </Link>
      </section>

    </HelmetProvider>
  );
};
