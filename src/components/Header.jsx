import ethladImg from "../assets/ethli.png";
import React, { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Charts", path: "/charts" },
    { name: "Strategies", path: "/strategies" },
    { name: "News", path: "/news" },
  ];
  // body
  // bg-gradient-to-r from-black via-black to-yellow-900/10 opacity-20
  return (
    <header className="flex items-center justify-between  md:flex-col sm:flex-col ss:flex-col md:justify-center   px-8 py-4 bg-black border-b-2 border-yellow-500/40 relativen bg-gradient-to-l from-yellow-900/10 to-transparent">
      <div className="flex items-center relative z-10">
        <img
          src={ethladImg}
          alt="EthLand Logo"
          className="w-24 h-24 mr-4 
        transition-all duration-300 
        hover:rotate-6 
        hover:scale-110 
        filter hover:drop-shadow-[0_0_10px_rgba(245,158,11,0.7)]"
        />
        <h1
          className="text-3xl font-bold text-yellow-500 
      bg-clip-text 
      text-transparent 
      bg-gradient-to-r 
      from-yellow-400 
      to-yellow-600 
      drop-shadow-[0_2px_4px_rgba(245,158,11,0.3)] sss:hidden"
        >
          EthLand
        </h1>
      </div>

      {/* Navegación central con efecto de luz */}
      <nav className="flex space-x-4 relative z-10 sss:hidden">
        {navItems.map(({ name, path }) => (
          <a
            key={name}
            href={path}
            className="
          px-4 py-2 
          text-yellow-500 
          relative 
          overflow-hidden 
          group
        "
          >
            {/* Efecto de luz al pasar */}
            <span className="absolute inset-0 bg-yellow-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-md"></span>
            <span className="relative z-10">{name}</span>
          </a>
        ))}
      </nav>

      {/* Botones con efecto de brillo y profundidad */}
      <div className="flex md:mt-4 ss:mt-4 sss:mt-4 sm:mt-4  space-x-4 relative z-10 sss:hidden">
        <button
          className="
      px-4 py-2 
      text-yellow-500 
      border border-yellow-500 
      rounded-md 
      hover:bg-yellow-900 
      transition-all 
      duration-300 
      hover:shadow-[0_0_15px_rgba(245,158,11,0.5)]
      hover:scale-105
    "
        >
          Login
        </button>
        <button
          className="
      px-4 py-2 
      bg-yellow-500 
      text-black 
      rounded-md 
      hover:bg-yellow-600 
      transition-all 
      duration-300 
      hover:shadow-[0_0_20px_rgba(245,158,11,0.7)]
      hover:scale-105
    "
        >
          Sign Up
        </button>
      </div>
    </header>
  );
}
