import fetch from "node-fetch";
globalThis.fetch = fetch;
import Bard, { askAI } from "bard-ai";

const COOKIE_KEY = "YwgyVa-ue0A42KW2d00_SrwhVnZyoncus2cBTTUfoXjtGGUbXOUdFa6I-dqO4tRT4DVcMA."
await Bard.init(COOKIE_KEY);
 
// console.log(await askAI("Hello world!",true));
let myConversation  = new Bard.Chat();

console.log(await myConversation.ask("what is 2+2"))
console.log(await myConversation.ask('Whats the last thing that I said??'));
