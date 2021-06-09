import React, { useState, useEffect, Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import $ from "jquery";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import Api_url from "./../component/Api_url";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateduser } from "./../redux/actions/authAction";
import PasswordStrengthMeter from "./../component/PasswordStrengthMeter";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Sélectionnez l'image de profil", "Informations personnelles"];
}

function Stepperview() {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const dispatchState = (user) => dispatch(updateduser(user));

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const steps = getSteps();

  const [previewimage, setpreviewimage] = useState("");
  const [img_url, setimg_url] = useState("");

  const [Nom, setNom] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [Address, setAddress] = useState("");
  const [Tel, setTel] = useState();
  const [Fax, setFax] = useState("");
  const [Website, setWebsite] = useState("");
  const [country, setcountry] = useState("");
  const [sex, setsex] = useState("");

  const [pwd, setpwd] = useState("");
  const [next, setnext] = useState("");

  useEffect(() => {
    const hidesidebar = () => {
      $("#sidebar").hide();
    };

    const changestep = () => {
      if (activeStep === 0) {
        $("#Profilephoto").show();
        $("#Info").hide();
        $("#Prof").hide();

        if ($("#prof-img").length) {
          // use this if you are using id to check
          $("#Fax").change(function (e) {
            e.preventDefault();
            var val = $("#Fax").val();
            setFax(val);
          });

          $("#password").change(function (e) {
            e.preventDefault();
            var val = $("#password").val();
            setpwd(val);
          });
        }
      } else if (activeStep === 1) {
        $("#Info").show();
        $("#Profilephoto").hide();
        $("#Prof").hide();
        if ($("#Nom").length) {
          // use this if you are using id to check
          $("#Nom").keyup(function (e) {
            e.preventDefault();
            var val = $("#Nom").val();
            setNom(val);
          });
        }
        if ($("#prenom").length) {
          // use this if you are using id to check
          $("#prenom").keyup(function (e) {
            e.preventDefault();
            var val = $("#prenom").val();
            setPrenom(val);
          });
        }
        if ($("#tel").length) {
          // use this if you are using id to check
          $("#tel").keyup(function (e) {
            e.preventDefault();
            var val = $("#tel").val();
            setTel(val);
          });
        }
        if ($("#address").length) {
          // use this if you are using id to check
          $("#address").keyup(function (e) {
            e.preventDefault();
            var val = $("#address").val();
            setAddress(val);
          });
        }
      } else if (activeStep === 2) {
        $("#Prof").show();
        $("#Info").hide();
        $("#Profilephoto").hide();

        if ($("#fax").length) {
          // use this if you are using id to check
          $("#fax").keyup(function (e) {
            e.preventDefault();
            var val = $("#fax").val();
            console.log(val);
            setFax(val);
          });
        }

        if ($("#Website").length) {
          // use this if you are using id to check
          $("#Website").keyup(function (e) {
            e.preventDefault();
            var val = $("#Website").val();
            setWebsite(val);
          });
        }

        if ($("#country").length) {
          // use this if you are using id to check
          $("#country").keyup(function (e) {
            e.preventDefault();
            var val = $("#country").val();
            setcountry(val);
          });
        }
      }
    };
    hidesidebar();
    changestep();
  }, [activeStep]);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const prev = () => {
    const url = URL.createObjectURL(
      document.getElementById("prof-img").files[0]
    );
    setpreviewimage(url);
  };

  const show = () => {
    console.log(`
            tel : ${Tel}
            address : ${Address}
            fax : ${Fax}
            website : ${Website}
            country : ${country}
            sex : ${sex}
          `);
  };

  const disablnext = () => {
    // setnext(value)
    console.log("value");
  };

  const updateprofile = async (e) => {
    const formData = new FormData();
    formData.append("myImage", document.getElementById("prof-img").files[0]);
    formData.append("address", Address);
    formData.append("tel", Tel);
    formData.append("fax", Fax);
    formData.append("website", Website);
    formData.append("sex", sex);
    formData.append("country", country);
    formData.append("pwd", pwd);

    console.log(pwd);

    console.log(formData);
    const res = await axios({
      headers: { Authorization: `Bearer ${token}` },
      method: "put",
      url: `${Api_url}user/update/profileimg`,
      data: formData,
    });
    console.log(res);

    if (res.status === 200) {
      window.setTimeout(() => {
        dispatchState(JSON.stringify(res.data.user));
        window.location.replace("/home");
        $("#sidebar").show();
      }, 1500);
    }
  };

  const canBeSubmitted = async (e) => {
    const { pwd } = this.state;
    return pwd.length > 0;
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
          </div>
        ) : (
          <div className="row justify-content-center">
            {/* step1!! */}

            <div id="Profilephoto" className="col-12 text-center mb-5 mt-5">
              <div className="d-flex justify-content-center mt-5">
                <Avatar
                  style={{ width: 160, height: 160 }}
                  alt="Haboubi amine"
                  src={previewimage}
                />
              </div>

              <div className="d-flex justify-content-center mt-3">
                <input
                  accept="image/*"
                  id="prof-img"
                  type="file"
                  style={{ display: "none" }}
                  onChange={() => {
                    prev();
                  }}
                  required
                />
                <label htmlFor="prof-img">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera style={{ color: "#2DCD94" }} />
                  </IconButton>
                </label>
              </div>

              <div className="mr-4 mt-5">
                <TextField
                  id="password"
                  label="Mot de passe"
                  onChange={(e) => {
                    setpwd(e.target.value);
                  }}
                  variant="outlined"
                  type="password"
                  required
                />
                <PasswordStrengthMeter password={pwd} />
              </div>
            </div>

            {/* step1!! */}

            {/* step2!!! */}
            <div
              id="Info"
              className=" col-12 text-center mb-5 mt-5 justify-content-center"
              style={{ display: "none" }}
            >
              <div className="row justify-content-center">
                <TextField
                  className="mr-4 mt-4 "
                  id="tel"
                  label="N°tel"
                  variant="outlined"
                  required
                />
                <TextField
                  className="ml-4 mt-4"
                  size="medium"
                  id="address"
                  label="Adresse"
                  variant="outlined"
                  required
                />
              </div>
              <div className="row justify-content-center">
                <TextField
                  className="mr-4 mt-4"
                  id="country"
                  label="Pays"
                  variant="outlined"
                />
                <TextField
                  className="ml-4 mt-4"
                  id="fax"
                  label="fax"
                  variant="outlined"
                />
                <br />
              </div>
              <div className="row ml-1 justify-content-center col-12">
                <TextField
                  className="mr-4 mt-4 "
                  id="Website"
                  label="Site web"
                  placeholder="www.exemple.com"
                  variant="outlined"
                />
                <TextField
                  className=" ml-4 mt-4 col-2"
                  id="sex"
                  variant="outlined"
                  size="medium"
                  select
                  label="sex"
                  value={sex}
                  onChange={(e) => {
                    setsex(e.target.value);
                  }}
                >
                  <MenuItem value={"Homme"}>Homme</MenuItem>
                  <MenuItem value={"Femme"}>Femme</MenuItem>
                </TextField>
              </div>
            </div>

            {/* step2!!! */}

            {/* step3 */}

            {/* step3 */}

            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Retour
              </Button>

              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => updateprofile()}
                  className={classes.button}
                  style={{ backgroundColor: "#2DCD94" }}
                >
                  Valider
                </Button>
              ) : (
                <Button
                  id="next"
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                  style={{ backgroundColor: "#2DCD94" }}
                  disabled={false}
                >
                  Suivant
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Stepperview;
