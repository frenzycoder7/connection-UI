import React from 'react'
import { IoMdCall, IoMdSend, IoMdOptions } from 'react-icons/io'
import { RiRadioButtonLine, RiVidiconLine } from 'react-icons/ri'
import { Button, CardHeader, } from 'reactstrap';
import { Input, ListItem, } from '@material-ui/core';
import { ImCross } from 'react-icons/im'
function Message({msg}) {
    return (
        <>
            <CardHeader className="mt-3" style={{ backgroundColor: "skyblue", color: "black" }}>
                <div className="d-flex bd-highlight">
                    <div className="mr-auto bd-highlight">
                        Elone Musk
                                            <label className="ml-3"><small style={{ color: "green" }}>Online</small></label>
                    </div>
                    <div className="bd-highlight">
                        <RiRadioButtonLine style={{ fontSize: "30", color: 'green' }} />
                    </div>
                    <div className=" ml-3 bd-highlight">
                        <RiVidiconLine style={{ fontSize: "30" }} />
                    </div>
                    <div className=" ml-3 bd-highlight">
                        <IoMdCall style={{ fontSize: "30" }} />
                    </div>
                    <div className=" ml-3 bd-highlight">
                        <ImCross style={{fontSize: "20",color:"red"}} onClick={()=>msg('')} />
                    </div>
                </div>
            </CardHeader>
            <div style={{ height: "550px", width: "100%" }} className="shadow overflow-auto">
                <ListItem className="mt-1 mb-1" button >
                    <Button className="btn btn-info mr-auto">
                        hey bro
                                            </Button>
                </ListItem>
                <ListItem className="mt-1 mb-1" button >
                    <Button className="btn btn-light ml-auto">
                        ya bro tell me sinthing
                                            </Button>
                </ListItem>
                <ListItem className="mt-1 mb-1" button >
                    <Button className="btn btn-info mr-auto">
                        hey bro
                                            </Button>
                </ListItem>
                <ListItem className="mt-1 mb-1" button >
                    <Button className="btn btn-light ml-auto">
                        ya bro tell me sinthing
                                            </Button>
                </ListItem>
                <ListItem className="mt-1 mb-1" button >
                    <Button className="btn btn-info mr-auto">
                        hey bro
                                            </Button>
                </ListItem>
                <ListItem className="mt-1 mb-1" button >
                    <Button className="btn btn-light ml-auto">
                        ya bro tell me sinthing
                                            </Button>
                </ListItem>
                <ListItem className="mt-1 mb-1" button >
                    <Button className="btn btn-info mr-auto">
                        hey bro
                                            </Button>
                </ListItem>
                <ListItem className="mt-1 mb-1" button >
                    <Button className="btn btn-light ml-auto">
                        ya bro tell me sinthing
                                            </Button>
                </ListItem>
            </div>
            <div className="d-flex">
                <Input type="text" placeholder="Type Your Message.." className="shadow form-control border mt-2" />
                <IoMdSend className="mt-2 ml-2" style={{ fontSize: "40px" }} />
                <IoMdOptions className="mt-2 ml-2" style={{ fontSize: "40px" }} />
            </div>
        </>
    )
}

export default Message
