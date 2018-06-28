import axios from "axios";
import { startSubmit, stopSubmit } from 'redux-form';

export function postUser(userName, userEmail) {
  return function(dispatch) {
    dispatch(startSubmit('request'));
    dispatch({type: "POST_USER"});

    return axios({
	  method: 'post',
	  url: 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth',
	  data: {
	    name: userName,
	    email: userEmail
	  }
	})
	.then((response) => {
	  dispatch(stopSubmit('request'))
	  dispatch({type: "POST_USER_FULFILLED"})
	})
	.catch((err) => {
	  dispatch(stopSubmit('request'))
	  dispatch({type: "POST_USER_REJECTED", info: err.response})
	});
  }
}

export function resetUser(){
    return function(dispatch){
         dispatch({type: "RESET_USER"});
    }
}