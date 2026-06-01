import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Home, FileText, FileOutput, Send } from "lucide-react";
import logo from "../assets/logo.png";
import "./css/navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    {
      to: "/",
      label: "Home",
      icon: <Home size={18} />,
    },
    {
      to: "/rules",
      label: "Rules & Regulations",
      icon: <FileText size={18} />,
    },
    {
      to: "/printPermit",
      label: "Print Permit",
      icon: <FileOutput size={18} />,
    },
    {
      to: "/apply",
      label: "Apply Now",
      icon: <Send size={18} />,
      isButton: true,
    },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          {/* Mobile Hamburger */}
          <button
            type="button"
            className={`hamburger ${isOpen ? "active" : ""}`}
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            aria-expanded={isOpen}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

          {/* Main Logo */}
          <Link to="/" className="brand">
            <img src={logo} alt="NTNC Logo" className="brand-logo" />
          </Link>

          {/* Desktop Nav */}
          <ul className="desktop-nav">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  to={link.to}
                  className={`nav-link ${link.isButton ? "nav-btn" : ""} ${
                    location.pathname === link.to ? "active" : ""
                  }`}
                >
                  {!link.isButton && (
                    <span className="icon-wrapper">{link.icon}</span>
                  )}

                  <span>{link.label}</span>

                  {link.isButton && (
                    <span className="btn-icon">{link.icon}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      
      <div
        className={`mobile-menu-overlay ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`mobile-menu-slider ${isOpen ? "active" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          
          <div className="mobile-header">
            
            <Link
              to="/"
              className="mobile-brand-wrap"
              onClick={() => setIsOpen(false)}
            >
              <img src={logo} alt="NTNC Logo" className="mobile-brand-logo" />
            </Link>

            <button
              type="button"
              className="mobile-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          

          <ul className="mobile-nav-list">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`mobile-nav-link ${
                    link.isButton ? "mobile-cta" : ""
                  } ${location.pathname === link.to ? "active" : ""}`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mobile-footer">
            © {new Date().getFullYear()} NTNC
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;