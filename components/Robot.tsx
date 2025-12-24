import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RobotState } from '../types';

interface RobotProps {
  state: RobotState;
  onExitComplete?: () => void;
}

const Robot: React.FC<RobotProps> = ({ state, onExitComplete }) => {
  
  // Calculate random entry position whenever isVisible toggles on
  const entryPos = useMemo(() => {
    if (!state.isVisible) return { x: 0, y: 0, opacity: 0 };
    
    const directions = ['top', 'bottom', 'left', 'right'];
    const dir = directions[Math.floor(Math.random() * directions.length)];
    
    // Increased distances slightly to ensure off-screen start
    switch(dir) {
        case 'top': return { y: -1000, x: 0, opacity: 0 };
        case 'bottom': return { y: 1000, x: 0, opacity: 0 };
        case 'left': return { x: -1500, y: 0, opacity: 0 };
        case 'right': return { x: 1500, y: 0, opacity: 0 };
        default: return { x: 1500, y: 0, opacity: 0 };
    }
  }, [state.isVisible]);

  // Calculate random exit position whenever isVisible toggles off
  const exitPos = useMemo(() => {
    // When isVisible becomes false, this recalculates to set the exit prop
    const directions = ['top', 'bottom', 'left', 'right'];
    const dir = directions[Math.floor(Math.random() * directions.length)];
    
    switch(dir) {
        case 'top': return { y: -1000, x: 0, opacity: 1 };
        case 'bottom': return { y: 1000, x: 0, opacity: 1 };
        case 'left': return { x: -1500, y: 0, opacity: 1 };
        case 'right': return { x: 1500, y: 0, opacity: 1 };
        default: return { x: 1500, y: 0, opacity: 1 };
    }
  }, [state.isVisible]);

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {state.isVisible && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          initial={entryPos}
          animate={{ 
            x: 0, 
            y: 0, 
            opacity: 1,
            transition: { type: 'spring', damping: 20, stiffness: 100 } 
          }}
          exit={{ 
            ...exitPos,
            transition: { duration: 0.8, ease: "backIn" } 
          }}
        >
            <div className="relative">
                {/* Speech Bubble */}
                <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="absolute -top-32 left-1/2 -translate-x-1/2 w-80 bg-white/95 text-slate-900 p-4 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.4)] border-2 border-slate-300 text-center font-bold text-lg"
                >
                    {state.message}
                    {/* Bubble tail */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/95 rotate-45 border-r-2 border-b-2 border-slate-300"></div>
                </motion.div>

                {/* The Robot (Sphere) - White Design */}
                <motion.div
                    animate={{ 
                        y: [-15, 15, -15],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                        repeat: Infinity, 
                        duration: 3, 
                        ease: "easeInOut" 
                    }}
                    className="w-32 h-32 rounded-full relative"
                    style={{
                        background: 'radial-gradient(circle at 30% 30%, #ffffff, #94a3b8)',
                        boxShadow: '0 0 50px rgba(255, 255, 255, 0.4), inset 0 0 20px rgba(0,0,0,0.2)'
                    }}
                >
                    {/* Eye Band */}
                    <div className="absolute top-[35%] left-[10%] right-[10%] h-[25%] bg-slate-900 rounded-full flex items-center justify-center gap-4 overflow-hidden shadow-inner border border-slate-700">
                        {/* Eyes */}
                        <motion.div 
                            className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"
                            animate={{ scaleY: [1, 0.1, 1] }}
                            transition={{ repeat: Infinity, delay: 2, repeatDelay: 4, duration: 0.2 }}
                        />
                        <motion.div 
                            className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"
                            animate={{ scaleY: [1, 0.1, 1] }}
                            transition={{ repeat: Infinity, delay: 2, repeatDelay: 4, duration: 0.2 }}
                        />
                    </div>
                    {/* Antennas */}
                    <div className="absolute -top-4 left-1/2 -translate-x-4 w-1 h-6 bg-gray-300 border border-gray-400"></div>
                    <div className="absolute -top-6 left-1/2 -translate-x-4 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_red]"></div>
                </motion.div>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Robot;