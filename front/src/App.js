import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import LogIn from './pages/LogIn';
import MyPage from './pages/MyPage';
import Sentency from './pages/Sentency';
import Hifive from './pages/Hifive';
import Speedoodle from './pages/Speedoodle';
import ReviewNote from './pages/ReviewNote';

import NavLayout from './components/NavLayout';
import LoginLayout from './components/LoginLayout';

function App() {
  return (
    <>
      <Routes>
        <Route element={<NavLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/my-page' element={<MyPage />} />
          <Route path='/sentency' element={<Sentency />} />
          <Route path='/hi-five' element={<Hifive />} />
          <Route path='/speedoodle' element={<Speedoodle />} />
          <Route path='/review-note' element={<ReviewNote />} />
        </Route>
        <Route element={<LoginLayout />}>
          <Route path='/login' element={<LogIn />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
