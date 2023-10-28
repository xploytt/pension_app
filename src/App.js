import Header from './components/Header';
import './App.css';
import MainPension from './Pages/MainPension';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Schedule from './Pages/Schedule';
import Invoice from './Pages/Invoice'

function App() {
  const [scheduleList, setScheduleList] = useState(null)
  const [invoiceList, setInvoiceList] = useState(null)
  const [pensionDetails, updatePensionDetails] = useState({
    'employerCode': '',
    'employerName': '',
    'rsaSchedule': '',
    'email': '',
    'phoneDetails': '',
  })
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<MainPension pensionDetails={pensionDetails} updatePensionDetails={updatePensionDetails} setScheduleList={setScheduleList} />}></Route>
          <Route path='/schedule' element={<Schedule scheduleList={scheduleList} pensionDetails={pensionDetails} setInvoiceList={setInvoiceList} />}></Route>
          <Route path='/invoice' element={<Invoice invoiceList={invoiceList} />}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
