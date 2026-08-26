import { useState } from 'react'
import viteLogo from './assets/vite.svg'
import './App.css'
import State from "./Pages/State";
import navbar from "./layout/navbar";
import sidebar from "./layout/sidebar";
import footer from "./layout/footer";
import Products from "./Pages/Products";

function App() {
  return (
    <div>
    <navbar/>

      <div className = "layout">
      <sidebar/>

      <main>
        <Products/>
      </main>
      </div>

    <footer/>
    </div>
  );
}

export default App
