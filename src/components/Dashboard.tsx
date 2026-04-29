import React from 'react';
import { DashboardData } from '../types';
import Sidebar from './Sidebar';
import BarChart from './BarChart';
import {
  Search,
  ChevronDown,
  TrendingUp,
  Activity,
  Award,
  BarChart3,
  CheckCircle2
} from 'lucide-react';

interface DashboardProps {
  data: DashboardData;
  onLogout: () => void;
}

export default function Dashboard({ data, onLogout }: DashboardProps) {
  // Helper to find a metric by label (case insensitive)
  const findMetric = (labels: string[]) => {
    return data.metrics.find(m => labels.some(l => m.label.toLowerCase().includes(l.toLowerCase())));
  };

  // Map real data to "Crush SaaS" slots with domain-specific labels
  const productivity = findMetric(['Productividad', 'Radicados']) || { label: 'Productividad', value: '0%' };
  const satisfaction = findMetric(['Satisfacción', 'Calidad']) || { label: 'Satisfacción', value: '0%' };
  const quality = findMetric(['PEC']) || { label: 'PEC', value: '0%' };
  const adherence = findMetric(['Adherencia']) || { label: 'Adherencia', value: '0%' };

  // For the "Analysis" block, we can use Auditorías and PQRSF if they exist
  const audits = findMetric(['Auditorías']) || { label: 'Auditorías', value: '0' };
  const pqrsf = findMetric(['PQRSF Creados', 'SNC Recibidos']) || { label: 'PQRSF/SNC', value: '0' };
  const errors = findMetric(['PENC', 'Error de Respuesta']) || { label: 'Errores', value: '0%' };

  return (
    <div className="min-h-screen bg-dashboard-bg flex p-6 gap-6">
      <Sidebar onLogout={onLogout} />

      <main className="flex-1 ml-[304px] space-y-8">
        {/* Header */}
        <header className="flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-black text-primary tracking-tight">Desempeño</h2>
            <p className="text-slate-400 font-bold text-sm mt-1">Panel de Control de Operaciones</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group hidden xl:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input
                type="text"
                placeholder="Buscar información..."
                className="pl-12 pr-4 py-3 bg-white rounded-2xl text-sm font-bold border-none focus:ring-2 focus:ring-accent transition-all outline-none shadow-sm w-64"
              />
            </div>

            <div className="flex items-center gap-3 bg-white p-1 pr-6 rounded-full shadow-sm border border-slate-50">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${data.nombre || 'User'}`}
                alt="Avatar"
                className="w-11 h-11 rounded-full bg-slate-100"
              />
              <div>
                <p className="text-xs font-black text-primary leading-none uppercase tracking-wide">{data.nombre || data.asesor}</p>
                <p className="text-[10px] text-slate-400 font-bold mt-1.5">{data.area || 'Especialista BPO'}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-300 ml-2" />
            </div>
          </div>
        </header>

        {/* Top Section: Primary Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Performance Card */}
          <div className="lg:col-span-3 bg-white p-9 rounded-dashboard shadow-card relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <BarChart3 className="w-12 h-12 text-primary" />
            </div>
            <p className="text-sm font-bold text-slate-400 mb-8">{productivity.label}</p>
            <div className="flex items-end gap-3">
              <h3 className="text-6xl font-black text-primary leading-none tracking-tighter">{productivity.value}</h3>
              <span className="mb-2 px-2.5 py-1.5 bg-teal-50 text-teal-500 text-[10px] font-black rounded-xl flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> Meta
              </span>
            </div>
            <p className="text-[10px] text-slate-300 font-black mt-6 uppercase tracking-[0.2em]">Rendimiento Actual</p>
          </div>

          {/* Detailed Analysis Block */}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-9 rounded-dashboard shadow-card">
                <p className="text-sm font-bold text-slate-400 mb-8">Análisis Operativo</p>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-orange-400 shadow-sm" />
                        <span className="text-xs font-bold text-slate-400 tracking-tight">{audits.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-teal-400 shadow-sm" />
                        <span className="text-xs font-bold text-slate-400 tracking-tight">{pqrsf.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-sm" />
                        <span className="text-xs font-bold text-slate-400 tracking-tight">{errors.label}</span>
                    </div>
                </div>
            </div>

            <div className="bg-orange-50/50 p-9 rounded-dashboard border border-orange-100/50 flex flex-col items-center justify-center text-center">
                <h3 className="text-6xl font-black text-orange-500 tracking-tighter leading-none">{audits.value}</h3>
                <p className="px-4 py-1.5 bg-orange-100/80 text-orange-600 text-[9px] font-black rounded-xl mt-6 uppercase tracking-widest">{audits.label}</p>
            </div>

            <div className="bg-teal-50/50 p-9 rounded-dashboard border border-teal-100/50 flex flex-col items-center justify-center text-center">
                <h3 className="text-6xl font-black text-teal-500 tracking-tighter leading-none">{pqrsf.value}</h3>
                <p className="px-4 py-1.5 bg-teal-100/80 text-teal-600 text-[9px] font-black rounded-xl mt-6 uppercase tracking-widest">PQRSF/Gestión</p>
            </div>

            <div className="bg-blue-50/50 p-9 rounded-dashboard border border-blue-100/50 flex flex-col items-center justify-center text-center">
                <h3 className="text-6xl font-black text-blue-500 tracking-tighter leading-none">{errors.value}</h3>
                <p className="px-4 py-1.5 bg-blue-100/80 text-blue-600 text-[9px] font-black rounded-xl mt-6 uppercase tracking-widest">{errors.label}</p>
            </div>
          </div>
        </div>

        {/* Middle Section: Comparison Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-10 rounded-dashboard shadow-card flex flex-col min-h-[420px]">
            <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 rounded-xl">
                        <Activity className="w-5 h-5 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-black text-primary tracking-tight">Métricas de Calidad</h3>
                </div>
                <div className="px-4 py-2 bg-slate-50 text-slate-400 text-[10px] font-black rounded-xl flex items-center gap-2 cursor-pointer hover:bg-slate-100 transition-colors">
                    Mes Actual <ChevronDown className="w-3.5 h-3.5" />
                </div>
            </div>
            <div className="flex-1">
                <BarChart metrics={data.metrics} />
            </div>
          </div>

          <div className="bg-white p-10 rounded-dashboard shadow-card flex flex-col min-h-[420px]">
            <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-accent/10 rounded-xl">
                        <Award className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-xl font-black text-primary tracking-tight">Rendimiento Operativo</h3>
                </div>
                <div className="px-4 py-2 bg-slate-50 text-slate-400 text-[10px] font-black rounded-xl flex items-center gap-2 cursor-pointer hover:bg-slate-100 transition-colors">
                    Mes Actual <ChevronDown className="w-3.5 h-3.5" />
                </div>
            </div>
            <div className="flex-1">
                <BarChart metrics={data.metrics} />
            </div>
          </div>
        </div>

        {/* Bottom Section: Progress & Activities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6">
             {/* Bono Card */}
             <div className="bg-white p-10 rounded-dashboard shadow-card">
                <p className="text-sm font-bold text-slate-400 mb-8">Bono Ganado</p>
                <div className="flex items-end gap-3 mb-10">
                    <h3 className="text-5xl font-black text-primary tracking-tighter">${(data.bonoGanado || 0).toLocaleString()}</h3>
                    <span className="mb-2 px-2.5 py-1.5 bg-teal-50 text-teal-500 text-[10px] font-black rounded-xl flex items-center gap-1 shadow-sm border border-teal-100/50">
                        <TrendingUp className="w-3.5 h-3.5" /> Meta
                    </span>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-black tracking-widest">
                        <span className="text-slate-300 uppercase">Meta Mensual</span>
                        <span className="text-primary tracking-normal">${(150000).toLocaleString()}</span>
                    </div>
                    <div className="h-2.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100/50">
                        <div
                          className="h-full bg-accent rounded-full transition-all duration-1000 shadow-lg shadow-accent/20"
                          style={{ width: `${Math.min(100, ((data.bonoGanado || 0) / 150000) * 100)}%` }}
                        />
                    </div>
                </div>
             </div>

             {/* Quality Circle */}
             <div className="bg-white p-10 rounded-dashboard shadow-card flex flex-col items-center">
                <p className="text-sm font-bold text-slate-400 mb-8 w-full text-left">Satisfacción Cliente</p>
                <div className="relative w-44 h-44">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" className="stroke-slate-50" strokeWidth="3" />
                        <circle
                          cx="18" cy="18" r="16" fill="none" className="stroke-accent" strokeWidth="3"
                          strokeDasharray="100"
                          strokeDashoffset={100 - (Number(String(satisfaction.value).replace('%', '')) || 0)}
                          strokeLinecap="round"
                          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-black text-primary tracking-tighter">{satisfaction.value}</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{satisfaction.label}</span>
                    </div>
                </div>
                <div className="flex gap-6 mt-8">
                    <div className="flex items-center gap-2.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-100 shadow-sm" />
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">Meta</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-sm" />
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">Actual</span>
                    </div>
                </div>
             </div>

             {/* Recent Activities */}
             <div className="bg-white p-10 rounded-dashboard shadow-card">
                <div className="flex items-center justify-between mb-8">
                    <p className="text-sm font-bold text-slate-400">Últimas Auditorías</p>
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                </div>
                <div className="space-y-6">
                    {data.tablaData.slice(0, 5).map((item, i) => (
                        <div key={i} className="flex items-center gap-5 group cursor-default">
                            <span className="text-[10px] font-black text-slate-400 w-14 leading-tight group-hover:text-primary transition-colors">{item.fecha.split(' ')[0]}</span>
                            <div className="flex-1 h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100/50">
                                <div
                                    className="h-full bg-accent rounded-full opacity-80 group-hover:opacity-100 transition-opacity"
                                    style={{ width: `${Math.random() * 40 + 40}%` }}
                                />
                            </div>
                        </div>
                    ))}
                    {data.tablaData.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-10 opacity-20">
                            <p className="text-sm font-black italic">No hay auditorías recientes</p>
                        </div>
                    )}
                </div>
             </div>
        </div>

        {/* Audit Table */}
        {data.tablaData.length > 0 && (
          <div className="bg-white rounded-dashboard shadow-card overflow-hidden mb-12">
            <div className="p-10 border-b border-slate-50 flex justify-between items-center">
              <h3 className="text-xl font-black text-primary tracking-tight">Registro de Auditorías</h3>
              <div className="flex gap-4">
                <div className="px-5 py-2 bg-slate-50 text-slate-500 text-[10px] font-black rounded-xl border border-slate-100">
                    Exportar CSV
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/30">
                    <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Fecha</th>
                    <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ID Gestión</th>
                    <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Canal</th>
                    <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Evaluador</th>
                    <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Puntos Mejora</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {data.tablaData.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-10 py-6 text-xs font-black text-primary">{row.fecha}</td>
                      <td className="px-10 py-6 text-xs font-bold text-slate-500">{row.idGestion}</td>
                      <td className="px-10 py-6">
                        <span className="px-3 py-1.5 bg-blue-50 text-blue-500 text-[9px] font-black rounded-lg uppercase tracking-widest">{row.canal}</span>
                      </td>
                      <td className="px-10 py-6 text-xs font-black text-primary">{row.evaluador}</td>
                      <td className="px-10 py-6 text-xs font-bold text-slate-400 max-w-sm">
                        <div className="line-clamp-2" title={row.puntosMejora}>
                            {row.puntosMejora}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
