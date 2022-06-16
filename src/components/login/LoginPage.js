import React, { useCallback, useRef, useState, useEffect, useContext } from 'react';
import { CircularProgress, Grid, MenuItem, FormControlLabel } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { useRouter } from 'next/router'
import { TabContext, TabList, TabPanel, } from '@material-ui/lab';
import {
  FormDiv,
  LoginButton,
  LoginLabel,
  LoginPageWrapper,
  LoginTab,
  LoginTextFieldWrapper,
  PrivacyTypography,
  RegistrationSelect,
  RegistrationTab,
  SubLoginLabel,
  SubLoginLabelBlue,
  ModalContentWrapper,
} from './LoginPage.styles';
import { useFormik } from 'formik';
import { registrationValidationSchema } from './LoginPageValidationSchema';
import { GenderData, JobRoleData, RaceOrEthicityData } from './RegistrationPageData';
import LoginForm from './LoginForm';
import TAMAlert from '../alert/TAMAlert';
import { registerUser } from '../../../pages/api/auth';
import { AppStoreContext } from '../../providers/AppStoreProvider';
import { ROUTES } from '../../Routes';
import { handleClose, handleOpen } from '../../common/commonFunction';
import CheckBox from '../CheckBoxEditable';


const LoginPage = (props) => {
  const handleModal = useRef();
  const [showModal, setShowModal] = React.useState(props.show);
  const [, setCurrentError] = React.useState("")
  const [isRegister, setIsRegister] = React.useState(false);
  const [registrationFormSize, setRegistrationFormSize] = React.useState({
    height: '500px',
    topMargin: '100px',
  });
  const { modal, setModal } = useContext(AppStoreContext);
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  // const location = useLocation();
  const router = useRouter()

  React.useEffect(() => {
    if (!showModal) {
      if (modal.data?.redirect && !isRegister) {
        history.push(modal.data.redirect);
        history.go()
      }
      else if (router.state == null && router.pathname !== ROUTES.default) {
        history.push(ROUTES.default);
      }
      else if (router.state?.redirect) {
        history.push(router.state.redirect);
      }
      window.scroll({ top: 0, behavior: 'smooth' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal, history, router.state]);

  //If registration status is available or not
  const [registrationStatus, setRegistrationStatus] = useState(false);
  const [responseData, setResponseData] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(false);
  //show or hide registration component
  const [showRegistration, setshowRegistration] = useState(true);


  const scrollTop = (id) => {

    //console.log("scroll top id", id);

    var topScroll = id ? id === "privacy" ? document.getElementById(id).offsetTop - 300 : document.getElementById(id).offsetParent.offsetParent.offsetTop - 200 : 0;

    //console.log("topScroll", topScroll)
    document.body.scrollTop = topScroll;
    document.documentElement.scrollTop = topScroll;
  }

  //Hide once registration is success
  useEffect(() => {
    if (registrationStatus) {
      setshowRegistration(false);
    }
  }, [registrationStatus]);
  const registration = useFormik({
    initialValues: {
      registrationEmail: '',
      registrationPassword: '',
      registrationRace: '',
      registrationGender: '',
      registrationAge: '',
      registrationJobRole: '',
      registrationName: '',
      registrationOrgCode: '',
      registrationSecQue: '',
      privacy: false,
    },

    validationSchema: registrationValidationSchema,
    onSubmit: async (values) => {
      if (!values.registrationPassword || !values.registrationPassword.match(/[0-9]/g) || !values.registrationPassword.match(/[A-Z]/g) || value.length < 8) {

        return false
      }
      setLoadingStatus(true);
      registerUser({
        name: values.registrationName,
        email: values.registrationEmail.toLocaleLowerCase(),
        password: values.registrationPassword,
        race: values.registrationRace,
        age: values.registrationAge,
        gender: values.registrationGender,
        jobRole: values.registrationJobRole,
        organizationCode: values.registrationOrgCode,
        toolId: modal?.data?.toolId || ""
        // securityAnswer: values.registrationSecQue,
      })
        .then(() => {
          setResponseData("");
          setRegistrationStatus(true);
          handleModal.current.scrollTo(0, 0);
          scrollTop();
          registration.resetForm();
          // setShowModal(false);

          setTimeout(() => {
            setRegistrationStatus(false);
            // setShowModal(true);
            setshowRegistration(true);
            setIsRegister(false);
            setValue(0);
          }, 25000)

        })
        .catch((msg) => {
          handleModal.current.scrollTo(0, 0);
          setRegistrationStatus(false);
          setResponseData(msg);
          scrollTop();
        })
        .finally(() => {
          setLoadingStatus(false);
        });
    },
  });

  const closeModalControl = useCallback(() => setShowModal(!showModal), [showModal]);
  const resizeModal = useCallback(() =>
    setRegistrationFormSize({
      height: '300px',
      topMargin: '100px',
    }), []
  );

  useEffect(() => {
    if (value === 0 && !showRegistration && registrationStatus) {
      setRegistrationStatus(false);
      setShowModal(true);
      setshowRegistration(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])


  // const handleOpen = () => {
  //   document.body.style.removeProperty('overflow');
  //   var temp = document.body.style.cssText;
  //   temp = temp + "overflow:hidden !important;";
  //   document.body.style.cssText = temp;
  // }

  // const handleClose = () => {
  //   document.body.style.removeProperty('overflow');
  //   var temp = document.body.style.cssText;
  //   temp = temp + "overflow:auto !important;";
  //   document.body.style.cssText = temp;
  // }

  useEffect(() => {
    const errorKeys = Object.keys(registration.errors);
    //console.log("err", errorKeys[0], currentError);
    if (errorKeys.length && registration.submitCount) {
      setCurrentError(errorKeys[0])
      scrollTop(errorKeys[0]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registration.submitCount]);

  // console.log("modalId", modal, isRegister);


  return (
    <LoginPageWrapper
      open={props.show}
      //BackdropProps={{ style: { backgroundColor: "transparent" } }}
      onClose={() => {
        setShowModal(false);
        setModal({ modalId: 0 });
        localStorage.removeItem("token");
        // console.log("popup close");

        if (modal.onClose) {
          modal.onClose();
        }
      }}
      topMargin={registrationFormSize.topMargin}
      disableEnforceFocus
      style={{ position: 'absolute' }}
      ref={handleModal}
    >
      <ModalContentWrapper>
        <div className="login_bg">
          <TabContext value={value}>
            <TabList
              TabIndicatorProps={{
                style: { height: '0px' },
              }}
              //style={{ marginTop: "1rem" }}
              textColor="primary"
              onChange={(e, val) => {
                setValue(val);
                if (val === 0) {
                  setRegistrationFormSize({
                    height: '500px',
                    topMargin: '100px',
                  })
                  setIsRegister(false);
                }
                else {
                  setRegistrationFormSize({
                    height: '1000px',
                    topMargin: '100px',
                  });
                  setIsRegister(true);
                }
              }}
            >
              <LoginTab label={'Login'} value={0}></LoginTab>
              <RegistrationTab label={'Register'} value={1}></RegistrationTab>
            </TabList>

            <TabPanel className="form_group_cs" value={0} style={{ width: '100%', height: '100%' }}>
              <FormDiv id="login_form_div">
                <LoginForm control={closeModalControl} resizeModal={resizeModal} setShowModal={setShowModal} setValue={setValue} />
              </FormDiv>
            </TabPanel>
            <TabPanel className="form_group_cs" value={1} id="registration_form_panel">
              <FormDiv id="registration_form_div">
                {responseData && !registrationStatus ? (
                  <TAMAlert key={'reg_error'} kind="error" message={responseData} />
                ) : !responseData && registrationStatus ? (
                  <TAMAlert
                    onClose={() => {
                      setRegistrationStatus(false);
                      setshowRegistration(true);
                      setIsRegister(false);
                      setValue(0);
                    }}
                    key={'reg_success'}
                    kind="success"
                    message={`Registration Successful, Please check your email to proceed. \n We have send a verification link to your email address. Kindly access the link to activate your account. \nPlease check spam/junk folders for the email with verification link/code if not found in your Inbox.`}
                  />
                ) : null}
                {showRegistration ? (
                  <form onSubmit={registration.handleSubmit}>
                    {/*<form>*/}
                    <Grid container direction={'row'}>
                      <Grid className="input_group_cs" item lg={12} md={12} sm={12} xs={12}>
                        <LoginLabel htmlFor="password">
                          <SubLoginLabel>Already have an account? <span role="tab" className="hyperlink" onClick={() => setValue(0)}>Login</span>
                          </SubLoginLabel>
                        </LoginLabel>
                      </Grid>
                      <Grid className="input_group_cs" item lg={12} md={12} sm={12} xs={12} >
                        <SubLoginLabelBlue >Fields with * are required</SubLoginLabelBlue>
                        <LoginLabel htmlFor="registrationEmail">
                          <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                            <Grid item>Email</Grid>
                            <Grid item>
                              <SubLoginLabel>&nbsp;(this is your username)</SubLoginLabel>
                            </Grid>
                            <Grid className="star_input" item>&nbsp;*</Grid>
                          </Grid>
                        </LoginLabel>
                        <LoginTextFieldWrapper
                          fullWidth
                          id="registrationEmail"
                          name="registrationEmail"
                          //label="Email(this is your username)"
                          value={registration.values.registrationEmail}
                          onChange={(e) => {
                            e.target.value = e.target.value.trim();
                            registration.handleChange(e);
                          }}
                          error={registration.touched.registrationEmail && Boolean(registration.errors.registrationEmail)}
                          helperText={registration.touched.registrationEmail && registration.errors.registrationEmail}
                          InputLabelProps={{ shrink: true }}
                          InputProps={{ disableUnderline: true }}
                        />
                      </Grid>

                      <Grid className="input_group_cs" item lg={12} md={12} sm={12} xs={12}>
                        <LoginLabel htmlFor="registrationPassword">
                          <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                            <Grid item>Password</Grid>
                            <Grid className="star_input" item>&nbsp;*</Grid>
                          </Grid>
                        </LoginLabel>
                        <LoginTextFieldWrapper className="reg_password"
                          fullWidth={true}
                          type="password"
                          id="registrationPassword"
                          name="registrationPassword"
                          //label="Password"
                          value={registration.values.registrationPassword}
                          onChange={registration.handleChange}
                          error={
                            registration.touched.registrationPassword && Boolean(registration.errors.registrationPassword)
                          }
                          helperText={
                            registration.touched.registrationPassword
                              ? registration.errors.registrationPassword
                              : 'Passwords must be a min of 8 characters & contain at least one capital & a number'
                          }
                          InputLabelProps={{ shrink: true }}
                          InputProps={{ disableUnderline: true }}
                        />
                      </Grid>
                      <Grid className="input_group_cs" item lg={12} md={12} sm={12} xs={12}>
                        <LoginLabel htmlFor="registrationName">
                          <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                            <Grid item>Name</Grid>
                            <Grid className="star_input" item>&nbsp;*</Grid>

                            <Grid item>
                              {/* <SubLoginLabelBlue>&nbsp;(Optional)</SubLoginLabelBlue> */}
                            </Grid>
                          </Grid>
                        </LoginLabel>
                        <LoginTextFieldWrapper
                          fullWidth
                          id="registrationName"
                          name="registrationName"
                          // label="Name (Optional)"
                          value={registration.values.registrationName}
                          onChange={registration.handleChange}
                          error={registration.touched.registrationName && Boolean(registration.errors.registrationName)}
                          helperText={registration.touched.registrationName && registration.errors.registrationName}
                          InputLabelProps={{ shrink: true }}
                          InputProps={{ disableUnderline: true }}
                        />
                      </Grid>

                      {/* <Grid className="input_group_cs" item lg={12} md={12} sm={12} xs={12}>
                        <LoginLabel htmlFor="registrationSecQue">
                          <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                            <Grid item>Security Question</Grid>&nbsp;
                            <Grid item >
                              What is your favorite comfort food?
                            </Grid>
                            <Grid className="star_input" item>&nbsp;*</Grid>
                          </Grid>
                        </LoginLabel>
                        <LoginTextFieldWrapper
                          fullWidth={true}
                          id="registrationSecQue"
                          name="registrationSecQue"
                          //label="Password"
                          value={registration.values.registrationSecQue}
                          onChange={registration.handleChange}
                          error={
                            registration.touched.registrationSecQue && Boolean(registration.errors.registrationSecQue)
                          }
                          helperText={registration.touched.registrationSecQue}
                          InputLabelProps={{ shrink: true }}
                          InputProps={{ disableUnderline: true }}
                        />
                      </Grid> */}

                      <Grid className="input_group_cs" item lg={12} md={12} sm={12} xs={12}>
                        <LoginLabel htmlFor="registrationRace" id="registrationRaceLabel">
                          <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                            <Grid item>Race/Ethnicity</Grid>
                            <Grid item>
                              {/* <SubLoginLabelBlue>&nbsp;(Optional)</SubLoginLabelBlue> */}
                            </Grid>
                          </Grid>
                        </LoginLabel>
                        <RegistrationSelect
                          labelId="registrationRaceLabel"
                          id="registrationRace"
                          name="registrationRace"
                          label="registrationRace"
                          disableUnderline={true}
                          fullWidth={true}
                          onOpen={handleOpen}
                          onClose={handleClose}
                          value={registration.values.registrationRace}
                          onBlur={() => registration.setFieldTouched('registrationRace', true)}
                        >
                          {RaceOrEthicityData.map((data) => (
                            <MenuItem
                              key={data.value}
                              value={data.value}
                              style={{ fontSize: '16px' }}
                              onClick={() => {
                                registration.setFieldValue('registrationRace', data.value);
                              }}
                            >
                              {data.text}
                            </MenuItem>
                          ))}
                        </RegistrationSelect>
                      </Grid>
                      <Grid className="input_group_cs" item lg={12} md={12} sm={12} xs={12}>
                        <LoginLabel htmlFor="registrationGender" id="registrationGenderLabel">
                          <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                            <Grid item>Gender</Grid>
                            <Grid item style={{ fontWeight: 'normal' }}>
                              &nbsp;- that you identify as
                            </Grid>
                            <Grid item>
                              {/* <SubLoginLabelBlue>&nbsp;(Optional)</SubLoginLabelBlue> */}
                            </Grid>
                          </Grid>
                        </LoginLabel>

                        <RegistrationSelect
                          labelId="registrationGenderLabel"
                          id="registrationGender"
                          name="registrationGender"
                          label="registrationGender"
                          disableUnderline={true}
                          fullWidth={true}
                          onOpen={handleOpen}
                          onClose={handleClose}
                          value={registration.values.registrationGender}
                          onBlur={() => registration.setFieldTouched('registrationGender', true)}
                        >
                          {GenderData.map((data) => (
                            <MenuItem
                              key={data.value}
                              value={data.value}
                              style={{ fontSize: '16px' }}
                              onClick={() => {
                                registration.setFieldValue('registrationGender', data.value);
                              }}
                            >
                              {data.text}
                            </MenuItem>
                          ))}
                        </RegistrationSelect>
                      </Grid>
                      <Grid className="input_group_cs" item lg={12} md={12} sm={12} xs={12}>
                        <LoginLabel htmlFor="registrationAge">
                          <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                            <Grid item>Age</Grid>
                            <Grid item>
                              {/* <SubLoginLabelBlue>&nbsp;(Optional)</SubLoginLabelBlue> */}
                            </Grid>
                          </Grid>
                        </LoginLabel>
                        <LoginTextFieldWrapper
                          fullWidth
                          id="registrationAge"
                          name="registrationAge"
                          //label="Age (Optional)"
                          value={registration.values.registrationAge}
                          onChange={registration.handleChange}
                          error={registration.touched.registrationAge && Boolean(registration.errors.registrationAge)}
                          helperText={registration.touched.registrationAge && registration.errors.registrationAge}
                          InputLabelProps={{ shrink: true }}
                          InputProps={{ disableUnderline: true }}
                        />
                      </Grid>
                      <Grid className="input_group_cs" item lg={12} md={12} sm={12} xs={12}>
                        <LoginLabel htmlFor="registrationJobRole" id="registrationJobRoleLabel" >
                          <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                            <Grid item>Job Role</Grid>
                            <Grid item>
                              {/* <SubLoginLabelBlue>&nbsp;(Optional)</SubLoginLabelBlue> */}
                            </Grid>
                          </Grid>
                        </LoginLabel>
                        <RegistrationSelect className="meet_main"
                          fullWidth={true}
                          labelId="registrationJobRoleLabel"
                          id="registrationJobRole"
                          name="registrationJobRole"
                          disableUnderline={true}
                          onOpen={handleOpen}
                          onClose={handleClose}
                          value={registration.values.registrationJobRole}
                          onBlur={() => registration.setFieldTouched('registrationJobRole', true)}
                        >
                          {JobRoleData.map((data) => (
                            <MenuItem
                              key={data.value}
                              value={data.value}
                              style={{ fontSize: '16px', }}
                              onClick={() => {
                                registration.setFieldValue('registrationJobRole', data.value);
                              }}
                            >
                              {data.text}
                            </MenuItem>
                          ))}
                        </RegistrationSelect>
                      </Grid>
                      <Grid className="input_group_cs" item lg={12} md={12} sm={12} xs={12}>
                        <LoginLabel htmlFor="registrationOrgCode">
                          <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                            <Grid item>Organization Code/Name</Grid>
                            <Grid item>
                              {/* <SubLoginLabelBlue>&nbsp;(Optional)</SubLoginLabelBlue> */}
                            </Grid>
                          </Grid>
                        </LoginLabel>
                        <LoginTextFieldWrapper
                          fullWidth
                          id="registrationOrgCode"
                          name="registrationOrgCode"
                          // label="Name (Optional)"
                          value={registration.values.registrationOrgCode}
                          onChange={registration.handleChange}
                          error={
                            registration.touched.registrationOrgCode && Boolean(registration.errors.registrationOrgCode)
                          }
                          helperText={"If your employer told you about PAM, your organization code is in the email they sent you. If you don't have a organization code, type the name of the healthcare system or organization where you work."}
                          InputLabelProps={{ shrink: true }}
                          InputProps={{ disableUnderline: true }}
                        />
                      </Grid>


                      <Grid className="input_group_cs" item lg={12} md={12} sm={12} xs={12}>
                        <Grid container>
                          <Grid item>
                            <SubLoginLabel className="privacy_policy_cs"
                              style={{
                                lineHeight: '1',
                                fontweight: 'bold',
                              }}
                            >
                              Privacy
                            </SubLoginLabel>
                          </Grid>
                          <Grid>
                            <PrivacyTypography className="privacy_policy_text_cs" style={{ lineHeight: '1.07' }}>
                              We take your privacy seriously and will never sell your personal information. <br></br> Only members
                              of our team will have access to the information you provide. Read the full Policy <a href={"/privacypolicy"} role="navigation" className="text-underline">here</a>
                            </PrivacyTypography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid className="input_checkbox privacy-checkbox" item lg={12} md={12} sm={12} xs={12}>
                        <FormControlLabel
                          fullWidth
                          control={<CheckBox name="privacy" />}
                          onChange={registration.handleChange}
                          error={registration.touched.privacy && Boolean(registration.errors.privacy)}
                          helperText={registration.touched.privacy && registration.errors.privacy}
                          InputLabelProps={{ shrink: true }}
                          InputProps={{ disableUnderline: true }}
                          label={
                            <PrivacyTypography className="by_click_text" style={{ lineHeight: '1.07' }}>
                              By clicking Register I consent that my sensitive personal data will be collected and processed by Stanford and I have read & agree with the Pause A Moment Privacy Policy.
                            </PrivacyTypography>
                          }
                        />
                        {(registration.touched.privacy && Boolean(registration.errors.privacy)) &&
                          <div id="privacy" className='error-text'>{registration.touched.privacy && registration.errors.privacy}</div>
                        }
                      </Grid>

                      <Grid className="input_group_cs" item lg={12} md={12} sm={12} xs={12}>
                        <LoginButton variant="contained" disabled={loadingStatus} type={'submit'} >
                          {loadingStatus ? <CircularProgress size="2.5rem" /> : 'Register'}
                        </LoginButton>
                      </Grid>
                      {/* <Grid className="input_group_cs" item lg={12} md={12} sm={12} xs={12}>
                        <PrivacyTypography className="by_click_text" style={{ lineHeight: '1.07' }}>
                          By clicking Register I consent that my sensitive personal data will be collected and processed by Stanford and I have read & agree with the Stanford Pause A Moment Privacy Policy.
                        </PrivacyTypography>
                      </Grid> */}
                    </Grid>
                  </form>
                ) : null}
              </FormDiv>
            </TabPanel>
          </TabContext>
        </div>
      </ModalContentWrapper>
    </LoginPageWrapper >
  );
};
LoginPage.propTypes = {};

export default LoginPage;
