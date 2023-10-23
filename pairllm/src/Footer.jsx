import React from "react";
import './Footer.css'

const footer = ()=>{
    return(
        <footer>
            {/* <h3>let's go!</h3> */}
            <div className="footer-content">
                
                <a href="https://github.com/Sidharth004/pairllm"><p>Github repo</p></a>
                <h3>Made with love by Sid!!</h3>
                <a href=""><p>Video tutorial</p></a>
            </div>
            
            {/* <h3>For video trial click here</h3>
            <h3>Github</h3> */}
        </footer>
    )
}

export default footer;