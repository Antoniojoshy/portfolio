import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, Github, Instagram, Mail, Linkedin } from "lucide-react";
import { toast } from "sonner";

export function ContactSection() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formDataToSend = new FormData(form);

    try {

      await fetch("/", {
        method: "POST",
        body: formDataToSend,
      });

      toast.success("Message sent successfully! I'll get back to you soon.");

      setFormData({
        name: "",
        email: "",
        message: "",
      });

    } catch (error) {

      toast.error("Failed to send message");

    }
  };

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/Antoniojoshy/",
      label: "GitHub",
      color: "hover:text-bronze",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/antonio_joshy_/",
      label: "Instagram",
      color: "hover:text-bronze-light",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/antoniojoshy/",
      label: "LinkedIn",
      color: "hover:text-bronze",
    },
    {
      icon: Mail,
      href: "mailto:antoniojoshy8@gmail.com",
      label: "Email",
      color: "hover:text-white",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-32 bg-gradient-to-b from-navy-base via-navy-surface to-navy-base overflow-hidden"
    >

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-bronze rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-bronze-light rounded-full blur-3xl opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Get In Touch
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-bronze to-bronze-light mx-auto mb-6" />

          <p className="text-slate-text text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's work together to create something amazing
          </p>

        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">

          {/* Social Section */}

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >

            <div className="bg-navy-card backdrop-blur-sm rounded-2xl p-8 border border-navy-surface">

              <h3 className="text-2xl font-bold text-white mb-6">
                Let's Connect
              </h3>

              <p className="text-slate-text leading-relaxed mb-8">
                I'm always open to discussing new projects, creative ideas,
                or opportunities to be part of your vision.
              </p>

              <div className="space-y-4">

                {socialLinks.map((social) => (

                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 p-4 bg-navy-surface rounded-xl border border-navy-card hover:border-bronze/30 transition-all duration-300 group ${social.color}`}
                  >

                    <div className="p-3 bg-navy-card rounded-lg group-hover:bg-bronze/10 transition-all duration-300">
                      <social.icon className="w-6 h-6 text-white group-hover:text-bronze-light transition-colors" />
                    </div>

                    <div>
                      <p className="text-white font-medium">{social.label}</p>
                      <p className="text-slate-text text-sm">
                        {social.href.replace("mailto:", "").replace("https://", "")}
                      </p>
                    </div>

                  </a>

                ))}

              </div>

            </div>

          </motion.div>

          {/* Contact Form */}

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >

            <form
              name="contact"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
              className="bg-navy-card backdrop-blur-sm rounded-2xl p-8 border border-navy-surface space-y-6"
            >

              <input type="hidden" name="form-name" value="contact" />

              <div>
                <label className="block text-white mb-2">Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-navy-surface border border-navy-card rounded-xl text-white focus:outline-none focus:border-bronze"
                />
              </div>

              <div>
                <label className="block text-white mb-2">Email</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-navy-surface border border-navy-card rounded-xl text-white focus:outline-none focus:border-bronze"
                />
              </div>

              <div>
                <label className="block text-white mb-2">Message</label>

                <textarea
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 bg-navy-surface border border-navy-card rounded-xl text-white focus:outline-none focus:border-bronze resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-navy-surface border border-bronze/30 text-white rounded-xl hover:border-bronze hover:bg-bronze/10 transition-all duration-300 flex items-center justify-center gap-2 group"
              >

                Send Message

                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:text-bronze transition-all" />

              </button>

            </form>

          </motion.div>

        </div>

      </div>

    </section>
  );
}