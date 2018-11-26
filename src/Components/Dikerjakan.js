import React, { Component } from 'react';
import {Grid, Image, Label, Card, Divider} from 'semantic-ui-react'

class Dikerjakan extends Component{
	constructor(props){
		super(props)
    this.state = {
    }
	}
  
	render(){
		return(
      <React.Fragment>
        <Divider horizontal>Informasi Teknisi</Divider>
        <Card fluid>
          <Card.Content>
            <Image size='mini' style={{margin:'10px'}} floated='right' src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
            <Card.Header>Robert Downey Jr</Card.Header>
            <Card.Meta>
              <span className='date'>Joined in 2015</span>
            </Card.Meta>
            <Card.Description>Komputer anda sedang dikerjakan</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Card fluid>
              <Grid columns='two' verticalAlign='middle' padded>
                <Grid.Row >
                  <Grid.Column>
                    Inul Windows Xp
                  </Grid.Column>
                  <Grid.Column textAlign='right'>
                    <Label color='blue' style={{width:'110px', margin:'5px'}} tag>
                      Rp.2000000.00
                    </Label>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card>
          </Card.Content>
        </Card>
      </React.Fragment>
		);
	}
}

export default Dikerjakan;