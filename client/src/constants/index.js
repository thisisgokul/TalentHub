import { AiOutlineCheck,AiFillBulb,AiFillTwitterSquare } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { MdPayment,MdVideoCall } from "react-icons/md";
import {BsPersonWorkspace,BsFacebook,BsInstagram} from "react-icons/bs"
import {VscCommentUnresolved} from "react-icons/vsc"


export const features=[
    {
        name:"Get started",
        description:"Learn how to create and manage workfusion , connect with workers,payment and schedule a meeting.",
        icon:<AiOutlineCheck size={23}/>
    },
    {
        name:"meetings",
        description:"Learn how to transition from a chat to a call for deeper collaboration, manage calendar invites, join a meeting directly in workfusion.",
        icon:<HiUserGroup size={23}/>
    }, {
        name:"Tips and tricks",
        description:"Learn how to set your availability status, stay up to date with the activity feed, and create group chats and coauthor shared files for real-time collaboration.",
        icon:<AiFillBulb size={23}/>
    },
    {
        name:"Effortless Payment Solutions",
        description:"Discover a seamless and hassle-free way to make payments with our easy-to-use payment platform. Say goodbye to complicated processes and hello to simplicity and convenience.",
        icon:<MdPayment size={23}/>
    }
]

export const tutorial=[
    {
        logo:<BsPersonWorkspace size={40}/>,
        title:"Find workers"
    },
    {
        logo:<MdPayment size={40}/>,
        title:"Easy to Pay"
    },
    {
        logo:<MdVideoCall size={40}/>,
        title:"video call"
    },
    {
        logo:<VscCommentUnresolved size={40}/>,
        title:"solve problem"

    },
    
]
export const socialMedia=[
    {
        icon:<AiFillTwitterSquare />
    },{
        icon:<BsInstagram/>
    },{
        icon:<BsFacebook/>
    }
]

export const redirector =(currentUser,navigate)=>{
    if(!currentUser){
        navigate("/index");
    }
    
} 