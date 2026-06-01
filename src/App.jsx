import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Hero from "./components/Hero";
import Area from "./components/area";
import OurServices from "./components/ourservices";
import Rules from "./components/Rules";
import Terms from "./components/terms";
import Footer from "./components/footer";

import PrintPermit from "./components/printPermit";
import ApplyPermit from "./components/form/ApplyPermit";

function Home({ agreed, onAgree }) {
  return (
    <>
      <Hero />
      <Area />
      <OurServices />
      <Footer />
      {!agreed && <Terms onAgree={onAgree} />}
    </>
  );
}

function App() {
  const [agreed, setAgreed] = useState(false);

  return (
    <BrowserRouter>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={<Home agreed={agreed} onAgree={() => setAgreed(true)} />}
          />

          <Route path="/rules" element={<Rules />} />
          <Route path="/printPermit" element={<PrintPermit />} />
          <Route path="/apply" element={<ApplyPermit />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
