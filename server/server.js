import express from 'express';
import * as dotenv from 'dotenv'; 
import cors from 'cors'; 
import {Configuration,OpenAIApi }from 'openai'

dotenv.config();

const configuration = new Configuration ({
    // apiKey: process.env.OPENAI_API_KEY,
    
});

const openai = new OpenAIApi(configuration);




const app = express();
app.use(cors());
app.use(express.json());

//dummy route

app.get('/',async(req,res)=>{
    res.status(200).send({
        message:'lets go Sid!',
    })
});

app.post('/',async(req,res)=>{
    try {
        const propmt = req.body.propmt;

        
         const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: `${prompt}`,
                //prompt:'Say this is a test',
                temperature: 0.58,
                max_tokens: 3500,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
                
            });
            console.log(response.data.choices[0].text)
        res.status(200).send({
            bot: response.data.choices[0].text 
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error })
    }
});

app.listen(5000,()=> console.log('server is running on port http://localhost:5000'))
