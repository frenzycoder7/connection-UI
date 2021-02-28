
import './App.css';
import {Route,Switch,BrowserRouter as Router} from "react-router-dom"
import {userContext} from './context/context'
import { useState,useEffect } from 'react';
import Home from './Routes/Home';
import Login from './Routes/Login';
import Reg from './Routes/Reg';
import Axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import Peer from 'peerjs';
import { socket, SocketContext } from './context/socketContext';
function App() {
  
  

  var [token,setToken] = useState(localStorage.getItem('token'));
  var [user,setUser] = useState('');
  const [peer,setPeer] = useState({});
  const handleLogout = async () => {
    try {
      let res = await Axios({
        method:"POST",
        url:"http://13.126.96.74:5000/api/user/logout",
        headers:{
          "auth":token
        }
      });
      if(res.data.status){
        
        setToken('');
        setUser('');
        localStorage.removeItem('token');
      }
    } catch (error) {
      toast("Please Connect to internet",{type:"error",position:"bottom-right"})
    }
  }
  useEffect(()=>{
    (async()=>{
      if(token){
        try {
          let res = await Axios({
            method:"GET",
            url:"http://13.126.96.74:5000/api/user/",
            headers:{
              "auth":token
            }
          });
          
          if(res.data.status){
            setUser(res.data);
            const peer = new Peer(res.data.user?.peerId,{
               path:'/peer',
               host:'localhost',
               port:'5000'
             });
             console.log(peer.id);
             setPeer(peer);
          }else{
            setUser('');
            setToken('');
            localStorage.removeItem('token');
          }
        } catch (error) {
          toast('Please Connect to Internet',{type:"error",position:"bottom-right"});
        }
      }
    })();
  },[token]);
  return (
    <userContext.Provider value = {{token,setToken,user,setUser,handleLogout,peer}}>
      <ToastContainer />
      <Router>
        <Switch>
          <SocketContext.Provider value={socket} >
            <Route exact path="/" component={Reg} />
            <Route exact path="/log-nuser" component={Login} />
            <Route exact path="/home" component={Home} />
          </SocketContext.Provider>
          
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
