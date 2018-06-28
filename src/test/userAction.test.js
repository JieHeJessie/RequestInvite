import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../actions/userActions'
import fetchMock from 'fetch-mock'
import expect from 'expect'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('creates success post when request invite with different actions', () => {
    const userName = "test";
    const userEmail = "test@test.com";  

    const expectedActions = [
      { type: '@@redux-form/START_SUBMIT'},
      { type: "POST_USER"},
      { type: '@@redux-form/STOP_SUBMIT'},
      { type: "POST_USER_FULFILLED"}
    ]
    const store = mockStore({
        fetching: false,
        fetched: false,
        success: false,
        showError: false,
        errorMessage: ''
      })
    
    return store.dispatch(actions.postUser(userName, userEmail)).then(() => {
      const allActions = store.getActions();
      const foundAll = expectedActions.every(
          ea => allActions.filter(
              aa => aa.type == ea.type).length > 0);      
      expect(foundAll).toEqual(true);
        
    })
  })
})