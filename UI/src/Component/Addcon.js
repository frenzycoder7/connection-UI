import React,{useState,useEffect, useContext} from 'react'
import {  CardHeader, } from 'reactstrap';
import { Input, Divider, CircularProgress, } from '@material-ui/core';
import { ImCross } from 'react-icons/im'
import ProfileList from './ProfileList';
import FindFriend from './FindFriend';
import Axios from 'axios';
import {ToastContainer,toast} from 'react-toastify'
import { userContext } from '../context/context';
import {SocketContext} from '../context/socketContext'
function Addcon({ addFun }) {
    const [friends,setFriends] = useState([]);
    const [isLoading,setIsLoading] = useState(true)
    const context = useContext(userContext);
    const socket = useContext(SocketContext);
    useEffect(()=>{
        (async()=>{
            try {
                let res = await Axios({
                    method:"GET",
                    url:"http://localhost:5000/api/user/get/all-users/",
                });
                setFriends(res.data.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(true);
            }
        })()
    },[]);
    const handleSendRequest = async(username,from) => {
        toast('Clicked',{type:"error"})
        socket.emit('SEND_FRIEND_REQUEST',{username:username,own:from});
    }
    return (
        <div>
            <ToastContainer />
            <CardHeader className="mt-3" style={{ backgroundColor: "skyblue", color: "black" }}>
                <div className="d-flex bd-highlight">
                    <div className="mr-auto bd-highlight">
                        Find Connections
                    </div>
                    <div className="bd-highlight">
                        <ImCross style={{ fontSize: "20px", color: 'red' }} onClick={() => addFun(false)} />
                    </div>
                </div>
            </CardHeader>
            <div className="shadow">
                <Input type="text" placeholder="Enter Name or Username" className="form-control mt-2" />
                <div className="d-flex bd-highlight">
                    <div className="mt-3 ml-2 mr-auto bd-highlight">
                        <b style={{ fontSize: "20px", color: "gray" }}>Friend Request</b>
                    </div>
                    <Divider />
                </div>
                <div style={{ height: "510px", width: "100%" }} className="shadow overflow-auto">
                    <ProfileList />


                    <div className="d-flex bd-highlight">
                        <div className="mt-3 ml-2 mr-auto bd-highlight">
                            <b style={{ fontSize: "20px", color: "gray" }}>Add Friends</b>
                        </div>
                        <Divider />
                    </div>
                    

                    {isLoading ? (
                        <div className="text-center">
                            <CircularProgress />
                        </div>
                        
                    ) : (
                        <>
                            {friends.map((e)=>{
                                return <FindFriend name={e.name} username={e.username} peerId={e.peerId} key={e._id}  handleSendRequest={handleSendRequest} />
                            })}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Addcon
