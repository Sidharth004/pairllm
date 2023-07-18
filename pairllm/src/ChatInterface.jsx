import { useState} from "react";
import './lhs.css';

const chatInterface = () =>{

    //add state for input and chat log
    const [input,setInput] = useState("");
    const [gptChatLog , setGptChatLog] = useState([]);
    const [bardChatLog, setBardChatLog] = useState([]);


    //fetch response to the api combining the chatlog array of messages and sending it as a messages to local host 3000 as a POST

    async function handleSubmit(e) {
        e.preventDefault();
        const userMessage = { user: "me", message: input };
        const newGptChatLog = [...gptChatLog, userMessage];
        const newBardChatLog = [...bardChatLog, userMessage];
  
        setInput("");

        const response = await fetch("http://localhost:5000/", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            
            body: JSON.stringify({
                message:input
            })
        });

        if (response.ok) {
            try {
              const data = await response.json();
              console.log(data);
              const gptMessage = { user: "gpt", message: data.message };
              const bardMessage = { user: "bard", message: data.bardResponse };
              setGptChatLog([...newGptChatLog, gptMessage]);
              setBardChatLog([...newBardChatLog, bardMessage]);
            } catch (error) {
              // Handle non-JSON response
              const text = await response.text();
              console.log(text); // Log the response as text
            }
          } else {
            // Handle error response
            const errorText = await response.text();
            console.log(errorText); // Log the error response as text
    }
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
                    {gptChatLog.map((message,index)=>  (
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
                    {bardChatLog.map((message,index)=>  (
                        <ChatMessage2 key={index} message={message}/>
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
const ChatMessage2 = ({ message }) => {
    return (
        <div className={`chat-message ${message.user === "bard" ? "chatgpt" : ""}`}>
            <div className="test">
                <div className={`avatar ${message.user === "bard" ? "chatgpt" : ""}`}>
                </div>
                <div className="message">
                    {message.message}
                </div>
            </div>
        </div>
    )
}
export default chatInterface;