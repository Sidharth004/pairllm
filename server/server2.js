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
    
});
const openai = new OpenAIApi(configuration);


 const COOKIE_KEY="ZQgyVTX0iUKb_0TqMlibHljWqg3PMA6EQsdpfM6RYERuo2EFqDkwIMR4HZr40oFUj8IS5w."
 // Initialize Bard with your COOKIE_KEY
 await Bard.init(COOKIE_KEY);


const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended : true}))

app.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    // Generate response from GPT
    const response = await openai.createCompletion({
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
     const bardResult = await myConversation.ask(message);
    
    res.json({
      message: response.data.choices[0].text,
      bardResponse: bardResult
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error })
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
