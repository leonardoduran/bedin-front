import * as AppActions from './actions';
import fetch from 'isomorphic-fetch';
import * as config from '../config/config';

export function patientsRequest() {
  return {
    type: AppActions.PATIENTS_RECEIVED
  }
}

export function isAddingRequestPatient() {
  return {
    type: AppActions.ADDING_PATIENT_REQUEST
  }
}
export function requestPatientEnd() {
  return {
    type: AppActions.PATIENT_REQUEST_END
  }
}

export function addingPatient(requestPatient) {
  return (dispatch) => {
    dispatch(isAddingRequestPatient());
    return fetch(`${config.API_URL}patient/addRequest`, { 
        method: 'POST',
        headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },        
      body: JSON.stringify({
        requestPatient
      })
    })
      .then(function(response) {
        return response.json()
      })
      .then(function(body) {
        dispatch(requestPatientEnd())
      })
      .catch(function(error){
        console.log("Error", error)
        dispatch(requestPatientEnd())
      })
  }
};
