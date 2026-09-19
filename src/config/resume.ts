export interface ResumeEntry {
  title: string;
  organization: string;
  period: string;
  detail?: string;
}

export const experience: ResumeEntry[] = [
  {
    title: "Técnico en sistemas / Desarrollador de software",
    organization: "Servicios Integrales de Salud del Magdalena",
    period: "Oct 2021 — Actualidad",
  },
];

export const education: ResumeEntry[] = [
  {
    title: "Ingeniería de Sistemas",
    organization: "Universidad Nacional Abierta y a Distancia",
    period: "2022 — Actualidad",
    detail: "8vo semestre",
  },
];
