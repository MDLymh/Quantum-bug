import React from 'react';

interface MainContainerProps {
    children: React.ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
    return (
        <div className="w-full flex justify-center px-4 md:px-12 bg-qb-dark min-h-[calc(100vh-3.5rem)]">
            
            <div className="relative w-full max-w-5xl bg-qb-gray shadow-2xl flex flex-col border-x border-white/5">
                
                <div className="absolute top-0 bottom-0 -left-1 sm:-left-2 w-1 sm:w-2 flex flex-col pointer-events-none z-0">
                    <div className="h-1/6 w-full bg-qb-purple"></div>
                    <div className="h-8 w-full bg-qb-cyan animate-glitch-fast -translate-x-1 sm:-translate-x-2"></div>
                    <div className="h-2 w-full bg-transparent"></div>
                    <div className="h-24 w-full bg-qb-blue translate-x-1 sm:translate-x-2"></div>
                    <div className="grow w-full bg-qb-purple opacity-90"></div>
                    <div className="h-12 w-full bg-qb-cyan animate-glitch-slow -translate-x-1"></div>
                    <div className="h-1/5 w-full bg-qb-purple"></div>
                </div>

                <div className="absolute top-0 bottom-0 -right-1 sm:-right-2 w-1 sm:w-2 flex flex-col pointer-events-none z-0">
                    <div className="h-1/5 w-full bg-qb-cyan"></div>
                    <div className="h-16 w-full bg-qb-purple animate-glitch-fast translate-x-1 sm:translate-x-2"></div>
                    <div className="grow w-full bg-qb-cyan opacity-90"></div>
                    <div className="h-6 w-full bg-transparent"></div>
                    <div className="h-32 w-full bg-qb-blue -translate-x-1 sm:-translate-x-2"></div>
                    <div className="h-1/4 w-full bg-qb-purple animate-pulse"></div>
                </div>

                <div className="absolute top-16 -left-6 w-12 h-1 bg-qb-cyan animate-glitch-slow z-0 hidden sm:block"></div>
                <div className="absolute bottom-40 -right-8 w-16 h-1.5 bg-qb-blue z-0 hidden sm:block"></div>
                <div className="absolute top-1/2 -left-3 w-6 h-1 bg-qb-purple animate-glitch-fast z-0"></div>

                <div className="p-6 md:p-12 text-white grow z-10">
                    {children}
                </div>
                
            </div>

        </div>
    );
};

export default MainContainer;