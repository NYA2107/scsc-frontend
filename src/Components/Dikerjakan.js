import React, { Component } from 'react';
import {Loader, Grid, Image, Label, Card, Divider} from 'semantic-ui-react'
import Axios from 'axios';
import config from '../config.js'

class Dikerjakan extends Component{
	constructor(props){
		super(props)
    this.state = {
      loading:true
    }
  }
  
  _fetch(){
    Axios.post(`http://${config.ip}:2000/dikerjakan`, {
      idKomputer: this.props.idKomputer,
      idTeknisi : this.props.idTeknisi
    })
    .then((response) =>{
      let temp = response.data[0]
      temp.loading = false
      this.setState(temp)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  componentWillMount(){
    this._fetch()
  }
  componentDidMount(){

  }
 
  getTotalBiaya(){
    let temp = 0
    this.state.solusis.forEach(v => {
      temp = temp + v.harga
    });
    return temp
  }
	render(){
    if(this.state.loading){
      return (
        <Loader active inline='centered' />
      )
    }else if(this.props.tanggalDikerjakan === 'cancel'){
      return(
        <React.Fragment>
          <Card fluid>
            <Label color='red'>
              Canceled
            </Label>
            
          </Card>
          <Card fluid>
          <Label>
            Dibatalkan Pada : {this.props.tanggalValidasi}
            <Divider/>
            Biaya Pengecekan Mungkin Berlaku
            </Label>
          </Card>
        </React.Fragment>   
      )
    }
    
		return(
      <React.Fragment>
        <Divider horizontal>Informasi Teknisi</Divider>
        <Card fluid>
          <Card.Content>
            <Image size='mini' style={{margin:'10px'}} floated='right' src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
            <Card.Header>{this.state.namaTeknisi}</Card.Header>
            <Card.Meta>
              <span className='date'>Mulai Dikerjakan Pada :</span>
            </Card.Meta>
            <Card.Meta>
              <span className='date'>{this.props.tanggalDikerjakan}</span>
            </Card.Meta>
            <Card.Description>Komputer anda sedang dikerjakan</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Card.Description>Solusi yang dikerjakan : </Card.Description>
            {this.state.solusis.map((v,i)=>{
              return(
                <Card key={i} fluid>
              <Grid columns='two' verticalAlign='middle' padded>
                <Grid.Row >
                  <Grid.Column>
                    {v.solusi}
                  </Grid.Column>
                  <Grid.Column textAlign='right'>
                    <Label color='blue' style={{width:'110px', margin:'5px'}} tag>
                      Rp.{v.harga}
                    </Label>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card>
              ) 
            })}
            
          </Card.Content>
          <Card.Content style={{width:'100%'}}>
            <Label style={{width:'100%'}} color='blue' basic>
                  Perkiraan total biaya : Rp.{this.getTotalBiaya()} 
            </Label> 
          </Card.Content>
        </Card>
      </React.Fragment>
		);
	}
}

export default Dikerjakan;