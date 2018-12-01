import React, { Component } from 'react';
import {Loader, Image, Divider, Icon, Card,List} from 'semantic-ui-react'
import Axios from 'axios';
import config from '../config.js'

class Masuk extends Component{
	constructor(props){
		super(props)
    this.state = {
      loading:true
    }
  }
  _fetch = () =>{
    Axios.post(`http://${config.ip}:2000/infoMasuk`, {
      idKomputer: this.props.idKomputer,
      idAdmin:this.props.idAdmin
    })
    .then((response) =>{
      let temp = response.data[0];
      temp.loading = false;
      this.setState(response.data[0])
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  componentDidMount(){
    this._fetch();
  }
	render(){
    if(this.state.loading){
      return <Loader active inline='centered' />
    }
		return(
      <React.Fragment>
        <Divider horizontal>Informasi Admin</Divider>
        <Card fluid>
          <Card.Content>
            <Image size='mini' style={{margin:'10px'}} floated='right' src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
            <Card.Header>{this.state.nama}</Card.Header>
            <Card.Meta>
              <span className='date'>CP Admin : </span>
            </Card.Meta>
            <Card.Meta>
              <span className='date'>{this.state.noHP}</span>
            </Card.Meta>
            <Divider></Divider>
            <Card.Meta>
              <span className='date'>Tanggal Masuk : </span>
            </Card.Meta>
            <Card.Meta>
              <span className='date'>{this.props.tanggalMasuk}</span>
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
              {(this.state.kelengkapan.length !== 0)
                ?
                <Card.Content>
                  <Card.Header>Kelengkapan</Card.Header>
                  <Divider/>
                  <List >
                    {this.state.kelengkapan.map((value,i)=>{
                      return(
                        <List.Item key={i}>
                          <Icon name='cube' />
                          <List.Content>
                            {value}
                          </List.Content>
                        </List.Item>    
                      );
                    })}
                  </List>
                </Card.Content>
                :
                null
                }
              
            </Card>
          </Card.Content>
        </Card>
      </React.Fragment>
		);
	}
}

export default Masuk;