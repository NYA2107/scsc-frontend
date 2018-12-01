import React, { Component } from 'react';
import {Loader, Label, Table, Divider, Card,} from 'semantic-ui-react'
import Axios from 'axios';
import config from '../config.js'

class Selesai extends Component{
    state = {
        loading:true
    }
    _fetch(){
        Axios.post(`http://${config.ip}:2000/selesai`, {
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
    getTotalBiaya(){
        let temp = 0
        this.state.solusis.forEach(v => {
            temp = temp + v.harga
        });
        this.state.tambahan.forEach(v => {
            temp = temp + v.harga
        });
        return temp
    }
    componentWillMount(){
        this._fetch()
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
            <Divider horizontal>Invoice Komputer</Divider>
            <Card fluid>
                <Card.Content fluid>
                    <Card.Meta>
                        <span className='date'>Selesai Pada :</span>
                    </Card.Meta>
                    <Card.Meta>
                        <span className='date'>{this.props.tanggalSelesai}</span>
                    </Card.Meta>
                </Card.Content>
            </Card>
            <Table unstackable>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Solution</Table.HeaderCell>
                    <Table.HeaderCell textAlign='right'>Price</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                
                <Table.Body>
                {this.state.solusis.map(v=>{
                    return(
                        <React.Fragment>
                            <Table.Row>
                                <Table.Cell>{v.solusi}</Table.Cell>
                                <Table.Cell textAlign='right'>Rp.{v.harga}</Table.Cell>
                            </Table.Row>
                        </React.Fragment>
                        
                    )
                })}                
                </Table.Body>
                
                
            </Table>
            <Divider style={{opacity:'0.8', fontSize:'8pt'}} size='tiny' horizontal>Biaya Tambahan</Divider>
            <Table unstackable>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Tambahan</Table.HeaderCell>
                    <Table.HeaderCell textAlign='right'>Price</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                
                <Table.Body>
                {this.state.tambahan.map(v=>{
                    return(
                        <React.Fragment>
                            <Table.Row>
                                <Table.Cell>{v.tambahan}</Table.Cell>
                                <Table.Cell textAlign='right'>Rp.{v.harga}</Table.Cell>
                            </Table.Row>
                        </React.Fragment>
                        
                    )
                })}                
                </Table.Body>
            </Table>
            <Label style={{width:'100%'}} color='blue' basic>
                  Total Biaya : Rp.{this.getTotalBiaya()} 
            </Label> 
        </React.Fragment>
        
      );
  }
}

export default Selesai;