import React, { Component } from 'react';
import {Loader, Image, Divider, Card} from 'semantic-ui-react'

class Diambil extends Component{
	constructor(props){
		super(props)
    this.state = {
      loading:true
    }
  }
  componentDidMount(){
      this.setState({loading:false})
  }
	render(){
    if(this.state.loading){
      return <Loader active inline='centered' />
    }
	return(
      <React.Fragment>
        <Divider horizontal>Informasi Pengambil</Divider>
        <Card fluid>
          <Card.Content>
            <Image size='mini' style={{margin:'10px'}} floated='right' src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
            <Card.Header>{this.props.namaPengambil}</Card.Header>
            <Divider></Divider>
            <Card.Meta>
              <span className='date'>Diambil Pada : </span>
            </Card.Meta>
            <Card.Meta>
              <span className='date'>{this.props.tanggalDiambil}</span>
            </Card.Meta>
            <Card.Description>Terimakasih Telah Menggunakan Layanan Kami</Card.Description>
          </Card.Content>
          
        </Card>
      </React.Fragment>
		);
	}
}

export default Diambil;