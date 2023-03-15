import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./pages/NavBar";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import MyPage from "./pages/MyPage";
import Sentency from "./pages/Sentency";
import Hifive from "./pages/Hifive";
import Speedoodle from "./pages/Speedoodle";
import ReviewNote from "./pages/ReviewNote";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/sentency" element={<Sentency />} />
        <Route path="/hi-five" element={<Hifive />} />
        <Route path="/speedoodle" element={<Speedoodle />} />
        <Route path="/review-note" element={<ReviewNote />} />
      </Routes>
    </>
  );
}

export default App;
