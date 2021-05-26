import React , {useState , useEffect} from 'react'
import axios from 'axios'
import $ from 'jquery'
import Api_url from './../component/Api_url';
import TextField from '@material-ui/core/TextField';

function Comment(props) {


    const token = localStorage.getItem('token')
    const [Comment, setComment] = useState("")
    const [id, setid] = useState(0)

    useEffect(() => {

        const getcomm =()=>{
            setComment(props.comment)
            setid(props.id)
        }
        getcomm()
    }, [])


    const updatecomment = async()=>{
        const data = {
        text :  Comment
        }
    
      
        const res = await axios({
          headers: {'Authorization': `Bearer ${token}`},
          method: 'put',
          url : `${Api_url}plan/${id}`,  
          data
          });
          console.log(res)
          if(res.status === 200){
              setComment(res.data.Comment)
          }
      }
      
    return (
        <div>
         <TextField style={{width:"100%"}} placeholder="Commentaire" onBlur={()=>{updatecomment()}} onChange={(e)=>{setComment(e.target.value)}} value={Comment}   variant="outlined" size='small'/>
        </div>
    )
}

export default Comment
