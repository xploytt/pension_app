MainPension Component Documentation

The MainPension component is a React functional component that handles the pension remittance feature. It contains various hooks, functions, and state variables to manage the form submission and data processing.
State Variables

- overlayJsx: Stores the JSX element to be displayed as an overlay during certain processes.
- pfaData: Stores an array of PFA data.
- processState: Manages the current process state using the updateProcess reducer.
- employerNameRef, employerCodeEl, scheduleLink, emailInputRef: Refs used to reference DOM elements.
- pensionDetails: Stores the form input values for pension details.
Hooks
useEffect

- The first useEffect hook is used to focus on the employerCodeEl input element when the component mounts.
- The second useEffect hook is used to fetch PFA data using the getPfaData function and update the pfaData state variable.
- The third useEffect hook is triggered whenever the processState changes. It handles different processes based on the processState value.
useReducer

- The useReducer hook is used to manage the processState state variable. It uses the updateProcess reducer function to update the state based on different action types.
Functions
updateProcess

- This function is a reducer function used by the useReducer hook to update the processState state variable based on different action types.
getEmployerName

- This asynchronous function is called when the employer details are required. It uses the proccessEmployerDetails function to fetch the employer name based on the pensionDetails.employerCode value. If the employer name is found, it updates the pensionDetails state and sets the processState to 'none'. Otherwise, it sets the overlayJsx state to display the EmployerNameWidget component.
uploadSchedule

- This asynchronous function is called when the schedule needs to be uploaded. It uses the employerScheduleUpload function to upload the schedule based on the pensionDetails value. It updates the scheduleList state with the response and triggers a click event on the scheduleLink ref.
updateInputChange

- This function is called when there is a change in the form input fields. It updates the pensionDetails state based on the input field's name and value.
submitPensionDetails

- This function is called when the form is submitted. It validates the form inputs and dispatches the 'uploadSchedule' action to initiate the upload process.
Component Structure

The MainPension component renders a form for pension remittance. It consists of various input fields, labels, and buttons. The form submission triggers the submitPensionDetails function, which validates the inputs and dispatches the appropriate action based on the process state.

During certain processes, an overlay is displayed using the overlayJsx state variable. The overlay content varies based on the current process state.

Please note that this documentation covers the most important aspects of the MainPension component. For more detailed information, please refer to the component's source code.