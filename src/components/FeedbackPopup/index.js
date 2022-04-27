import React, { useState, useEffect, useMemo } from 'react';
import { useFormik } from 'formik';
import Image from 'next/image'
import { Box, Grid, CircularProgress, RadioGroup } from '@material-ui/core';
import * as yup from "yup";

// import RadioWithColor from "app/tamComponents/radio-w";

// import {
//   PopUp,
//   ContentWrapper,
//   MessageText,
//   FtTextArea
// } from './FeedbackPopup.style';

// import {
//   CancelButton,
// } from '../ToolsCard/tool-detail/tool-rating/style';

// import {
//   LoginLabel,
//   LoginButton,
//   LoginTextFieldWrapper,
// } from 'app/features/login/LoginPage.styles';

// import { AnswerNormalText } from "app/features/faqs/FAQPage.styles";
// import TAMAlert from 'app/tamComponents/alert/TAMAlert';

// import popup_close from 'app/shared/assets/images/popup_close.svg';

// import { submitFeedback, submitLoggedInFeedback } from './FeedbackService';
// import { userAuthenticationValidate } from 'app/shared/Utils/index';

// export const feedbackType = [
//   { value: "1", text: "Report Issue" },
//   { value: "2", text: "Feedback" },
//   { value: "3", text: "Suggestion" },
//   { value: "4", text: "Question" },
// ];

export default function FeedbackPopUp(props) {
  const [userData, setUserData] = useState(null);
  const authUser = userAuthenticationValidate();
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user'));
    if (data) {
      setUserData(data);
    }
  }, [])


  const handleClose = () => {
    props.setFeedback(false);
  };

  const feedbackValidationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    name: yup
      .string("Enter your name")
      .required("Name is required"),
    type: yup
      .string("Enter your feedback type")
      .required("Feedback type is required"),
    suggestion: yup
      .string("Enter your suggestion")
      .required("Suggestion is required"),
  });

  const intialValues = useMemo(() => {
    if (userData)
      return {
        name: userData.name,
        email: userData.email,
        type: "",
        suggestion: "",
      };
    else
      return {
        name: "",
        email: "",
        type: "",
        suggestion: "",
      };
  }, [userData]);

  const feedback = useFormik({
    initialValues: intialValues,
    validationSchema: feedbackValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoadingStatus(true);
      const payload = {
        name: values.name,
        email: values.email,
        suggestion_type: Number(values.type),
        description: values.suggestion,
      };

      authUser ?
        submitLoggedInFeedback(payload)
          .then(() => {
            setLoadingStatus(false);

            setStatus('success');
            setTimeout(() => {
              setStatus('');
              handleClose();
            }, [3000]);
          })
          .catch((msg) => {
            setLoadingStatus(false);
            setStatus('error');

            setTimeout(() => {
              setStatus('')
            }, 5000);
          })
        : submitFeedback(payload)
          .then(() => {
            setLoadingStatus(false);

            setStatus('success');

            setTimeout(() => {
              setStatus('');
              handleClose();
            }, [3000])
          })
          .catch((msg) => {
            setLoadingStatus(false);
            setStatus('error');

            setTimeout(() => {
              setStatus('')
            }, 5000);
          })
    }
  });

  const onFeedbackSubmit = () => {
    feedback.setFieldValue("name", feedback.values.name.trim())
    feedback.setFieldValue("email", feedback.values.email.trim())
    feedback.setFieldValue("suggestion", feedback.values.suggestion.trim())

    feedback.handleSubmit()
  }

  useEffect(() => {
    const errorKeys = Object.keys(feedback.errors);

    if (errorKeys.length && feedback.submitCount) {
      setStatus('error');

      setTimeout(() => {
        setStatus('')
      }, 5000);
    }
  }, [feedback.errors, feedback.submitCount]);

  return (
    <PopUp
      className="pop-up-modal"
      open={true}
      onClose={handleClose}
      disableScrollLock={true}
    >

      <ContentWrapper className="popup_content_wrapper">

        {/* <div className="feed-back-popup">
          <Box textAlign="right" className="">
            <Image src={popup_close} alt="close the popup" className="feed-img" onClick={() => { handleClose() }} />
            <CancelButton className="" >
            </CancelButton>
          </Box>
        </div>
        <MessageText className="left-sided">
          Your feedback will help us improve PAM for you and others like you. We appreciate you taking the time to let us know what’s working well, what’s not working, and what you’d like to see in the future from PAM!
        </MessageText>

        <form onSubmit={feedback.handleSubmit}>
          <Grid className="feedback-input-group" item lg={12} md={12} sm={12} xs={12} >
            <LoginLabel htmlFor="name">
              <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                <Grid item>Name</Grid>
                <Grid className="star_input" item>&nbsp;*</Grid>
              </Grid>
            </LoginLabel>
            <LoginTextFieldWrapper
              required
              fullWidth
              id="name"
              name="name"
              disabled={userData?.name}
              className="feedback-input"
              value={feedback.values.name}
              onChange={feedback.handleChange}
              error={feedback.errors.name}
              helperText={feedback.touched.name && feedback.errors.name}
              InputLabelProps={{ shrink: true }}
              InputProps={{ disableUnderline: true }}
            />
          </Grid>

          <Grid className="feedback-input-group" item lg={12} md={12} sm={12} xs={12} >
            <LoginLabel htmlFor="registrationEmail">
              <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                <Grid item>Email address</Grid>
                <Grid className="star_input" item>&nbsp;*</Grid>
              </Grid>
            </LoginLabel>
            <LoginTextFieldWrapper
              fullWidth
              id="email"
              name="email"
              disabled={userData?.email}
              className="feedback-input"
              value={feedback.values.email}
              onChange={feedback.handleChange}
              error={feedback.touched.email && Boolean(feedback.errors.email)}
              helperText={feedback.touched.email && feedback.errors.email}
              InputLabelProps={{ shrink: true }}
              InputProps={{ disableUnderline: true }}
            />
          </Grid>

          <Grid className="feedback-input-group" item lg={12} md={12} sm={12} xs={12}>
            <LoginLabel htmlFor="type">
              <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                <Grid item>Type</Grid>
                <Grid className="star_input" item>&nbsp;*</Grid>
              </Grid>
            </LoginLabel>

            <div className="type-options">
              <RadioGroup
                id="type"
                name="type"
                row
                onChange={feedback.handleChange}
                value={feedback.values.type}
              >
                {feedbackType.map((item) => {
                  return (
                    <RadioWithColor
                      value={item.value}
                      color="#0099ba"
                      label={<span className="c-db">{item.text}</span>}
                      key={item.value}
                    />
                  );
                })}
              </RadioGroup>
            </div>

          </Grid>

          <div className="feedback-input-group">
            <LoginLabel htmlFor="suggestion">
              <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                <Grid item>Message</Grid>
                <Grid className="star_input" item>&nbsp;*</Grid>
              </Grid>
            </LoginLabel>
            <FtTextArea
              id="suggestion"
              name="suggestion"
              className="input_radius add_input_wrapper example_text_area example_text_area_five example_text_area_step_three"
              placeholder="Type your message"
              value={feedback.values.suggestion}
              error={feedback.touched.suggestion && Boolean(feedback.errors.suggestion)}
              helperText={feedback.touched.suggestion && feedback.errors.suggestion}
              onChange={feedback.handleChange}
              InputLabelProps={{ shrink: true }}
              InputProps={{ disableUnderline: true }}
            />
          </div>

          <AnswerNormalText className="feedback-text">
            Feel free to reach out on <a href="mailto:pauseamoment@stanford.edu" className="text-underline font-weight-bold feedback-text-bold">pauseamoment@stanford.edu</a> with any additional feedback or questions you have.
          </AnswerNormalText>

          {status === "error" ? (
            <TAMAlert key={'reg_error'} kind="error" message={"All fields are required."} />
          ) : status === "success" ? (
            <TAMAlert
              key={'reg_success'}
              kind="success"
              message={`Thank you for sharing your response.`}
            />
          ) : null}

          <Grid className="feedback-input-group send-feedback-btn" item lg={12} md={12} sm={12} xs={12}>
            <LoginButton variant="contained" disabled={false} type={'submit'} aria-label="send the feedback" onClick={onFeedbackSubmit}>
              {loadingStatus ? <CircularProgress size="2.5rem" /> : 'Send'}
            </LoginButton>
          </Grid>
        </form> */}

      </ContentWrapper>
    </PopUp>
  );
}
