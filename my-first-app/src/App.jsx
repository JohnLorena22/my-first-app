import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import State from "./Pages/State";
import navbar from "./layout/navbar";
import sidebar from "./layout/sidebar";
import footer from "./layout/footer";


function App() {
  return (
    <div>
    <navbar/>

      <div className = "layout">
      <sidebar/>

      <main>
      <State />
      </main>
      </div>

    <footer/>
    </div>
  );
}

export default App
