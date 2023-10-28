import React, {useEffect, useReducer, useRef, useState} from 'react';
import '../styles/pension-main.css'
import * as EmailValidator from "email-validator"
import SmallWidget from '../components/SmallWidget';
import PfaTable from '../components/PfaTable';
import getPfaData from '../utils/getPfaData';
import proccessEmployerDetails from '../utils/getEmployersDetails';
import EmployerNameWidget from '../components/EmployerNameWidget';
import employerScheduleUpload from '../utils/uploadEmployerSchedule';
import { Link } from 'react-router-dom';

function validateEmail(email) {
    return EmailValidator.validate(email);
}

function updateProcess(state, action){
    switch(action.type){
        case 'none': {
            return {process: 'none'}
        };

        case 'getPfa': {
            return {process: 'getPfa'}
        };

        case 'getEmployerDetails': {
            return {process: 'getEmployerDetails'}
        };

        case 'uploadSchedule': {
            return {process: 'uploadSchedule'}
        };

    }
}

function MainPension({setScheduleList, pensionDetails, updatePensionDetails}) {
    const [overlayJsx, setOverlayJsx] = useState(null)
    const [pfaData, setPfaData] = useState([])
    const [processState, dispatchProcess] = useReducer(updateProcess, {
        process: 'none',
      });
    const employerNameRef = useRef(null)
    const employerCodeEl = useRef(null)
    const scheduleLink = useRef(null)
    const emailInputRef = useRef(null)
    

    async function getEmployerName() {
        const employerName = await proccessEmployerDetails(pensionDetails.employerCode)
        updatePensionDetails(prev => ({
            ...prev,
            employerName
        }));
        if (employerName) {
            dispatchProcess({type:'none'})
        }else{
            setOverlayJsx(<EmployerNameWidget dispatchProcess={dispatchProcess} />)
        }
    }

    async function uploadSchedule(){
        const scheduleResponse = await employerScheduleUpload(pensionDetails)
        setScheduleList(()=> scheduleResponse)
        scheduleLink.current.click()
    }

    useEffect(()=>{
        if (employerCodeEl) employerCodeEl.current.focus()
    }, [])

    useEffect(()=> { 
        let proccess = processState.process

        switch(proccess){
            case 'uploadSchedule':
                setOverlayJsx(
                <SmallWidget text={<>
                    <p>This would take a moment</p>
                    <p>We are validating your schedule</p>
                </>}/>)
                uploadSchedule()
                break;
                
            case 'getEmployerDetails':
                    setOverlayJsx(<SmallWidget text={<>
                        <p>This would take a moment</p>
                        <p>We are getting employer's name</p>
                    </>}/>)
                    getEmployerName()
                break;

            case 'getPfa':
                setOverlayJsx(
                    <PfaTable pfaData={pfaData} callback={()=>{
                        dispatchProcess({type:'none'})
                    }}/>
                )
                break
            default:
                //process is None
                setOverlayJsx('')
                return
        }
    }, [processState])


    useEffect(() => {
        (async ()=> {

            getPfaData()
              .then(data => {
                  if (data != undefined && data.length !== 0){
                      setPfaData(data);
                  }
              })
              .catch((error) => {
                  console.error('Error:', error);
              });
        })()

      }, []);



      function updateInputChange(e) {
        const { name, value, files } = e.target;
      
        updatePensionDetails((prev) => ({
          ...prev,
          [name]: name === 'rsaSchedule' ? files[0] : value,
        }));
      }

    const submitPensionDetails = (e)=>{
        e.preventDefault()

        if(!pensionDetails.employerName){
            employerNameRef.current.classList.add('err')
            return
        }else{
            employerNameRef.current.classList.remove('err')
        }

        if(validateEmail(pensionDetails.email)){
            emailInputRef.current.classList.remove('err')
        }else{
            emailInputRef.current.classList.add('err')
            return
        }

        // proceed to create a new process and send the form to the backend:
        dispatchProcess({type:'uploadSchedule'})

    }

    return (
        <>
        <section id='hero'>
            <Link ref={scheduleLink} to="/schedule" style={{
                display: 'none'
            }}>Go to Schedule</Link>
            <div>
            <h2>
                Pension Remittance
            </h2>
            <span>Fill in the appropriate details</span>

            <div id='form-div'>
                <form onSubmit={submitPensionDetails}>
                    <div>
                        <label htmlFor= 'employer-code-input'>
                            Employer Code
                        </label>
                        <input type='text' id='employer-code-input' placeholder='Code' required name='employerCode' ref={employerCodeEl} value={pensionDetails.employerCode} 
                        onChange={(e)=> updateInputChange(e)}
                        onBlur={
                            (e)=>{
                                if(pensionDetails.employerCode.length > 0){
                                    dispatchProcess({type:'getEmployerDetails'})
                                }
                            }
                        }/>
                    </div>

                    <div>
                        <label htmlFor= 'employer-name-input'>
                            Employer Name
                        </label>
                        <input ref={employerNameRef} type='text' required id='employer-name-input' placeholder='John Doe' disabled value={pensionDetails.employerName} name='employerName' onChange={(e)=> updateInputChange(e)}/>
                    </div>

                    <div>
                        <label htmlFor= 'file-upload-input'>
                            File Upload
                        </label>
                        <div id='file-input-div'>
                        <input accept='.csv' type='file' id='file-upload-input' name='rsaSchedule' required onChange={(e)=> updateInputChange(e)}/> 
                        
                        <button id='pfa-btn' type='button' onClick={()=>{
                            dispatchProcess({type:'getPfa'})
                        }}>View PFA Code</button>
                        </div>
                    </div>

                    <div id='email-phone-div'>
                        <div>
                            <label htmlFor= 'email-address-input'>
                                Email Address
                            </label>
                            <input type='email' required value={pensionDetails.email} name='email' ref={emailInputRef} id='email-address-input' placeholder='johndoe@xyz.com' onChange={(e)=> updateInputChange(e)}/>
                        </div>

                        <div>
                            <label htmlFor= 'tel-input'>
                                Phone Number
                            </label>
                            <input pattern="^\d{11}$" type='text' required name='phoneDetails' id='tel-input' placeholder='123456789' value={pensionDetails.phoneDetails} onChange={(e)=> updateInputChange(e)}/>

                            <br/>
                            <span>Keep 11-digit formats with no spaces.</span>
                        </div>
                    </div>

                    <div>
                        <button id='submit-btn' className='blue-btn' type='submit'>Submit</button>
                    </div>
                </form>
            </div>
            </div>
        </section>
        {
            processState.process != 'none' && 
            <div className='overlay-div'>
                {overlayJsx}
               
            </div>
        } 
        </>
    );
}

export default MainPension;