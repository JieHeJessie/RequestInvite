export default function reducer(state={
    fetching: false,
    success: false,
    showError: false,
    errorMessage: ''
  }, action) {

    switch (action.type) {
      case "POST_USER": {
        return {
          ...state, 
          fetching: true}
      }
      case "POST_USER_REJECTED": {
        return {
          ...state, 
          fetching: false, 
          success: false,
          showError: true,
          errorMessage: action.info.data.errorMessage}
      }
      case "POST_USER_FULFILLED": {
        return {
          ...state,
          fetching: false, 
          success: true,
          showError: false
        }
      }
      case "RESET_USER": {
         return{
          ...state,
          fetching: false, 
          success: false,
          showError: false                
        }
      }
    }

    return state
}
