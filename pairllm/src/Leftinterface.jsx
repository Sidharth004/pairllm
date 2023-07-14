import { useState} from "react";
import './lhs.css';

const Leftinterface = () =>{

    //add state for input and chat log
    const [input,setInput] = useState("");
    const [chatLog , setChatLog] = useState([{
        user: "gpt",
        message: "Hi Sid! Let's do this!"
    },{
        user: "me",
        message: "Hi gpt!"
    }]);


    async function handleSubmit(e){
        e.preventDefault();
        setChatLog([...chatLog,{user: "me",message: `${input}`}])
        console.log("submit")
        setInput("");
        

    }
    
    return(
        <div>
            
            <div className="chat-box">

                <div className="prompt_area">
                    <form onSubmit={handleSubmit}>
                    <input 
                        value={input}
                        onChange={
                            (e)=> setInput(e.target.value)
                        }
                        className="prompt_area_field" 
                        placeholder=" lets do this!" 
                        rows="1" ></input>
                    </form>
                    
                </div>

                <div className="chat-log1">
                    {chatLog.map((message,index)=>  (
                        <ChatMessage key={index} message={message}/>
                    ))}
                    
                    {/* <div className="chat-message chatgpt">
                        <div className="test">
                            <div className="avatar chatgpt">
                             yo
                            </div>
                            <div className="message">
                            Hi I am PairLLM!
                            </div>
                        </div>
                    </div>  */}
                </div>

{/* ........................................................................................ */}


                <div className="chat-log2">
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

            </div>
        </div>
    )
}


const ChatMessage =({message }) =>{
    return(
        <div className= {` chat-message ${message.user == "gpt" && "chatgpt"}`}>
                        <div className="test">
                            <div className= {`avatar ${message.user == "gpt" && "chatgpt"}`}>

                            </div>
                            <div className="message">
                                {message.message}
                                {/* Hi there! Lets build this thing!  */}
                            </div>
                        </div>
                    </div>
    )
}
export default Leftinterface;