import fetch from "node-fetch";
globalThis.fetch = fetch;
import Bard, { askAI } from "bard-ai";


await Bard.init(process.env.COOKIE_KEY);
 
// console.log(await askAI("Hello world!",true));
let myConversation  = new Bard.Chat();

console.log(await myConversation.ask("How are you?"))
console.log(await myConversation.ask('Whats the last thing that I said??'));
