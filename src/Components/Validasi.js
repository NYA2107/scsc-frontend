import React, { Component } from 'react';
import {Divider, Image, Icon, Segment, Grid, Button, Checkbox,Form,List, Card,Label} from 'semantic-ui-react'
import './Validasi.css';


class Validasi extends Component{
	constructor(props){
		super(props)
    this.warnLevel=['green','yellow','red']
    this.state = {
      namaAdmin:'Robert Downey Jr',
      tanggalValidasi: (new Date()).toString(),
      issues:[
        {
          idIssue:543,
          namaIssue:'Ganti Oli',
          warnLevel:2,
          checked:null,
          solusi:[{
            idSolusi:99,
            namaSolusi:'Oli Vederal',
            biaya:50000
          },{
            idSolusi:98,
            namaSolusi:'Oli Supra User',
            biaya:2000
          }]
        },
        {
          idIssue:542,
          namaIssue:'Inul Install Ulang',
          warnLevel:0,
          checked:null,
          solusi:[{
            idSolusi:91,
            namaSolusi:'Windows XP',
            biaya:21000
          },{
            idSolusi:92,
            namaSolusi:'Windows 8',
            biaya:2000
          },{
            idSolusi:78,
            namaSolusi:'Windows 10',
            biaya:500000
          }]
        },
        {
          idIssue:522,
          namaIssue:'Cidera Punggung',
          warnLevel:1,
          checked:null,
          solusi:[{
            idSolusi:90,
            namaSolusi:'Salep OBH',
            biaya:25000
          },{
            idSolusi:93,
            namaSolusi:'Salep Kalpanax',
            biaya:80000
          }]
        }
      ],
      totalBiaya:0
    }
	}
  getTotalBiaya(){
    let temp = 0;
    this.state.issues.forEach((issue, i)=>{
      issue.solusi.forEach((solusi,index)=>{
        if(issue.checked === solusi.idSolusi){
          temp += solusi.biaya
        }
      })
    })
    return temp
  }
	render(){
    let tempIssues = this.state.issues
		return(
     <React.Fragment>
      <Divider horizontal>Informasi Teknisi</Divider>
      <Card fluid>
          <Card.Content>
            <Image size='mini' style={{margin:'10px'}} floated='right' src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
            <Card.Header>{this.state.namaAdmin}</Card.Header>
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
                            {value.namaIssue}
                          </List.Header>
                          <Form style={{margin:'10px', width:'100%'}}>
                            {value.solusi.map((solusi,i)=>{
                              return(
                                <Grid key={i} columns='two' divided>
                                  <Grid.Row >
                                    <Grid.Column>
                                      <Form.Field key={i}>
                                        <Checkbox
                                          style={{fontSize:'10pt'}}
                                          id={solusi.idSolusi}
                                          label={solusi.namaSolusi}
                                          checked={value.checked === solusi.idSolusi}
                                          onChange={()=>{
                                            value.checked = solusi.idSolusi
                                            this.setState({issues:tempIssues})
                                          }}
                                        />
                                      </Form.Field>
                                    </Grid.Column>
                                    <Grid.Column>
                                      <Label style={{width:'90px'}} color='blue' tag size='mini'>
                                        Rp. {solusi.biaya}.00
                                      </Label>    
                                    </Grid.Column>
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
            <Segment textAlign='center'>
              <Label color='blue' tag>
                Perkiraan total biaya : Rp.{this.getTotalBiaya()}.00 
              </Label>
              <Button size='tiny' style={{margin:'10px'}} color='red'>Cencel Service</Button>
              <Button size='tiny' style={{margin:'10px'}} primary animated>
                <Button.Content visible>Proceed</Button.Content>
                <Button.Content hidden>
                  <Icon name='arrow right' />
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