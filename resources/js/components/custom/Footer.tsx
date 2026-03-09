import React from 'react';
import { Link } from '@inertiajs/react';
import { Facebook, Twitter, Instagram, Youtube, Music2 } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-qb-cyan text-qb-dark w-full pt-10 pb-6 px-6 md:px-12 mt-auto border-t-[6px] border-qb-purple">
        
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-center text-center md:text-left">

                <div className="flex items-center justify-center md:justify-start gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 shrink-0">
                        <svg 
                            viewBox="0 0 5796.8 5674.2" 
                            className="w-full h-full stroke-qb-dark fill-none"
                            strokeWidth="264.4"
                            strokeLinecap="round"
                            strokeMiterlimit="10"
                            xmlns="http://www.w3.org/2000/svg"
                        >
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
                    <span className="font-black tracking-tighter text-lg md:text-xl uppercase">Quantum Bug</span>
                </div>

                <div className="flex flex-col items-center justify-center gap-3">
                    <h4 className="font-black uppercase tracking-widest text-sm border-b-2 border-qb-dark/30 pb-1 w-16 text-center">Links</h4>
                    <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 font-bold text-[11px] uppercase tracking-widest">
                        <Link href="/" className="hover:text-white hover:scale-105 transition-all">Home</Link>
                        <Link href="/products" className="hover:text-white hover:scale-105 transition-all">Products</Link>
                        <Link href="/support" className="hover:text-white hover:scale-105 transition-all">Support</Link>
                        {/* <Link href="/faq" className="hover:text-white hover:scale-105 transition-all">FAQ</Link> */}
                        <Link href="/blogs" className="hover:text-white hover:scale-105 transition-all">Blogs</Link>
                    </div>
                </div>

                <div className="flex flex-col items-center md:items-end justify-center gap-3 md:text-right">
                    <h4 className="font-black uppercase tracking-widest text-sm border-b-2 border-qb-dark/30 pb-1 w-28 text-center md:text-right">Contact Us</h4>
                    
                    <div className="flex gap-3">
                        <a href="#" className="p-2 bg-qb-dark text-qb-cyan rounded-full hover:bg-white hover:text-qb-dark hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all">
                            <Facebook size={16} />
                        </a>
                        <a href="#" className="p-2 bg-qb-dark text-qb-cyan rounded-full hover:bg-white hover:text-qb-dark hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all">
                            <Twitter size={16} />
                        </a>
                        <a href="#" className="p-2 bg-qb-dark text-qb-cyan rounded-full hover:bg-white hover:text-qb-dark hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all">
                            <Instagram size={16} />
                        </a>
                        <a href="#" className="p-2 bg-qb-dark text-qb-cyan rounded-full hover:bg-white hover:text-qb-dark hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all">
                            <Youtube size={16} />
                        </a>
                        <a href="#" className="p-2 bg-qb-dark text-qb-cyan rounded-full hover:bg-white hover:text-qb-dark hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all">
                            <Music2 size={16} /> 
                        </a>
                    </div>

                    <a href="mailto:contact@BQStudios.com" className="font-bold text-[11px] uppercase tracking-widest hover:text-white transition-colors">
                        contact@BQStudios.com
                    </a>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-qb-dark/20 flex flex-col items-center justify-center text-qb-dark/80">
                <p className="text-[10px] font-black tracking-widest uppercase">
                    © 2026 Copyright: QuantumBugStudios.com
                </p>
            </div>
        </footer>
    );
}