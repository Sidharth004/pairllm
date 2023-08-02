import fetch from "node-fetch";
globalThis.fetch = fetch;
import Bard, { askAI } from "bard-ai";

const COOKIE_KEY = "ZQgyVTX0iUKb_0TqMlibHljWqg3PMA6EQsdpfM6RYERuo2EFqDkwIMR4HZr40oFUj8IS5w."
await Bard.init(COOKIE_KEY);
 
// console.log(await askAI("Hello world!",true));
let myConversation  = new Bard.Chat();

console.log(await myConversation.ask("what is 2+2"))
console.log(await myConversation.ask('Whats the last thing that I said??'));
