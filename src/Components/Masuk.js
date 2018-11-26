import React, { Component } from 'react';
import {Image, Divider, Icon, Card,List} from 'semantic-ui-react'
import './Masuk.css';

class Masuk extends Component{
	constructor(props){
		super(props)
    let now = new Date();
    this.state = {
      namaAdmin:'Aditya Kharisma W',
      tanggalMasuk: now.toString(),
      keluhan:['Kurang AC', 'Panas', 'Inul Install Ulang']

    }
	}
  
	render(){
		return(
      <React.Fragment>
        <Divider horizontal>Informasi Admin</Divider>
        <Card fluid>
          <Card.Content>
            <Image size='mini' style={{margin:'10px'}} floated='right' src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
            <Card.Header>{this.state.namaAdmin}</Card.Header>
            <Card.Meta>
              <span className='date'>Tanggal Masuk : </span>
            </Card.Meta>
            <Card.Meta>
              <span className='date'>{this.state.tanggalMasuk}</span>
            </Card.Meta>
            <Card.Description>Silahkan tunggu proses berikutnya</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Card  fluid>
              <Card.Content>
                <Card.Header>Keluhan</Card.Header>
                <Divider/>
                <List >
                  {this.state.keluhan.map((value,i)=>{
                    return(
                      <List.Item key={i}>
                        <Icon name='setting' />
                        <List.Content>
                          {value}
                        </List.Content>
                      </List.Item>    
                    );
                  })}
                </List>
              </Card.Content>
            </Card>
          </Card.Content>
        </Card>
      </React.Fragment>
		);
	}
}

export default Masuk;