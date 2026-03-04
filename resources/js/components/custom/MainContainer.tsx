import React from 'react';

interface MainContainerProps {
    children: React.ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
    return (
        /* 1. Wrapper Principal: 
           - Eliminamos el `py-10` para que el cuadro gris toque el top y el bottom.
           - Usamos `px-4 md:px-12` para dejar el espacio azul a los lados.
        */
        <div className="w-full flex justify-center px-4 md:px-12 bg-qb-dark min-h-[calc(100vh-3.5rem)]">
            
            {/* 2. Contenedor Gris Central:
               - Ocupa el 100% de la altura disponible (`min-h-full`).
               - Posición `relative` para que los glitches se anclen a sus bordes.
            */}
            <div className="relative w-full max-w-5xl bg-qb-gray shadow-2xl flex flex-col border-x border-white/5">
                
                {/* --- LÍNEA GLITCH IZQUIERDA (Adherida al borde gris) --- */}
                <div className="absolute top-0 bottom-0 -left-1 sm:-left-2 w-1 sm:w-2 flex flex-col pointer-events-none z-0">
                    <div className="h-1/6 w-full bg-qb-purple"></div>
                    {/* Pieza salida hacia afuera */}
                    <div className="h-8 w-full bg-qb-cyan animate-glitch-fast -translate-x-1 sm:-translate-x-2"></div>
                    <div className="h-2 w-full bg-transparent"></div> {/* Espacio vacío */}
                    {/* Pieza metida hacia adentro */}
                    <div className="h-24 w-full bg-qb-blue translate-x-1 sm:translate-x-2"></div>
                    <div className="flex-grow w-full bg-qb-purple opacity-90"></div>
                    <div className="h-12 w-full bg-qb-cyan animate-glitch-slow -translate-x-1"></div>
                    <div className="h-1/5 w-full bg-qb-purple"></div>
                </div>

                {/* --- LÍNEA GLITCH DERECHA (Adherida al borde gris) --- */}
                <div className="absolute top-0 bottom-0 -right-1 sm:-right-2 w-1 sm:w-2 flex flex-col pointer-events-none z-0">
                    <div className="h-1/5 w-full bg-qb-cyan"></div>
                    <div className="h-16 w-full bg-qb-purple animate-glitch-fast translate-x-1 sm:translate-x-2"></div>
                    <div className="flex-grow w-full bg-qb-cyan opacity-90"></div>
                    <div className="h-6 w-full bg-transparent"></div> {/* Espacio vacío */}
                    <div className="h-32 w-full bg-qb-blue -translate-x-1 sm:-translate-x-2"></div>
                    <div className="h-1/4 w-full bg-qb-purple animate-pulse"></div>
                </div>

                {/* Detalles Glitch Horizontales (Rayas sueltas como en tu diseño) */}
                <div className="absolute top-16 -left-6 w-12 h-1 bg-qb-cyan animate-glitch-slow z-0 hidden sm:block"></div>
                <div className="absolute bottom-40 -right-8 w-16 h-1.5 bg-qb-blue z-0 hidden sm:block"></div>
                <div className="absolute top-1/2 -left-3 w-6 h-1 bg-qb-purple animate-glitch-fast z-0"></div>

                {/* --- ÁREA DE CONTENIDO (Aquí va el texto "Home") --- */}
                <div className="p-6 md:p-12 text-white flex-grow z-10">
                    {children}
                </div>
                
                {/* --- SECCIÓN INFERIOR DE CONTACTO --- */}
                <div className="pb-12 flex flex-col items-center gap-6 mt-auto z-10">
                     <p className="text-gray-400 text-sm italic font-medium">¿No encuentras lo que buscas?</p>
                     <h3 className="text-3xl font-black uppercase tracking-tighter text-white">Contactanos</h3>
                     <button className="bg-white text-qb-gray px-12 py-3 rounded-full font-black text-sm uppercase tracking-widest hover:bg-qb-cyan hover:scale-105 transition-all duration-300 shadow-md">
                        Soporte
                     </button>
                </div>
            </div>

        </div>
    );
};

export default MainContainer;