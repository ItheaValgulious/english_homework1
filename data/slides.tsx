import React from 'react';
import { SlideData } from '../types';

// Images are referenced from the project root
const imgGirlfriend = 'https://pic1.imgdb.cn/item/694ba8d2b4105c208abfb286.png';
const imgProcess = 'https://pic1.imgdb.cn/item/694ba8d2b4105c208abfb285.png';
const imgFramework = 'https://pic1.imgdb.cn/item/694ba8d2b4105c208abfb283.png';
const imgCurve = 'https://pic1.imgdb.cn/item/694ba8d1b4105c208abfb281.png';
const imgResults = 'https://pic1.imgdb.cn/item/694ba8d2b4105c208abfb282.png';
const imgMore = 'https://pic1.imgdb.cn/item/694ba8d2b4105c208abfb284.png';

// Helper for image placeholders
const SlideImage = ({ src, alt, caption }: { src: string, alt: string, caption?: string }) => (
  <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm shadow-2xl">
    <img 
      src={src} 
      alt={alt} 
      className="max-h-[60vh] object-contain rounded-md"
    />
    {caption && <p className="mt-4 text-lg text-gray-300 font-light">{caption}</p>}
  </div>
);

// We arrange these in a 3D path
export const SLIDES: SlideData[] = [
  // 0. Intro
  {
    id: 'intro',
    x: 0, y: 0, z: 0,
    content: (
      <div className="text-center">
        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-8">
          I want a girlfriend...
        </h1>
      </div>
    ),
    robot: {
      message: <span>You have already had me! <br/><h1 className="text-3xl text-red-500 mt-2">Introduce me!</h1></span>,
      direction: 'right'
    }
  },
  // 1. Difficulty
  {
    id: 'difficulty',
    x: 1200, y: 0, z: 0,
    rotateY: 0,
    content: (
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-100">
          Too difficult... <br/>
          <span className="text-blue-400 mt-4 block">Maybe another way?</span>
        </h1>
      </div>
    )
  },
  // 2. Image 1
  {
    id: 'img-1',
    x: 2400, y: 0, z: -500,
    rotateY: 45,
    content: <SlideImage src={imgGirlfriend} alt="Girlfriend Concept" caption="Visualizing the goal" />
  },
  // 3. Image 2
  {
    id: 'img-2',
    x: 3200, y: 800, z: -1000,
    rotateZ: 90,
    content: <SlideImage src={imgProcess} alt="Process" />
  },
  // 4. Can ChatGPT?
  {
    id: 'chatgpt',
    x: 4000, y: 2000, z: 0,
    rotateZ: 180,
    scale: 2,
    content: (
      <div className="text-center">
        <h1 className="text-9xl font-black text-green-400">Can ChatGPT?</h1>
      </div>
    )
  },
  // 5. Failed
  {
    id: 'failed',
    x: 3000, y: 3000, z: 1000,
    rotateZ: 270,
    rotateX: 45,
    content: (
      <div className="text-center">
        <h1 className="text-8xl font-bold text-red-500 mb-4">Failed</h1>
        <p className="text-4xl text-gray-400">Why?</p>
      </div>
    )
  },
  // 6. Context Limit
  {
    id: 'context-limit',
    x: 1000, y: 3000, z: 1000,
    rotateY: 45,
    content: (
      <div className="text-center border-4 border-yellow-500 p-12 rounded-xl">
        <h1 className="text-7xl font-bold text-yellow-500">Context length's Limit</h1>
      </div>
    )
  },
  // 7. Solution Intro
  {
    id: 'solution-intro',
    x: -1000, y: 2000, z: 0,
    content: (
      <div className="text-center">
        <h2 className="text-4xl text-gray-300 mb-4">A way to solve?</h2>
        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
          Memory Bank!
        </h1>
      </div>
    )
  },
  // 8. Framework
  {
    id: 'framework',
    x: -2500, y: 1000, z: -1000,
    rotateY: -45,
    scale: 1.5,
    content: (
      <div className="bg-white/10 p-8 rounded-xl backdrop-blur-md">
        <h1 className="text-5xl font-bold mb-8 text-center">How it works?</h1>
        <SlideImage src={imgFramework} alt="MemoryBank Framework" caption="Architecture Diagram" />
      </div>
    )
  },
  // 9. Memorize
  {
    id: 'memorize',
    x: -3500, y: 0, z: -2000,
    rotateY: -90,
    content: (
      <div className="text-left max-w-2xl">
        <h1 className="text-7xl font-bold text-blue-300 mb-4">It can memorize</h1>
        <p className="text-4xl text-gray-300">for a long time...</p>
      </div>
    )
  },
  // 10. Forget
  {
    id: 'forget',
    x: -3500, y: -1000, z: -2000,
    rotateY: -90,
    content: (
      <div className="text-left max-w-2xl">
        <h1 className="text-7xl font-bold text-purple-300 mb-4">It may forget</h1>
        <p className="text-4xl text-gray-300">in the way human does</p>
      </div>
    )
  },
  // 11. Forget Image
  {
    id: 'forget-img',
    x: -3500, y: -2500, z: -2500,
    rotateX: 60,
    rotateY: -90,
    content: (
      <div>
        <h2 className="text-5xl font-bold mb-8 text-center text-purple-200">Ebbinghaus Forgetting Curve</h2>
        <SlideImage src={imgCurve} alt="Forgetting Curve" />
      </div>
    )
  },
  // 12. Results (Robot Trigger)
  {
    id: 'results',
    x: -1500, y: -1500, z: 0,
    scale: 2,
    content: (
      <div className="text-center">
        <h1 className="text-8xl font-black text-white mb-12 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
          I want to see results!
        </h1>
        <SlideImage src={imgResults} alt="Results Graph" />
      </div>
    ),
    robot: {
      message: <span>This is from the paper, <br/> not me.</span>,
      direction: 'top'
    }
  },
  // 13. More
  {
    id: 'more',
    x: 0, y: -2000, z: 1000,
    rotateX: -30,
    content: (
      <div className="text-center">
        <h1 className="text-7xl font-bold mb-8">More</h1>
        <SlideImage src={imgMore} alt="Additional Results" />
      </div>
    )
  },
  // 14. Maybe One Day (Robot Trigger)
  {
    id: 'one-day',
    x: 1500, y: -2000, z: 2000,
    rotateY: 30,
    scale: 3,
    content: (
      <div className="text-center">
        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 pb-4">
          Maybe one day?
        </h1>
      </div>
    ),
    robot: {
      message: <span>I'm longing for that day...</span>,
      direction: 'left'
    }
  },
  // 15. Thanks (Robot Trigger)
  {
    id: 'thanks',
    x: 3000, y: -1000, z: 3000,
    rotateY: 60,
    content: (
      <div className="text-center">
        <h1 className="text-9xl font-serif italic text-white">Thanks</h1>
      </div>
    ),
    robot: {
      message: <span>Thanks!</span>,
      direction: 'bottom'
    }
  },
  // 16. Refs
  {
    id: 'ref',
    x: 4000, y: 0, z: 5000,
    content: (
      <div className="max-w-4xl bg-black/50 p-12 rounded-xl border border-white/20">
        <h1 className="text-5xl font-bold mb-8 border-b border-gray-600 pb-4">References</h1>
        <div className="text-2xl leading-relaxed font-mono text-gray-300">
          <p>Zhong, W., Guo, L., Gao, Q., Ye, H., & Wang, Y. (2023).</p>
          <p className="italic my-2 text-white">MemoryBank: Enhancing Large Language Models with Long-Term Memory.</p>
          <p>arXiv preprint arXiv:2305.10250.</p>
          <a href="https://arxiv.org/abs/2305.10250" className="text-blue-400 hover:text-blue-300 underline block mt-4">
            https://arxiv.org/abs/2305.10250
          </a>
        </div>
      </div>
    )
  }
];
