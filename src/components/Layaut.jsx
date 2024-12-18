import Header from "../components/Header";

export default function Layaut({ children }) {
  // body
  return (
    <div className="min-h-screen bg-black p-6 text-white flex flex-col">
      {/* Encabezado con el logo y el título */}
      <Header />

      {/* Dynamic content passed as children */}
      <div className="mt-8">
      {children}
      </div>
      {/* Pie de página */}
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>
          “El éxito no se logra solo con cualidades especiales. Es sobre todo un
          trabajo de mentalidad y actitud positiva. Sigue soñando, sigue
          creyendo.”
        </p>
      </footer>
    </div>
  );
}
