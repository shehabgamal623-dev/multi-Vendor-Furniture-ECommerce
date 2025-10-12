import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";

export const FooterSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter email:", email);
    setEmail("");
  };

  const footerLinks = {
    importantLinks: [
      { label: t("footer_main"), href: "#" },
      { label: t("footer_stores"), href: "#" },
      { label: t("footer_best_selling"), href: "#" },
      { label: t("footer_try_at_home"), href: "#" },
      { label: t("footer_blogs"), href: "#" },
    ],
    about: [
      { label: t("footer_who_we_are"), href: "#" },
      { label: t("footer_contact"), href: "#" },
    ],
  };

  return (
    <footer className="bg-[#F5F5F5] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" className="text-[#A67C52]">
          <defs>
            <pattern
              id="footer-pattern"
              x="0"
              y="0"
              width="200"
              height="200"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path
                d="M50 10 L50 90 M10 50 L90 50"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="bg-gradient-to-br from-[#A67C52] to-[#8B6841] rounded-2xl p-8 mb-12 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <h3 className="text-white text-xl md:text-2xl font-bold">
              {t("footer_newsletter_title")}
            </h3>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex gap-3 w-full md:w-auto"
            >
              <Input
                type="email"
                placeholder={t("footer_newsletter_placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`bg-white border-none rounded-lg px-6 py-6 w-full md:w-80 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-white ${
                  isRTL ? "text-right" : "text-left"
                }`}
              />
              <Button
                type="submit"
                className="bg-white text-[#A67C52] hover:bg-gray-100 font-bold px-8 py-6 rounded-lg whitespace-nowrap transition-all hover:scale-105"
              >
                {t("footer_newsletter_button")}
              </Button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#A67C52] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-[#A67C52] font-bold text-2xl">
                {t("footer_logo_text")}
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {t("footer_description")}
            </p>
          </div>

          <div>
            <h4 className="text-gray-900 font-bold text-lg mb-6">
              {t("footer_important_links")}
            </h4>
            <ul className="space-y-3">
              {footerLinks.importantLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-[#A67C52] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 font-bold text-lg mb-6">
              {t("footer_about")}
            </h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-[#A67C52] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 font-bold text-lg mb-6">
              {t("footer_contact_us")}
            </h4>
            <div className="space-y-4">
              <a
                href={`tel:${t("footer_phone")}`}
                className="flex items-center gap-3 text-gray-600 hover:text-[#A67C52] transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <FaPhone className="text-[#A67C52]" />
                </div>
                <span className={isRTL ? "font-arabic" : ""}>
                  {t("footer_phone")}
                </span>
              </a>
              <a
                href={`mailto:${t("footer_email")}`}
                className="flex items-center gap-3 text-gray-600 hover:text-[#A67C52] transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <FaEnvelope className="text-[#A67C52]" />
                </div>
                <span>{t("footer_email")}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-gray-600 text-sm">
              Furniture � 2025 {t("footer_copyright")}
            </p>

            <div>
              <h5 className="text-gray-900 font-bold text-lg mb-4 text-center md:text-right">
                {t("footer_follow")}
              </h5>
              <p className="text-gray-600 text-sm mb-4 max-w-xs text-center md:text-right">
                {t("footer_follow_description")}
              </p>
              <div className="flex gap-3 justify-center md:justify-end">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-all hover:scale-110"
                >
                  <FaFacebookF className="text-[#1877F2] text-lg" />
                </a>
                <a
                  href="https://wa.me/966551234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-all hover:scale-110"
                >
                  <FaWhatsapp className="text-[#25D366] text-lg" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-all hover:scale-110"
                >
                  <FaInstagram className="text-[#E4405F] text-lg" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
