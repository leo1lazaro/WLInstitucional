export type NavigationItem = {
  label: string;
  sectionId: string;
};

export const navigationItems: NavigationItem[] = [
  {
    label: "Apresentação",
    sectionId: "presentation",
  },
  {
    label: "Agendamento",
    sectionId: "scheduling",
  },
  {
    label: "Depoimentos",
    sectionId: "testimonials",
  },
];
