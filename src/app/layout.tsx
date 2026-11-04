import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://sebasr0311.github.io")),
  title: "Juan Sebastián Rincón Farelo — Desarrollo de Software",
  description: "Portafolio de Juan Sebastián Rincón Farelo. Desarrollo Full Stack, automatización con IA, ingeniería de datos y soluciones SaaS. Valledupar, Colombia.",
  keywords: ["Juan Sebastián Rincón Farelo", "desarrollador de software", "full stack", "portafolio", "Java", "React", "Next.js", "ETL", "Colombia"],
  icons: {
    icon: `${basePath}/favicon.svg`,
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    title: "Juan Sebastián Rincón | Software & Soluciones",
    description: "Desarrollo Full Stack · Automatización · Datos · Cloud",
    images: [{ url: `${basePath}/social-preview.png`, width: 1200, height: 630, alt: "Portafolio de Juan Sebastián Rincón" }]
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
