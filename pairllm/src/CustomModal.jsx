import React from "react";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const CustomModal =({open,onClose,onOptionChange})=>{
    console.log('MODAL OPEN',open); 
        
    return(
            
            <Modal
            open={open}
            onClose={onClose}
            style={{content : {width:'200px',height:'200px'}}}
            center
            
            >
            
            <button onClick ={()=> onOptionChange('A')}> OPTION A</button>
            <button onClick ={()=>onOptionChange('B')}>OPTION B</button>
            
            </Modal>  
            
        
            
    )
}

export default CustomModal;   