import React , {useState , useEffect} from 'react'
import axios from 'axios'
import $ from 'jquery'
import Api_url from './../component/Api_url';


function Attend(props) {
 
    const token = localStorage.getItem('token')
    const [id, setid] = useState(props.user.Presances[0] ? props.user.Presances[0].id : 0);
    const [attend, setattend] = useState({
        id: 0,
        Present :false,
        Absent : false,
        Retard :false,
        Conge :false,
        date : ""
    })

    useEffect(() => {

      const getpresnace = async ()=>{
        const res = await axios({
          headers: {'Authorization': `Bearer ${token}`},
          method: 'get',
          url : `${Api_url}Presance/pre/${id}`,
          });
          setattend(res.data)
      }
       getpresnace()
    }, [])

      const send = {
        id: attend.id,
        Present : false,
        Absent : false,
        Retard :false,
        UserId :props.user.id
      }

      const Updatepresance = async(pre)=>{
        const res = await axios({
          headers: {'Authorization': `Bearer ${token}`},
          method: 'put',
          url : `${Api_url}Presance/${attend.id}`,  
          data : pre
          });
        console.log(res)
        props.update(res.data.result)
        setattend(res.data.result)
      
      }

      const Rendericon = ()=>{
        
        if(attend.id !== 0){
            if(attend.Conge){
              return(
                <>
                <i class="fas fa-check fa-2x mx-auto" style={{color: "gray" }} ></i>
                <i class="fas fa-ban fa-2x mx-auto"style={{color: "gray" }}  > </i>
                <i class="fas fa-exclamation-circle fa-2x  mx-auto" style={{color: "gray" }}  > </i>
                <i class="fas fa-mug-hot fa-2x mx-auto" style={{color:"#767192"}}> </i>
                </>
              )
            }else {
              return (
                <>
                <i class="fas fa-check fa-2x mx-auto cursor" style={{color: attend.Present ? "#2dcd94" : "gray" }} onClick={()=>{send.Absent = false ;send.Retard = false ;send.Present = true ;Updatepresance(send)}}></i>
                <i class="fas fa-ban fa-2x mx-auto cursor"style={{color: attend.Absent ? "#F40010" : "gray" }} onClick={()=>{send.Absent = true ;send.Retard = false ;send.Present = false ;Updatepresance(send)}} > </i>
                <i class="fas fa-exclamation-circle fa-2x  mx-auto cursor" style={{color: attend.Retard ? "#fedb1a" : "gray" }}  onClick={()=>{send.Absent = false ;send.Retard = true ;send.Present = false ;Updatepresance(send)}}> </i>
                <i class="fas fa-mug-hot fa-2x mx-auto cursor" style={{color:attend.Conge ? "#767192" : "gray" }}> </i>
                </>
              )
            }
        }else{
          return (
                      <>
                        <i class="fas fa-check fa-2x mx-auto cursor" style={{color:"gray" }} onClick={()=>{send.Absent = false ;send.Retard = false ;send.Present = true ;Updatepresance(send)}}></i>
                        <i class="fas fa-ban fa-2x mx-auto cursor"style={{color:"gray" }} onClick={()=>{send.Absent = true ;attend.Absent = true ;send.Retard = false ;send.Present = false ;Updatepresance(send)}} > </i>
                        <i class="fas fa-exclamation-circle fa-2x  mx-auto cursor" style={{color:"gray" }}  onClick={()=>{send.Absent = false ;send.Retard = true ;send.Present = false ;Updatepresance(send)}}> </i>
                        <i class="fas fa-mug-hot fa-2x mx-auto cursor" style={{color:"gray" }}> </i>
                        </>
          )
        }
      }


    return (
        <div className="d-flex justify-content-around" id={attend.id}>
                    {
                      Rendericon()
                    }
                 
            
                     
             </div>
    )
}

export default Attend
