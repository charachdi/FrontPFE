import React , {useState , useEffect} from 'react'
import axios from 'axios'
import $ from 'jquery'
import Api_url from './../component/Api_url';


function Attend(props) {

    const token = localStorage.getItem('token')
    const [attend, setattend] = useState({
        id: 0,
        Present :false,
        Absent : false,
        Retard :false,
        Conge :false,
        date : ""
    })

    useEffect(() => {
       const setuser = ()=>{
        setattend({
            id: props.user.id,
            Present : !props.user.Presances[0] ? false : props.user.Presances[0].Present,
            Absent : !props.user.Presances[0] ? false : props.user.Presances[0].Absent,
            Retard :!props.user.Presances[0] ? false : props.user.Presances[0].Retard,
            Conge : !props.user.Presances[0] ? false : props.user.Presances[0].Conge,
            date :!props.user.Presances[0] ? "01/01/1998" : props.user.Presances[0].date,
        })
        console.log(new Date().toLocaleDateString("en-US"))
       }
       setuser()
    }, [])

      const send = {
        id: props.user.id,
        Present : false,
        Absent : false,
        Retard :false,
      }

      const Updatepresance = async(pre)=>{
        const res = await axios({
          headers: {'Authorization': `Bearer ${token}`},
          method: 'put',
          url : `${Api_url}Presance/${pre.id}`,  
          data : pre
          });
        console.log(res)
        if(res.status === 200){
            props.update(res.data.result)
            setattend(res.data.result)
        }
      
      }

    return (
        <div className="d-flex justify-content-around">

                 {
                     attend.date === `${new Date().toLocaleDateString("en-US")}`? (

                      attend.Conge ? (
                        <>
                        <i class="fas fa-check fa-2x mx-auto" style={{color: "gray" }} ></i>
                        <i class="fas fa-ban fa-2x mx-auto"style={{color: "gray" }}  > </i>
                        <i class="fas fa-exclamation-circle fa-2x  mx-auto" style={{color: "gray" }}  > </i>
                        <i class="fas fa-mug-hot fa-2x mx-auto" style={{color:"#767192"}}> </i>
                        </>
                      ):(
                        <>
                        <i class="fas fa-check fa-2x mx-auto cursor" style={{color: attend.Present ? "#2dcd94" : "gray" }} onClick={()=>{send.Absent = false ;send.Retard = false ;send.Present = true ;Updatepresance(send)}}></i>
                        <i class="fas fa-ban fa-2x mx-auto cursor"style={{color: attend.Absent ? "#F40010" : "gray" }} onClick={()=>{send.Absent = true ;attend.Absent = true ;send.Retard = false ;send.Present = false ;Updatepresance(send)}} > </i>
                        <i class="fas fa-exclamation-circle fa-2x  mx-auto cursor" style={{color: attend.Retard ? "#fedb1a" : "gray" }}  onClick={()=>{send.Absent = false ;send.Retard = true ;send.Present = false ;Updatepresance(send)}}> </i>
                        <i class="fas fa-mug-hot fa-2x mx-auto cursor" style={{color:attend.Conge ? "#767192" : "gray" }}> </i>
                        </>
                      )
                           
                     ) : (
                        <>
                        <i class="fas fa-check fa-2x mx-auto cursor" style={{color:"gray" }} onClick={()=>{send.Absent = false ;send.Retard = false ;send.Present = true ;Updatepresance(send)}}></i>
                        <i class="fas fa-ban fa-2x mx-auto cursor"style={{color:"gray" }} onClick={()=>{send.Absent = true ;attend.Absent = true ;send.Retard = false ;send.Present = false ;Updatepresance(send)}} > </i>
                        <i class="fas fa-exclamation-circle fa-2x  mx-auto cursor" style={{color:"gray" }}  onClick={()=>{send.Absent = false ;send.Retard = true ;send.Present = false ;Updatepresance(send)}}> </i>
                        <i class="fas fa-mug-hot fa-2x mx-auto cursor" style={{color:"gray" }}> </i>
                        </>
                     )
                 }
                  

                 
            
                     
             </div>
    )
}

export default Attend
