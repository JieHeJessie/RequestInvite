import reducer from '../reducers/userReducer'

describe('user reducer', () => {
    it('should return the initial state', ()=>{
        expect(reducer(undefined, {})).toEqual({
            fetching: false,
            success: false,
            showError: false,
            errorMessage: ''
          })
    })
    
    it('should handle POST_USER'), () => {
        expect(reducer({}, {type: "POST_USER"})).toEqual({
            fetching: true,
            success: false,
            showError: false,
            errorMessage: ''            
        })
    }
    
    it('should handle POST_USER_REJECTED'), () => {
        expect(reducer({}, {type: "POST_USER", info: "Error Test"})).toEqual({
            fetching: false,
            success: false,
            showError: true,
            errorMessage: 'Error Test'            
        })
    }
    
    it('should handle POST_USER_FULFILLED'), () => {
        expect(reducer({}, {type: "POST_USER_FULFILLED"})).toEqual({
            fetching: false,
            success: true,
            showError: false,
            errorMessage: ''            
        })
    }
    
    it('should handle RESET_USER'), () => {
        expect(reducer({}, {type: "RESET_USER"})).toEqual({
            fetching: false,
            success: false,
            showError: false,
            errorMessage: ''            
        })
    }
})