import React, { useContext, useState } from 'react'
import {
    Container, Row,Col,Form,CardHeader,CardFooter,Input, Button
} from 'reactstrap'
import {userContext} from './../context/context'
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer, toast } from 'react-toastify'
import Axios from 'axios';
import { Link, Redirect } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'
import { SocketContext } from '../context/socketContext'

export default function Login() {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [isLogin,setIsLogin] = useState(false);
    let context = useContext(userContext);
    let socket = useContext(SocketContext);

    const handleLoginFormSubmit = async(e) => {
      e.preventDefault();
      setIsLogin(true);
      try {
        let res = await Axios(
          {
            method:"POST",
            url:'http://13.126.96.74:5000/api/user/',
            data:{
              username:username,
              password:password
            }
          }
        );
        if(res.status === 200) {
          localStorage.setItem('token',res.data.token);
          context.setToken(res.data.token);
          console.log(res.data);
          localStorage.setItem('username',res.data.user.username);
          socket.emit('USER_ONLINE',localStorage.getItem('username'));
          setIsLogin(false);
        }

      } catch (error) {
        console.log(error);
        toast('Connect to Internet',{type:"error",position:"bottom-right"});
        setIsLogin(false);
      }
      
    }
  return (
    <Container>
      <ToastContainer />
      {context.token ? (
        <Redirect to="/home" />
      ):(
        <Row>
                <Col md={3}></Col>
                <Col md={6} className="form-signin login_pb margLogin">
                    <CardHeader className="text-center mt-5">
                        <label >
                            <h3>
                                <strong>
                                    <b>
                                       Login
                                    </b>
                                </strong>
                            </h3>
                        </label>
                    </CardHeader>
                    {isLogin ? (

                      <div className="text-center">
                        <CircularProgress />
                      </div>
                    ) : (
                      <>
                      <Form onSubmit={handleLoginFormSubmit}>
                        <Input 
                            type="text"
                            placeholder="Enter Your Username"
                            className="form-control mt-3"
                            autoFocus
                            onChange={(e)=>setUsername(e.target.value)}
                        />
                        <Input 
                            type="password"
                            placeholder="Enter Your Password"
                            className="form-control mt-3"
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        <Input 
                            type="submit"
                            className="btn btn-dark mt-3"
                            value="Login"
                        />
                    </Form>
                    <div className="text-center">
                        Or
                    </div>
                    <Link to="/"><Button className="btn btn-success">Register</Button></Link>
                    </>
                    )}
                    <CardFooter className="text-center">
                        <label>
                            <small>
                                Secure Login
                            </small>
                        </label>
                    </CardFooter>
                </Col>
                <Col md={3}></Col>
          </Row>
      )}
       
    </Container>
  );
}
