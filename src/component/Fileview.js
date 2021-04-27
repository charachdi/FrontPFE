import React , { useState , useEffect} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Lottie from 'react-lottie';
import Complete from './../images/complete.json'
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios'
import Api_url from './../component/Api_url'
import { useHistory } from "react-router-dom";



function Fileview(props) {
    const token = localStorage.getItem('token')
    const [value, setvalue] = useState(0)
    const [file, setfile] = useState(props.file)
    const history = useHistory();
    
    useEffect(() => {
  //  console.log(props.file)
   
    }, [])

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: Complete,
      };


    const updatefile = async (data)=>{
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'put',
        url : `${Api_url}Import/file/complete/${file.id}`,
        data
        });
        console.log(res)
    }

     //file %
    props.socket.on(`${file.Roomid}`, (data)=>{
      if(data.Rid === file.Roomid){
        setvalue(data.value)
      }
     
    });

    //updatefile
    props.socket.on(`${props.file.Roomid}uploadended`, (data)=>{
     

      if(data.id === file.id){
        setfile({...file , complete : 1})

        setTimeout(() => {
          props.updatecom(file)
        }, 2000);
        
      }
  });
    return (
        <div key={file.id}  className="file card mx-3 my-3 z-depth-3 grow" onClick={()=>{window.location.replace(`/File/${file.Nom_file}/${file.id}`)}}>
      
       <div className="d-flex flex-row ml-2 mt-3">
       <i  style={{color:"#2DCD94"}} className="far fa-file-excel fa-3x "></i>
       <p className="text-wrap" style={{fontSize:10}}>{file.Nom_file}</p>
       </div>
      
      

        {
        file.complete ? (
            <Lottie 
            options={defaultOptions}
            height={50}
            width={50}
          />
        ) : (
            <div>
            <CircularProgress className="mt-2" style={{color:"#2DCD94"}} variant="determinate" value={value} />
            {
              value === 0 ? (
                <i id="loading" className=" fas fa-spinner fa-spin fa-2x load mr-4" style={{color:"#2DCD94"}}></i>
              ):(
                <p className="prog-value">% {value}</p>
              )
            }
          
            </div>
        )
        }
       
      
       {/* <i id="loading" className=" fas fa-spinner fa-spin fa-3x load" style={{color:"#2DCD94"}}></i> */}
       <div className="mt-4 mb-3  d-flex flex-row" >
       <a className=" mx-auto"><Avatar src={file.User.user_img} alt="aaa" style={{width:25 , height :25}} /></a><span style={{fontSize:10}}>{file.User.full_name} <br/> {file.createdAt}</span>
       <a href={file.url_file} className=" mx-auto"><i className="fas fa-download  cursor"></i></a>
       </div>
       
        </div>
    )
}

export default Fileview
