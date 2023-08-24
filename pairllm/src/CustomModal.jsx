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
            classNames = {{
                overlay: 'customOverlay',
                modal: 'customModal'
            }}
            
            >
            
            <button onClick ={()=> onOptionChange('A')}> Pair Up</button>
            <button onClick ={()=>onOptionChange('B')}>Separate prompting</button>
            
            </Modal>  
            
        
            
    )
}

export default CustomModal;   