import React, { useEffect, useRef } from 'react';
import '../styles/schedule.css'
import generatePaymentInvoice from '../utils/getPaymentInvoice';
import { Link } from 'react-router-dom';

function Schedule({scheduleList, pensionDetails, setInvoiceList}) {
    const {scheduleDetails, scheduleId} = scheduleList || {scheduleDetails: []}
    const {employerCode, employerName, email, phoneDetails} = pensionDetails
    const invoiceLink = useRef(null)

    const handlePaymentInvoice = async (e)=>{
        const {id} = e.target
        if(id == 'proceed_btn') {
            const invoice = await generatePaymentInvoice(scheduleId)
            console.log(invoice)
            setInvoiceList(()=>invoice)
            invoiceLink.current.click()
        }else{
            window.location.href = '/'
        }
    }
    return (
        <>
        {scheduleList && 
            <section id='invoice-modal'>
            <Link ref={invoiceLink} to="/invoice" style={{
                display: 'none'
            }}>Go to Schedule</Link>
            <div id='modal-wrapper'>
                <div id='table-wrapper'>
                    <ul>
                        <li>Employer Code: {employerCode}</li>
                        <li>Employer Name: {employerName}</li>
                        <li>Employer Email: {email}</li>
                        <li>Employer Phone: {phoneDetails}</li>
                    </ul>

                    <table id='schedule-table'>
                        <thead>
                            <tr>
                                <th>SN</th>
                                <th>PFA-NAME</th>
                                <th id='no-rsa'>Total Records</th>
                                <th>AMOUNT</th>
                            </tr>
                        </thead>
                        <tbody>
                           {
                            scheduleDetails.map(({pfaCode, pfaName, totalRecords, totalAmount}, i) =>
                            <tr key={pfaCode}>
                                <td>{i+1}</td>
                                <td>{pfaName}</td>
                                <td>{totalRecords}</td>
                                <td>{Number(totalAmount).toLocaleString('en-US', {maximumFractionDigits: 2})}</td>
                            </tr>
                            )
                           }
                        </tbody>
                    </table>

                    <div id='modal_btns'>
                    <button id='proceed_btn' onClick={handlePaymentInvoice}>
                           Proceed
                    </button>
                    <button id='decline_btn' onClick={handlePaymentInvoice}>
                           Decline
                    </button>
                </div>
                </div>
                
            </div>
        </section>}
        </>
    );
}

export default Schedule;