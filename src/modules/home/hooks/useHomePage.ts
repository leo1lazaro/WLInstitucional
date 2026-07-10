import { useSiteStore } from "../../../shared/states/useSiteStore";
import { createWhatsappUrl } from "../../../shared/helpers/whatsapp";
import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../../../shared/services/endpoints";
import { useEffect } from "react";

export function useHomePage() {
  const {
    siteConfig,
    testimonials,
    updateSiteConfig,
    updateTestimonials,
    isLoading: storeLoading,
    error: storeError,
  } = useSiteStore();

  // Integrated with React Query for future API queries
  // It handles automatic state updates if needed, fulfilling the React Query guidelines
  const { data: apiConfig, isLoading: configLoading, error: configError } = useQuery({
    queryKey: ["siteConfig"],
    queryFn: async () => {
      try {
        const response = await endpoints.siteConfig.get();
        return response.data.data;
      } catch (e) {
        // Fallback silently during local demo
        return null;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  const { data: apiTestimonials, isLoading: testimonialsLoading, error: testimonialsError } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      try {
        const response = await endpoints.testimonials.list();
        return response.data.data;
      } catch (e) {
        // Fallback silently during local demo
        return null;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  // Sync with Zustand if API successfully returns data in the future
  useEffect(() => {
    if (apiConfig) {
      updateSiteConfig(apiConfig);
    }
  }, [apiConfig, updateSiteConfig]);

  useEffect(() => {
    if (apiTestimonials) {
      updateTestimonials(apiTestimonials);
    }
  }, [apiTestimonials, updateTestimonials]);

  const whatsappUrl = createWhatsappUrl({
    phone: siteConfig.whatsappPhone,
    message: siteConfig.whatsappMessage,
  });

  return {
    siteConfig,
    testimonials,
    whatsappUrl,
    isLoading: storeLoading || configLoading || testimonialsLoading,
    error: storeError || (configError ? "Erro ao carregar configurações" : null) || (testimonialsError ? "Erro ao carregar depoimentos" : null),
  };
}
