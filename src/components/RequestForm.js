import React from 'react'
import { Field, reduxForm } from 'redux-form'

const required = value => value ? undefined : 'Required'
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
const minLength3 = minLength(3)

const renderField = ({ input, label, type, placeholder, meta: { touched, error, warning } }) => (
    <div>
      <input {...input} id={label} placeholder={placeholder} type={type}/>
      {touched && ((error && <span className="error-text">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
)

const validate = values => {
  const errors = {}
  if(values.email !== values.confirmEmail){
    errors.confirmEmail = 'Email Mismatched'
  }
  return errors
}

let RequestForm = props => {
  const { handleSubmit, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      
        <Field name="fullName"
          type="text" 
          placeholder="Full Name" 
          component={renderField} label="fullName"         
          validate={[required, minLength3]}/>

        <Field name="email" 
          type="email" 
          placeholder="Email" 
          label="email"
          component={renderField}
          validate={[required]}/>
     
        <Field name="confirmEmail" 
          type="email"
          placeholder="Confirm Email" 
          label="confirmEmail"
          component={renderField}
          validate={[required]}/>
      
      <button className="send-btn" type="submit" disabled={submitting}>
          {submitting ? "Sending, please wait" : "Submit"}
      </button>
    </form>
  )
}

RequestForm = reduxForm({
  // a unique name for the form
  form: 'request',
  validate
})(RequestForm)

export default RequestForm