import PaLM from "palm-api";
import fetch from 'node-fetch';

globalThis.fetch = fetch;
//configDotenv.conig();




 let bot = new PaLM(KEY,{
    fetch:fetch,
 });
//await PaLM.init(KEY);

let chat =  bot.createChat([{
    temperature:0.2
}]);

console.log(await chat.ask("how can I improve my self-confidence"));
chat.export();