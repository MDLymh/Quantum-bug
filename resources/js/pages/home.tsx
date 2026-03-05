import AppLayout from '@/layouts/app-layout';
import React from 'react';

export default function Home() {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center w-full min-h-[60vh] text-center px-4">
        
        <h1 
          className="text-5xl md:text-8xl font-black text-black dark:text-white  uppercase tracking-widest relative inline-block mb-6"
          style={{ textShadow: '4px 0px 0px #2FF4EE, -4px 0px 0px #D130F2' }}
        >
          Quantum Bug
        </h1>
        
        <p className="dark:text-gray-300 text-gray-800 text-lg md:text-xl font-medium max-w-2xl italic">
          Pushing the boundaries of gaming and emulation. Join our community and discover our latest projects.
        </p>

      </div>
    </AppLayout>
  );
}