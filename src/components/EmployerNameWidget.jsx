import React from 'react';
import { FaTimes } from 'react-icons/fa';

function EmployerNameWidget({dispatchProcess}) {
    const buttonStyles = {
        width: '50px',
        height: '50px',
        display: "block",
        marginLeft: "auto"
    }

    const textStyle = {
        width: '90%',
        margin: '10px auto 20px',
        fontWeight: '600'

    }

    const overLayStyles = {
        display: 'block',
        height: '150px',
        padding: '1rem',
        transform: 'translateY(200%)',
    }
    return (
        <>
            <div className='small-overlay-widget' style={overLayStyles}>
                <div>
                    <button className='times-default-btn' style={buttonStyles} onClick={()=>{
                        dispatchProcess({type:'none'})
                    }}>
                        <FaTimes className='times-svg'/>
                    </button>
                </div>
                <p style={textStyle}>Unable to get Employer Name.. Please verify employer code and try again!</p>
            </div>  
        </>
    );
}

export default EmployerNameWidget;