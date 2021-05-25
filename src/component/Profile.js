import React , { useState , useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';


function Profile(props) {
  const [selected, setselected] = useState(props.user)
  console.log(selected)
  const [level, setlevel] = useState(!selected.user_level ? "":selected.user_level)
    return (
        <div className="row col-12 justify-content-center mt-3">
            <div className=" col-8 text-left border-right mt-3">
                <p><i class="fas fa-envelope-open-text mr-3 mt-2" style={{color:'#2DCD94'}}></i>{selected.user_email}</p>
                <p><i class="fas fa-user-tag mr-3 mt-2" style={{color:'#2DCD94'}}></i>{level}</p>
                <p><i class="fas fa-map-marked-alt mr-3 mt-2" style={{color:'#2DCD94'}}></i> {selected.address ? selected.address : "---------------------"}</p>
                <p><i class="fas fa-flag mr-3 mt-2"style={{color:'#2DCD94'}}></i>{selected.country ? selected.country : "---------------------"}</p>
            
               
            </div>

            <div className=" col-4 text-left border-left mt-3">
           
              
              <p><i class="fas fa-phone-alt mr-3 mt-2 "style={{color:'#2DCD94'}}></i>{selected.tel ? selected.tel : "---------------------"}</p>
              <p><i class="fas fa-fax mr-3 mt-2 "style={{color:'#2DCD94'}}></i>{selected.fax ? selected.fax : "---------------------"}</p>
              <p><i class="fas fa-globe mr-3 mt-2"style={{color:'#2DCD94'}}></i>{selected.Website ? selected.Website : "---------------------"}</p>
              <p><i class="fas fa-venus-mars mr-3 mt-2"style={{color:'#2DCD94'}}></i>{selected.user_sex ? selected.user_sex : "---------------------"}</p>
              {
                level === "Chef Service" ? <p>Service : {selected.Chef.Service ? selected.Chef.Service.Nom_service : ""} </p> : null
              }

              {
                level !== "Chef Service" ? <div className="row ml-1"><i class="fab fa-teamspeak mr-3 mt-2"style={{color:'#2DCD94'}}></i><p className="mt-1" style={{fontSize : 10}}>{selected.Equipe ? selected.Equipe.Nom_equipe + " / " : null}{selected.Equipe ? selected.Equipe.Service.Nom_service : "---------------------"}</p></div> : null 
              }
              {/* <p><i class="fab fa-teamspeak mr-3 mt-2"style={{color:'#2DCD94'}}></i>{selected.Equipe ? selected.Equipe.Nom_equipe + " / " : null}{selected.Chef ? selected.Chef.Service.Nom_service : null}</p> */}
            
          </div>
          <Divider className="col-10 mt-4"  />
        </div>
        
    )
}

export default Profile
