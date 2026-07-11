import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Starfield from "./components/Starfield";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Events from "./pages/Events";
import Team from "./pages/Team";
import Join from "./pages/Join";
import Admin from "./pages/Admin";

// React Router's basename must NOT have a trailing slash — but Vite's
// import.meta.env.BASE_URL always includes one (e.g. "/SAST_A_NEW_REALM/").
// Passing that straight through breaks matching for the exact root route
// ("/"), which is why the homepage rendered blank while every other page
// worked fine. Stripping the trailing slash here fixes it.
const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Starfield />
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/events" element={<Events />} />
          <Route path="/team" element={<Team />} />
          <Route path="/join" element={<Join />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
