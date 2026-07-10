import React from "react";
import { useAdminPage } from "./hooks/useAdminPage";
import { AdminConfigCard } from "./components/AdminConfigCard/AdminConfigCard";
import { Button } from "../../shared/components/Button/Button";
import { Trash2, Plus, RefreshCw, Save, CheckCircle, AlertCircle } from "lucide-react";
import "./AdminPage.css";

export function AdminPage() {
  const {
    formData,
    testimonials,
    successMessage,
    errorMessage,
    isSaving,
    handleInputChange,
    handleSaveConfig,
    handleResetForm,
    newAuthor,
    setNewAuthor,
    newDescription,
    setNewDescription,
    handleAddTestimonial,
    handleDeleteTestimonial,
  } = useAdminPage();

  return (
    <div className="AdminPage-container">
      {/* Banner / Header */}
      <div className="AdminPage-hero">
        <div className="AdminPage-heroWrapper">
          <span className="AdminPage-badge">Ambiente de Manutenção</span>
          <h1 className="AdminPage-title">Painel de Configuração do Site</h1>
          <p className="AdminPage-subtitle">
            Altere os textos, contatos e depoimentos em tempo real para visualizar instantaneamente as mudanças no site institucional.
          </p>
        </div>
      </div>

      <div className="AdminPage-content">
        {/* Status Alerts */}
        {successMessage && (
          <div className="AdminPage-alert AdminPage-alertSuccess" role="alert">
            <CheckCircle size={18} />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="AdminPage-alert AdminPage-alertError" role="alert">
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="AdminPage-layout">
          {/* Main settings form */}
          <form onSubmit={handleSaveConfig} className="AdminPage-form">
            <div className="AdminPage-formGrid">
              
              {/* Card 1: Identidade do Profissional */}
              <AdminConfigCard
                title="Identidade da Psicóloga"
                description="Configure as informações de exibição da profissional clínica."
              >
                <div className="AdminPage-field">
                  <label htmlFor="professionalName" className="AdminPage-label">
                    Nome Completo da Profissional (com título)
                  </label>
                  <input
                    type="text"
                    id="professionalName"
                    name="professionalName"
                    value={formData.professionalName}
                    onChange={handleInputChange}
                    className="AdminPage-input"
                    required
                  />
                </div>

                <div className="AdminPage-field">
                  <label htmlFor="primaryColor" className="AdminPage-label">
                    Cor Predominante (Sálvia/Lavanda/Azul)
                  </label>
                  <div className="AdminPage-colorPickerWrapper">
                    <input
                      type="color"
                      id="primaryColorPicker"
                      name="primaryColor"
                      value={formData.primaryColor}
                      onChange={handleInputChange}
                      className="AdminPage-colorInput"
                    />
                    <input
                      type="text"
                      id="primaryColor"
                      name="primaryColor"
                      value={formData.primaryColor}
                      onChange={handleInputChange}
                      className="AdminPage-input AdminPage-inputColorHex"
                      pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                      placeholder="#7d9276"
                      required
                    />
                  </div>
                  <p className="AdminPage-helpText">
                    Esta cor define os botões de ação e os destaques visuais secundários do site.
                  </p>
                </div>
              </AdminConfigCard>

              {/* Card 2: Apresentação */}
              <AdminConfigCard
                title="Seção de Apresentação"
                description="Configure os textos de cabeçalho da home page e a foto estática."
              >
                <div className="AdminPage-field">
                  <label htmlFor="presentationTitle" className="AdminPage-label">
                    Título Principal (H1)
                  </label>
                  <input
                    type="text"
                    id="presentationTitle"
                    name="presentationTitle"
                    value={formData.presentationTitle}
                    onChange={handleInputChange}
                    className="AdminPage-input"
                    required
                  />
                </div>

                <div className="AdminPage-field">
                  <label htmlFor="presentationDescription" className="AdminPage-label">
                    Texto de Apresentação
                  </label>
                  <textarea
                    id="presentationDescription"
                    name="presentationDescription"
                    value={formData.presentationDescription}
                    onChange={handleInputChange}
                    className="AdminPage-textarea"
                    rows={4}
                    required
                  />
                </div>

                <div className="AdminPage-field">
                  <label htmlFor="presentationImageUrl" className="AdminPage-label">
                    Link da Imagem Institucional / Foto
                  </label>
                  <input
                    type="url"
                    id="presentationImageUrl"
                    name="presentationImageUrl"
                    value={formData.presentationImageUrl}
                    onChange={handleInputChange}
                    className="AdminPage-input"
                    placeholder="https://images.unsplash.com/..."
                    required
                  />
                </div>
              </AdminConfigCard>

              {/* Card 3: Dados de Contato e WhatsApp */}
              <AdminConfigCard
                title="Contato & WhatsApp"
                description="Configure o número de telefone e o modelo de mensagem para o agendamento."
              >
                <div className="AdminPage-field">
                  <label htmlFor="whatsappPhone" className="AdminPage-label">
                    Telefone WhatsApp (com DDI e DDD)
                  </label>
                  <input
                    type="text"
                    id="whatsappPhone"
                    name="whatsappPhone"
                    value={formData.whatsappPhone}
                    onChange={handleInputChange}
                    className="AdminPage-input"
                    placeholder="5511999999999"
                    required
                  />
                  <p className="AdminPage-helpText">
                    Insira apenas números, começando com 55 (Brasil) seguido do DDD e o número.
                  </p>
                </div>

                <div className="AdminPage-field">
                  <label htmlFor="whatsappMessage" className="AdminPage-label">
                    Mensagem Padrão de Contato
                  </label>
                  <textarea
                    id="whatsappMessage"
                    name="whatsappMessage"
                    value={formData.whatsappMessage}
                    onChange={handleInputChange}
                    className="AdminPage-textarea"
                    rows={3}
                    required
                  />
                  <p className="AdminPage-helpText">
                    Esta mensagem será pré-preenchida no WhatsApp do paciente ao clicar em agendar.
                  </p>
                </div>
              </AdminConfigCard>
            </div>

            {/* Actions for Main form */}
            <div className="AdminPage-actions">
              <Button
                type="button"
                variant="secondary"
                onClick={handleResetForm}
                disabled={isSaving}
              >
                <RefreshCw size={16} />
                Descartar Alterações
              </Button>
              <Button type="submit" variant="primary" disabled={isSaving}>
                <Save size={16} />
                {isSaving ? "Salvando..." : "Salvar Configurações"}
              </Button>
            </div>
          </form>

          {/* Testimonials Sidebar Manager */}
          <div className="AdminPage-sidebar">
            <AdminConfigCard
              title="Gerenciador de Depoimentos"
              description="Adicione ou remova depoimentos de pacientes exibidos na página principal."
            >
              {/* Form to add testimonial */}
              <form onSubmit={handleAddTestimonial} className="AdminPage-testimonialSubForm">
                <div className="AdminPage-field">
                  <label htmlFor="newAuthor" className="AdminPage-label">
                    Nome ou Iniciais do Autor
                  </label>
                  <input
                    type="text"
                    id="newAuthor"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="AdminPage-input"
                    placeholder="Ex: Amanda R."
                  />
                </div>
                <div className="AdminPage-field">
                  <label htmlFor="newDescription" className="AdminPage-label">
                    Relato do Depoimento
                  </label>
                  <textarea
                    id="newDescription"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="AdminPage-textarea"
                    rows={3}
                    placeholder="Insira o texto do depoimento aqui..."
                  />
                </div>
                <Button type="submit" variant="secondary" size="small" className="AdminPage-btnAddTestimonial">
                  <Plus size={16} />
                  Adicionar Depoimento
                </Button>
              </form>

              {/* List of current testimonials */}
              <div className="AdminPage-testimonialsListWrapper">
                <h4 className="AdminPage-listTitle">Depoimentos Ativos ({testimonials.length})</h4>
                {testimonials.length === 0 ? (
                  <p className="AdminPage-noTestimonials">Nenhum depoimento cadastrado no momento.</p>
                ) : (
                  <ul className="AdminPage-testimonialsList">
                    {testimonials.map((item) => (
                      <li key={item.id} className="AdminPage-testimonialItem">
                        <div className="AdminPage-testimonialItemContent">
                          <span className="AdminPage-testimonialItemAuthor">{item.author}</span>
                          <p className="AdminPage-testimonialItemText">"{item.description}"</p>
                        </div>
                        <button
                          type="button"
                          className="AdminPage-btnDelete"
                          onClick={() => handleDeleteTestimonial(item.id)}
                          aria-label={`Excluir depoimento de ${item.author}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </AdminConfigCard>
          </div>

        </div>
      </div>
    </div>
  );
}
export default AdminPage;
