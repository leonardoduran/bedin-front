import * as AppActions from './actions';
import User from '../models/user';
import fetch from 'isomorphic-fetch';
import * as Errors from '../models/errorMessages';
import * as config from '../config/config';
// export const API_URL ='http://127.0.0.1:3001/';

export function isRegistering() {
  // Está ejecutando el proceso de registro (tiempo de demora de la rta del servidor)
  return {
    type: AppActions.REGISTERING_USER
  }
}

export function registryOk(data) {
  // Se dio de alta el nuevo usuario en la BD
  alert("Nuevo usuario registrado!!!")
  return {
    type: AppActions.REGISTERING_USER_OK,
    data
  }
}

export function registryNoOK(data) {
  return {
    type: AppActions.LOGOUT_USER,
    data
  }
}

export function registeringUser(user: User) {
  return (dispatch) => {
    dispatch(isRegistering());
    return fetch(`${config.API_URL}users/register`, { 
        method: 'POST',
		    headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json',
		},        
	  	body: JSON.stringify({
			user
	  	})
	  })
      .then(function(response) {
        return response.json()
      })
      .then(function(body) {
        if(!body.error)
          return dispatch(registryOk(body))      
        else
          dispatch(registryNoOK(body))
          switch(body.msj){
            case Errors.UserExistsError:
              return alert("El usuario ingresado ya se encuentra registrado");
            default:

              return alert(body.msj);
          }
      })
      // .catch(function(error){
      //   console.log("Error", error)
      // })
  }
};



// Pasos al ejecutar loginUser:
//                              1- Cambiar el estado a USER_ISLOGIN ("procesando")
//                              2- Post al API
//                              3- Rta OK    -> Cambiar el estado a LOGIN_USER
//                                 Rta ERROR -> Cambiar el estado a LOGOUT_USER

export function loginUserNoOK(){
  return{
    type: AppActions.LOGOUT_USER
  }
}

export function loginUserOK(user,hospitalName){
  return{
    type: AppActions.LOGIN_USER,
    user,
    hospitalName
  }
}
// username: user.username,

export function isLoginUser() {
  // Está ejecutando el proceso de registro (tiempo de demora de la rta del servidor)
  return {
    type: AppActions.IS_LOGIN_USER
  }
}

  // let body= JSON.stringify({username, pwd});
  // let headers= new Headers({'Content-Type':'application/json'});
  // let options = new RequestOptions({headers: headers,withCredentials: true});

export function loginUser(user: User) {
  return (dispatch) => {
    dispatch(isLoginUser());
    return fetch(`${config.API_URL}users/login`, { 
        method: 'POST',
        headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }, 
      credentials: 'include',
      body: JSON.stringify({
        username: user.username,
        password: user.password
      })
    })
      .then(function(response) {
        return response.json()
      })
      .then(function(body) {
        if(!body.error)
          dispatch(loginUserOK(body.user,body.hospital))
        else
          {
            alert(body.msj);
            dispatch(loginUserNoOK())
          }
      })
      .catch(function(error) {  
        console.log('Request failed', error) 
      })
  }
}

export function isLogoutUser(){
  return{
    type: AppActions.IS_LOGOUT_USER
  }
}

export function logoutUserOK(){
  return{
    type: AppActions.LOGOUT_USER
  }
}

export function logoutUser(user: User) {
  return (dispatch) => {
    dispatch(isLogoutUser());
    return fetch(`${config.API_URL}users/logout`, { 
        method: 'GET',
        credentials: 'include',
    })
      .then(function(response) {
        return response.json()
      })
      .then(function(body) {
        dispatch(logoutUserOK())
      })
  }
}

export function registryUser() {
  // Click en el link de Registrar Usuario
  return {
    type: AppActions.IS_REGISTRING_USER
  }

}

export function offerBeds(qty) {
  return {
    type: AppActions.OFFER_BEDS,
    qty
  }
}

export function releaseBeds(qty) {
  return {
    type: AppActions.UNOFFER_BEDS,
    qty
  }
}

export function loadRoomsOK(data){
  
  const rooms=data.rooms
  // console.log(rooms)
  let setRoom=new Set(); // Nombre de las salas
 // debugger
  for(var i=0; i<rooms.length;i++){
    setRoom.add(rooms[i].name)
  }

  return{
    type: AppActions.LOAD_ROOMS,
    data:{rooms: Array.from(setRoom)}
  }
}

// export function loadRooms() {
//   return (dispatch) => {
//     return fetch(`${API_URL}rooms`, { 
//       method: 'GET',
//     })
//     .then(function(response) {
//       return response.json()
//     })
//     .then(function(body) {
//       dispatch(loadRoomsOK(body))
//     })
//   }
// }


export function isUpdatingDB() {
  return {
    type: AppActions.UPDATED_DB
  }
};

export function isUpdatingDBEnd() {
  return {
    type: AppActions.UPDATED_DB_END
  }
};

export function addingHospital(hospital) {
  return (dispatch) => {
    dispatch(isUpdatingDB());
    return fetch(`${config.API_URL}hospitals/new`, { 
        method: 'POST',
        headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
      credentials: 'include',
      body: JSON.stringify({
        hospital
      })
    })
      .then(function(response) {
        return response.json()
      })
      .then(function(body) {
        alert("Hospital agregado!")
        dispatch(isUpdatingDBEnd())
      })
      .catch(function(error){
        console.log("Error", error)
        dispatch(isUpdatingDBEnd())
      })
  }
};

export function addingPlan(plan) {
  return (dispatch) => {
    dispatch(isUpdatingDB());
    return fetch(`${config.API_URL}hospitals/newPlan`, { 
        method: 'POST',
        headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
      credentials: 'include',
      body: JSON.stringify({
        plan
      })
    })
      .then(function(response) {
        return response.json()
      })
      .then(function(body) {
        dispatch(isUpdatingDBEnd())
        alert("Plan agregado!")
      })
      .catch(function(error){
        console.log("Error", error)
        dispatch(isUpdatingDBEnd())
      })
  }
};

export function addingHealthCare(healthCare) {
  return (dispatch) => {
    dispatch(isUpdatingDB());
    return fetch(`${config.API_URL}hospitals/newHealthCare`, { 
        method: 'POST',
        headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
      credentials: 'include',
      body: JSON.stringify({
        healthCare
      })
    })
      .then(function(response) {
        return response.json()
      })
      .then(function(body) {
        dispatch(isUpdatingDBEnd())
        alert("Obra social agregada!")
      })
      .catch(function(error){
        console.log("Error", error)
        dispatch(isUpdatingDBEnd())
      })
  }
};

// export function patientsRequest() {
//   return {
//     type: AppActions.PATIENTS_RECEIVED
//   }
// }

// export function isAddingRequestPatient() {
//   return {
//     type: AppActions.ADDING_PATIENT_REQUEST
//   }
// }
// export function requestPatientEnd() {
//   return {
//     type: AppActions.PATIENT_REQUEST_END
//   }
// }

// export function addingPatient(requestPatient) {
//   return (dispatch) => {
//     dispatch(isAddingRequestPatient());
//     return fetch(`${config.API_URL}patient/addRequest`, { 
//         method: 'POST',
//         headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//     },        
//       body: JSON.stringify({
//         requestPatient
//       })
//     })
//       .then(function(response) {
//         return response.json()
//       })
//       .then(function(body) {
//         dispatch(requestPatientEnd())
//       })
//       .catch(function(error){
//         console.log("Error", error)
//         dispatch(requestPatientEnd())
//       })
//   }
// };
