
import React from "react"
import { connect } from "react-redux"
import { postUser, resetUser } from "../actions/userActions"
import { Button, Modal, ModalHeader } from 'reactstrap'
import RequestForm from "./RequestForm"

export class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnText:"Send", 
      formModal: false,

      success: props.success,
      showError: props.showError,
      errorMessage: props.errorMessage
    }

    this.submit = this.submit.bind(this);
    this.switchToggle = this.switchToggle.bind(this);
    this.showModalContent = this.showModalContent.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      success: newProps.success,
      showError: newProps.showError,
      errorMessage: newProps.errorMessage
    });
  }
  
  switchToggle() {
    this.props.dispatch(resetUser());
    this.setState({
      formModal: !this.state.formModal
    });
  }

  submit(value){
    this.props.dispatch(postUser(value.fullName, value.email));
  }

  showModalContent(){
    if(this.state.success === true){
      return(

        <Modal className="modal-style" isOpen={this.state.formModal} toggle={this.switchToggle} >   
          <h1>All Done!</h1>
          <p>You will be one of BROCCOLI & CO. user.</p>
          <Button className="ok-btn" onClick={this.switchToggle}>OK</Button>
        </Modal>

        );
    }else{
      return(
        <Modal className="modal-style" isOpen={this.state.formModal} toggle={this.switchToggle} >                
          <ModalHeader toggle={this.switchToggle}>Request an invite</ModalHeader>
          <RequestForm onSubmit={this.submit}/>
          {this.state.showError ? <span className="error-message">{this.state.errorMessage}</span> : null}
        </Modal>
      );
    }
  }

  render() {
    return (
      <div>  
        <div className="header">
          <a href="#default" className="logo">BROCCOLI & CO.</a>
        </div>
        <div className="content">
          <h1>A better way to enjoy</h1>
          <h1>everyday</h1>
          <p>Be the first we know when we launch</p>
          <Button onClick={this.switchToggle}>Request an invite</Button>
          {this.showModalContent()}
        </div>

        <footer>
        <p>@ Copyright BROCCOLI & CO. Technologies 2018</p>
        </footer>
      </div>      
      );
  }
}

const stateMap = (store) => {
    return {
      success: store.user.success,
      showError: store.user.showError,
      errorMessage: store.user.errorMessage
    };
};

export default connect(stateMap)(Layout);
