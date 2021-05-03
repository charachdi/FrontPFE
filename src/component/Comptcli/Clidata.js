import React , { useState , useEffect} from 'react'
import Api_url from './../../component/Api_url'
import Avatar from '@material-ui/core/Avatar';
import {Pie} from 'react-chartjs-2'
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import Equipeheader from './../../component/Equipe/Equipeheader'
import axios from 'axios'
import $ from 'jquery'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import domtoimage from 'dom-to-image';
import Cliheader from './Cliheader'

import Lottie from 'react-lottie';
import Chartsloding from './../../images/chartsloding.json'
import IconButton from '@material-ui/core/IconButton';


function Clidata(props) {
    const token = localStorage.getItem('token')
    const [id, setid] = useState(props.id)
    const [loading, setloading] = useState(true)
    

//  pie charts
    const [username, setusername] = useState([])
    const [user_value, setuser_value] = useState([])


//  bar charts
  const [date, setdate] = useState([])
  const [date_value, setdate_value] = useState([])

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


          const getLinedata = async()=>{
            const Line = await axios({
                headers: {'Authorization': `Bearer ${token}`},
                method: 'get',
                url : `${Api_url}stat/comptcli/Line/${id}`,
                });
               setLineusers(Line.data.users)
               
        }
            loading_screen()
            getpiedata()
            getbardata()
            getLinedata()
        }, [])

    

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
        position : 'right',
    }
    }
      
      const lineoption = {
        legend: {
          display: true,
          position : 'right',
      }
      }

      


    return (
        <div className="row col-12 justify-content-center mt-4" style={{backgroundColor:'#FAFAFA'}}>


        {
          Lineusers.length === 0 ? (
            <Lottie 
            options={chartlottie}
            height={"70%"}
            width={"70%"}
            isClickToPauseDisabled={true}
          />
          ):(
            <>
            <Cliheader id={id}/>


            <div className="col-6">
            <Bar data={bardata} width={30}  height={20}/>
            </div>

            <div className="col-6">
            <Pie data={piedata} options={pieoption}  width={30}  height={20} />
            </div>

            <div className="col-12 mt-5">
            <Line data={linedata} options={lineoption}  width={160}  height={50} />
            </div>
            </>
          )
        }

           
           
        </div>
    )
}

export default Clidata