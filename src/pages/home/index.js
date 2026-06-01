import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { introdata, meta, datastats, services, testimonials } from "../../content_option";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <HelmetProvider>
      <section id="home" className="home">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>

        {/* Hero */}
        <div className="intro_sec d-block d-lg-flex align-items-center">
          <div
            className="h_bg-image order-1 order-lg-2 h-100"
            style={{ backgroundImage: `url(${introdata.your_img_url})` }}
          ></div>
          <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center">
            <div className="align-self-center">
              <div className="intro mx-auto">
                <h2 className="mb-1x">{introdata.title}</h2>
                <h1 className="fluidz-48 mb-1x">
                  <Typewriter
                    options={{
                      strings: [
                        introdata.animated.first,
                        introdata.animated.second,
                        introdata.animated.third,
                      ],
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 10,
                    }}
                  />
                </h1>
                <p className="mb-1x">{introdata.description}</p>
                <div className="intro_btn-action pb-5">
                  <Link to="/portfolio" className="text_2">
                    <div id="button_p" className="ac_btn btn">
                      My Portfolio
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>
                  <Link to="/contact">
                    <div id="button_h" className="ac_btn btn">
                      Contact Me
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="stats_section">
          {datastats.map((stat, i) => (
            <div
              className="stat_item"
              key={i}
              data-aos="zoom-in"
              data-aos-delay={i * 100}
            >
              <h2 className="stat_value">{stat.value}</h2>
              <p className="stat_desc">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Services */}
        <div className="services_section">
          <div className="container">
            <div className="section_header" data-aos="fade-up">
              <h2>What I Do</h2>
              <p>Full-service video production &amp; post-production</p>
            </div>
            <div className="services_grid">
              {services.map((service, i) => (
                <div
                  className="service_card"
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                >
                  <span className="service_icon">▶</span>
                  <h4>{service.title}</h4>
                  <p>{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="testimonials_section">
          <div className="container">
            <div className="section_header" data-aos="fade-up">
              <h2>Client Stories</h2>
              <p>What creators and brands say about working with me</p>
            </div>
            <div className="testimonials_grid">
              {testimonials.map((t, i) => (
                <div
                  className="testimonial_card"
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={i * 150}
                >
                  <p className="testimonial_text">"{t.text}"</p>
                  <div className="testimonial_author">
                    <img src={t.avatar} alt={t.name} className="testimonial_avatar" />
                    <div>
                      <strong>{t.name}</strong>
                      <span>{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="cta_section" data-aos="fade-up">
          <div className="container text-center">
            <h2>Ready to elevate your video content?</h2>
            <p>Let's create something cinematic together.</p>
            <Link to="/contact">
              <div className="ac_btn btn cta_btn">
                Start a Project
                <div className="ring one"></div>
                <div className="ring two"></div>
                <div className="ring three"></div>
              </div>
            </Link>
          </div>
        </div>

      </section>
    </HelmetProvider>
  );
};
