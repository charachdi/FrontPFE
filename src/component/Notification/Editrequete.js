import React , {useState , useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar';
function Editrequete(props) {
    // {
    //     "userimg": "http://localhost:3001/userimg/1619189970554.jpeg",
    //     "full_name": "Talel Tazni",
    //     "reqid": 310410,
    //     "text": "Modifier"
    // }
    return (
       
        <div onClick={(e)=>{console.log('clicked')}} className="d-flex flex-row"> <Avatar src={props.data.userimg ? props.data.userimg : "" } alt={props.data.full_name} style={{width: 40, height : 40}} /> 
        <p style={{fontSize:10}} className="mt-3 ml-2">{props.data.full_name}</p> 
        <span style={{fontSize:10}} className="mt-3 ml-2">{props.data.text} {props.data.reqid}</span>
        </div>

        
        
    )
}

export default Editrequete
