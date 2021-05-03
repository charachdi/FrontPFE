import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import Icon from "@material-ui/core/Icon";
import AddIcon from "@material-ui/icons/Add";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBCol,
  MDBFormInline,
  MDBIcon,
} from "mdbreact";
import TextField from "@material-ui/core/TextField";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import MenuItem from "@material-ui/core/MenuItem";
import { MDBDataTableV5 } from "mdbreact";
import axios from "axios";
import $ from "jquery";
import Api_url from "./../component/Api_url";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { TwitterPicker } from "react-color";
import Slider from "@material-ui/core/Slider";
import InputBase from "@material-ui/core/InputBase";
import ReactDatatable from "@ashvin27/react-datatable";

import Lottie from "react-lottie";
import Loading from "./../images/loading.json";
// import { mdbTableEditor } from 'mdb-table-editor'

function Clients() {
  const token = localStorage.getItem("token");
  const [open, setopen] = useState(false);
  const [suppopen, setsuppopen] = useState(false);
  const [editopen, seteditopen] = useState(false);
  const history = useHistory();
  const [loding, setloding] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Loading,
  };
  const [selectedrow, setselectedrow] = useState({
    id: 6,
    Nom_compteCli: "amine",
    description: "aaaaaaaaaaaaa",
    createdAt: "2021-03-17T08:35:26.000Z",
    updatedAt: "2021-03-17T08:39:45.000Z",
    ServiceId: 1,
    EquipeId: 1,
    Equipe: {
      id: 1,
      Nom_equipe: "dream team",
      createdAt: "2021-03-16T15:08:53.000Z",
      updatedAt: "2021-03-16T15:08:53.000Z",
      ServiceId: 1,
    },
    Service: {
      id: 1,
      Nom_service: "informatiqueeeee",
      createdAt: "2021-03-16T15:08:36.000Z",
      updatedAt: "2021-03-16T15:08:36.000Z",
    },
    Clientimg: {
      id: 2,
      img_profile: "http://localhost:3001/clientimg/1615970126679.jpeg",
      img_background: "http://localhost:3001/clientimg/1615970126707.jpeg",
      createdAt: "2021-03-17T08:35:26.000Z",
      updatedAt: "2021-03-17T08:35:26.000Z",
      CompteClientId: 6,
    },
    Theme: {
      Color: "#eb144c",
      CompteClientId: 5,
      createdAt: "2021-03-22T13:15:37.000Z",
      id: 1,
      updatedAt: "2021-03-22T13:15:37.000Z",
    },
  });

  const [userlvl, setuserlvl] = useState(false);

  const config = {
    page_size: 10,
    length_menu: [10, 20, 50],
    show_filter: true,
    show_pagination: true,
    pagination: "advance",
    button: {
      excel: false,
      print: false,
    },
  };

  const [shownrow, setshownrow] = useState([]);
  const [rowselected, setrowselected] = useState(7);
  const [pageselected, setpageselected] = useState(1);
  const [change, setchange] = useState({
    first: 0,
    second: 7,
  });
  const [themeparams, setthemeparams] = useState({
    fontsSize: 25,
    color: "black",
  });

  const [nomclient, setnomclient] = useState("");
  const [ServiceId, setServiceId] = useState("");
  const [EquipeId, setEquipeId] = useState("");

  const [clients, setclients] = useState([]);
  const [equipe, setequipe] = useState([]);
  const [service, setservice] = useState([]);
  const [search, setsearch] = useState("");

  const [service_eq, setservice_eq] = useState([]);

  const [profileimgprev, setprofileimgprev] = useState("");
  const [bgprevimg, setbgprevimg] = useState(
    "https://e7.pngegg.com/pngimages/310/447/png-clipart-white-romantic-starlight-s-white-starlight.png"
  );
  const [description, setdescription] = useState("");

  const [offsetup, setoffsetup] = useState(10);

  const toggle = () => {
    setopen(!open);
  };

  const toggleSupp = () => {
    setsuppopen(!suppopen);
  };

  const changeselected = (client) => {
    setselectedrow(client);
  };

  const toggleEdit = () => {
    seteditopen(!editopen);
  };

  useEffect(() => {
    const loding = () => {
      setloding(true);
      setTimeout(() => {
        setloding(false);
      }, 3500);
    };
    // fonction affiche table
    const getclientlist = async () => {
      const res = await axios({
        headers: { Authorization: `Bearer ${token}` },
        method: "get",
        url: `${Api_url}clients/`,
      });
      setclients(res.data);
      setshownrow(res.data.slice(0, rowselected));
    };

    const getequipe = async () => {
      const res = await axios({
        headers: { Authorization: `Bearer ${token}` },
        method: "get",
        url: `${Api_url}equipe/`,
      });
      setequipe(res.data);
      console.log(res.data);
    };
    const getservice = async () => {
      const res = await axios({
        headers: { Authorization: `Bearer ${token}` },
        method: "get",
        url: `${Api_url}service/`,
      });
      setservice(res.data);
    };

    const getdata = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      //get the current user
      const currentuser = await axios({
        headers: { Authorization: `Bearer ${token}` },
        method: "get",
        url: `${Api_url}user/${user.id}`,
      });

      if (currentuser.data.user.user_level === "Chef Service") {
        setuserlvl(true);
        const equi = await axios({
          headers: { Authorization: `Bearer ${token}` },
          method: "get",
          url: `${Api_url}service/dataservice/equipe/${currentuser.data.user.Chef.ServiceId}`,
        });
        const res = await axios({
          headers: { Authorization: `Bearer ${token}` },
          method: "get",
          url: `${Api_url}service/dataservice/${currentuser.data.user.Chef.ServiceId}`,
        });
        setequipe(equi.data.equipes);
        setclients(res.data.clients);
        setservice([res.data.service]);
      } else {
        getclientlist();
        getequipe();
        getservice();
      }
    };
    loding();
    getdata();
  }, []);

  const [num, setnum] = useState("");

  const [column, setcolumn] = useState([
    {
      key: "name",
      text: "name",
      cell: (client, index) => {
        return (
          <div className="d-flex flex-row">
            {" "}
            <Avatar
              src={client.Clientimg.img_profile}
              style={{ width: 40, height: 40 }}
            />
            <p className="mt-1 ml-4">{client.Nom_compteCli}</p>{" "}
          </div>
        );
      },
    },
    {
      key: "Service",
      text: "Service",
      cell: (client, index) => {
        return (
          <>
            <p className="mt-1 ml-4">{client.Service.Nom_service}</p>
          </>
        );
      },
    },
    {
      key: "Equipe",
      text: "Equipe",
      cell: (client, index) => {
        return (
          <>
            <span
              className="cursor"
              onClick={() => {
                history.push(`/Equipe/${client.Equipe.id}`);
              }}
            >
              {client.Equipe ? client.Equipe.Nom_equipe : ""}
            </span>
          </>
        );
      },
    },
    {
      key: "action",
      text: "Action",
      cell: (client, index) => {
        return (
          <>
            <IconButton
              className="mr-3"
              size="small"
              aria-label="delete"
              color="secondary"
              onClick={() => {
                changeselected(client);
                toggleSupp();
              }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              className="mr-3"
              size="small"
              aria-label="delete"
              color="primary"
              onClick={(e) => {
                changeselected(client);
                setservice_eq(
                  equipe.filter((item) => item.Service.id === client.Service.id)
                );
                toggleEdit();
                console.log(client.Service.id);
                console.log(equipe);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              aria-label="delete"
              color="primary"
              onClick={() => {
                history.push(`/client/${client.id}`);
              }}
              style={{ color: "#388e3c" }}
            >
              <Visibility />
            </IconButton>
          </>
        );
      },
    },
  ]);

  // fonction add row table
  const Addclient = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // formData.append('clientimg[]',document.getElementById('client-img').files[0]);
    // formData.append('clientimg[]',document.getElementById('client-bg').files[0]);
    formData.append("Nom_compteCli", nomclient);
    formData.append("ServiceId", ServiceId);
    formData.append("EquipeId", EquipeId);
    formData.append("description", description);
    formData.append("color", themeparams.color);

    if (
      (document.getElementById("client-bg").files[0] !== undefined) === true &&
      (document.getElementById("client-img").files[0] !== undefined) === false
    ) {
      console.log("ok");
      formData.append(
        "clientimg[]",
        document.getElementById("client-bg").files[0]
      );
      const res = await axios({
        headers: { Authorization: `Bearer ${token}` },
        method: "post",
        url: `${Api_url}clients/bg`,
        data: formData,
      });
      console.log(res);
      if (res.status === 200) {
        toast.success(
          `Le client ${res.data.client.Nom_compteCli} a été ajoutée avec succès`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          }
        );
        setTimeout(() => {
          setclients([res.data.client, ...clients]);
          setshownrow([res.data.client, ...shownrow]);
        }, 500);

        setnomclient("");
        setprofileimgprev("");
        setbgprevimg(
          "https://e7.pngegg.com/pngimages/310/447/png-clipart-white-romantic-starlight-s-white-starlight.png"
        );
        setServiceId("");
        setEquipeId("");
        setdescription("");
      } else {
        toast.error("error", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
      }
    } else if (
      (document.getElementById("client-bg").files[0] !== undefined) === false &&
      (document.getElementById("client-img").files[0] !== undefined) === true
    ) {
      formData.append(
        "clientimg[]",
        document.getElementById("client-img").files[0]
      );
      const res = await axios({
        headers: { Authorization: `Bearer ${token}` },
        method: "post",
        url: `${Api_url}clients/img`,
        data: formData,
      });
      console.log(res);
      if (res.status === 200) {
        toast.success(
          `Le client ${res.data.client.Nom_compteCli} a été ajoutée avec succès`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          }
        );
        setTimeout(() => {
          setclients([res.data.client, ...clients]);
          setshownrow([res.data.client, ...shownrow]);
        }, 500);

        setnomclient("");
        setprofileimgprev("");
        setbgprevimg(
          "https://e7.pngegg.com/pngimages/310/447/png-clipart-white-romantic-starlight-s-white-starlight.png"
        );
        setServiceId("");
        setEquipeId("");
        setdescription("");
      } else {
        toast.error("error", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
      }
    } else if (
      (document.getElementById("client-bg").files[0] !== undefined) === false &&
      (document.getElementById("client-img").files[0] !== undefined) === false
    ) {
      const data = {
        Nom_compteCli: nomclient,
        ServiceId: ServiceId,
        EquipeId: EquipeId,
        description: description,
        color: themeparams.color,
      };
      const res = await axios({
        headers: { Authorization: `Bearer ${token}` },
        method: "post",
        url: `${Api_url}clients/Empty`,
        data,
      });
      console.log(res);
      if (res.status === 200) {
        toast.success(
          `Le client ${res.data.client.Nom_compteCli} a été ajoutée avec succès`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          }
        );
        setTimeout(() => {
          setclients([res.data.client, ...clients]);
          setshownrow([res.data.client, ...shownrow]);
        }, 500);

        setnomclient("");
        setprofileimgprev("");
        setbgprevimg(
          "https://e7.pngegg.com/pngimages/310/447/png-clipart-white-romantic-starlight-s-white-starlight.png"
        );
        setServiceId("");
        setEquipeId("");
        setdescription("");
      } else {
        toast.error("error", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
      }
    } else if (
      (document.getElementById("client-bg").files[0] !== undefined) === true &&
      (document.getElementById("client-img").files[0] !== undefined) === true
    ) {
      formData.append(
        "clientimg[]",
        document.getElementById("client-img").files[0]
      );
      formData.append(
        "clientimg[]",
        document.getElementById("client-bg").files[0]
      );
      const res = await axios({
        headers: { Authorization: `Bearer ${token}` },
        method: "post",
        url: `${Api_url}clients/`,
        data: formData,
      });
      console.log(res);
      if (res.status === 200) {
        toast.success(
          `Le client ${res.data.client.Nom_compteCli} a été ajoutée avec succès`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          }
        );
        setTimeout(() => {
          setclients([res.data.client, ...clients]);
          setshownrow([res.data.client, ...shownrow]);
        }, 500);

        setnomclient("");
        setprofileimgprev("");
        setbgprevimg(
          "https://e7.pngegg.com/pngimages/310/447/png-clipart-white-romantic-starlight-s-white-starlight.png"
        );
        setServiceId("");
        setEquipeId("");
        setdescription("");
      } else {
        toast.error("error", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
      }
    }
  };

  // fonction update table
  const updatedclient = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append('clientimg[]',document.getElementById('up-client-img').files[0]);
    // formData.append('clientimg[]',document.getElementById('up-client-bg').files[0]);
    formData.append("Nom_compteCli", selectedrow.Nom_compteCli);
    formData.append("ServiceId", selectedrow.Service.id);
    formData.append("EquipeId", selectedrow.Equipe.id);
    formData.append("description", selectedrow.description);
    formData.append("color", selectedrow.Theme.Color);

    if (
      (document.getElementById("up-client-bg").files[0] !== undefined) ===
        true &&
      (document.getElementById("up-client-img").files[0] !== undefined) ===
        false
    ) {
      formData.append(
        "clientimg[]",
        document.getElementById("up-client-bg").files[0]
      );
      const res = await axios({
        headers: { Authorization: `Bearer ${token}` },
        method: "put",
        url: `${Api_url}clients/update/clients/bg/${selectedrow.id}`,
        data: formData,
      });
      console.log(res);
      if (res.status === 200) {
        toast.success(
          `Le client ${res.data.client.Nom_client} a été modifée avec succès`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          }
        );
        setTimeout(() => {
          setclients(
            clients.map((item) =>
              item.id === res.data.client.id ? res.data.client : item
            )
          
          );

          console.log(res.data.client.Service.Nom_service);
        }, 200);
        seteditopen(!editopen);
      } else {
        toast.error("error", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
      }
    } else if (
      (document.getElementById("up-client-bg").files[0] !== undefined) ===
        false &&
      (document.getElementById("up-client-img").files[0] !== undefined) === true
    ) {
      formData.append(
        "clientimg[]",
        document.getElementById("up-client-img").files[0]
      );
      const res = await axios({
        headers: { Authorization: `Bearer ${token}` },
        method: "put",
        url: `${Api_url}clients/update/clients/prof/${selectedrow.id}`,
        data: formData,
      });
      console.log(res);
      if (res.status === 200) {
        toast.success(
          `Le client ${res.data.client.Nom_client} a été modifée avec succès`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          }
        );
        setTimeout(() => {
          setclients(
            clients.map((item) =>
              item.id === res.data.client.id ? res.data.client : item
            )
          );

          console.log(res.data.client.Service.Nom_service);
        }, 200);
        seteditopen(!editopen);
      } else {
        toast.error("error", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
      }
    } else if (
      (document.getElementById("up-client-bg").files[0] !== undefined) ===
        true &&
      (document.getElementById("up-client-img").files[0] !== undefined) === true
    ) {
      formData.append(
        "clientimg[]",
        document.getElementById("up-client-img").files[0]
      );
      formData.append(
        "clientimg[]",
        document.getElementById("up-client-bg").files[0]
      );
      const res = await axios({
        headers: { Authorization: `Bearer ${token}` },
        method: "put",
        url: `${Api_url}clients/update/clients/${selectedrow.id}`,
        data: formData,
      });
      console.log(res);
      if (res.status === 200) {
        toast.success(
          `Le client ${res.data.client.Nom_client} a été modifée avec succès`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          }
        );
        setTimeout(() => {
          setclients(
            clients.map((item) =>
              item.id === res.data.client.id ? res.data.client : item
            )
          );

          setshownrow(
            shownrow.map((item) =>
              item.id === res.data.client.id ? res.data.client : item
            )
          );

          console.log(res.data.client.Service.Nom_service);
        }, 200);
        seteditopen(!editopen);
      } else {
        toast.error("error", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
      }
    } else if (
      (document.getElementById("up-client-bg").files[0] !== undefined) ===
        false &&
      (document.getElementById("up-client-img").files[0] !== undefined) ===
        false
    ) {
      const data = {
        Nom_compteCli: selectedrow.Nom_compteCli,
        ServiceId: selectedrow.Service.id,
        EquipeId: selectedrow.Equipe.id,
        description: selectedrow.description,
        color: selectedrow.Theme.Color,
      };
      const res = await axios({
        headers: { Authorization: `Bearer ${token}` },
        method: "put",
        url: `${Api_url}clients/update/clients/false/${selectedrow.id}`,
        data,
      });
      console.log(res);
      if (res.status === 200) {
        toast.success(
          `Le client ${res.data.client.Nom_client} a été modifée avec succès`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          }
        );
        setTimeout(() => {
          setclients(
            clients.map((item) =>
              item.id === res.data.client.id ? res.data.client : item
            )
          );

          setshownrow(
            shownrow.map((item) =>
              item.id === res.data.client.id ? res.data.client : item
            )
          );
        }, 200);
        seteditopen(!editopen);
      } else {
        toast.error("error", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
      }
    }
  };

  // fonction delete row table
  const Suppclient = async (e) => {
    e.preventDefault();
    const res = await axios({
      headers: { Authorization: `Bearer ${token}` },
      method: "delete",
      url: `${Api_url}clients/${selectedrow.id}`,
    });

    if (res.status === 200) {
      toast.success(
        `Le client ${res.data.compteCli.Nom_compteCli} a été supprimée avec succès`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        }
      );
      setTimeout(() => {
        setclients(clients.filter((item) => item.id !== res.data.compteCli.id));

        setshownrow(
          shownrow.filter((item) => item.id !== res.data.compteCli.id)
        );
      }, 200);
      setsuppopen(!suppopen);
    } else {
      toast.error("error", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    }
  };

  const prev = () => {
    const url = URL.createObjectURL(
      document.getElementById("client-img").files[0]
    );
    setprofileimgprev(url);
  };

  const prev2 = () => {
    const url = URL.createObjectURL(
      document.getElementById("client-bg").files[0]
    );
    setbgprevimg(url);
  };

  const upprev = () => {
    const url = URL.createObjectURL(
      document.getElementById("up-client-img").files[0]
    );
    // Clientimg img_profile img_background
    setselectedrow({
      ...selectedrow,
      Clientimg: {
        ...selectedrow.Clientimg,
        img_profile: url,
      },
    });
  };

  const upprev2 = () => {
    const url = URL.createObjectURL(
      document.getElementById("up-client-bg").files[0]
    );
    setselectedrow({
      ...selectedrow,
      Clientimg: {
        ...selectedrow.Clientimg,
        img_background: url,
      },
    });
  };

  const handelchangecolor = (col) => {
    setthemeparams({ ...themeparams, color: col.hex });
    console.log(themeparams);
  };

  const handelupdatecolor = (col) => {
    setselectedrow({
      ...selectedrow,
      Theme: {
        Color: col.hex,
      },
    });
  };

  const up = () => {
    console.log("up");
    console.log(offsetup);
    if ($("#bg").length === 1) {
      setoffsetup(offsetup + 10);
      $("#bg").css("top", `${offsetup} px`);
    }
  };

  const down = () => {
    console.log("down");
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {loding ? (
        <Lottie options={defaultOptions} height={"70%"} width={"70%"}  isClickToPauseDisabled={true}/>
      ) : (
        <>
          {/* <!-- Page Header--> */}
          <header class="page-header">
            <div class="container-fluid">
              <h2 class="no-margin-bottom">Liste des clients</h2>
            </div>
          </header>
          {/* <!-- Breadcrumb--> */}
          <div class="breadcrumb-holder container-fluid">
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="home">Home</a>
              </li>
              <li class="breadcrumb-item active">Client</li>
            </ul>
          </div>

          <div className="row  justify-content-center">
            <div className="col-12 text-center">
              <div className="row col-12 mb-2">
                <div className="col-12 ">
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => toggle(!open)}
                  >
                    {" "}
                    Ajouter{" "}
                  </Button>
                </div>
              </div>

              <ReactDatatable
                config={config}
                records={clients}
                columns={column}
              />
            </div>
          </div>
        </>
      )}

      {/* MODAL ADD */}
      <MDBModal
        isOpen={open}
        toggle={() => toggle()}
        disableBackdrop={true}
        size="lg"
      >
        <MDBModalHeader
          toggle={() => toggle()}
          className="text-center"
        ></MDBModalHeader>
        <MDBModalBody>
          <form className="row col-12 justify-content-center align-middle">
            <div className="col-12 mt-2">
              <div className="text-right right_button">
                <input
                  accept="image/*"
                  id="client-bg"
                  type="file"
                  style={{ display: "none" }}
                  onChange={() => {
                    prev2();
                  }}
                  required
                />
                <label htmlFor="client-bg">
                  <IconButton
                    className=" mr-2"
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera style={{ color: "#c2c1c1" }} />
                  </IconButton>
                </label>
                <br />
                <i
                  class="fas fa-arrow-up cursor fa-2x mr-3 mb-2"
                  onClick={() => {
                    up();
                  }}
                ></i>
                <br />
                <i
                  class="fas fa-arrow-down cursor fa-2x mr-3"
                  onClick={() => {
                    down();
                  }}
                ></i>
              </div>
              <div className="d-flex justify-content-center ">
                <div className="profile-header-cover-modal">
                  <img
                    id="bg"
                    style={{
                      width: "100%",
                      borderRadius: 10,
                      backgroundPositionX: "right 20 bottom 10",
                    }}
                    className="bg"
                    alt=""
                    src={bgprevimg}
                  />
                </div>

                <div id="client-image" className="row">
                  <section>
                    <Avatar
                      className="ml-3"
                      style={{ width: 100, height: 100 }}
                      alt=""
                      src={profileimgprev}
                    />
                    <input
                      accept="image/*"
                      id="client-img"
                      type="file"
                      className="mb-3"
                      style={{ display: "none" }}
                      onChange={() => {
                        prev();
                      }}
                      required
                    />
                    <label htmlFor="client-img">
                      <IconButton
                        className="mt-2"
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <PhotoCamera style={{ color: "#2DCD94" }} />
                      </IconButton>
                    </label>
                  </section>

                  <h3
                    id="compteclientnom"
                    className=" ml-3 mt-4"
                    style={{ position: "relative", color: themeparams.color }}
                  >
                    {nomclient}
                  </h3>
                </div>
              </div>
            </div>
            <section className="row col-12 justify-content-end">
              <div className="row col-12 mt-5 ">
                <div className="col-7">
                  <TextField
                    className="col-12 mt-1 float-right"
                    value={nomclient}
                    onChange={(e) => {
                      setnomclient(e.target.value);
                    }}
                    id="standard-basic"
                    label="Nom du client"
                    required
                  />
                  <TextField
                    value={description}
                    onChange={(e) => {
                      setdescription(e.target.value);
                    }}
                    className="col-12 mt-2"
                    id="time"
                    type="text"
                    label="description"
                    multiline={true}
                    variant="outlined"
                    size="small"
                    rows={7}
                  />
                  <TextField
                    className=" ml-2 col-5 mb-5 mt-3"
                    id="standard-select-currency"
                    select
                    variant="outlined"
                    required
                    size="small"
                    label="Service"
                    value={ServiceId}
                    onChange={(e) => {
                      setServiceId(e.target.value);
                      setservice_eq(
                        equipe.filter(
                          (item) => item.Service.id === e.target.value
                        )
                      );
                    }}
                  >
                    {service.map((ser, index) => (
                      <MenuItem key={index} value={ser.id}>
                        {ser.Nom_service}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    className="ml-2 mt-3 mb-5 col-5"
                    id="standard-select-currency"
                    select
                    required
                    variant="outlined"
                    size="small"
                    label="equipe"
                    value={EquipeId}
                    onChange={(e) => {
                      setEquipeId(e.target.value);
                    }}
                  >
                    <MenuItem></MenuItem>
                    {service_eq.map((eq, index) => (
                      <MenuItem key={index} value={eq.id}>
                        {eq.Nom_equipe}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>

                <div className="col-4">
                  <TwitterPicker
                    color={"black"}
                    onChangeComplete={(color) => {
                      handelchangecolor(color);
                    }}
                    className="ml-1 mt-5 "
                  />
                  <br />
                </div>

                <div className="row col-12 justify-content-center">
                  <Button
                    onClick={(e) => {
                      Addclient(e);
                    }}
                    variant="outlined"
                    class="btn btn-outline-success col-3 mb-5"
                  >
                    Ajouter
                  </Button>
                </div>
              </div>
            </section>
          </form>
        </MDBModalBody>
      </MDBModal>
      {/* MODAL EDIT */}
      <MDBModal
        isOpen={editopen}
        toggle={() => toggleEdit()}
        disableBackdrop={true}
        size="lg"
      >
        <MDBModalHeader toggle={() => toggleEdit()} className="text-center">
          Modifier les données du client
        </MDBModalHeader>
        <MDBModalBody>
          <form className="row col-12 justify-content-center align-middle">
            <div className="col-12 mt-2">
              <div className="text-right right_button">
                <input
                  accept="image/*"
                  id="up-client-bg"
                  type="file"
                  style={{ display: "none" }}
                  onChange={() => {
                    upprev2();
                  }}
                  required
                />
                <label htmlFor="up-client-bg">
                  <IconButton
                    className=""
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera style={{ color: "#c2c1c1" }} />
                  </IconButton>
                </label>
              </div>
              <div className="d-flex justify-content-center ">
                <div className="profile-header-cover-modal">
                  <img
                    style={{ width: "100%", borderRadius: 10 }}
                    className=""
                    alt=""
                    src={selectedrow.Clientimg.img_background}
                  />
                </div>

                <div id="client-image" className="row">
                  <section>
                    <Avatar
                      className="ml-3"
                      style={{ width: 100, height: 100 }}
                      alt=""
                      src={selectedrow.Clientimg.img_profile}
                    />
                    <input
                      accept="image/*"
                      id="up-client-img"
                      type="file"
                      className="mb-3"
                      style={{ display: "none" }}
                      onChange={() => {
                        upprev();
                      }}
                      required
                    />
                    <label htmlFor="up-client-img">
                      <IconButton
                        className="mt-2"
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <PhotoCamera style={{ color: "#2DCD94" }} />
                      </IconButton>
                    </label>
                  </section>

                  <h3
                    id="compteclientnom"
                    className=" ml-3 mt-4"
                    style={{
                      position: "relative",
                      color: selectedrow.Theme.Color,
                    }}
                  >
                    {selectedrow.Nom_compteCli}
                  </h3>
                </div>
              </div>
            </div>
            <section className="row col-12 justify-content-end">
              <div className="row col-12 mt-5 ">
                <div className="col-7">
                  <TextField
                    className="col-12 mt-1 float-right"
                    value={selectedrow.Nom_compteCli}
                    onChange={(e) => {
                      setselectedrow({
                        ...selectedrow,
                        Nom_compteCli: e.target.value,
                      });
                    }}
                    id="standard-basic"
                    label="Nom du client"
                    required
                  />
                  <TextField
                    value={selectedrow.description}
                    onChange={(e) => {
                      setselectedrow({
                        ...selectedrow,
                        description: e.target.value,
                      });
                    }}
                    className="col-12 mt-3"
                    id="time"
                    type="text"
                    label="description"
                    multiline={true}
                    variant="outlined"
                    size="small"
                    rows={7}
                  />
                  <TextField
                    className=" ml-2 col-5 mb-5 mt-3"
                    id="standard-select-currency"
                    select
                    variant="outlined"
                    required
                    size="small"
                    label="Service"
                    value={selectedrow.Service.id}
                    onChange={(e) => {
                      setselectedrow({
                        ...selectedrow,
                        Service: {
                          ...selectedrow.Service,
                          id: e.target.value,
                        },
                      });
                      setservice_eq(
                        equipe.filter(
                          (item) => item.Service.id === e.target.value
                        )
                      );
                    }}
                  >
                    {service.map((ser, index) => (
                      <MenuItem key={index} value={ser.id}>
                        {ser.Nom_service}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    className="ml-2 mt-3 mb-5 col-5"
                    id="standard-select-currency"
                    select
                    required
                    variant="outlined"
                    size="small"
                    label="equipe"
                    value={selectedrow.Equipe.id}
                    onChange={(e) => {
                      setselectedrow({
                        ...selectedrow,
                        Equipe: {
                          ...selectedrow.Equipe,
                          id: e.target.value,
                        },
                      });
                    }}
                  >
                    {userlvl
                      ? equipe.map((eq, index) => (
                          <MenuItem key={index} value={eq.id}>
                            {eq.Nom_equipe}
                          </MenuItem>
                        ))
                      : service_eq.map((eq, index) => (
                          <MenuItem key={index} value={eq.id}>
                            {eq.Nom_equipe}
                          </MenuItem>
                        ))}
                  </TextField>
                </div>

                <div className="col-4">
                  <TwitterPicker
                    color={"black"}
                    onChangeComplete={(color) => {
                      handelupdatecolor(color);
                    }}
                    className="ml-1 mt-5 "
                  />
                  <br />
                </div>

                <div className="row col-12 justify-content-center">
                  <Button
                    onClick={(e) => {
                      updatedclient(e);
                    }}
                    variant="outlined"
                    class="btn btn-outline-success"
                  >
                    Modifier
                  </Button>
                </div>
              </div>
            </section>
          </form>
        </MDBModalBody>
      </MDBModal>

      {/* MODAL SUPP */}
      <MDBModal
        isOpen={suppopen}
        toggle={() => toggleSupp()}
        disableBackdrop={true}
        size="sm"
      >
        <MDBModalHeader toggle={() => toggleSupp()} className="text-center sm">
          Supprimer le client
        </MDBModalHeader>
        <MDBModalBody>
          <div className="row col-12 ">
            <div>
              <p>vous les vous vraiment supprimer ce client ?</p>
            </div>
          </div>
        </MDBModalBody>
        <div>
          <MDBModalFooter>
            <Button
              color="primary"
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={(e) => {
                Suppclient(e);
              }}
            >
              Supprimer
            </Button>
            <Button
              color="primary"
              variant="contained"
              color="primary"
              onClick={() => toggleSupp()}
            >
              annuler
            </Button>
          </MDBModalFooter>
        </div>
      </MDBModal>

      {/* <div class="container">
        <mdb-table-editor
        :data="datatable"
        striped
        bordered
       /> */}
    </>
  );
}

export default Clients;
