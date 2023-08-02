import { useState } from "react";
import Navbar from "./Navbar";
import ChatInterface from "./ChatInterface";
import CustomModal from "./CustomModal";

const Parent=()=>{
    console.log("parent render")
    const [isPairPrompting, setIsPairPrompting] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(true);

    const openModal =()=>{
        console.log("openmodalll fn called");
        setIsModalOpen(true)
    }

    const handleOptionChange = (option) =>{
        setIsPairPrompting(option === 'A'); //add condition
        setIsModalOpen(false);
    }

    return(
        <div>
            <Navbar
                openModal = {openModal}
            />

            <ChatInterface 
            isPairPrompting = {isPairPrompting}     
            />

            <CustomModal
            open = {isModalOpen}
            onClose={()=>setIsModalOpen(false)}
            onOptionChange={handleOptionChange}
            />

        </div>
    )
   
}
export default Parent;
