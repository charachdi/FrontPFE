import React , {useState , useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch , useRouteMatch } from 'react-router-dom';
import './App.css';
import $ from 'jquery'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './function'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Compteclientequipe from './pages/Compteclientequipe'
import Equipe from './pages/Equipe'
import Service from './pages/Service'
import Clients from './pages/Clients'
import Notfound from './pages/Notfound'
import CompteCli from './pages/CompteCli'
import EquipeView from './pages/EquipeView'
import Stepperview from './pages/Stepperview'
import FileView from './pages/FileView'
import Fixrequete from './pages/Fixrequete'

import UserView from './pages/UserView'
import Login from './pages/Login'
import Test from './pages/Test'
import Chefscomptecli from './pages/Chefscomptecli'
import Userview from './component/Userview'
import Sidebar from './component/Sidebar'
import 'react-toastify/dist/ReactToastify.css';

// import io from "socket.io-client";

import {socket} from './Socket/Socket'

import AdminRoute from './component/AdminRoute'
import Adminonly from './component/Adminonly'
import Comptecli from './component/Comptecli'
import CompteclientCheck from './component/CompteclientCheck'
import { Component } from 'react';
import Fileview from './component/Fileview';

function App() {

  

  // var connectionOptions =  {
  //   "force new connection" : false,
  //   "reconnectionAttempts": "Infinity", 
  //   "timeout" : 100000000000000000,                  
  //   "transports" : ["websocket"]
  // };
  // const ENDPOINT = "http://127.0.0.1:3001";
  // const socket = io.connect(ENDPOINT, connectionOptions);

 
const [user, setuser] = useState({})
useEffect(() => {
  const getuser = ()=>{
     setuser(JSON.parse(localStorage.getItem('user')))
  }

  const socketconn = () =>{
    
  }
  getuser()
  socketconn()
}, [])
 
   console.log(user)
    const rendersidebar = () =>{
      if(window.location.pathname !== "/"){
        return( <Sidebar  />)
      }
      if(user !== null){
        return( <Sidebar />)
      }
    }
   
    
  return (

    <>

    <Router>
      <div className="wrapper d-flex align-items-stretch" >
       {
         rendersidebar()
       }
   
      <div id="content" className="p-4 p-md-5 pt-5" >
      <Switch>
          <Route path='/' component={Login} exact/>
          <AdminRoute path='/home' component={Home} exact/>
          <Route path='/stepper' component={Stepperview} exact/>
          <AdminRoute path='/Equipe' component={Equipe} exact/>
          <Adminonly path='/Service' component={Service} exact/>
          <Route path='/Client' component={Clients} exact/>
          <Comptecli path='/Compteclient' component={Compteclientequipe} exact/>
          <Comptecli path='/Requetes' component={Fixrequete} exact/>
          {/* <Route path='/Chefscomptecli' component={Chefscomptecli} exact/> */}


          <Route path='/Equipe/:id' render={(props) => <EquipeView socket={socket} {...props} /> } exact/>
          <Route path='/profile/:id' component={UserView} exact/>
          <Route path='/Client/:id' component={CompteCli} exact/>
          <Route path='/File/:name/:id' component={FileView} exact/>
          <Route path='/myProfile' component={Profile} exact/>


          <Route path='/test' component={Test} exact/>
          <Route component={Notfound}/>
          
         
        </Switch>
      </div>
     </div>

     
      
    </Router>
    </>
  );
}

export default App;

