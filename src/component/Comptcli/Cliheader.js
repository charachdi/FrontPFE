import React , { useState , useEffect} from 'react'
import Api_url from './../../component/Api_url'
import axios from 'axios'
import $ from 'jquery'  



function Cliheader(props) {
  
    const [cloture, setcloture] = useState(0)
    const [encours, setencours] = useState(0)
    const [NEwrequete, setNEwrequete] = useState(0)
    const token = localStorage.getItem('token')


useEffect(() => {

    const getclidata = async()=>{
        const res = await axios({
            headers: {'Authorization': `Bearer ${token}`},
            method: 'get',
            url : `${Api_url}stat/comptcli/header/${props.id}`,
            });
            setcloture(res.data.col)
            setNEwrequete(res.data.neww)
            setencours(res.data.encours)
           
    }
       
    getclidata()
   
}, [])

    



    return (
        <div className="row col-12 mb-4 justify-content-center">

        <div style={{minHeight:80}}  className="col-2 card z-depth-3 my-3 mx-2 text-center">
        <span className="mt-2 mb-2 " style={{fontSize:12}}>Clôturé</span><i class="fas fa-check-circle fa-2x mb-2" style={{color:"#2dcd94"}}></i>{cloture}
        
        </div>

        <div  style={{minHeight:80}} className="col-2 card z-depth-3 my-3 mx-2 text-center">
        <span className="mt-2 mb-2" style={{fontSize:12}}>En cours</span><i class="fas fa-spinner fa-2x mb-2" style={{color:"#edc55a"}}></i>{encours}
        
        </div>
        
        <div style={{minHeight:80}}  className="col-2 card z-depth-3 my-3 mx-2 text-center">
        <span className="mt-2 mb-2" style={{fontSize:12}}>Nouveau</span><i class="fas fa-plus-circle fa-2x mb-2" style={{color:"#1477ad"}}></i>{NEwrequete}
        
        </div>


        
        </div>
    )
}

export default Cliheader
