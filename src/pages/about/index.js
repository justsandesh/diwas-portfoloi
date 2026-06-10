import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { dataabout, meta, worktimeline, skills, services } from "../../content_option";

export const About = () => {
  return (
    <HelmetProvider>
      <div className="about_page">
        <Helmet>
          <meta charSet="utf-8" />
          <title>About | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>

        {/* ── Page Banner ── */}
        <div className="about_banner" data-aos="fade-in">
          <div className="about_banner_inner">
            <span className="about_banner_ghost">ABOUT</span>
            <div className="about_banner_text">
              <span className="section_eyebrow_about">CEO &amp; Founder</span>
              <h1>Binav Pandey</h1>
              <div className="about_banner_divider" />
              <p>Pandey Corporation — Kathmandu, Nepal</p>
            </div>
          </div>
        </div>

        {/* ── Story ── */}
        <section className="story_section">
          <div className="story_inner">
            <div className="story_image" data-aos="fade-right">
              <img src={dataabout.photo} alt="Binav Pandey" />
              <div className="story_img_accent" />
            </div>
            <div className="story_text" data-aos="fade-left" data-aos-delay="100">
              <span className="section_eyebrow_about">{dataabout.title}</span>
              <h2>Building institutions,<br />not just companies.</h2>
              <p>{dataabout.aboutme}</p>
              <p>{dataabout.aboutme2}</p>
            </div>
          </div>
        </section>

        {/* ── Career Timeline ── */}
        <section className="timeline_section">
          <div className="timeline_header" data-aos="fade-up">
            <span className="section_eyebrow_about">Experience</span>
            <h2>Career Timeline</h2>
          </div>
          <div className="timeline_list">
            {worktimeline.map((item, i) => (
              <div
                className="timeline_item"
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="timeline_dot" />
                <div className="timeline_date">{item.date}</div>
                <div className="timeline_content">
                  <h3>{item.jobtitle}</h3>
                  <span className="timeline_company">{item.where}</span>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Core Competencies ── */}
        <section className="skills_section">
          <div className="skills_header" data-aos="fade-up">
            <span className="section_eyebrow_about">Leadership Profile</span>
            <h2>Core Competencies</h2>
          </div>
          <div className="skills_grid">
            {skills.map((s, i) => (
              <div
                className="skill_item"
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 60}
              >
                <div className="skill_header_row">
                  <span className="skill_name">{s.name}</span>
                  <span className="skill_pct">{s.value}%</span>
                </div>
                <div className="skill_track">
                  <div className="skill_fill" style={{ width: `${s.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Business Divisions ── */}
        <section className="divisions_section">
          <div className="divisions_header" data-aos="fade-up">
            <span className="section_eyebrow_about">What We Do</span>
            <h2>Business Divisions</h2>
          </div>
          <div className="divisions_grid">
            {services.map((svc, i) => (
              <div
                className="division_card"
                key={i}
                data-aos="fade-up"
                data-aos-delay={(i % 3) * 80}
              >
                <span className="div_number">{svc.number}</span>
                <h4>{svc.title}</h4>
                <p>{svc.description}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </HelmetProvider>
  );
};
