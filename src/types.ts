export interface Metric {
  label: string;
  value: string | number;
}

export interface AuditData {
  fecha: string;
  mes: string;
  asesor: string;
  canal: string;
  tipoGestion: string;
  idGestion: string;
  evaluador: string;
  puntosMejora: string;
}

export interface DashboardData {
  asesor: string;
  nombre?: string;
  area: string;
  metrics: Metric[];
  tablaData: AuditData[];
  bonoGanado: number;
}

export type Screen = 'login' | 'dashboard';
