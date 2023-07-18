import React from "react";
import { ReactDOM } from "react";
import Navbar from './Navbar';
import Footer from "./Footer";
import ChatInterface from "./ChatInterface";
import Leftinterface from "./leftinterface";

export default function App(){
  return(
    <div>
      {/* <h1>Hello Sid! Let's do this! Let's go!</h1> */}
      <Navbar/>
      <ChatInterface />
      {/* <Leftinterface/> */}
      <Footer/>
    </div>
  )
}