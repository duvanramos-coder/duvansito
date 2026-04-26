import { Mail, Lock, Eye, ArrowRight, Github } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center px-8 bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(rgba(18, 20, 20, 0.8), rgba(18, 20, 20, 0.95)), url("https://images.unsplash.com/photo-1514525253344-981c1cad96ee?q=80&w=1000&auto=format&fit=crop")' }}>
      <div className="text-center mb-12">
        <h1 className="font-display text-5xl font-black italic text-parche-purple tracking-tighter mb-2 drop-shadow-[0_0_10px_rgba(157,0,255,0.8)]">
          PARCHE
        </h1>
        <p className="text-gray-400 font-medium">Siente el ritmo urbano. Únete al pulso.</p>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass w-full rounded-[32px] p-8 shadow-2xl relative overflow-hidden"
      >
        <h2 className="font-display text-2xl font-bold mb-8">Bienvenido de nuevo</h2>
        
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-400 ml-1">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="email" 
                placeholder="nombre@ejemplo.com"
                className="w-full bg-white/5 border-none rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:ring-1 focus:ring-parche-purple transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-bold text-gray-400">Contraseña</label>
              <button className="text-[10px] font-bold text-parche-purple">¿Olvidaste?</button>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-white/5 border-none rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-gray-600 focus:ring-1 focus:ring-parche-purple transition-all outline-none"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>

          <button 
            onClick={onLogin}
            className="w-full bg-parche-purple hover:bg-parche-purple/90 text-white font-bold py-4 rounded-2xl mt-6 transition-all active:scale-95 flex items-center justify-center gap-2 neon-shadow-purple group"
          >
            <span>Entrar</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="flex items-center gap-3 my-8">
          <div className="h-[1px] flex-1 bg-white/10"></div>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">O vibra con</span>
          <div className="h-[1px] flex-1 bg-white/10"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-3 rounded-2xl hover:bg-white/10 transition-all font-bold text-sm">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" className="w-4 h-4" alt="Google" />
            Google
          </button>
          <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-3 rounded-2xl hover:bg-white/10 transition-all font-bold text-sm">
            <Github className="w-4 h-4" />
            GitHub
          </button>
        </div>
      </motion.div>

      <p className="mt-8 text-gray-400 text-sm font-medium">
        ¿No tienes cuenta? <button className="text-parche-purple font-bold">Únete al club</button>
      </p>
    </div>
  );
}
