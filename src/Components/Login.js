import React, { Component } from 'react';
import {Modal, Card, Icon, Button, Header, Input} from 'semantic-ui-react'
import './Login.css';
import Fade from 'react-reveal/Fade';

class Login extends Component{
  render(){
    return(
        <Modal size='tiny' style={{width:'auto'}} trigger={<Button primary onClick={this.props.onOpen} >Check Your PC</Button>}  open={this.props.modalOpen}
        onClose={this.props.onClose}>
        <Fade>
          <Modal.Content>
            <Card>
              <Card.Content>
                <Header as='h2' icon textAlign='center'>
                  <Icon size='tiny' name='computer' circular />
                  <Header.Content>Check Your Computer</Header.Content>
                </Header>
              </Card.Content>
              <Card.Content style={{display:'flex', justifyContent:'center', alignItems:'center', flexWrap:'wrap'}}>
                <Input style={{margin:'5px'}} className="cp-id" size='large' icon='computer' iconPosition='left' placeholder='Computer id ...' />
                <Input type='password' style={{margin:'5px'}} className="cp-pw" size='large' icon='key' iconPosition='left' placeholder='Computer password ...' />
                <Modal.Actions>
                  <Button size='large' color='linkedin' onClick={this.props.onLogin} inverted animated>
                    <Button.Content visible>Search</Button.Content>
                    <Button.Content hidden>
                      <Icon name='search' />
                    </Button.Content>
                  </Button>
                </Modal.Actions>
              </Card.Content>
            </Card>
          </Modal.Content>
        </Fade>
        </Modal>
      );
  }
}

export default Login;