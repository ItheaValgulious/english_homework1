import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Presentation from './components/Presentation';
import { Play } from 'lucide-react';

const App: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!hasStarted && (
          <motion.div 
            className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center cursor-pointer overflow-hidden"
            onClick={() => setHasStarted(true)}
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(20px)', transition: { duration: 0.8 } }}
          >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-slate-900/20" />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center z-10 p-12 border border-white/10 rounded-2xl backdrop-blur-sm bg-white/5 shadow-2xl hover:bg-white/10 transition-colors"
            >
              <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight">
                Memory<span className="text-blue-500">Bank</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 mb-12 font-light">
                Enhancing Large Language Models with Long-Term Memory
              </p>
              
              <div className="inline-flex items-center gap-4 text-blue-400 text-xl font-bold uppercase tracking-widest animate-pulse">
                <Play className="w-6 h-6 fill-current" />
                Click to Start
              </div>
            </motion.div>

            {/* Decorative circles */}
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-[800px] h-[800px] border border-white/5 rounded-full border-dashed"
            />
             <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute w-[600px] h-[600px] border border-white/5 rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Presentation Load */}
      {hasStarted && <Presentation />}
    </>
  );
};

export default App;
