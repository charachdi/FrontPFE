import React , { useState , useEffect} from 'react'
import Api_url from './../../component/Api_url'
import Avatar from '@material-ui/core/Avatar';
import {Pie} from 'react-chartjs-2'
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import Equipeheader from './../../component/Equipe/Equipeheader'
import axios from 'axios'
import $ from 'jquery'
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import domtoimage from 'dom-to-image';
import Cliheader from './Cliheader'
import Divider from '@material-ui/core/Divider';
import Lottie from 'react-lottie';
import Chartsloding from './../../images/chartsloding.json'
import IconButton from '@material-ui/core/IconButton';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter , MDBCol, MDBFormInline , MDBIcon } from 'mdbreact';
import * as locales from 'react-date-range/dist/locale';
import { DateRange } from 'react-date-range';
import Button from '@material-ui/core/Button';

function Clidata(props) {
    const token = localStorage.getItem('token')
    const [id, setid] = useState(props.id)
    const [loading, setloading] = useState(true)
    const [clihead, setclihead] = useState([]);
    const [open, setopen] = useState();
    const [filteron, setfilteron] = useState(false);

    const toggle = ()=>{
      setopen(!open)
    }
    const [Request, setRequest] = useState([
      {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
  }
  ])
  const [locale, setLocale] = React.useState('fr');
  const [colors, setcolors] = useState(['#32B66A'])

//  pie charts
    const [username, setusername] = useState([])
    const [user_value, setuser_value] = useState([])


//  bar charts
  const [date, setdate] = useState([])
  const [date_value, setdate_value] = useState([])

  //bar origin
  const [origin, setorigin] = useState([])
  const [origin_value, setorigin_value] = useState([])

//Line charts
  const [Lineusers, setLineusers] = useState([])




    const chartlottie = {
      loop: true,
      autoplay: true,
      animationData: Chartsloding,
    };

        useEffect(() => {
          const loading_screen = ()=>{
       
            setloading(true)
            setTimeout(() => {
              setloading(false)
            }, 3500);
       
        }

            const getpiedata = async()=>{
                const pie = await axios({
                    headers: {'Authorization': `Bearer ${token}`},
                    method: 'get',
                    url : `${Api_url}stat/comptcli/pie/${id}`,
                    });
                    setusername(pie.data.username)
                    setuser_value(pie.data.user_value)
                   
            }

            const getbardata = async()=>{
              const bar = await axios({
                  headers: {'Authorization': `Bearer ${token}`},
                  method: 'get',
                  url : `${Api_url}stat/comptcli/bar/${id}`,
                  });
                  setdate(bar.data.Trim_date)
                  setdate_value(bar.data.date_value) 
          }


          const getbardataorigin = async()=>{
            const Oridata = await axios({
                headers: {'Authorization': `Bearer ${token}`},
                method: 'get',
                url : `${Api_url}stat/comptcli/origin/bar/${id}`,
                });
                setorigin(Oridata.data.origin)
                 setorigin_value(Oridata.data.Origine_value)
        }

          const getLinedata = async()=>{
            const Line = await axios({
                headers: {'Authorization': `Bearer ${token}`},
                method: 'get',
                url : `${Api_url}stat/comptcli/Line/${id}`,
                });
               setLineusers(Line.data.users)
               
        }

        const getclidata = async()=>{
          const res = await axios({
              headers: {'Authorization': `Bearer ${token}`},
              method: 'get',
              url : `${Api_url}stat/comptcli/header/${props.id}`,
              });
              setclihead(res.data)
              // setclihead({...clihead , cloture : res.data.col , NEwrequete : res.data.neww , encours : res.data.encours})
      }
            getclidata()
            loading_screen()
            getpiedata()
            getbardata()
            getLinedata()
            getbardataorigin()
        }, [])

        const bardataorigin = {
          labels: origin,
          datasets: [{
            
            data: origin_value,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgb(218, 92, 250)',
              'rgb(43, 200, 145)'
            ],
            hoverOffset: 4
          }]
        };
    
        const baroptionorigin={
          legend: {
            display: false,
            position : 'top',
        }
        }

    const piedata = {
        labels: username,
        datasets: [{
          label: 'My First Dataset',
          data: user_value,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(218, 92, 250)',
            'rgb(43, 200, 145)',
            'rgb(244, 56, 56)',
            'rgb(224, 211, 69)',
            'rgb(71, 211, 200)',
            'rgb(234, 143, 46)',
            'rgb(242, 0, 149)',

          ],
          hoverOffset: 4
        }]
      };
      const  bardata = {
        labels: date,
        datasets: [
          {
            label: "Requetes",
            data: date_value,
            backgroundColor: 'rgb(121, 106, 238)',
            borderColor:    'rgb(121, 106, 238)',
            borderWidth: 1,
          },
        ]
      }

      const linedata = {
        labels: date,
        datasets: Lineusers
    }

    const pieoption={
      legend: {
        display: true,
        position : 'bottom',
    }
    }
      
      const lineoption = {
        legend: {
          display: true,
          position : 'right',
      }
      }

      const filter = async ()=>{
        setfilteron(true)
        var start = Request[0].startDate.toLocaleDateString('en-US').split("/")
       var  end = Request[0].endDate.toLocaleDateString('en-US').split("/")
       const data = {
         startdate : `${start[1]}/${start[0]}/${start[2]}`,
         enddate : `${end[1]}/${end[0]}/${end[2]}`
       }
     


     const pie = await axios({
      headers: {'Authorization': `Bearer ${token}`},
      method: 'post',
      url : `${Api_url}stat/comptcli/pie/date/${id}`,
      data
      });

    const bar = await axios({
      headers: {'Authorization': `Bearer ${token}`},
      method: 'post',
      url : `${Api_url}stat/comptcli/bar/date/${id}`,
      data
      });

    const Oridata = await axios({
      headers: {'Authorization': `Bearer ${token}`},
      method: 'post',
      url : `${Api_url}stat/comptcli/origin/bar/date/${id}`,
      data
      });
        
    const Line = await axios({
      headers: {'Authorization': `Bearer ${token}`},
      method: 'post',
      url : `${Api_url}stat/comptcli/Line/date/${id}`,
      data
      });
      
    const res = await axios({
      headers: {'Authorization': `Bearer ${token}`},
      method: 'post',
      url : `${Api_url}stat/comptcli/header/date/${props.id}`,
      data
      });

      
      setusername(pie.data.username)
      setuser_value(pie.data.user_value)

      setdate(bar.data.Trim_date)
      setdate_value(bar.data.date_value) 

      setorigin(Oridata.data.origin)
      setorigin_value(Oridata.data.Origine_value)   
      
      setLineusers(Line.data.users)
      setclihead(res.data)

    }

    const exportPNG = ()=>{
      console.log("png")
      // Equipedata
    setTimeout(() => {
      domtoimage.toJpeg(document.getElementById('Datatab'), { quality: 1 })
      .then(function (dataUrl) {
          var link = document.createElement('a');
          link.download = 'Data.jpeg';
          link.href = dataUrl;
          link.click();
      });
    }, 2000);
     
    }


    const Resetfilter = async ()=>{
        setfilteron(false)
        
        const pie = await axios({
          headers: {'Authorization': `Bearer ${token}`},
          method: 'get',
          url : `${Api_url}stat/comptcli/pie/${id}`,
          });
    
        const bar = await axios({
          headers: {'Authorization': `Bearer ${token}`},
          method: 'get',
          url : `${Api_url}stat/comptcli/bar/${id}`,
          });
    
        const Oridata = await axios({
          headers: {'Authorization': `Bearer ${token}`},
          method: 'get',
          url : `${Api_url}stat/comptcli/origin/bar/${id}`,
          });
            
        const Line = await axios({
          headers: {'Authorization': `Bearer ${token}`},
          method: 'get',
          url : `${Api_url}stat/comptcli/Line/${id}`,
          });
          
        const res = await axios({
          headers: {'Authorization': `Bearer ${token}`},
          method: 'get',
          url : `${Api_url}stat/comptcli/header/${props.id}`,
          });
    
          
          setusername(pie.data.username)
          setuser_value(pie.data.user_value)
    
          setdate(bar.data.Trim_date)
          setdate_value(bar.data.date_value) 
    
          setorigin(Oridata.data.origin)
          setorigin_value(Oridata.data.Origine_value)   
          
          setLineusers(Line.data.users)
          setclihead(res.data)
    
    }

    const exportexcel = async()=>{
      var start = Request[0].startDate.toLocaleDateString('en-US').split("/")
      var  end = Request[0].endDate.toLocaleDateString('en-US').split("/")
      const data = {
        startdate : `${start[1]}/${start[0]}/${start[2]}`,
        enddate : `${end[1]}/${end[0]}/${end[2]}`
      }

      if(filteron){
        const res = await axios({
          headers: {'Authorization': `Bearer ${token}`},
          method: 'post',
          url : `${Api_url}Import/export/excel/date/${id}`,
          data
          });
          console.log(res)
          var link = document.createElement('a');
          link.download = res.data.clientname;
          link.href = res.data.link;
          link.click();
          
      }else{
        const res = await axios({
          headers: {'Authorization': `Bearer ${token}`},
          method: 'get',
          url : `${Api_url}Import/export/excel/${id}`,
          });
          console.log(res)
          var link = document.createElement('a');
          link.download = res.data.clientname;
          link.href = res.data.link;
          link.click();
          
      }
      }
     

    return (
        <div className="row col-12 justify-content-center mt-4" style={{backgroundColor:'#FAFAFA'}}>


        {
          Lineusers.length === 0 ? (
            <Lottie 
            options={chartlottie}
            height={"50%"}
            width={"50%"}
            isClickToPauseDisabled={true}
          />
          ):(
            <>
        <div id="exportbtn" className="row col-12 justify-content-end mb-4" >
           
            <button className="btn-Filter cardstat mr-1" onClick={()=>{toggle()}} style={{width:50 , height : 50}}><i class="fas fa-filter"></i><small  className="text-capitalize">filter</small></button>
            {filteron ? (  <button className="btn-Filter cardstat mr-2"  style={{width:50 , height : 50}}><Tooltip title="supprimer le filtre"><IconButton aria-label="delete" onClick={()=>{Resetfilter();setLineusers([])}}><CloseIcon style={{color : "white"}}/></IconButton></Tooltip></button>): null }
           <button className="btn-export cardstat text-capitalize mr-2" onClick={(e)=>{exportPNG()}} style={{width:"5%"}} ><i class="far fa-file-image fa-2x" style={{color:"#28A745"}}></i></button>
           <button className="btn-export cardstat text-capitalize" onClick={(e)=>{exportexcel()}} style={{width:"5%"}} ><i class="fas fa-file-csv fa-2x" style={{color:"#28A745"}}></i></button>

            </div>
            <Cliheader apidata={clihead}/>



            <div className="card col-4 mt-3 cardstat "  style={{width:"30%"}}>
                <p className="card-title mt-3">Nombre de requête par jour</p>
              <Divider />
                <div className="card-body">
                    <Bar data={bardata} width={30}  height={20}/>
                </div>
            </div>

            <div className="card col-4 mt-3 cardstat "  style={{width:"30%"}}>
                <p className="card-title mt-3">Total de requêtes par collaborateurs</p>
              <Divider />
                <div className="card-body">
                <Pie data={piedata} options={pieoption}  width={30}  height={20} />
                </div>
            </div>


            <div className="card col-4 mt-3 cardstat "  style={{width:"30%"}}>
                <p className="card-title mt-3">Origin des requêtes</p>
              <Divider />
                <div className="card-body">
                <Bar data={bardataorigin} width={30}  height={20}/>
                </div>
            </div>


          
            <div className="card col-12 mt-3 cardstat " >
                <p className="card-title mt-3">Total de requête par jour et par collaborateur</p>
              <Divider />
                <div className="card-body">
                <Line data={linedata} options={lineoption}  width={160}  height={50} />
                </div>
            </div>

            
            </>
          )
        }

           
<MDBModal isOpen={open} toggle={()=>toggle()} size="md" disableBackdrop={false}>
              <MDBModalHeader toggle={()=>toggle()} className="text-center"></MDBModalHeader>
              <MDBModalBody>
              <div className="text-center ">
              <DateRange
                    className="mt-5"
                    editableDateInputs={true}
                    onChange={item => setRequest([item.selection]) }
                    moveRangeOnFirstSelection={false}
                    ranges={Request}
                    rangeColors={colors}
                    locale={locales[locale]}
                /><br />


                    <IconButton style={{backgroundColor : "#32B66A"}} className="mt-5" onClick={()=>{filter() ; toggle() ; setLineusers([])}}>
                    <i class="fas fa-filter" style={{color : "white"}}></i>
                    </IconButton>
              </div>
              </MDBModalBody>
              </MDBModal>
        </div>
    )
}

export default Clidata
