import React , { useState , useEffect} from 'react'



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

        <div style={{minHeight:80}}  className="col-2 card  my-3 mx-2 text-center">
        <span className="mt-2 mb-2 " style={{fontSize:12}}>Clôturé</span><i class="fas fa-check-circle fa-2x mb-2" style={{color:"#2dcd94"}}></i>{cloture}
        
        </div>

        <div  style={{minHeight:80}} className="col-2 card  my-3 mx-2 text-center">
        <span className="mt-2 mb-2" style={{fontSize:12}}>En cours</span><i class="fas fa-spinner fa-2x mb-2" style={{color:"#edc55a"}}></i>{encours}
        
        </div>
        <div style={{minHeight:80}}  className="col-2 card  my-3 mx-2 text-center">
            <span className="mt-2 mb-2" style={{fontSize:12}}>En attente retour client</span><i class="fas fa-spinner fa-2x mb-2" style={{color:"#edc55a"}}></i>{retourcli}
        </div>

        <div style={{minHeight:80}}  className="col-2 card  my-3 mx-2 text-center">
        <span className="mt-2 mb-2" style={{fontSize:12}}>En attente interne</span><i class="fas fa-spinner fa-2x mb-2" style={{color:"#edc55a"}}></i>{attinter}
        
        </div>
        <div style={{minHeight:80}}  className="col-2 card  my-3 mx-2 text-center">
        <span className="mt-2 mb-2" style={{fontSize:12}}>Nouveau</span><i class="fas fa-plus-circle fa-2x mb-2" style={{color:"#1477ad"}}></i>{NEwrequete}
        
        </div>


        
        </div>
    )
}

export default Equipeheader
