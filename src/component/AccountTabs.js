import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import $ from 'jquery'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter , MDBCol, MDBFormInline , MDBIcon } from 'mdbreact';


const gotoadd = ()=>{
  $("#user-profile").hide()
  $("#add-account").show()
  $("#profile").removeClass("picked-right")
  $("#addacc").addClass("picked-left")
}

const gotorofile = ()=>{
    $("#add-account").hide()
    $("#user-profile").show()
    $("#addacc").removeClass("picked-left")
    $("#profile").addClass("picked-right")
  
}


  


const filter = ()=>{
  
  var value = $("#user-search").val()
  $("#user-list .user").filter(function() {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
}

function AccountTabs() {
    return (
        <div id="account-tab" className="row col-12 justify-content-start mb-3">
                      <div className="col-3 text-left mr-2 ml-2">
                      <MDBFormInline className="md-form">
                        <MDBIcon icon="search" className="mr-1" />
                        <TextField id="user-search" onChange={filter} label="Recherche" variant="outlined" size='small' />
                    </MDBFormInline>
                     
                      </div>
                      <div className="row col-8 text-center align-items-center justify-content-center">
                        {/* <div id="profile" onClick={gotorofile} className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-5 shadow link picked-right ml-5 mr-1" >Profile</div> */}
                        <div id="addacc" onClick={gotoadd} className="border border-dark col-5 shadow ml-5 link picked-left">Ajouter un nouvel utilisateur</div>
                      </div>
            </div>
    )
}

export default AccountTabs
