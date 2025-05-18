import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import ViewImage from './pages/Images';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/images/:folderName/:folderId" element={<ViewImage />} />
      </Routes>
    </Router>
  );
}

export default App;