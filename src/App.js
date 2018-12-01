import React, { Component } from 'react';
import {Loader, Segment, Divider, Button, Header, Label, Modal, Menu, Icon} from 'semantic-ui-react'
import './App.css';
import Login from './Components/Login';
import Masuk from './Components/Masuk';
import Validasi from './Components/Validasi';
import Dikerjakan from './Components/Dikerjakan'
import Selesai from './Components/Selesai'
import Diambil from './Components/Diambil'
import Axios from 'axios';
import config from './config.js'

class App extends Component {
  initialState = {
    modalOpen: false,
    errorOpen:false,
    idKomputer: null,
    password:null,
    login:false,
    selected:null,
    menuDisabled:[],
    iconStatus:['tag', 'edit', 'setting', 'check circle', 'send'],
    status:{
      name:'',
      icon:''
    },
    loading:true
  }
  state = this.initialState
  
  componentWillMount(){
    if(!localStorage.getItem('@LOGIN')){
      this.setState({login:false})
    }else{
      Axios.post(`http://${config.ip}:2000/komputer`, {
          idKomputer: localStorage.getItem('@LOGIN')
        })
        .then((response) =>{
          let temp = response.data[0]
          temp.login = true
          this.setState(temp)
        })
        .then(()=>{
          let count = -1;
          this.state.menuDisabled.forEach((value,i)=>{
            if(!value){
              count++;
            }
          })
          this.setState({selected:count},()=>{
            this.fillStatus();
          })
        })
        .catch((error)=>{
          console.log(error)
        })
      
    }
  }
  componentDidMount(){
    this.setState({loading:false})
  }
  idKomputerChange = (e) =>{
    this.setState({idKomputer:e.target.value})
  }
  passwordKomputerChange = (e) =>{
    this.setState({password:e.target.value})
  }
  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })
  handleLogin = () => {
    this.setState({loading:true})
    Axios.post(`http://${config.ip}:2000/login`, {
      idKomputer: this.state.idKomputer,
      password: this.state.password,
    })
    .then((response) => {
      localStorage.setItem('@LOGIN',response.data);
      this.setState({login:true})
      return response.data
    })
    .then((response)=>{
        Axios.post(`http://${config.ip}:2000/komputer`, {
          idKomputer: response
        })
        .then((response) =>{
          let temp = response.data[0]
          temp.loading = false
          this.setState(temp)
        }).then(()=>{
          let count = -1;
          this.state.menuDisabled.forEach((value,i)=>{
            if(!value){
              count++;
            }
          })
          this.setState({selected:count},()=>{
            this.fillStatus();
          })
        })
        .then(()=>{
          
        })
        .catch((error)=>{
          console.log(error)
        })
    })
    .catch((error) => {
      localStorage.removeItem('@LOGIN')
      this.setState({login:false, errorOpen:true, loading:false})
    });
    
  }
  handleLogout = () =>{
    localStorage.removeItem('@LOGIN')
    let temp = this.initialState
    temp.loading = false
    this.setState(temp)
  }
  fillStatus= () =>{
    switch(this.state.selected){
        case 0: {this.setState({status:{name:'Masuk', icon:this.state.iconStatus[0]}}); break;}
        case 1: {this.setState({status:{name:'Proses Validasi', icon:this.state.iconStatus[1]}}); break;}
        case 2: {this.setState({status:{name:'Dikerjakan', icon:this.state.iconStatus[2]}}); break;}
        case 3: {this.setState({status:{name:'Selesai', icon:this.state.iconStatus[3]}}); break;}
        case 4: {this.setState({status:{name:'Diambil', icon:this.state.iconStatus[4]}}); break;}
        default:;
      }
  }
  handleMenuClick = (e) => {
    this.setState({selected:e.target.id*1},()=>{
      this.fillStatus();
    })
  }
  showPage = () =>{
    switch(this.state.selected){
      case 0: {
        return(
          <div>
              <Masuk 
                tanggalMasuk={this.state.tanggalMasuk} 
                idAdmin={this.state.idAdmin} 
                idKomputer={this.state.idKomputer}
                keluhan={this.state.keluhan} 
              />
          </div>)
      }
      case 1: {
        return(
          <div>
              <Validasi
                catatanTeknisi = {this.state.catatanTeknisi}
                idKomputer={this.state.idKomputer}
                tanggalDikerjakan = {this.state.tanggalDikerjakan}
              />
          </div>
        )
      }
      case 2: {
        return(
          <div>
              <Dikerjakan
                tanggalValidasi = {this.state.tanggalValidasi}
                idKomputer = {this.state.idKomputer}
                idTeknisi = {this.state.idTeknisi}
                tanggalDikerjakan = {this.state.tanggalDikerjakan}
              />              
          </div>
        )
      }
      case 3: {
        return(
          <div>
              <Selesai
                tanggalSelesai = {this.state.tanggalSelesai}
                tanggalValidasi = {this.state.tanggalValidasi}
                idKomputer = {this.state.idKomputer}
                idTeknisi = {this.state.idTeknisi}
                tanggalDikerjakan = {this.state.tanggalDikerjakan}
              />              
          </div>
        )
      }
      case 4: {
        return(
          <div>
            <Diambil
              tanggalDiambil = {this.state.tanggalKeluar}
              namaPengambil = {this.state.namaKeluar}
            />              
          </div>
        )
      }
      default:{
        return null;
      }
    }
  }
  
  render() {
    if(this.state.loading){
      return (
        <Loader active inline='centered' />
      )
    }
    return (
      <div className="App">
        <Modal
        open={this.state.errorOpen}
        size='small'
        >
          <Modal.Content image>
            <Modal.Description>
              <Header>Login Error</Header>
            </Modal.Description>
            <Button color='red' onClick={()=>this.setState({errorOpen:false})}>Close</Button>
          </Modal.Content>
        </Modal>
        {(!this.state.login)?
          <div className='home-container' style={{width:'100%',height:'100vh'}}>
            <Segment className="check" raised>
              <Label as='a' color='blue' ribbon>
              SCSC
              </Label>
              <Segment placeholder>
              <Header icon>
                <Icon name='search' />
                Welcome to System Computer Service Center
              </Header>
              <Segment.Inline>
                <Login
                  onSearchClick={this.searchClick}
                  onPasswordChange={this.passwordKomputerChange}
                  onIdChange={this.idKomputerChange} 
                  onLogin={this.handleLogin} 
                  onOpen={this.handleOpen} 
                  onClose={this.handleClose} 
                  modalOpen={this.state.modalOpen}/>
              </Segment.Inline>
              </Segment>
            </Segment>
          </div>
          :
          <div className='computer-container'>
            <Menu  className='progress-container' style={{margin:'0', marginBottom:'10px',marginTop:'10px',width:'90%'}} pointing>
              {this.state.menuDisabled.map((value,i)=>{
                return(
                  <Menu.Item
                    className='progress'
                    key={i}
                    id={i}
                    active={this.state.selected === i*1}
                    onClick={this.handleMenuClick.bind(this)}
                    disabled={value}
                    style={{display:'flex',justifyContent:'center'}}
                  >
                    <Icon id={i} name={this.state.iconStatus[i]}/>
                  </Menu.Item>
                );
              })}
            </Menu>
            <Segment style={{margin:'0',width:'90%'}} piled>
              <Label color='green' ribbon>
              <Icon name={this.state.status.icon}/>
              {this.state.status.name}
              </Label>
              <Label onClick={this.handleLogout} as='a' color='red' corner='right'>
                <Icon onClick={this.handleLogout} name='sign-out'/>
              </Label>
              <Header style={{marginLeft:'10px'}} as='h4'>
                <Icon name='computer' />
                <Header.Content>
                  {this.state.namaKomputer}
                  <Label size='tiny' as='a' color='yellow' >
                    {this.state.idKomputer}
                  </Label>
                  <Header.Subheader size='tiny'>{this.state.namaMasuk}</Header.Subheader>
                </Header.Content>
              </Header>
              <Divider />
                {this.showPage()}
              <Divider />
            </Segment>
          </div>
        }
        
      </div>
    );
  }
}

export default App;
