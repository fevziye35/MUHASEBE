import React from 'react';

import { Link, useLocation } from 'react-router-dom';

import { useLanguage } from '../context/LanguageContext';

import {

  LayoutDashboard, Users, Package, FileText,

  Wallet, Banknote, Calendar, LogOut

} from 'lucide-react';



const Sidebar = () => {

  const { t } = useLanguage();

  const location = useLocation();



  // EKSİK OLAN KISIM BURASI: menuItems tanımlanmalı

  const menuItems = [

    { key: 'home', path: '/', icon: <LayoutDashboard size={20} /> },

    { key: 'customers', path: '/customers', icon: <Users size={20} /> },

    { key: 'stocks', path: '/stocks', icon: <Package size={20} /> },

    { key: 'sales', path: '/sales', icon: <FileText size={20} /> },

    { key: 'invoices', path: '/invoices', icon: <FileText size={20} /> },

    { key: 'cash', path: '/cash', icon: <Wallet size={20} /> },

    { key: 'bank', path: '/bank', icon: <Banknote size={20} /> },

    { key: 'agenda', path: '/agenda', icon: <Calendar size={20} /> },

  ];



  return (
<div className="bg-[#1e293b] text-white w-64 min-h-screen p-6 flex flex-col shrink-0">

      <div className="logo mb-10 px-2 font-bold text-2xl flex items-center gap-3 border-b border-gray-700 pb-6">

        <div className="w-8 h-8 bg-blue-500 rounded-lg shrink-0"></div>

        <span className="text-white tracking-wide">MAKFA GLOBAL</span>

      </div>

     

      <nav className="flex-1 flex flex-col gap-2">

        {menuItems.map((item) => (

          <Link

            key={item.key}

            to={item.path}

            className={`flex items-center gap-4 p-3 rounded-xl transition-all no-underline ${

              location.pathname === item.path

                ? 'bg-blue-600 shadow-lg text-white'

                : 'hover:bg-gray-800 text-gray-300'

            }`}

            style={{ color: 'white', textDecoration: 'none' }}

          >

            <span className="flex-shrink-0">{item.icon}</span>

            <span classame="font-medium text-[15px]">{t(item.key)}</span>
          </Link>
        ))}
      </nav>
      // Sidebar.jsx dosyanızın sonundaki olması gereken doğru yapı:
      <div className="mt-auto pt-6 border-t border-gray-700">
        <button 
          className="flex items-center gap-4 p-3 w-full rounded-xl transition-colors border-none bg-transparent cursor-pointer hover:bg-red-900/20"
          style={{ color: '#f87171' }}
        >
          <LogOut size={20} />
          <span className="font-medium">{t('logout')}</span>
        </button> {/* <-- 99. satır civarı burayı kontrol edin */}
      </div> {/* <-- 100. satır */}
    </div> // <-- 101. satır (Sidebar ana kapsayıcı kapanışı)
  );
};

export default Sidebar