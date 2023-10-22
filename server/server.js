import express, { response } from 'express';
import * as dotenv from 'dotenv'; 
import cors from 'cors'; 
import bodyParser from 'body-parser';
import {Configuration,OpenAIApi }from 'openai'

dotenv.config();

const configuration = new Configuration ({
    apiKey: 'a'
    
    
});

const openai = new OpenAIApi(configuration);




const app = express();
app.use(cors());
app.use(bodyParser.json())
// app.use(express.json());
app.use(express.urlencoded({ extended : true}))

//dummy route

//  

app.post('/',async(req,res)=>{
    try {
        // const propmt = req.body.propmt;
         const {message} = req.body;
        //  console.log(message)
         const response = await openai.createCompletion({
                 model: "text-davinci-003",
                 prompt: `${message}`,
                 
                 temperature: 0.58,
                 max_tokens: 3500,
                 top_p: 1,
                 frequency_penalty: 0,
                 presence_penalty: 0,
                
             });
            //  console.log()

        res.json({
            // data: response.data
            message:response.data.choices[0].text,
        }) 
        // res.status(200).send({
        //     bot: response.data.choices[0].text 
        // })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error })
    }
});

app.listen(5000,()=> console.log('server is running on port http://localhost:5000'))
