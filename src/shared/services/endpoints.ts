import { api } from "./api";
import type { ApiResponse } from "../types/ApiResponse";
import type { Testimonial } from "../types/Testimonial";
import type { SiteConfig } from "../types/SiteConfig";

export const endpoints = {
  siteConfig: {
    get: () => api.get<ApiResponse<SiteConfig>>("/site-config"),
    update: (data: SiteConfig) =>
      api.post<ApiResponse<SiteConfig>>("/site-config", data),
  },

  testimonials: {
    list: () => api.get<ApiResponse<Testimonial[]>>("/testimonials"),
    create: (data: Testimonial) =>
      api.post<ApiResponse<Testimonial>>("/testimonials", data),
  },
};
