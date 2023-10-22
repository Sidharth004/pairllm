import express, { response } from 'express';
import * as dotenv from 'dotenv'; 
import cors from 'cors';
import bodyParser from 'body-parser';
import {Configuration,OpenAIApi }from 'openai'
import PaLM from "palm-api";
 import fetch from "node-fetch";
 globalThis.fetch = fetch;

dotenv.config();
const configuration = new Configuration ({
    
    apiKey:process.env.OPENAI_API_KEY
   
    
});
const openai = new OpenAIApi(configuration);



 const KEY = process.env.PALM_KEY
 // Initialize Bard with your COOKIE_KEY  
 let bot = new PaLM(KEY,{
    fetch : fetch,
 });


const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended : true}))

let chat = bot.createChat([{
    temperature: 0.4,
    
}]);

app.post('/', async (req, res) => {
  try {
    const { message,isPairPrompting,model } = req.body;

    if(isPairPrompting){
      //handle option a
      //SEND REQUEST TO BOTH GPT AND BARD MODELS
       const gptResponse = await getGptResponse(message);
       //const bardResponse = await getBardResponse(message);
       let bardResponse;
       let bardError;

       try{
        bardResponse = await getBardResponse(message);
       }
       catch(error){
        bardError = error.message;
       }
       res.json({
          gptResponse : gptResponse,
          bardResponse : bardResponse,
          bardError: bardError
       });

    }
  
      // Generate response from Bard
    //    let myConversation = new Bard.Chat();
       //curtain in try catch block
  /*
       try{
        const bardResult = await chat.ask(message);
      
        res.json({
        message: response.data.choices[0].text,
        bardResponse: bardResult
      });
       }
       catch(bardError){
        console.error('Bard Error:', bardError);
        // Send GPT-3 response and Bard error to the client
        res.json({
          message: response.data.choices[0].text,
          bardError: bardError.message
        });
      }

    }
    */
    else{

      if(model === 'gpt'){
        const gptResponse = await getGptResponse(message);
        res.json({gptResponse : gptResponse});
      }
      else if
        (model === 'bard'){
            let bardResponse;
            let bardError;
    
            try{
              bardResponse = await getBardResponse(message);
            }
            catch(error){
              bardError = error.message;
            }
          res.json({bardResponse : bardResponse, bardError: bardError});
        }
      } 
    }
    catch(error){
      console.log(error);
      res.status(500).send({error: 'check the code something is wrong while processing request'})
    }
  });

  async function getGptResponse(message){
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${message}`,
      temperature: 0.5,
      max_tokens: 160,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return response.data.choices[0].text;
  }

  async function getBardResponse(message){
    
    try {
      const bardResult = await chat.ask(message);
      return bardResult;
    } catch (bardError) {
      console.error('Bard Error:', bardError);
      return bardError.message;
    }
  }
      
     

app.listen(5000, () => console.log('Server running on port 5000'));
