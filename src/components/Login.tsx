import React, { useState, useEffect } from 'react';
import { gasService } from '../services/gasService';
import { DashboardData } from '../types';
import { LogIn, User, Lock, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginProps {
  onLoginSuccess: (data: DashboardData) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [usuarios, setUsuarios] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    gasService.obtenerUsuarios().then(setUsuarios);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !password) return;

    setLoading(true);
    setError(false);
    try {
      const data = await gasService.login(selectedUser, password);
      if (data === 'ERROR') {
        setError(true);
      } else {
        onLoginSuccess(data);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dashboard-bg p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-dashboard shadow-premium p-10 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-accent" />
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-primary tracking-tight">PEOPLE BPO</h1>
          <p className="text-slate-400 mt-2 font-medium">Inicia sesión en el panel premium</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-primary/60 uppercase tracking-wider ml-1">Usuario</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
              <select
                id="usuario"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-dashboard-bg border-none rounded-2xl focus:ring-2 focus:ring-accent transition-all appearance-none text-primary font-medium"
                required
              >
                <option value="">Selecciona un usuario</option>
                {usuarios.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-primary/60 uppercase tracking-wider ml-1">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="········"
                className="w-full pl-12 pr-4 py-4 bg-dashboard-bg border-none rounded-2xl focus:ring-2 focus:ring-accent transition-all text-primary font-medium"
                required
              />
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-red-500 text-sm font-semibold text-center"
            >
              Usuario o contraseña incorrectos
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent hover:brightness-95 text-primary font-bold py-4 rounded-2xl shadow-lg shadow-accent/20 transition-all flex items-center justify-center gap-2 group"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                INGRESAR
                <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="mt-10 text-center text-[10px] text-slate-400 font-bold tracking-widest uppercase">
          V4.0 PREMIUM EXPERIENCE
        </p>
      </motion.div>
    </div>
  );
}
