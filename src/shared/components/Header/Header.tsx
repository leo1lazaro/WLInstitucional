import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Heart } from "lucide-react";
import { useScrollToSection } from "../../hooks/useScrollToSection";
import { useSiteStore } from "../../states/useSiteStore";
import { navigationItems } from "../../constants/navigation";
import "./Header.css";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { siteConfig } = useSiteStore();
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollToSection } = useScrollToSection();

  const isHome = location.pathname === "/";

  // When mobile menu is open, block body scroll
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleNavItemClick = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (isHome) {
      scrollToSection(sectionId);
    } else {
      // Navigate to homepage first, then scroll
      navigate(`/#${sectionId}`);
      // Let it navigate, then after a brief delay, scroll to section
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    }
  };

  return (
    <header className="Header-container">
      <div className="Header-wrapper">
        <Link to="/" className="Header-logo">
          <Heart className="Header-logoIcon" size={20} />
          <span className="Header-logoText">{siteConfig.professionalName}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="Header-nav">
          {navigationItems.map((item) => (
            <a
              key={item.sectionId}
              href={`#${item.sectionId}`}
              className="Header-navLink"
              onClick={(e) => handleNavItemClick(item.sectionId, e)}
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/admin"
            className={`Header-adminLink ${
              location.pathname === "/admin" ? "Header-adminLink--active" : ""
            }`}
          >
            Painel Admin
          </Link>
        </nav>

        {/* Mobile Menu Trigger */}
        <button
          className="Header-mobileToggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="Header-mobileMenu">
          <nav className="Header-mobileNav">
            {navigationItems.map((item) => (
              <a
                key={item.sectionId}
                href={`#${item.sectionId}`}
                className="Header-mobileNavLink"
                onClick={(e) => handleNavItemClick(item.sectionId, e)}
              >
                {item.label}
              </a>
            ))}
            <Link
              to="/admin"
              className="Header-mobileNavLink Header-mobileNavLinkAdmin"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Painel Admin
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
export default Header;
