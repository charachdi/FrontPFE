import React , { useState , useEffect} from 'react'
import Api_url from './../../component/Api_url'
import axios from 'axios'
import $ from 'jquery'  
import './../../css/header.css'



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

        {/* <div style={{minHeight:80}}  className="col-2 card z-depth-3 my-3 mx-2 text-center">
        <span className="mt-2 mb-2 " style={{fontSize:12}}>Clôturé</span><i class="fas fa-check-circle fa-2x mb-2" style={{color:"#2dcd94"}}></i>{cloture}
        
        </div>

        <div  style={{minHeight:80}} className="col-2 card z-depth-3 my-3 mx-2 text-center">
        <span className="mt-2 mb-2" style={{fontSize:12}}>En cours</span><i class="fas fa-spinner fa-2x mb-2" style={{color:"#edc55a"}}></i>{encours}
        
        </div>
        
        <div style={{minHeight:80}}  className="col-2 card z-depth-3 my-3 mx-2 text-center">
        <span className="mt-2 mb-2" style={{fontSize:12}}>Nouveau</span><i class="fas fa-plus-circle fa-2x mb-2" style={{color:"#1477ad"}}></i>{NEwrequete}
        
        </div> */}

        {/* :----------------------------En cours--------------------------------- */}
        <div class="col-xl-3 col-lg-3">
              <div class="card card-stats mb-4 mb-xl-0 border">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title text-capitalize text-muted mb-0" style={{fontsize:8}}>Clôturé</h5>
                      <span class="h2 font-weight-bold mb-0">{cloture}</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-success text-white rounded-circle shadow">
                      <i class="fas fa-check" ></i>
                      </div>
                    </div>
                  </div>
                  <p class="mt-3 mb-0 text-muted text-sm">
                    {/* <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span> */}
                    {/* <span class="text-nowrap">Since last month</span> */}
                  </p>
                </div>
              </div>
            </div>
        {/* :----------------------------En cours--------------------------------- */}
        <div class="col-xl-3 col-lg-3">
              <div class="card card-stats mb-4 mb-xl-0 border">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title text-capitalize text-muted mb-0">En cours</h5>
                      <span class="h2 font-weight-bold mb-0">{encours}</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-warning text-white rounded-circle shadow">
                      <i class="fas fa-spinner" ></i>
                      </div>
                    </div>
                  </div>
                  <p class="mt-3 mb-0 text-muted text-sm">
                    {/* <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span> */}
                    {/* <span class="text-nowrap">Since last month</span> */}
                  </p>
                </div>
              </div>
            </div>

            {/* :----------------------------Nouveau--------------------------------- */}
        <div class="col-xl-3 col-lg-3">
              <div class="card card-stats mb-4 mb-xl-0 border">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title text-capitalize text-muted mb-0">Nouveau</h5>
                      <span class="h2 font-weight-bold mb-0">{NEwrequete}</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-info text-white rounded-circle shadow">
                      <i class="fas fa-plus" ></i>
                      </div>
                    </div>
                  </div>
                  <p class="mt-3 mb-0 text-muted text-sm">
                    {/* <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span> */}
                    {/* <span class="text-nowrap">Since last month</span> */}
                  </p>
                </div>
              </div>
            </div>
        
        </div>
    )
}

export default Cliheader
