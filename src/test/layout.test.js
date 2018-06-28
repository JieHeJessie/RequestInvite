import React from 'react'
import { createStore,
  applyMiddleware,
  compose } from 'redux'
import { mount, shallow } from 'enzyme'
import { Provider, connect } from 'react-redux'
import ReactDom from 'react-dom'
import thunk from 'redux-thunk';

import ConnectedLayout, { Layout } from '../components/Layout'
//import App from '../components/Layout'
import Reducer from '../reducers/index'
import store from '../store'

let wrapper

const fillin = (byCssSelector, text) => {
  wrapper.find(byCssSelector).first().simulate('change', {target: {value:text}})
}

beforeEach( () => {
  wrapper = mount (
    <Provider store={store}>
        <ConnectedLayout />
    </Provider>
  )
})

describe('User journey', ()=> {
    
  describe('user click on request an invite button', ()=> {
    it('should display a popup request form', ()=> {
      expect(wrapper.find('Button').length).toEqual(1);   
      expect(wrapper.find('.modal-style').length).toEqual(1); 
        
      const preModalStyle = wrapper.find('.modal-style').length;   
      const preInput = wrapper.find('input').length;
      const btn = wrapper.find("Button").at(0);
      btn.simulate('click');
      expect(wrapper.find('.modal-style').length).toEqual(preModalStyle + 1);
      expect(wrapper.find('input').length).toEqual(preInput + 3);
    })
  })

  describe('user fill in the form', ()=> {
    it('should validate the name length > 3', ()=> {
      const btn = wrapper.find("Button").at(0);
      btn.simulate('click');
      const sendBtn = wrapper.find(".send-btn").at(0); 
        
      fillin("#fullName", "Te"); 
      fillin("#email", "test@test.com"); 
      fillin("#confirmEmail", "test@test.com");  
      sendBtn.simulate('submit');
      expect(wrapper.find('.error-text').length).toEqual(1);    
    }),
      
    it('should validate the email and confirm email', ()=> {
      const btn = wrapper.find("Button").at(0);
      btn.simulate('click');
      const sendBtn = wrapper.find(".send-btn").at(0); 
        
      fillin("#fullName", "Te"); 
      fillin("#email", "1@test.com"); 
      fillin("#confirmEmail", "2@test.com");  
      sendBtn.simulate('submit');
      expect(wrapper.find('.error-text').length).toEqual(2);    
    }),
      
    it('should validate the empty form', ()=> {
      const btn = wrapper.find("Button").at(0);
      btn.simulate('click');
      const sendBtn = wrapper.find(".send-btn").at(0); 
        
      fillin("#fullName", ""); 
      fillin("#email", ""); 
      fillin("#confirmEmail", "");  
      sendBtn.simulate('submit');
      expect(wrapper.find('.error-text').length).toEqual(3);    
    }),
        
    it('should pass validation with valid value', ()=> {
      const btn = wrapper.find("Button").at(0);
      btn.simulate('click');
      const sendBtn = wrapper.find(".send-btn").at(0); 
        
      fillin("#fullName", "Test"); 
      fillin("#email", "test@test.com"); 
      fillin("#confirmEmail", "test@test.com");  
      sendBtn.simulate('submit');
      expect(wrapper.find('.error-text').length).toEqual(0);    
    })
  })
  
})

