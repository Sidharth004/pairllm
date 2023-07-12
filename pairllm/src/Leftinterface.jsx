import React from "react";
import './lhs.css';

const Leftinterface = () =>{
    return(
        <div>
            <div className="chat-box">

                <div className="chat-log1">
                    <div className="chat-message">
                        <div className="test">

        
                            <div className="avatar">
                                
                            </div>
                            <div className="message">
                                Hi there! Lets build this thing!
                                
                            </div>
                        </div>
                    </div>
                    <div className="chat-message chatgpt">
                        <div className="test">
                            <div className="avatar chatgpt">
                             yo
                            </div>
                            <div className="message">
                            Hi I am PairLLM!
                            </div>
                        </div>
                        
                    </div>


                    
                </div>




                <div className="chat-log2">
                    <div className="avatar">
                        Me
                    </div>
                    <div className="chat-message">
                        Hi there! Lets build this thing!
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Leftinterface;