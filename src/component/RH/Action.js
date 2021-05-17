import React,{ useState , useEffect , forwardRef} from 'react'
import Api_url from './../../component/Api_url';
import axios from 'axios'
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import UpdateIcon from '@material-ui/icons/Update';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';

function Action(props) {

    const token = localStorage.getItem('token')
    const [isloading, setisloading] = useState(false)
    const [demande, setdemande] = useState({
        "id": 3,
        "Type": "Conge",
        "Startdate": "5/11/2021",
        "enddate": "5/21/2021",
        "Approved": false,
        "waiting": true,
        "createdAt": "2021-05-11T15:46:32.000Z",
        "updatedAt": "2021-05-11T15:46:32.000Z",
        "UserId": 9,
        "User": {
            "id": 9,
            "full_name": "Haboubi amine",
            "user_name": null,
            "ftime": "false",
            "pwd": "$2a$10$tKCNi8rVxQf.3C6RsmNV3.DacAS1B24wwCabuKKhwP5unh4ilD6Ye",
            "user_email": "haboubi@infopro-digital.com",
            "user_level": "admin",
            "user_img": "http://localhost:3001/userimg/1620425459463.jpg",
            "user_spec": null,
            "user_sex": "Homme",
            "address": "Manouba",
            "country": "",
            "tel": 21861159,
            "fax": 0,
            "Website": "",
            "user_ip": null,
            "approved": 0,
            "activation_code": null,
            "banned": 0,
            "ckey": null,
            "ctime": null,
            "tel_ip": null,
            "user_matricule": null,
            "date_reni": null,
            "img_path": "C:\\Users\\amine\\Desktop\\PFE\\pfeserver\\uploads\\userimg\\1620425459463.jpg",
            "createdAt": "2021-04-22T18:52:16.000Z",
            "updatedAt": "2021-05-07T22:10:59.000Z",
            "EquipeId": null
        }
    })


    const RHaprovel = async (result)=>{
        const data = {
            Approved : result
        }

        const res = await axios({
            headers: {'Authorization': `Bearer ${token}`},
            method: 'put',
            url : `${Api_url}Demande/Approved/${demande.id}`,
            data
        })
        console.log(res)
        if(res.status === 200){
            setdemande(res.data.updateddem)
            setTimeout(() => {
                setisloading(!isloading)
                // setdemande({...demande , waiting : res.data.updateddem.waiting})
            }, 2000);


        }
    }

    
    useEffect(() => {
       const getdemande = ()=>{
           setdemande(props.demande)
       }
       getdemande()
    }, [])
    return (
         <div className="text-center mt-2">
                    {
                        demande.waiting ? (

                            isloading ? (
                                <i style={{color:"#2ECD94"}} className=" fas fa-spinner fa-spin fa-2x mt-2"></i>
                            ) : (
                                <div className="d-flex flex-row mt-2">
                                <CheckIcon className="mr-2"  style={{color:"#2ECD94"}}  onClick={()=>{setisloading(!isloading);RHaprovel(true)}}/>
                                <CloseIcon style={{color:"#ff0000"}} onClick={()=>{setisloading(!isloading);RHaprovel(false) }}/>
                                </div>
                            )
                           
                        ) : (
                           demande.Approved ? (
                                <Tooltip title="Modifier" placement="bottom" aria-label="add">
                                    <IconButton size="small" style={{color:"white" , backgroundColor :"#2ECD94"}}  onClick={()=>{RHaprovel(false) }}>
                                    <CheckIcon   />
                                  </IconButton>
                                  </Tooltip>
                           ) : (
                            <Tooltip title="Modifier" placement="bottom" aria-label="add">
                                <IconButton size="small" style={{color:"white" , backgroundColor :"#ff0000"}}  onClick={()=>{ RHaprovel(true) }}>
                                <CloseIcon />
                               </IconButton>
                            </Tooltip>
                            )
                        )
                    }
                      </div>
    )
}

export default Action
