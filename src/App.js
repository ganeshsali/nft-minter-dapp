import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Portfolio from './components/Portfolio';
import Minter from './components/Minter';
import React, { useContext } from "react";
import Web3Context from './context/Web3Context';
import Home from './components/Home';


function App() {

  const context = useContext(Web3Context);
  console.log("context ==> ", context)

  return (
    <BrowserRouter>
      <div>
        <Navbar state={context} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/mint" element={<Minter state={context} />} />
          <Route exact path="/portfolio" element={<Portfolio state={context} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
