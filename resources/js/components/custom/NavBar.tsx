import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { LogOut, Menu, X, Search } from 'lucide-react';

interface NavLink {
    name: string;
    link: string;
}

interface UserData {
    name: string;
}

interface NavbarProps {
    links: NavLink[];
    authLinks: NavLink[];
    logoutRoute: string;
    user: UserData | null;
}

const Navbar: React.FC<NavbarProps> = ({ links, authLinks, logoutRoute, user }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(logoutRoute);
    };

    return (
        <nav className="sticky top-0 z-[100] w-full bg-qb-blue h-14 flex items-center shadow-lg border-b border-white/10">
            <div className="w-full px-4 flex justify-between items-center h-full">
                
                <div className="flex items-center h-full">
                    
                    <Link href="/" className="mr-6 group hover:scale-105 transition-transform duration-300 flex items-center gap-2">
                        <div className="w-9 h-9 relative flex items-center justify-center">
                            <div className="absolute inset-0 bg-transparent rounded-full shadow-[-2px_0_0_#D130F2,2px_0_0_#2FF4EE] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            <svg 
                                viewBox="0 0 5796.8 5674.2" 
                                className="w-full h-full stroke-qb-dark group-hover:stroke-white transition-colors duration-300 fill-none"
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
                        <span className="hidden lg:block text-qb-dark font-black tracking-tighter text-sm uppercase group-hover:text-white transition-colors">
                            Quantum Bug
                        </span>
                    </Link>
                    <div className="hidden md:flex items-center h-full">
                        {links.map((item, idx) => (
                            <div key={idx} className="flex items-center h-full">
                                <Link 
                                    href={item.link} 
                                    className="px-4 text-[11px] font-black uppercase tracking-widest text-qb-dark hover:text-white transition-colors"
                                >
                                    {item.name}
                                </Link>
                                {idx < links.length - 1 && (
                                    <div className="h-6 w-[1px] bg-qb-dark/30"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4 h-full">
                    
                    <div className="hidden sm:flex items-center bg-qb-dark/10 rounded px-3 py-1 border border-qb-dark/20 focus-within:border-white/50 transition-colors">
                        <input 
                            type="text" 
                            className="bg-transparent border-none focus:ring-0 text-xs text-qb-dark placeholder-qb-dark/60 w-32 md:w-48 outline-none"
                            placeholder="Search..."
                        />
                        <Search size={14} className="text-qb-dark" />
                    </div>

                    <div className="flex items-center h-full ml-2">
                        {user ? (
                            <div className="flex items-center gap-3 bg-qb-dark/10 px-4 py-1.5 rounded-full border border-qb-dark/20">
                                <span className="text-[10px] font-bold text-qb-dark uppercase tracking-widest">
                                    {user.name}
                                </span>
                                <button 
                                    onClick={handleLogout} 
                                    className="text-qb-dark hover:text-red-600 transition-colors"
                                    title="Logout"
                                >
                                    <LogOut size={14} strokeWidth={3} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                {authLinks.map((item, idx) => (
                                    <Link 
                                        key={idx} 
                                        href={item.link}
                                        className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded transition ${
                                            idx === 1 
                                            ? 'bg-qb-dark text-white hover:bg-qb-purple hover:shadow-[0_0_10px_rgba(209,48,242,0.5)]' 
                                            : 'text-qb-dark hover:bg-qb-dark/10'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-qb-dark p-2">
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="absolute top-14 left-0 w-full bg-qb-blue border-b border-qb-dark/20 md:hidden flex flex-col p-4 animate-in slide-in-from-top-2 shadow-xl">
                    <div className="flex items-center bg-qb-dark/10 rounded px-3 py-2 border border-qb-dark/20 mb-4">
                        <input 
                            type="text" 
                            className="bg-transparent border-none focus:ring-0 text-xs text-qb-dark placeholder-qb-dark/60 w-full outline-none"
                            placeholder="Search..."
                        />
                        <Search size={14} className="text-qb-dark" />
                    </div>

                    {links.map((item, idx) => (
                        <Link key={idx} href={item.link} className="py-3 text-xs font-black uppercase tracking-widest text-qb-dark border-b border-qb-dark/10 hover:pl-2 transition-all">
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;