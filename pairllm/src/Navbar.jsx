import React from "react";
import './Navbar.css';



const Navbar = ({openModal}) =>{
    console.log('open modal prop in Navbar component:',openModal)
    console.log('navbar rendered');
    return(
        
        <nav>
           <div className="nav-parent">
                <div>
                        <h1 id="nav-title">PairLLM</h1>
                </div>
           </div>
            
           <div className="navbar-selectpair">
                <button className="nav-button" onClick={()=>{
                    console.log("button clicked");
                    openModal();
                }}>Choose Pair</button>
            </div>
        </nav>
    )
}

export default Navbar;