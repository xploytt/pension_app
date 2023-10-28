import React from 'react';
import spinner from '../assets/Spinner-1s-200px.svg'

function SmallWidget({text}) {
    return (
        <>
            <div className='small-overlay-widget'>
                <div className='spinner-div'>
                    <img alt='spinner' src={spinner} />
                </div>
                {text}
            </div>
            
        </>
    );
}

export default SmallWidget;