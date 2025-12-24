import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SLIDES } from '../data/slides';
import Robot from './Robot';
import { RobotState } from '../types';

type InteractionState = 'slide-only' | 'robot-entering' | 'robot-visible' | 'robot-exiting';

const Presentation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Interaction State Machine
  // slide-only: Normal slide view. Next click triggers robot (if exists) or next slide.
  // robot-visible: Robot is showing. Next click triggers exit.
  const [interactionState, setInteractionState] = useState<InteractionState>('slide-only');

  const [robotState, setRobotState] = useState<RobotState>({
    isVisible: false,
    message: null,
    entryDirection: 'right'
  });

  const activeSlide = SLIDES[currentStep];

  // Reset interaction state when slide changes
  useEffect(() => {
    setInteractionState('slide-only');
    setRobotState(prev => ({ ...prev, isVisible: false }));
  }, [currentStep]);

  const handleRobotExitComplete = () => {
    // Animation finished
  };

  // Central Navigation Handler
  const handleInteraction = useCallback(() => {
    
    // Case 1: Robot is visible -> Click to Dismiss
    if (interactionState === 'robot-visible') {
        setInteractionState('robot-exiting'); // This is a transient state primarily for logic
        setRobotState(prev => ({ ...prev, isVisible: false })); // Triggers Exit Animation
        
        // We stay on this slide but robot is gone. 
        // We set state back to slide-only but mark robot as 'done' effectively?
        // Simpler: Just go back to slide-only, BUT we need to know we've already shown the robot so we don't show it again.
        // However, the prompt implies a linear flow: Click(Show) -> Click(Hide) -> Click(Next).
        // So we need a state 'robot-done'.
        setInteractionState('robot-exiting'); 
        return; 
    }

    // Case 2: Robot just exited (or is exiting) -> Next Slide
    if (interactionState === 'robot-exiting') {
        // Move to next slide
        if (currentStep < SLIDES.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
        return;
    }

    // Case 3: Slide Only (Fresh slide)
    if (interactionState === 'slide-only') {
        // Does this slide have a robot?
        if (activeSlide.robot) {
            // Yes -> Show Robot
            setRobotState({
                isVisible: true,
                message: activeSlide.robot.message,
                entryDirection: activeSlide.robot.direction
            });
            setInteractionState('robot-visible');
        } else {
            // No Robot -> Next Slide
            if (currentStep < SLIDES.length - 1) {
                setCurrentStep(prev => prev + 1);
            }
        }
    }

  }, [interactionState, currentStep, activeSlide.robot]);


  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        handleInteraction();
      } else if (e.key === 'ArrowLeft') {
         // Prev step logic simpler for now: just go back slide
         if (currentStep > 0) setCurrentStep(prev => prev - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInteraction, currentStep]);


  // Impress.js Style Canvas Transform
  const worldScale = activeSlide.scale ? 1 / activeSlide.scale : 1;
  const worldTransform = `scale(${worldScale}) rotateZ(${-activeSlide.rotateZ || 0}deg) rotateY(${-activeSlide.rotateY || 0}deg) rotateX(${-activeSlide.rotateX || 0}deg) translate3d(${-activeSlide.x}px, ${-activeSlide.y}px, ${-activeSlide.z}px)`;

  return (
    <div 
        className="w-screen h-screen overflow-hidden bg-slate-900 relative cursor-pointer"
        onClick={handleInteraction}
    >
      {/* Background/Stars */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>

      {/* Robot Overlay */}
      <Robot state={robotState} onExitComplete={handleRobotExitComplete} />

      {/* 3D Viewport - Relative container */}
      <div className="perspective-viewport relative w-full h-full overflow-hidden">
        
        {/* The World - Absolute Center */}
        <motion.div
          className="absolute top-1/2 left-1/2 preserve-3d will-change-transform w-0 h-0"
          initial={false}
          animate={{
            transform: worldTransform
          }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.1, 0.25, 1.0], 
          }}
        >
          {/* Render All Slides */}
          {SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute left-0 top-0 preserve-3d flex items-center justify-center w-[1000px] h-[700px] -ml-[500px] -mt-[350px] p-8 ${slide.className || ''}`}
              style={{
                transform: `
                  translate3d(${slide.x}px, ${slide.y}px, ${slide.z}px)
                  rotateX(${slide.rotateX || 0}deg)
                  rotateY(${slide.rotateY || 0}deg)
                  rotateZ(${slide.rotateZ || 0}deg)
                  scale(${slide.scale || 1})
                `,
                pointerEvents: 'none'
              }}
            >
              <motion.div 
                className="w-full h-full flex flex-col justify-center items-center"
                animate={{ opacity: index === currentStep ? 1 : 0.3 }}
                transition={{ duration: 0.8 }}
              >
                 {slide.content}
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Hint */}
      <div className="fixed bottom-8 right-8 text-white/30 text-sm font-mono z-50 pointer-events-none">
        Click or Space to Interact | Slide {currentStep + 1} / {SLIDES.length}
      </div>
    </div>
  );
};

export default Presentation;