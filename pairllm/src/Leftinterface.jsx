import { useState} from "react";
import './lhs.css';

const Leftinterface = () =>{

    //add state for input and chat log
    const [input,setInput] = useState("");
    const [chatLog , setChatLog] = useState([{
        
        user: "gpt",
        message: "hi! how can I help you today?"

    },{

        user: "me",
        message: `hi gpt!`

    }]);

    //fetch response to the api combining the chatlog array of messages and sending it as a messages to local host 3000 as a POST

    async function handleSubmit(e) {
        e.preventDefault();
        const userMessage = { user: "me", message: input };
        const newChatLog = [...chatLog, userMessage];
        setInput("");

        const response = await fetch("http://localhost:5000/", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                message: newChatLog.map((message) => message.message).join("")
            })
        });

        const data = await response.json();
        const botMessage = { user: "gpt", message: data.message };
        setChatLog([...newChatLog, botMessage]);
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


// const ChatMessage =({message }) =>{
//     return(
//         <div className= {` chat-message ${message.user == "gpt" && "chatgpt"}`}>
//                         <div className="test">
//                             <div className= {`avatar ${message.user == "gpt" && "chatgpt"}`}>

//                             </div>
//                             <div className="message">
//                                 {message.message}
//                                 {/* Hi there! Lets build this thing!  */}
//                             </div>
//                         </div>
//                     </div>
//     )
// }
const ChatMessage = ({ message }) => {
    return (
        <div className={`chat-message ${message.user === "gpt" ? "chatgpt" : ""}`}>
            <div className="test">
                <div className={`avatar ${message.user === "gpt" ? "chatgpt" : ""}`}>
                </div>
                <div className="message">
                    {message.message}
                </div>
            </div>
        </div>
    )
}
export default Leftinterface;