/** Navegación principal del sitio (cabecera, menú del celular y pie). */
export const MAIN_NAV = [
  { href: "/quienes-somos", label: "Quiénes somos" },
  { href: "/especialidades", label: "Especialidades" },
  { href: "/guias", label: "Guías para pacientes" },
] as const;

/** Lo que el paciente con brackets busca con prisa (barra fija en las guías). */
export const QUICK_LINKS = [
  { href: "/guias/urgencias", label: "Urgencias" },
  { href: "/guias/alimentos", label: "Alimentos" },
  { href: "/guias/cepillado", label: "Cepillado" },
] as const;

export function isCurrent(pathname: string, href: string): boolean {
  const path = pathname.replace(/\/$/, "") || "/";
  return path === href || path.startsWith(`${href}/`);
}
