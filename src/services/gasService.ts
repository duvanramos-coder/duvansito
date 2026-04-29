import { DashboardData } from '../types';

declare global {
  interface Window {
    google: any;
  }
}

const isLocal = !window.google || !window.google.script;

export const gasService = {
  obtenerUsuarios(): Promise<string[]> {
    if (isLocal) {
      return Promise.resolve(['Asesor Demo 1', 'Asesor Demo 2', 'Jules Engineer']);
    }
    return new Promise((resolve, reject) => {
      window.google.script.run
        .withSuccessHandler(resolve)
        .withFailureHandler(reject)
        .obtenerUsuarios();
    });
  },

  login(usuario: string, password: string): Promise<DashboardData | 'ERROR'> {
    if (isLocal) {
      if (password === '1234') {
        return Promise.resolve({
          asesor: usuario,
          nombre: usuario.toUpperCase(),
          area: 'Linea amiga - Caja',
          metrics: [
            { label: 'Satisfacción', value: '95.5%' },
            { label: 'PEC', value: '88.0%' },
            { label: 'PENC', value: '12.0%' },
            { label: 'Productividad', value: '102%' },
            { label: 'Adherencia', value: '98%' },
            { label: 'PQRSF Creados', value: 15 },
            { label: 'PQRSF Devueltos', value: 2 },
            { label: 'Auditorías', value: 45 }
          ],
          tablaData: [
            {
              fecha: '10-02-2025 14:30',
              mes: 'Febrero',
              asesor: usuario,
              canal: 'Telefónico',
              tipoGestion: 'Consulta',
              idGestion: 'GES-12345',
              evaluador: 'Admin',
              puntosMejora: 'Ninguno, excelente atención.'
            },
            {
              fecha: '09-02-2025 10:15',
              mes: 'Febrero',
              asesor: usuario,
              canal: 'Chat',
              tipoGestion: 'Reclamo',
              idGestion: 'GES-12346',
              evaluador: 'Admin',
              puntosMejora: 'Mejorar tiempo de respuesta inicial.'
            }
          ],
          bonoGanado: 125000
        });
      }
      return Promise.resolve('ERROR');
    }
    return new Promise((resolve, reject) => {
      window.google.script.run
        .withSuccessHandler(resolve)
        .withFailureHandler(reject)
        .login(usuario, password);
    });
  }
};
