import React, { useState } from "react";
import * as emailjs from "emailjs-com";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta, contactConfig, socialprofils } from "../../content_option";

export const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState({ loading: false, show: false, success: false, msg: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setStatus({ loading: true, show: false, success: false, msg: "" });

    const params = {
      from_name: form.email,
      user_name: form.name,
      user_company: form.company,
      to_name: contactConfig.YOUR_EMAIL,
      message: form.message,
    };

    emailjs
      .send(contactConfig.YOUR_SERVICE_ID, contactConfig.YOUR_TEMPLATE_ID, params, contactConfig.YOUR_USER_ID)
      .then(() => setStatus({ loading: false, show: true, success: true,  msg: "Message sent! We'll be in touch within 48 hours." }))
      .catch(err => setStatus({ loading: false, show: true, success: false, msg: `Failed to send: ${err.text}` }));
  };

  return (
    <HelmetProvider>
      <div className="contact_page">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Contact | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>

        {/* ── Banner ── */}
        <div className="contact_banner" data-aos="fade-in">
          <div className="contact_banner_inner">
            <span className="contact_ghost">CONTACT</span>
            <span className="ct_eyebrow">Get In Touch</span>
            <h1>Let's Build Together</h1>
            <div className="ct_divider" />
            <p>{contactConfig.description}</p>
          </div>
        </div>

        {/* ── Split Layout ── */}
        <div className="contact_body">
          <div className="contact_split">

            {/* ── Left — Info ── */}
            <div className="contact_info" data-aos="fade-right">
              <div className="info_block">
                <span className="info_label">Headquarters</span>
                <p>{contactConfig.YOUR_ADDRESS}</p>
              </div>
              <div className="info_block">
                <span className="info_label">Email</span>
                <a href={`mailto:${contactConfig.YOUR_EMAIL}`} className="info_value">
                  {contactConfig.YOUR_EMAIL}
                </a>
              </div>
              <div className="info_block">
                <span className="info_label">Phone</span>
                <a href={`tel:${contactConfig.YOUR_FONE}`} className="info_value">
                  {contactConfig.YOUR_FONE}
                </a>
              </div>
              <div className="info_block">
                <span className="info_label">Follow Us</span>
                <div className="social_row">
                  {Object.entries(socialprofils).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      className="social_chip"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </a>
                  ))}
                </div>
              </div>
              <div className="response_badge">
                <span className="response_dot" />
                Typically responds within 48 hours
              </div>
            </div>

            {/* ── Right — Form ── */}
            <div className="contact_form_wrap" data-aos="fade-left" data-aos-delay="100">
              {status.show && (
                <div className={`form_alert ${status.success ? "success" : "error"}`}>
                  {status.msg}
                </div>
              )}
              <form className="contact_form" onSubmit={handleSubmit} noValidate>
                <div className="form_row">
                  <div className="form_group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      id="name" name="name" type="text"
                      placeholder="Binav Pandey"
                      value={form.name} onChange={handleChange} required
                    />
                  </div>
                  <div className="form_group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      id="email" name="email" type="email"
                      placeholder="you@company.com"
                      value={form.email} onChange={handleChange} required
                    />
                  </div>
                </div>
                <div className="form_group">
                  <label htmlFor="company">Company / Organisation</label>
                  <input
                    id="company" name="company" type="text"
                    placeholder="Pandey Corporation"
                    value={form.company} onChange={handleChange}
                  />
                </div>
                <div className="form_group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message" name="message" rows="6"
                    placeholder="Tell us about your business inquiry, partnership proposal, or investment opportunity..."
                    value={form.message} onChange={handleChange} required
                  />
                </div>
                <button type="submit" className="form_submit" disabled={status.loading}>
                  {status.loading ? "Sending..." : "Send Enquiry →"}
                </button>
              </form>
            </div>

          </div>
        </div>

        {status.loading && <div className="loading-bar" />}

      </div>
    </HelmetProvider>
  );
};
