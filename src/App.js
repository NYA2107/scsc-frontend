import React, { Component } from 'react';
import {Segment, Divider, Header, Label, Menu, Icon} from 'semantic-ui-react'
import './App.css';
import Login from './Components/Login';
import Masuk from './Components/Masuk';
import Validasi from './Components/Validasi';
import Dikerjakan from './Components/Dikerjakan'
import Fade from 'react-reveal/Fade';

class App extends Component {
  state = {
    modalOpen: false,
    login:true,
    computerId:'2107INH',
    computerName:'Lenovo UHUY2107',
    userName:'Regina Sekar Evangelista',
    tanggalMasuk:new Date(),
    selected:null,
    menuDisabled:[false,false,false,true,true],
    iconStatus:['tag', 'edit', 'setting', 'check circle', 'send'],
    status:{
      name:'',
      icon:''
    }
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })
  handleLogin = () => this.setState({login:true})
  handleLogout = () => this.setState({login:false})
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
  componentWillMount(){
    let count = -1;
    this.state.menuDisabled.forEach((value,i)=>{
      if(!value){
        count++;
      }
    })
    this.setState({selected:count},()=>{
      this.fillStatus();
    })
    

  }
  render() {
    return (
      <div className="App">
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
                <Login onLogin={this.handleLogin} onOpen={this.handleOpen} onClose={this.handleClose} modalOpen={this.state.modalOpen}/>
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
                  {this.state.computerName}
                  <Label size='tiny' as='a' color='yellow' >
                    {this.state.computerId}
                  </Label>
                  <Header.Subheader size='tiny'>{this.state.userName}</Header.Subheader>
                </Header.Content>
              </Header>
              <Divider />
              {(this.state.selected === 0)?
                <div>
                  <Fade>
                    <Masuk tanggalMasuk={this.state.tanggalMasuk} />
                  </Fade>
                </div>
                :
                null
              }
              {(this.state.selected === 1)?
                <div>
                  <Fade>
                  <Validasi/>
                  </Fade>
                </div>
                :
                null
              }
              {(this.state.selected === 2)?
                <div>
                  <Fade>
                  <Dikerjakan/>
                  </Fade>                  
                </div>
                :
                null
              }
            </Segment>
          </div>
        }
        
      </div>
    );
  }
}

export default App;
