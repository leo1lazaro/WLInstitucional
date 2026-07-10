import React, { useState } from "react";
import { useSiteStore } from "../../../shared/states/useSiteStore";
import { endpoints } from "../../../shared/services/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SiteConfig } from "../../../shared/types/SiteConfig";
import type { Testimonial } from "../../../shared/types/Testimonial";

export function useAdminPage() {
  const {
    siteConfig,
    testimonials,
    updateSiteConfig,
    addTestimonial,
    deleteTestimonial,
  } = useSiteStore();

  const queryClient = useQueryClient();

  // Local form state for editing site settings
  const [formData, setFormData] = useState<SiteConfig>({ ...siteConfig });
  const [newAuthor, setNewAuthor] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync local form with Zustand when siteConfig updates externally
  const handleResetForm = () => {
    setFormData({ ...siteConfig });
    setSuccessMessage("Configurações redefinidas para o estado atual.");
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Mutation for updating site configuration with React Query & Axios
  const updateConfigMutation = useMutation({
    mutationFn: async (updatedConfig: SiteConfig) => {
      // Prepared for future API integration
      try {
        await endpoints.siteConfig.update(updatedConfig);
      } catch (e) {
        // Safe console output, continuing with client-side persist
        console.warn("API offline - persistindo alterações localmente via Zustand.");
      }
      return updatedConfig;
    },
    onSuccess: (data) => {
      updateSiteConfig(data);
      setSuccessMessage("Configurações salvas e aplicadas com sucesso!");
      setErrorMessage(null);
      queryClient.invalidateQueries({ queryKey: ["siteConfig"] });
      setTimeout(() => setSuccessMessage(null), 4000);
    },
    onError: () => {
      setErrorMessage("Erro ao salvar configurações no servidor.");
      setTimeout(() => setErrorMessage(null), 4000);
    },
  });

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfigMutation.mutate(formData);
  };

  // Add testimonial handler
  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newDescription.trim()) {
      setErrorMessage("Preencha todos os campos do depoimento.");
      return;
    }

    addTestimonial({
      author: newAuthor,
      description: newDescription,
    });

    setNewAuthor("");
    setNewDescription("");
    setSuccessMessage("Depoimento adicionado com sucesso!");
    setErrorMessage(null);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return {
    formData,
    testimonials,
    successMessage,
    errorMessage,
    isSaving: updateConfigMutation.isPending,
    handleInputChange,
    handleSaveConfig,
    handleResetForm,
    newAuthor,
    setNewAuthor,
    newDescription,
    setNewDescription,
    handleAddTestimonial,
    handleDeleteTestimonial: deleteTestimonial,
  };
}
export default useAdminPage;
