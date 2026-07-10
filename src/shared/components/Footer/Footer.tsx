import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Heart, Send } from "lucide-react";
import { useScrollToSection } from "../../hooks/useScrollToSection";
import { useSiteStore } from "../../states/useSiteStore";
import { navigationItems } from "../../constants/navigation";
import { createWhatsappUrl } from "../../helpers/whatsapp";
import "./Footer.css";

export function Footer() {
  const { siteConfig } = useSiteStore();
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollToSection } = useScrollToSection();
  
  const currentYear = new Date().getFullYear();
  const isHome = location.pathname === "/";

  const handleNavItemClick = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (isHome) {
      scrollToSection(sectionId);
    } else {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    }
  };

  const whatsappLink = createWhatsappUrl({
    phone: siteConfig.whatsappPhone,
    message: siteConfig.whatsappMessage,
  });

  return (
    <footer className="Footer-container">
      <div className="Footer-wrapper">
        <div className="Footer-grid">
          {/* Brand/About section */}
          <div className="Footer-brandBlock">
            <div className="Footer-brandLogo">
              <Heart className="Footer-brandIcon" size={18} />
              <span className="Footer-brandName">{siteConfig.professionalName}</span>
            </div>
            <p className="Footer-brandTagline">
              Atendimento psicológico acolhedor, humanizado e pautado na ética profissional para promover saúde mental e bem-estar emocional.
            </p>
            <span className="Footer-crp">CRP: 06/123456 (Exemplo de Registro)</span>
          </div>

          {/* Quick links */}
          <div className="Footer-navBlock">
            <h3 className="Footer-sectionTitle">Links Rápidos</h3>
            <ul className="Footer-navLinksList">
              {navigationItems.map((item) => (
                <li key={item.sectionId} className="Footer-navLinkItem">
                  <a
                    href={`#${item.sectionId}`}
                    onClick={(e) => handleNavItemClick(item.sectionId, e)}
                    className="Footer-navLink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="Footer-navLinkItem">
                <Link to="/admin" className="Footer-navLink">
                  Painel Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact action block */}
          <div className="Footer-contactBlock">
            <h3 className="Footer-sectionTitle">Agendamento</h3>
            <p className="Footer-contactText">
              Dúvidas ou agendamentos? Inicie uma conversa diretamente no WhatsApp. Atendimento online e presencial.
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="Footer-whatsappButton"
            >
              <Send size={16} />
              Enviar Mensagem
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="Footer-bottomBar">
          <p className="Footer-copyright">
            &copy; {currentYear} {siteConfig.professionalName}. Todos os direitos reservados.
          </p>
          <div className="Footer-credit">
            Psicoterapia com Ética, Acolhimento e Sigilo Profissional.
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
