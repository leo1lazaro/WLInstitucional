import { create } from "zustand";
import { initialSiteConfig } from "../constants/siteConfig";
import { initialTestimonials } from "../constants/testimonials";
import type { SiteConfig } from "../types/SiteConfig";
import type { Testimonial } from "../types/Testimonial";

interface SiteState {
  siteConfig: SiteConfig;
  testimonials: Testimonial[];
  isLoading: boolean;
  error: string | null;
  updateSiteConfig: (config: Partial<SiteConfig>) => void;
  updateTestimonials: (testimonials: Testimonial[]) => void;
  addTestimonial: (testimonial: Omit<Testimonial, "id">) => void;
  deleteTestimonial: (id: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetConfig: () => void;
}

export const useSiteStore = create<SiteState>((set) => ({
  siteConfig: initialSiteConfig,
  testimonials: initialTestimonials,
  isLoading: false,
  error: null,
  updateSiteConfig: (config) =>
    set((state) => ({
      siteConfig: { ...state.siteConfig, ...config },
    })),
  updateTestimonials: (testimonials) =>
    set({ testimonials }),
  addTestimonial: (newTestimonial) =>
    set((state) => {
      const nextId = state.testimonials.length > 0 ? Math.max(...state.testimonials.map(t => t.id)) + 1 : 1;
      return {
        testimonials: [...state.testimonials, { ...newTestimonial, id: nextId }],
      };
    }),
  deleteTestimonial: (id) =>
    set((state) => ({
      testimonials: state.testimonials.filter((t) => t.id !== id),
    })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  resetConfig: () =>
    set({
      siteConfig: initialSiteConfig,
      testimonials: initialTestimonials,
    }),
}));
