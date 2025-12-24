import { ReactNode } from "react";

export interface RobotConfig {
  message: ReactNode;
  direction: 'top' | 'bottom' | 'left' | 'right';
}

export interface SlideData {
  id: string;
  x: number;
  y: number;
  z: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  scale?: number;
  content: ReactNode;
  className?: string;
  robot?: RobotConfig; // New configuration for robot on this slide
}

export type RobotMood = 'normal' | 'happy' | 'serious';

export interface RobotState {
  isVisible: boolean;
  message: ReactNode;
  entryDirection: 'top' | 'bottom' | 'left' | 'right';
}