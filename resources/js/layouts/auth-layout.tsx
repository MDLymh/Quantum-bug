import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Footer from '@/components/custom/Footer'; // Importamos tu Footer responsivo

export default function AuthLayout({
    children,
    title,
    description,
}: {
    children: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="min-h-screen bg-qb-dark flex flex-col relative overflow-hidden">
            
            <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
            
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(47,244,238,0.05)_0%,transparent_50%)] pointer-events-none"></div>

            <main className="flex-grow flex flex-col items-center justify-center p-4 z-10">
                
                <Link href="/" className="mb-8 relative group flex flex-col items-center gap-3">
                    <div className="w-16 h-16 md:w-20 md:h-20">
                        <svg viewBox="0 0 5796.8 5674.2" className="w-full h-full stroke-qb-cyan group-hover:stroke-white transition-colors duration-300 fill-none" strokeWidth="264.4" strokeLinecap="round" strokeMiterlimit="10" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <path d="M2661,5125.9c-185.1-125.6-324.5-360.7-415.2-531.6c-230.7-435-351.5-900.4-348-1392.9 c0.4-62.7,2.7-125.4,6.7-188"/>
                                <path d="M3953.9,3065.2c28.2,488-88.5,952.2-292.3,1394.8c-101.1,219.5-252.1,514.5-474.2,663"/>
                                <path d="M922.4,1268.8c315.7-204.8,905.7-184.5,1578.4,39.5"/>
                                <path d="M1897.7,3345.5C1135.3,2796.1,660.2,2148.8,681.9,1688.1"/>
                                <path d="M4903.3,4150.4c-316.9,186.8-884.1,165.1-1530.2-45.9"/>
                                <path d="M3950.8,2058.7C4698.5,2597.3,5170,3230.1,5168,3688.9"/>
                                <path d="M5167.9,1705.7c8.9,458.8-462.4,1095.5-1213.3,1637.4"/>
                                <path d="M3348.2,1308.2c662-220.5,1243.9-243.7,1563.2-49.2"/>
                                <path d="M681.3,3696.7c-7.6-459.5,465.2-1096.5,1217.3-1638.2"/>
                                <path d="M2466.9,4107.4c-647.9,210-1215.4,229.1-1529.2,38"/>
                                <g>
                                    <g>
                                        <path d="M3160.1,1183.1h-446c-137.8,0-250.5-112.7-250.5-250.5l0,0c0-137.8,112.7-250.5,250.5-250.5h446 c137.8,0,250.5,112.7,250.5,250.5l0,0C3410.6,1070.4,3297.8,1183.1,3160.1,1183.1z"/>
                                        <path d="M2568.4,728.4c-85.6-73.1-171.2-146.2-256.8-219.3v-322"/>
                                        <path d="M3288.8,717.8c40.2-34.4,80.5-68.7,120.7-103.1c42.8-36.6,85.6-73.1,128.4-109.7c0-107.3,0-214.6,0-322"/>
                                    </g>
                                    <g>
                                        <path d="M2924.7,4214.9L2924.7,4214.9c-566.8,0-1026.1-459.4-1026.1-1026.1v-945.6 c0-566.8,459.4-1026.1,1026.1-1026.1l0,0c566.8,0,1026.1,459.4,1026.1,1026.1v945.6C3950.9,3755.4,3491.5,4214.9,2924.7,4214.9z"/>
                                        <circle cx="2924.7" cy="2715.8" r="467.8"/>
                                    </g>
                                </g>
                                <circle cx="5131.8" cy="1428" r="277.7"/>
                                <path d="M4897.2,4154c-55.1-50.7-89.6-123.5-89.6-204.3c0-153.4,124.3-277.7,277.7-277.7c28.9,0,56.8,4.4,83.1,12.6"/>
                                <path d="M5168.4,3684.6c112.8,35.3,194.6,140.6,194.6,265.1c0,153.4-124.3,277.7-277.7,277.7 c-72.6,0-138.6-27.8-188.1-73.4"/>
                                <circle cx="2924.7" cy="5213.4" r="277.7"/>
                                <path d="M939.4,4146.3c-50.9,64.4-129.7,105.8-218.1,105.8c-153.4,0-277.7-124.3-277.7-277.7 c0-153.4,124.3-277.7,277.7-277.7S999,3821,999,3974.4C999,4039.3,976.7,4099.1,939.4,4146.3"/>
                                <circle cx="687.2" cy="1410.4" r="277.7"/>
                            </g>
                        </svg>
                    </div>
                    <span className="font-black tracking-widest text-2xl uppercase text-white group-hover:text-qb-cyan transition-colors">
                        Quantum Bug
                    </span>
                </Link>

                <div className="relative w-full max-w-md bg-[#2a2a2e] p-8 shadow-[0_0_40px_rgba(47,244,238,0.08)] border border-white/10 backdrop-blur-sm">
                    
                    <div className="absolute -top-[2px] -left-2 w-16 h-1 bg-qb-cyan"></div>
                    <div className="absolute -bottom-[2px] -right-2 w-16 h-1 bg-qb-purple"></div>
                    <div className="absolute top-1/4 -right-[2px] w-1 h-12 bg-qb-blue"></div>

                    <div className="text-center mb-8">
                        <h1 
                            className="text-2xl font-black text-white uppercase tracking-widest mb-2"
                            style={{ textShadow: '2px 0px 0px #2FF4EE, -2px 0px 0px #D130F2' }}
                        >
                            {title}
                        </h1>
                        <p className="text-gray-400 text-xs uppercase tracking-widest font-medium">
                            {description}
                        </p>
                    </div>

                    {children}
                </div>
            </main>

            <div className="z-10 relative">
                <Footer />
            </div>

        </div>
    );
}