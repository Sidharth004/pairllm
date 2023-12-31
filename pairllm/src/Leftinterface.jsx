import { useState} from "react";
import './lhs.css';

const ChatInterface = ({isPairPrompting}) =>{

    //add state for input and chat log
    const [input,setInput] = useState("");
    const [gptInput,setGptInput] = useState("");
    const [bardInput,setBardInput] = useState("");
    const [gptChatLog , setGptChatLog] = useState([]);
    const [bardChatLog, setBardChatLog] = useState([]);


    //fetch response to the api combining the chatlog array of messages and sending it as a messages to local host 3000 as a POST

    async function handleSubmit(e, chatType) {
        e.preventDefault();
        
        let newInput, setChatLog, chatLog;
        
        if(chatType === 'gpt'){
            chatLog = gptChatLog;
            setChatLog = setGptChatLog;
            newInput = gptInput;
            setGptInput('');
        }
        else if(chatType === 'bard' ){
            chatLog = bardChatLog;
            setChatLog = setBardChatLog;
            newInput = bardInput;
            setBardInput('');
        }
        else if(chatType === 'bard' && chatType==='gpt'){
            chatLog =gptChatLog;
            setChatLog = setGptChatLog;
            
            chatLog = bardChatLog;
            setChatLog = setBardChatLog;
            newInput('');
        }



        
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
                message:newInput,
                isPairPrompting,
                model: chatType
                //*** */
            })
        });

        if (response.ok) {
            try {
              const data = await response.json();
              console.log(data);
              const gptMessage = { user: "gpt", message: data.gptResponse };
              //const bardMessage = { user: "bard", message: data.bardResponse };
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
            <div className="chat-banner1">
                     <h3>GPT</h3>
            </div>
            <div className="chat-box">

                <div className="prompt_area">
                    {isPairPrompting?
                    (<div>
                        <form onSubmit={handleSubmit}>
                        <input 
                            value={input}
                            onChange={
                                (e)=> setInput(e.target.value)
                            }
                            className="prompt_area_field" 
                            placeholder=" lets do this!" 
                            rows="1" >
                        </input>
                        </form>
                    </div>)
                    :
                    (<div>
                        <form onSubmit={(e)=> handleSubmit(e,'gpt')}>
                            <input
                                value={gptInput}
                                onChange={(e)=>setGptInput(e.target.value)}
                                className="prompt_area_field"
                                placeholder="GPT prompt here"
                            ></input>
                        </form>
                        <form onSubmit={(e)=> handleSubmit(e,'bard')}>
                            <input
                                value={bardInput}
                                onChange={(e)=>setBardInput(e.target.value)}
                                className="prompt_area_field"
                                placeholder="BARD prompt here"
                             />
                        </form>
                    </div>)
        
                
            }    
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


 <              div className="chat-log2">
                    <div className="chat-banner2">
                        <h3>BARD</h3>
                    </div>
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
        <div className={`chat-message ${message.user === "bard" ? "bardcolor" : ""}`}>
            <div className="test">
                <div className={`avatar ${message.user === "bard" ? "bardcolor" : ""}`}>
                </div>
                <div className="message">
                    {message.message}
                </div>
            </div>
        </div>
    )
}
export default ChatInterface;