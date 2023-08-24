import express, { response } from 'express';
import * as dotenv from 'dotenv'; 
import cors from 'cors';
import bodyParser from 'body-parser';
import {Configuration,OpenAIApi }from 'openai'
import Bard, { askAI } from "bard-ai";
 import fetch from "node-fetch";
 globalThis.fetch = fetch;

dotenv.config();


// Initialize OpenAI with your key
const configuration = new Configuration ({
    apiKey: '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',
    //apiKey: process.env.OPEN_API_KEY,
    
});
const openai = new OpenAIApi(configuration);


 const COOKIE_KEY="aAgyVdX6Tq5aRsimtt42LGWs06TksTRxwWrzwQXhVI2feFmjiyp3b6JnU_LEYVte7qZhJA."
 // Initialize Bard with your COOKIE_KEY
 await Bard.init(COOKIE_KEY);


const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended : true}))

let myConversation = new Bard.Chat();

app.post('/', async (req, res) => {
  try {
    const { message,isPairPrompting,model } = req.body;

    if(isPairPrompting){
      //handle option a
      //SEND REQUEST TO BOTH GPT AND BARD MODELS
       const gptResponse = await getGptResponse(message);
       const bardResponse = await getBardResponse(message);

       res.json({
          gptResponse : gptResponse,
          bardResponse : bardResponse
       });

      /*const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        temperature: 0.5,
        max_tokens: 160,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
  
      // Generate response from Bard
       let myConversation = new Bard.Chat();
       //curtain in try catch block
  
       try{
        const bardResult = await myConversation.ask(message);
      
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
*/
    }
    else{

      if(model === 'gpt'){
        const gptResponse = await getGptResponse(message);
        res.json({gptResponse : gptResponse});
      }
      else if
        (model === 'bard'){
          const bardResponse = await  getBardResponse(message);
          res.json({bardResponse : bardResponse});
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
      const bardResult = await myConversation.ask(message);
      return bardResult;
    } catch (bardError) {
      console.error('Bard Error:', bardError);
      return bardError.message;
    }
  }
      
      //handle option B
     /* const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        temperature: 0.5,
        max_tokens: 160,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });



      // Generate response from Bard
      let myConversation = new Bard.Chat();
      //curtain in try catch block
 
      try{
       const bardResult = await myConversation.ask(message);
     
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
    // Generate response from GPT
  
     
  } catch (error) {
    console.log(error);
    res.status(500).send({ error })
  }
});
*/

app.listen(5000, () => console.log('Server running on port 5000'));
