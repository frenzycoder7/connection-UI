import { Avatar, Input, ListItem, Menu, } from '@material-ui/core';
import React, { useContext,useState,useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, CardHeader, Col, Container, Row, } from 'reactstrap';
import { userContext } from './../context/context'
import { FcSearch } from 'react-icons/fc'
import { IoMdPersonAdd,} from 'react-icons/io'
import {ImCross} from 'react-icons/im'
import Message from '../Component/Message';
import Addcon from '../Component/Addcon';
import { SocketContext } from '../context/socketContext';
import { toast, ToastContainer } from 'react-toastify';



export default function Home() {
    const [search,setSearch] = useState(false);  
    const [addCon,setAddCon] = useState(false);
    const [msg,setMsg] = useState('');  
    const context = useContext(userContext);
    const socket = useContext(SocketContext);
    socket.on('NOTIFICATION_MANAGER',(msg)=>{
        toast(msg.msg,{type:msg.type,position:"top-center"});
    })
    socket.on('CONN_OK',(msg)=>{
        console.log(msg);
    })
    useEffect(()=>{
        (async()=>{
            socket.on('connect',async ()=>{
                console.log('connected to server')
                socket.emit('USER_ONLINE',localStorage.getItem('username'));
            })
        })()
    },[])
    
    
    return (
        <div>

            {context.token ? (
                <>
                    <div className="p-4">
                        <ToastContainer />
                        <Container style={{ height: "100%" }}>
                            <CardHeader style={{ backgroundColor: "skyblue", color: "black" }}>
                                <div className="d-flex bd-highlight">
                                    <div className=" bd-highlight">
                                        <Avatar src="https://data.apksum.com/4e/sunstarphotomedia.photobackgroundchangerpro/screenhost/1.jpg" alt="" />
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className=" ml-2 bd-highlight">
                                            {context.user.user?.name}
                                    </div>
                                    </div>
                                    <div className="ml-auto d-flex align-items-center">
                                        <div className="bd-highlight">
                                            <Button onClick={context.handleLogout} className="btn btn-info">
                                                Logout
                                        </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <Row style={{ borderColor: "ActiveBorder" }}>
                                <Col md={4}>
                                    <CardHeader className="mt-3" style={{ backgroundColor: "skyblue", color: "black" }}>
                                        {search ? (
                                            <div className="d-flex">
                                                <Input type="text" placeholder="Enter Name or Username" className=" mr-3 form-control" />
                                                <ImCross style={{fontSize:"35px"}} onClick={()=>setSearch(false)}/>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="d-flex bd-highlight">
                                                    <div className="mr-auto bd-highlight">
                                                        Connections
                                                    </div>
                                                    <div className="bd-highlight">
                                                        <FcSearch style={{ fontSize: "30" }} onClick={()=>setSearch(true)}/>
                                                    </div>
                                                    <div className=" ml-3 bd-highlight">
                                                        <IoMdPersonAdd style={{ fontSize: "30",color:addCon && 'green' }} onClick={()=>setAddCon(true)} />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        
                                    </CardHeader>
                                    <div style={{ height: "600px", width: "100%" }} className="shadow overflow-auto">
                                        <ListItem className="mt-3 mb-3"  button >
                                            <div className=" d-flex bd-highlight" onClick={()=>setMsg('someUsername')}>
                                                <div className=" p-1 flex-fill bd-highlight">
                                                    <Avatar src="data:image/jpeg;base64,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" alt="" />
                                                </div>
                                                <div className="mt-1 flex-fill bd-highlight">
                                                    <strong>Elone Musk</strong>
                                                    <label className="form-text mt-0" style={{ color: "GrayText" }}>Yeasterday</label>
                                                </div>
                                                <div className="ml-1 mt-1 flex-fill bd-highlight">Flex item</div>
                                            </div>
                                            <hr style={{ backgroundColor: 'black' }} />
                                        </ListItem>
                                    </div>
                                    
                                </Col>
                                <Col md={8}>
                                    {addCon ? (
                                        <Addcon addFun={setAddCon} />
                                    ) : (
                                        <>
                                        {msg ? (
                                            <Message msg={setMsg} />
                                        ):(
                                            <Menu />
                                        )}
                                        </>
                                    )}
                                    
                                </Col>
                            </Row>
                        </Container>
                    </div>

                </>
            ) : (
                    <Redirect to="/" />
                )}
        </div>
    )
}
