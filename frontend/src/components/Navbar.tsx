import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navbarItemsByRole } from '../config/navbarItems';


type Role = 'traveller' | 'guide' | 'vendor' | 'admin' | 'superAdmin';

type Props = {
    role: Role;
    userName?: string;
};

export default function Navbar({ role, userName = 'User' }: Props) {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const items = navbarItemsByRole[role] || [];

    const closeMobileMenu = () => setMobileOpen(false);

    const handleLogout = () => {
        window.location.href = "/";
    }

    return (
        <nav className="w-full border-b bg-white sticky top-0 z-50  px-4 py-3 ">
            <div className="max-w-7xl  px-2 sm:px-6 py-4 flex items-center gap-16 justify-between">
                <Link
                    to="/"
                    className="text-lg sm:text-xl font-bold text-green-700 whitespace-nowrap"
                    onClick={closeMobileMenu}
                >
                    Assam EcoGuard
                </Link>

                <div className="hidden lg:flex items-center gap-28 relative left-16 ">
                    <ul className="flex items-center gap-4 text-gray-400 font-medium">
                        {items.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`px-3 py-2  transition ${isActive
                                            ? 'border-b-4 border-green-600'
                                            : 'hover:text-green-700 hover:border-b-2 border-green-600 transition'
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    <div className='flex  gap-2 relative left-6'>
                        <span className='p-1 flex items-center justify-center text-gray-700 text-xl'>
                            <i className="fa-solid fa-bell"></i>
                        </span>
                        <div className="flex items-center gap-1 border rounded-3xl px-1 py-1">
                            <span className='p-1 border rounded-3xl flex items-center justify-center text-gray-700'>
                                <i className="fa-solid fa-user"></i>
                            </span>
                            <span className="text-sm text-gray-700 hidden p-1 xl:block">
                                {userName}
                            </span>
                        </div>
                        <Link
                            to="/logout"
                            className="bg-green-700 text-white px-4 py-2 rounded-3xl hover:bg-green-800 transition"
                        >
                            Logout
                        </Link>
                    </div>

                </div>

                <button
                    className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={mobileOpen}
                >
                    {mobileOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {mobileOpen && (
                <div className="lg:hidden border-t bg-white px-4 pb-4">
                    <div className="py-3 text-sm text-gray-500">
                        Signed in as <span className="font-medium text-gray-700">{userName}</span>
                    </div>

                    <ul className="flex flex-col gap-2">
                        {items.map((item) => {
                            const isActive = location.pathname === item.path;

                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        onClick={closeMobileMenu}
                                        className={`block px-4 py-3 rounded-lg font-medium transition ${isActive
                                            ? 'bg-green-50 text-green-700'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-green-700'
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="mt-4 flex flex-col gap-2">
                        <Link
                            to={`/${role}/profile`}
                            onClick={closeMobileMenu}
                            className="block text-center px-4 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
                        >
                            Profile
                        </Link>

                        <Link
                            to="/"
                            onClick={closeMobileMenu}
                            className="block text-center px-4 py-3 rounded-xl bg-green-700 text-white font-medium hover:bg-green-800"
                        >
                            Logout
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}