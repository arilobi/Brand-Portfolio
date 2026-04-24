import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

//   For smooth scrolling
  const scrollToSection = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

//   When scrolled, it should change color for visibility
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
  ];

  const email = "https://mail.google.com/mail/?view=cm&fs=1&to=marionnabulobi@gmail.com";

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <Link to="/" className="logo">
          <img src={logo} alt="Logo of shecodes.css" className="logo-image" />
        </Link>

        <div className="nav-links">
          {navLinks.map(({ label, id }) => (
            <a key={id} href={`#${id}`} onClick={(e) => scrollToSection(e, id)}>
              {label}
            </a>
          ))}
          <a href={email} target="_blank" rel="noreferrer" className="nav-links-a nav-cta">
            Get in touch
          </a>
        </div>

        <button
          className={`hamburger${menuOpen ? " open" : ""}`}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map(({ label, id }) => (
            <a key={id} href={`#${id}`} onClick={(e) => scrollToSection(e, id)}>
              {label}
            </a>
          ))}
          <a href={email} target="_blank" rel="noreferrer" className="mobile-cta" onClick={() => setMenuOpen(false)}>
            Get in touch
          </a>
        </div>
      )}
    </>
  );
}