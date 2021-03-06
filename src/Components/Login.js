import React, { Component } from 'react';
import {Modal, Card, Icon, Button, Header, Input} from 'semantic-ui-react'

class Login extends Component{
  render(){
    return(
        <Modal size='tiny' style={{width:'auto'}} trigger={<Button primary onClick={()=>{
          this.props.onOpen()
        }} >Check Your PC</Button>}  open={this.props.modalOpen}
        onClose={this.props.onClose}>
          <Modal.Content>
            <Card>
              <Card.Content>
                <Header as='h2' icon textAlign='center'>
                  <Icon size='tiny' name='computer' circular />
                  <Header.Content>Check Your Computer</Header.Content>
                </Header>
              </Card.Content>
              <Card.Content style={{display:'flex', justifyContent:'center', alignItems:'center', flexWrap:'wrap'}}>
                <Input onChange={this.props.onIdChange.bind(this)} style={{margin:'5px'}} className="cp-id" size='large' icon='computer' iconPosition='left' placeholder='Computer id ...' />
                <Input onChange={this.props.onPasswordChange.bind(this)} type='password' style={{margin:'5px'}} className="cp-pw" size='large' icon='key' iconPosition='left' placeholder='Computer password ...' />
                <Modal.Actions>
                  <Button size='large' color='linkedin' onClick={()=>{
                    this.props.onLogin()
                    this.props.onClose()
                    }} inverted animated>
                    <Button.Content visible>Search</Button.Content>
                    <Button.Content hidden>
                      <Icon name='search' />
                    </Button.Content>
                  </Button>
                </Modal.Actions>
              </Card.Content>
            </Card>
          </Modal.Content>
        </Modal>
      );
  }
}

export default Login;