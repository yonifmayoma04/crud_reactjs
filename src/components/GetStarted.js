import React from 'react';
import './GetStarted.css';
import { useNavigate } from 'react-router-dom';

function GetStarted() {

    const navigate = useNavigate();

    const ClickToRegister=()=>{
        navigate('/signup/:id');
    }
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <a href="/">React JS</a>
        </nav>
      </header>
      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>React JS</h1>
            <p>Happy in every monday</p>
            <button onClick={ClickToRegister}>Get Started</button>
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2023 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default GetStarted;
