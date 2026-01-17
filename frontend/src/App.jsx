import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Firstpage from "./Firstpage";
import Second from "./Second";
import Third from "./Third";
import { JobProvider } from "./JobContext";

export default function App() {
  const location = useLocation();

  return (
    <JobProvider>
      <div className="min-h-screen">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Firstpage />} />
            <Route path="/second" element={<Second />} />
            <Route path="/third" element={<Third />} />
          </Routes>
        </AnimatePresence>
      </div>
    </JobProvider>
  );
}