import React , { useState , useEffect} from 'react'
import Api_url from './../../component/Api_url'
import axios from 'axios'
import $ from 'jquery'  
import './../../css/header.css'



function Cliheader(props) {
  
    const [cloture, setcloture] = useState(props.apidata.col)
    const [encours, setencours] = useState(props.apidata.encours)
    const [NEwrequete, setNEwrequete] = useState(props.apidata.neww)
    const token = localStorage.getItem('token')

    console.log(props.apidata)
    useEffect(() => {

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
        <div class="col-xl-3 col-lg-3 ">
              <div class="card card-stats mb-4 mb-xl-0 border cardstat">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <p class="card-title text-capitalize text-muted mb-0" style={{fontsize:8}}>Clôturé</p>
                      <span class="h4 font-weight-bold mb-0">{props.apidata.col}</span>
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
              <div class="card card-stats mb-4 mb-xl-0 border cardstat">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <p class="card-title text-capitalize text-muted mb-0">En cours</p>
                      <span class="h4 font-weight-bold mb-0">{props.apidata.encours}</span>
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
              <div class="card card-stats mb-4 mb-xl-0 border cardstat">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <p class="card-title text-capitalize text-muted mb-0">Nouveau</p>
                      <span class="h4 font-weight-bold mb-0">{props.apidata.neww}</span>
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
