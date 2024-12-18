import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // For managing client-side routing
import Home from "./pages/Home";
import { SpeedInsights } from "@vercel/speed-insights/react"; // The SpeedInsights component is a wrapper around the tracking script, offering more seamless integration with React.

function App() {
  return (
    <Router>
      <SpeedInsights />
      <Routes>
        {/* Define the route for the home page */}
        <Route path="/" element={<Home />} />
        {/* Define the route for the "Nosotros" page */}
        <Route path="/nosotros" element={<Home />} />
        {/* Define the route for the "Proyectos" page */}
        <Route path="/proyectos" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
