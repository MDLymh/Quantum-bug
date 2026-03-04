import AppLayout from '@/layouts/app-layout';
import React from 'react';

export default function Blogs() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-8 w-full py-6">
        
        <div className="mb-6">
          <h1 
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-widest relative inline-block"
            style={{ textShadow: '3px 0px 0px #2FF4EE, -3px 0px 0px #D130F2' }}
          >
            Blogs
          </h1>
          <p className="text-gray-400 mt-4 text-sm font-medium italic">
            Latest news, patch notes, and behind-the-scenes from our developers and artists.
          </p>
        </div>

        <div className="text-gray-500 italic">
          Blog posts coming soon...
        </div>

      </div>
    </AppLayout>
  );
}