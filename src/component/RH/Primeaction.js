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
        prime: [
        {
            id: 12,
            M: 6,
            Y: 2021,
            Approved: true,
            waiting: true,
            SPrimes: [
                {
                    id: 8,
                    date: "2021-06-01T23:00:00.000Z",
                    Bonus: 1200,
                    Prime: 12000,
                    Comment: "commentaire",
                    Approved: false,
                    waiting: true,
                    PrimeId: 12,
                    UserId: 2,
                    User: {
                        id: 2,
                        full_name: "Amira KHEZAMI",
                        user_img: null,
                    }
                },
            ]}]}
                )


    const RHaprovel = async (result)=>{
        const data = {
            Approved : result
        }

        const res = await axios({
            headers: {'Authorization': `Bearer ${token}`},
            method: 'put',
            url : `${Api_url}Demande/Prime/Approved/${demande.id}`,
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
                                <div className="d-flex flex-row mt-2 justify-content-center">
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
