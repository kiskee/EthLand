import Header from "../components/Header";

export default function Layaut({ children }) {
  // body
  return (
    <div className="min-h-screen bg-black p-6 text-white flex flex-col bg-gradient-to-l from-yellow-900/10 to-transparent">
      {/* Encabezado con el logo y el título */}
      <Header />

      {/* Dynamic content passed as children */}
      <div className="mt-8">{children}</div>
      {/* Pie de página */}
      <footer className="mt-8 text-gray-500 text-sm relative">
        <p className="text-center">
          “El éxito no se logra solo con cualidades especiales. Es sobre todo un
          trabajo de mentalidad y actitud positiva. Sigue soñando, sigue
          creyendo.”
        </p>
        <span className="font-bold text-yellow-500 absolute right-0 top-0">
          DanMeCoss
        </span>
      </footer>
    </div>
  );
}
