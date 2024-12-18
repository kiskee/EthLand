import ethladImg from "../assets/ethland.png";

export default function Header() {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Charts", path: "/charts" },
    { name: "Strategies", path: "/strategies" },
    { name: "News", path: "/news" }
  ];
  // body
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-black border-b border-yellow-500/20 relativen">
      {/* Efecto de fondo con gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-yellow-900/10 opacity-20 pointer-events-none"></div>

      {/* Sección izquierda: Logo y nombre con efecto de brillo */}
      <div className="flex items-center relative z-10">
        <img
          src={ethladImg}
          alt="EthLand Logo"
          className="w-16 h-16 mr-4 
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
      drop-shadow-[0_2px_4px_rgba(245,158,11,0.3)]"
        >
          EthLand
        </h1>
      </div>

      {/* Navegación central con efecto de luz */}
      <nav className="flex space-x-4 relative z-10">
        {navItems.map(({name, path}) => (
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
            <span className="absolute inset-0 bg-yellow-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            <span className="relative z-10">{name}</span>
          </a>
        ))}
      </nav>

      {/* Botones con efecto de brillo y profundidad */}
      <div className="flex space-x-4 relative z-10">
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

      {/* Efecto de luz lateral sutil */}
      <div
        className="
    absolute 
    right-0 
    top-0 
    bottom-0 
    w-1/2 
    bg-gradient-to-l 
    from-yellow-900/10 
    to-transparent 
    pointer-events-none
  "
      ></div>
    </header>
  );
}