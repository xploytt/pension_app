import React from 'react';

function Invoice({invoiceList}) {
    const {employerDetails, scheduleDetails} = invoiceList || {}
    const [{employerCode, employerName, employerPhone, employerEmail}] = employerDetails
    
    return (
        <>
            {invoiceList && 
            <section id='invoice-modal'>
            <div id='modal-wrapper'>
                <div id='table-wrapper'>
                    <ul>
                        <li>Employer Code: {employerCode}</li>
                        <li>Employer Name: {employerName}</li>
                        <li>Employer Email: {employerEmail}</li>
                        <li>Employer Phone: {employerPhone}</li>
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
                </div>
            </div>
        </section>}
        </>
    );
}

export default Invoice;