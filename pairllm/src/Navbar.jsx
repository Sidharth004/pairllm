import React from "react";
import './Navbar.css';

const Navbar = () =>{
    return(
        <nav>
           
            <div>
                <h1 id="nav-title">PairLLM</h1>
            </div>
            <div>
                <button className="nav-button">Choose Pair</button>
            </div>
            
        </nav>
    )
}

export default Navbar;