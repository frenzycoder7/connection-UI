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

export default function Reg() {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [isLogin,setIsLogin] = useState(false);
    const [validUsername,setValidUsername] = useState(false);
    const [border,setBorder] = useState(false);
    const [valid,setValid] = useState(false);
    const [text,setText] = useState(false);
    let context = useContext(userContext);
    const handleLoginFormSubmit = async(e) => {
      e.preventDefault();
      
      if(validUsername){
        setIsLogin(true);
        try {
          let res = await Axios(
            {
              method:"POST",
              url:'http://13.126.96.74:5000/api/user/new',
              data:{
                name:name,
                username:username,
                password:password
              }
            }
          );
          if(res.status === 201) {
              console.log(res.data);
            localStorage.setItem('token',res.data.token);
            context.setToken(res.data.token);
            toast('Logged in',{type:"success"});
            setIsLogin(false);
          }
  
        } catch (error) {
          toast('Please Connect to Internet',{type:"error",position:"bottom-left"});
          setIsLogin(false);
        }
      }else{
        toast('Username Validation falied please select valid username',{type:"error",position:"bottom-right"});
      }
      
    }

    const handleUsernameExist = async(uname) =>{
      if(uname.length >= 6){
        setText(false);
        try {
          let res = await Axios({
            method:'GET',
            url:'http://13.126.96.74:5000/api/user/check/'+uname,
          });
          if(res.data.status === true){
            setUsername(uname);
            setValidUsername(true);
            setValid(true);
            setBorder(false);
          }else if(res.data.status === false){
            setValidUsername(false);
            setUsername('');
            setBorder(true);
            setValid(false)
          }
        } catch (error) {
          toast('Please Connect to Internet',{type:"error",position:"bottom-left"});
        }
      }else{
        setBorder(true);
        setText(true);
        setUsername('');
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
                                       Register
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
                      <Form onSubmit={handleLoginFormSubmit}>
                        <Input 
                            type="text"
                            placeholder="Enter Your Name"
                            className="form-control mt-3"
                            autoFocus
                            onChange={(e)=>setName(e.target.value)}
                        />
                        <Input 
                            type="text"
                            placeholder="Enter Your Username"
                            className="form-control mt-3"
                            style={{borderColor: border ? 'red' : valid ? 'green': 'skyblue'}}
                            onChange={(e)=>handleUsernameExist(e.target.value)}
                        />
                        {text && <small style={{color:"red"}}>Invalid Username ( Username must have 6 character )</small>}
                        <Input 
                            type="password"
                            placeholder="Enter Your Password"
                            className="form-control mt-3"
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        <Input 
                            type="submit"
                            className="btn btn-dark mt-3"
                            value="Register"
                        />
                    </Form>
                    )}
                    <div className="text-center">
                        Or
                    </div>
                    <Link to="/log-nuser"><Button className="btn btn-success from-control">Login</Button></Link>
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
