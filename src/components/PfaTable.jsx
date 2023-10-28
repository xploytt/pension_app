import React from 'react';
import {FaTimes} from 'react-icons/fa'
import '../styles/pfa.css'

function PfaTable({pfaData, callback}) {
    return (
        <div id='pfa-wrapper'>
            <div>
                <h4>PFA Codes</h4>
                <button className='times-default-btn' onClick={()=>{
                    callback()
                }}>
                <FaTimes className='times-svg' />
                </button>
            </div>
                <div>
                <table id='pfaTable'>
                <thead>
                    <tr>
                        <th>PFA</th>
                        <th>PFA Code</th>
                    </tr>
                </thead>
                
                <tbody>
                    {
                        pfaData.map(({pfa_name, pfa_code}, i) => 
                            <tr key={i}>
                                <td>
                                    {pfa_name}
                                </td>
                                <td>
                                    {pfa_code}
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default PfaTable;