import React, { Component } from 'react';
import {Loader, Modal, Header, Divider, Image, Icon, Segment, Grid, Button, Checkbox,Form,List, Card,Label} from 'semantic-ui-react'
import Axios from 'axios';
import config from '../config.js'

class Validasi extends Component{
	constructor(props){
		super(props)
    this.warnLevel=['green','yellow','red']
    this.cancelOpen=false
    this.state = {      
      tanggalValidasi:'',
      changeOpen:false,
      "idTeknisi": "",
      "namaTeknisi": "",
      "noHP": "",
      "issues": [
          {
              "idIssue": null,
              "issue": "",
              "warnLevel": null,
              "solusi": [
                  {
                      "solusi": "",
                      
                      "harga": null,
                      "idSolusi": null
                  },
                  {
                      "solusi": "",
                      
                      "harga": null,
                      "idSolusi": null
                  }
              ],
              "checked": null
          }],
        loading:true
      }
  }

  getCurrentDate=()=>{
    let currentdate = new Date(); 
    return currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/" 
        + currentdate.getFullYear() + " @ "  
        + currentdate.getHours() + ":"  
        + currentdate.getMinutes() + ":" 
        + currentdate.getSeconds()
  }
  _issue = () =>{
    Axios.post(`http://${config.ip}:2000/validasi`, {
      idKomputer: this.props.idKomputer
    })
    .then((response) =>{
      let temp = response.data
      temp.loading = false
      this.setState(temp)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  _cancel=()=>{
    Axios.post(`http://${config.ip}:2000/cancel`, {
      idKomputer: this.props.idKomputer,
      tanggalValidasi: this.getCurrentDate()
    })
    .then((response) =>{
      window.location.reload()
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  _setSolusi = () =>{
    Axios.post(`http://${config.ip}:2000/clearSolusi`, {
      idKomputer: this.props.idKomputer
      })
      .then((response)=>{
        this.state.issues.forEach(value =>{
          Axios.post(`http://${config.ip}:2000/setSolusi`, {
          idKomputer: this.props.idKomputer,
          idSolusi:value.checked,
          tanggalValidasi:this.getCurrentDate()
          })
          .then((response) =>{
            this._issue()
          })
          .catch((error)=>{
            console.log(error)
          })
        })
      })
      .then(()=>{
        this.setState({changeOpen:true})
      })
      .catch((error)=>{
        console.log(error)
    })
  }
  componentWillMount(){
    this._issue();
  }

  getTotalBiaya(){
    let temp = 0;
    this.state.issues.forEach((issue, i)=>{
      issue.solusi.forEach((solusi,index)=>{
        if(issue.checked === solusi.idSolusi){
          temp += solusi.harga
        }
      })
    })
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
            Dibatalkan Pada : {this.state.tanggalValidasi}
            <Divider/>
            Biaya Pengecekan Mungkin Berlaku
          </Label>
          </Card>
        </React.Fragment>   
      )
    }
    let tempIssues = this.state.issues
		return(
     <React.Fragment>
      <Modal
      open={this.state.changeOpen}
      size='small'>
        <Modal.Content image>
          <Modal.Description>
            <Header>Data Berhasi Disimpan</Header>
          </Modal.Description>
          <Button color='green' basic onClick={()=>this.setState({changeOpen:false})}>Oke</Button>
        </Modal.Content>
      </Modal>
      <Divider horizontal>Informasi Teknisi</Divider>
      <Card fluid>
          <Card.Content>
            <Image size='mini' style={{margin:'10px'}} floated='right' src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
            <Card.Header>{this.state.namaTeknisi}</Card.Header>
            <Card.Meta>
              <span className='date'>Terakhir Validasi : </span>
            </Card.Meta>
            <Card.Meta>
              <span className='date'>{this.state.tanggalValidasi}</span>
            </Card.Meta>
            <Card.Description>Silahkan pilih issue dan solusi yang akan dikerjakan</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Card fluid>
              <Card.Content>
                <Card.Header>
                  Issues
                </Card.Header>
              </Card.Content>
              <Card.Content>
                <List divided>
                {tempIssues.map((value,index)=>{
                  return(
                    <React.Fragment key={index}>
                        <List.Item>
                          <List.Header style={{marginTop:'10px'}}>
                            <Label horizontal color={this.warnLevel[value.warnLevel]} size='tiny'>
                              warn
                            </Label>
                            {value.issue}
                          </List.Header>
                          <Form style={{margin:'10px', marginTop:'30px', width:'100%'}}>
                            {value.solusi.map((solusi,i)=>{
                              return(
                                <Grid key={i} columns='one' divided>
                                  <Grid.Row >
                                    <Grid.Column>
                                      <Form.Field key={i}>
                                        <Checkbox
                                          style={{fontSize:'10pt'}}
                                          label={solusi.solusi}
                                          checked={value.checked === solusi.idSolusi}
                                          onChange={()=>{
                                            value.checked = solusi.idSolusi
                                            this.setState({issues:tempIssues})
                                          }}
                                        />
                                      </Form.Field>
                                    </Grid.Column>
                                    
                                  </Grid.Row>
                                  
                                  <Grid.Row>
                                    <Label style={{marginLeft:'20px', textAlign:'center', opacity:'0.8'}} color='blue' basic pointing size='medium'>
                                      Rp. {solusi.harga}
                                    </Label> 
                                  </Grid.Row>
                                    
                                </Grid>
                              );
                            })}
                          </Form>
                          <Button style={{margin:'10px'}} size='tiny' onClick={()=>{
                            value.checked = null
                            this.setState({issues:tempIssues})
                          }}>Uncheck</Button>
                        </List.Item>
                    </React.Fragment>
                  );
                })}
                </List>
              </Card.Content>
            </Card>
            <Card fluid>
              <Card.Content textAlign='left'>
                <Card.Header>Catatan Teknisi</Card.Header>
                <Label style={{margin:'10px'}} color='yellow' size='large'>
                  {this.props.catatanTeknisi} 
                </Label>
              </Card.Content>
            </Card>
            <Segment textAlign='center'>
              <Label style={{width:'100%'}} color='blue' basic>
                Perkiraan total biaya : Rp.{this.getTotalBiaya()} 
              </Label>
              <Button onClick={()=>{this.setState({cancelOpen:true})}} disabled={this.props.tanggalDikerjakan != null} size='tiny' style={{margin:'10px'}} color='red'>Cancel Service</Button>
              <Modal open={this.state.cancelOpen}>
                <Header icon='cancel' content='Cancel Services' />
                <Modal.Content>
                  <p>
                    Apakah anda ingin membatalkan servis ?
                  </p>
                </Modal.Content>
                <Modal.Actions>
                  <Button onClick={()=>{this.setState({cancelOpen:false})}} color='green'>
                    Tidak
                  </Button>
                  <Button onClick={()=>{
                    this._cancel()
                    }} color='red'>
                    Ya
                  </Button>
                </Modal.Actions>
              </Modal>
              <Button disabled={this.props.tanggalDikerjakan != null} onClick={this._setSolusi} size='tiny' style={{margin:'10px'}} primary animated>
                <Button.Content visible>Save Record</Button.Content>
                <Button.Content  hidden>
                  <Icon name='save' />
                </Button.Content>
              </Button>
            </Segment>
                </Card.Content>
            </Card>      
     </React.Fragment>
		);
	}
}

export default Validasi;