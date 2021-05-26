import React , { useState , useEffect} from 'react'
import './../../css/header.css'


function Equipeheader(props) {
  
    const [cloture, setcloture] = useState(props.data.colture)
    const [encours, setencours] = useState(props.data.cours)
    const [retourcli, setretourcli] = useState(props.data.retour_client)
    const [attinter, setattinter] = useState(props.data.attente_interne)
    const [NEwrequete, setNEwrequete] = useState(props.data.Nouveau)

useEffect(() => {

   
       
    
   
}, [])

    // const cours = props.data.filter(item => item.Statut == 'En cours')
    // const col = props.data.filter(item => item.Statut === 'Clôturé')
    // const attclient = props.data.filter(item => item.Statut === 'En attente retour client')
    // const attinterne = props.data.filter(item => item.Statut === 'En attente interne')
    // const newreq = props.data.filter(item => item.Statut === 'Nouveau')

    // setcloture(col.length)
    // setencours(cours.length)
    // setretourcli(attclient.length)
    // setattinter(attinterne.length)
    // setNEwrequete(newreq.length)
    



    return (
        <div className="row col-12 mb-4 justify-content-center">

{/* 
        
        

      
        <div style={{minHeight:80}}  className="col-2 card  my-3 mx-2 text-center">
        <span className="mt-2 mb-2" style={{fontSize:12}}>Nouveau</span><i className="fas fa-plus-circle fa-2x mb-2" style={{color:"#1477ad"}}></i>{NEwrequete}
        
        </div> */}
{/* :----------------------------En cours--------------------------------- */}
        <div className="col-xl-3 col-lg-3">
              <div className="card card-stats mb-4 mb-xl-0 border cardstat ">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title text-capitalize text-muted mb-0" style={{fontsize:8}}>Clôturé</h5>
                      <span className="h2 font-weight-bold mb-0">{cloture}</span>
                    </div>
                    <div className="col-auto">
                      <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                      <i className="fas fa-check" ></i>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    {/* <span className="text-success mr-2"><i className="fa fa-arrow-up"></i> 3.48%</span> */}
                    {/* <span className="text-nowrap">Since last month</span> */}
                  </p>
                </div>
              </div>
            </div>
        {/* :----------------------------En cours--------------------------------- */}
        <div className="col-xl-3 col-lg-3">
              <div className="card card-stats mb-4 mb-xl-0 border cardstat">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title text-capitalize text-muted mb-0">En cours</h5>
                      <span className="h2 font-weight-bold mb-0">{encours}</span>
                    </div>
                    <div className="col-auto">
                      <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                      <i className="fas fa-spinner" ></i>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    {/* <span className="text-success mr-2"><i className="fa fa-arrow-up"></i> 3.48%</span> */}
                    {/* <span className="text-nowrap">Since last month</span> */}
                  </p>
                </div>
              </div>
            </div>
        {/* :----------------------------En attente retour client--------------------------------- */}
        <div className="col-xl-3 col-lg-3">
              <div className="card card-stats mb-4 mb-xl-0 border cardstat ">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title text-capitalize  text-muted mb-0" style={{fontSize : 12}} >retour client / interne</h5>
                      <span className="h2 font-weight-bold mb-0">{retourcli + attinter}</span>
                    </div>
                    <div className="col-auto">
                      <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                      <i className="fas fa-spinner" ></i>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    {/* <span className="text-success mr-2"><i className="fa fa-arrow-up"></i> 3.48%</span> */}
                    {/* <span className="text-nowrap">Since last month</span> */}
                  </p>
                </div>
              </div>
            </div>

            {/* :----------------------------En attente interne--------------------------------- */}
        {/* <div className="col-xl-3 col-lg-3">
              <div className="card card-stats mb-4 mb-xl-0 border cardstat">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title text-capitalize text-muted mb-0">interne</h5>
                      <span className="h2 font-weight-bold mb-0">{attinter}</span>
                    </div>
                    <div className="col-auto">
                      <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                      <i className="fas fa-spinner" ></i>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-success mr-2"><i className="fa fa-arrow-up"></i> 3.48%</span>
                    <span className="text-nowrap">Since last month</span>
                  </p>
                </div>
              </div>
            </div> */}

              {/* :----------------------------Nouveau--------------------------------- */}
        <div className="col-xl-3 col-lg-3">
              <div className="card card-stats mb-4 mb-xl-0 border cardstat">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title text-capitalize text-muted mb-0">Nouveau</h5>
                      <span className="h2 font-weight-bold mb-0">{NEwrequete}</span>
                    </div>
                    <div className="col-auto">
                      <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                      <i className="fas fa-plus" ></i>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    {/* <span className="text-success mr-2"><i className="fa fa-arrow-up"></i> 3.48%</span> */}
                    {/* <span className="text-nowrap">Since last month</span> */}
                  </p>
                </div>
              </div>
            </div>



        </div>

        
    )
}

export default Equipeheader
