import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // For managing client-side routing
import Home from "./pages/Home";
import Charts from './pages/Charts'
import { SpeedInsights } from "@vercel/speed-insights/react"; // The SpeedInsights component is a wrapper around the tracking script, offering more seamless integration with React.
import Layaut from "./components/Layaut";

function App() {
  return (
    <Router>
      <Layaut>
      <SpeedInsights />
      <Routes>
        {/* Define the route for the home page */}
        <Route path="/" element={<Home />} />
        {/* Define the route for the "Nosotros" page */}
        <Route path="/charts" element={<Charts />} />
        {/* Define the route for the "Proyectos" page */}
        <Route path="/strategies" element={<Home />} />
      </Routes>
      </Layaut>
    </Router>
  );
}

export default App;
