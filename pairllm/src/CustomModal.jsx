import React from "react";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './CustomModal.css';

const CustomModal =({open,onClose,onOptionChange})=>{
    console.log('MODAL OPEN',open); 
        
    return(
            
            <Modal
            open={open}
            onClose={onClose}
            // style={{content : {width:100,height:'200px'}}}
            center
            classNames = {{
                overlay: 'customOverlay',
                modal: 'customModal'
            }}
            
            >
            <div className="modal-content-parent">
                <div className="modal-content1">
                    <p>Single prompt applied to both the models.</p>
                    <img src="src\assets\chat_opt_A.png" alt="" />
                    <button className="modal-btn" onClick ={()=> onOptionChange('A')}> pair prompting</button>
                </div>
                <div className="modal-content2">
                    <p>Separate prompt bars for each model.</p>
                    <img src="src\assets\chat_opt_B.png" alt="" />
                    <button className="modal-btn" onClick ={()=>onOptionChange('B')}>solo prompting</button>
                </div>
            </div>
           
            
           
            
           
            
            </Modal>  
            
        
            
    )
}

export default CustomModal;   