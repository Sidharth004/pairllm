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

    //handleSubmit function:
    //task - responsible for handling the form submit event and sending a POST request to the server.
    //post request to serve using fetch
    async function handleSubmit(e, chatType) {
        e.preventDefault();

        let newGptChatLog = [...gptChatLog];
        let newBardChatLog = [...bardChatLog];
        let message ="";

        //let newInput;
        if (isPairPrompting){
            const userMessage = {user : 'me',message:input};
            const chatPair = {userMessage: userMessage, aiMessage:null}
            newBardChatLog = [...newBardChatLog,chatPair]; //user and message passed as 2nd thing in this [ ]
            newGptChatLog = [...newGptChatLog,chatPair];
            message = input;
            setInput(""); //setting the input prop to ""empty afterwards.
        }    
        else{

               // let aiMessage = ""
                const userMessage = { user: "me", message: chatType === 'gpt' ? gptInput : bardInput };
                const chatPair = {userMessage: userMessage, aiMessage: null}
                chatType === 'gpt' ? newGptChatLog = [...newGptChatLog, chatPair] : newBardChatLog = [...newBardChatLog, chatPair];

        //         chatType === 'gpt' ? newGptChatLog = [...newGptChatLog, userMessage] : newBardChatLog = [...newBardChatLog, userMessage];
                 message = chatType === 'gpt' ? gptInput : bardInput;
                chatType === 'gpt' ? setGptInput("") : setBardInput("");
        }
        //

        



    

        const response = await fetch("http://localhost:5000/", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            
            // body: JSON.stringify({
            //     message:input,
            //     isPairPrompting,
            //     model: chatType
            //     //*** */
            // })
            body: JSON.stringify({
                message: isPairPrompting ? input : chatType === 'gpt' ? gptInput : bardInput,
                isPairPrompting,
                model: chatType

            })
        });

        if (response.ok) {
            try {
                const data = await response.json();
                if (data.gptResponse) {
                  const gptMessage = { user: "gpt", message: data.gptResponse };
            //
                  newGptChatLog[newGptChatLog.length-1].aiMessage= gptMessage;
            //
                  setGptChatLog([...newGptChatLog]);
                }
                if (data.bardResponse) {
                  const bardMessage = { user: "bard", message: data.bardResponse };
                  newBardChatLog[newBardChatLog.length-1].aiMessage = bardMessage;
                  setBardChatLog([...newBardChatLog]);
                }
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
            <div className="ChatInterface">
                <div className="chat-box">
                    <div className="chat-log1">
                        <div className="chat-banner1">
                            <img src="src\assets\Rectangle40.png" alt="" />
                            <div className="banner-overlay-text-gpt">
                                 <h3>GPT</h3>
                            </div>
                            
                        </div>
                        {gptChatLog.map((chatPair,index)=>  (
                            <div className="parentchat">
                                 <ChatMessage key={index} chatPair={chatPair}/>
                            </div>
                           
                        ))}
                        
                       
                    </div>

    {/* ........................................................................................ */}


    <              div className="chat-log2">
                        <div className="chat-banner2">
                            <h3>BARD</h3>
                        </div>
                        {bardChatLog.map((chatPair,index)=>  (
                            <ChatMessage2 key={index} chatPair={chatPair}/>
                        ))}
                        
                       
                    </div>

                </div>

                <div className="prompt_area">
                        {isPairPrompting?
                        (<div>
                            {/* calling the handle sbubmit function on submitting the form */}
                            <form className="prompt_area-form" onSubmit={handleSubmit}>    
                            <input 
                                value={input}
                                onChange={
                                    (e)=> setInput(e.target.value)  //setinput as content typed by user
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
const ChatMessage = ({chatPair}) => {
      if (!chatPair || !chatPair.userMessage) {
        return null; // Return null if chatPair or userMessage is undefined
     }
    return (
        <div className="chat-parent">  
            <div className={`chat-message ${chatPair.userMessage.user === "gpt" ? "chatgpt" : ""}`}>
                <div className="test">
                    
                    <div className="question-left">
                        <div className="question-and-avatar">
                            <div className={`avatar ${chatPair.userMessage.user === "gpt" ? "chatgpt" : ""}`}> </div>
                            <div>
                                {chatPair.userMessage.message}
                            </div>  
                        </div>
                                                                                                             
                        
                    <div className="answer-left">
                        {chatPair.aiMessage && <p>{chatPair.aiMessage.message}</p>}
                    </div>
                    </div>
                    
                    
                   
                </div>
            </div>
        </div>

    )
}
const ChatMessage2 = ({chatPair}) => {
      if (!chatPair || !chatPair.userMessage) {
         console.log('not working pls check')
         return null; // Return null if chatPair or userMessage is undefined
     } //component
    return (
        


<div className="chat-parent">  
            <div className={`chat-message ${chatPair.userMessage.user === "bard" ? "bardcolor" : ""}`}>
                <div className="test">
                    
                    <div className="question-right">
                        <div className="question-and-avatar">
                            <div className={`avatar ${chatPair.userMessage.user === "bard" ? "bardcolor" : ""}`}> </div>
                            <div>
                                {chatPair.userMessage.message}
                            </div>  
                        </div>
                                                                                                             
                        
                    <div className="answer-right">
                        {chatPair.aiMessage && <p>{chatPair.aiMessage.message}</p>}
                    </div>
                    </div>
                    
                    
                   
                </div>
            </div>
        </div>
    )
}
export default ChatInterface;