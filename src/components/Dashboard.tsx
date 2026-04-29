import React from 'react';
import { DashboardData } from '../types';
import Sidebar from './Sidebar';
import BarChart from './BarChart';
import DonutChart from './DonutChart';
import {
  Star,
  CheckCheck,
  Heart,
  Zap,
  Clock,
  Search,
  PlusCircle,
  XCircle,
  TrendingUp,
  Award,
  Calendar
} from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardProps {
  data: DashboardData;
  onLogout: () => void;
}

const iconMap: Record<string, any> = {
  "PEC": Star,
  "PENC": CheckCheck,
  "Satisfacción": Heart,
  "Productividad": Zap,
  "Adherencia": Clock,
  "Auditorías": Search,
  "PQRSF Creados": PlusCircle,
  "PQRSF Devueltos": XCircle
};

export default function Dashboard({ data, onLogout }: DashboardProps) {
  const pqrsfCre = data.metrics.find((m) => m.label === "PQRSF Creados");
  const pqrsfDev = data.metrics.find((m) => m.label === "PQRSF Devueltos");

  const meta = 150000;
  const pctBono = Math.max(0, Math.min(100, (data.bonoGanado / meta) * 100));

  return (
    <div className="min-h-screen bg-dashboard-bg flex p-6 gap-6">
      <Sidebar onLogout={onLogout} />

      <main className="flex-1 ml-[304px] space-y-6">
        {/* Header */}
        <header className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-4xl font-black text-primary tracking-tight">
              Hola, {data.nombre || data.asesor}
            </h2>
            <p className="text-slate-500 font-semibold flex items-center gap-2 mt-1">
              <Award className="w-4 h-4 text-accent" />
              {data.area || "Sin área asignada"}
            </p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-card flex items-center gap-3">
            <Calendar className="w-5 h-5 text-primary/40" />
            <span className="font-bold text-primary">{new Date().toLocaleDateString('es-CO', { month: 'long', year: 'numeric' }).toUpperCase()}</span>
          </div>
        </header>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.metrics.map((m, idx) => {
            const Icon = iconMap[m.label] || TrendingUp;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white p-6 rounded-dashboard shadow-card flex items-center gap-5 group hover:shadow-premium transition-all"
              >
                <div className="w-14 h-14 bg-accent/10 text-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{m.label}</p>
                  <p className="text-2xl font-black text-primary">{m.value}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bonus Progress */}
        <div className="bg-white p-8 rounded-dashboard shadow-card relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h3 className="text-lg font-black text-primary uppercase tracking-tight">Progreso del Bono</h3>
                <p className="text-slate-500 font-medium">Meta mensual alcanzada</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-black text-primary">${data.bonoGanado.toLocaleString("es-CO")}</span>
                <span className="text-slate-400 font-bold ml-2">/ ${meta.toLocaleString("es-CO")}</span>
              </div>
            </div>
            <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pctBono}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full shadow-[0_0_20px_rgba(185,226,43,0.4)]"
              />
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-8 rounded-dashboard shadow-card min-h-[400px] flex flex-col">
            <h3 className="text-lg font-black text-primary uppercase tracking-tight mb-6">Desempeño de Calidad</h3>
            <div className="flex-1 min-h-[300px]">
              <BarChart metrics={data.metrics} />
            </div>
          </div>

          {(pqrsfCre || pqrsfDev) && (
            <div className="bg-white p-8 rounded-dashboard shadow-card flex flex-col items-center">
              <h3 className="text-lg font-black text-primary uppercase tracking-tight mb-6 w-full">Resumen PQRSF</h3>
              <div className="flex-1 w-full relative min-h-[250px]">
                <DonutChart
                    created={Number(pqrsfCre?.value || 0)}
                    returned={Number(pqrsfDev?.value || 0)}
                />
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        {data.tablaData.length > 0 && (
          <div className="bg-white rounded-dashboard shadow-card overflow-hidden">
            <div className="p-8 border-b border-slate-50">
                <h3 className="text-lg font-black text-primary uppercase tracking-tight">Últimas Auditorías</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-8 py-5 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Fecha</th>
                    <th className="px-8 py-5 text-left text-xs font-black text-slate-400 uppercase tracking-widest">ID Gestión</th>
                    <th className="px-8 py-5 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Tipo</th>
                    <th className="px-8 py-5 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Evaluador</th>
                    <th className="px-8 py-5 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Puntos de Mejora</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {data.tablaData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-8 py-5">
                        <p className="font-bold text-primary">{row.fecha}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{row.mes}</p>
                      </td>
                      <td className="px-8 py-5 font-bold text-slate-600">{row.idGestion}</td>
                      <td className="px-8 py-5">
                        <span className="px-3 py-1 bg-primary/5 text-primary rounded-full text-xs font-bold">
                            {row.tipoGestion}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-slate-600 font-medium">{row.evaluador}</td>
                      <td className="px-8 py-5 text-slate-500 text-sm italic">"{row.puntosMejora}"</td>
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
