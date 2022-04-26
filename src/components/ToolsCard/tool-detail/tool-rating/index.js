import { Box } from '@material-ui/core';


import {
  CancelButton,
  ContentWrapper,
  TitleWrapper,
  SubTitleWrapper,
  SliderWrapper,
  QuestionWrapper,
  ToolRatingWrapper,
  CustomerButtonWrapper,
  ScrollWrapper,
} from './style';
import TAMSlider from 'app/tamComponents/slider/Slider';
import CustomButton from 'app/tamComponents/button';
import propTypes from 'prop-types';
import { useState } from 'react';
import { submitDestress, submitRating } from '../toolDetailService'
import popup_close from 'app/shared/assets/images/popup_close.svg';
import TAMAlert from 'app/tamComponents/alert/TAMAlert';
import { ROUTES } from "app/Routes";

import StarRating from 'app/tamComponents/StarRating';
import { useHistory } from "react-router";
// import { useAuth } from "app/features/registration/authService";
import { userAuthenticationValidate } from 'app/shared/Utils/index';

import {
  // saveInitialScreener,
  saveInitialScreenerLoggedIn,
} from "app/shared/services/initialScreener";

const ToolRating = ({ userRating, updateUserRating, ...props }) => {
  const [destress, updateDistressLevel] = useState(0)
  const [error, setError] = useState(false);
  const history = useHistory();
  const auth = userAuthenticationValidate();

  let submitHandler = async () => {
    let tool = props.toolDetail;

    if (userRating < 1) {
      setError(true);

      setTimeout(() => {
        setError(false);
      }, 5000);
    } else {
      let dbody = {
        "toolId": tool.id,
        "score": destress,
        "activityId": props.activityID
      }
      let rbody = {
        "toolId": tool.id,
        "rating": userRating,
        "activityId": props.activityID
      }
      let dtres = await submitDestress(dbody)
      let rtres = await submitRating(rbody)

      sessionStorage.setItem('crntDistressScore', destress)
      if (dtres.statusCode === 200 && rtres.statusCode === 200) {
        sessionStorage.setItem("crntDistressScore", destress);

        if (auth) {
          props.onClose();
          props.updateRating(userRating);
        } else {
          props.onClose();
          props.showLoginPopup();
          props.updateRating(0);
        }


        if (["tool-details"].includes(props.screen)) {
          if (sessionStorage.getItem("crntDistressScore") > -1
            && sessionStorage.getItem("lastFeelingEmotion")
            && sessionStorage.getItem("lastHasTraumaticEvent")) {

            if (auth) {
              saveInitialScreenerLoggedIn(true).then((toolsData) => {
                localStorage.setItem("toolData", JSON.stringify(toolsData))
                localStorage.setItem("prevPage", "home")
                history.push(ROUTES.recommendation, { toolsData });
                window.scrollTo(0, 0);
              });
            }
            // else {
            //   saveInitialScreener(true).then((toolsData) => {
            //     localStorage.setItem("toolData", JSON.stringify(toolsData))
            //     localStorage.setItem("prevPage", "home")
            //     history.push(ROUTES.recommendation, { toolsData });
            //     window.scrollTo(0, 0);
            //   });
            // }

          } else {
            if (auth) {
              history.push(ROUTES.tools);
              window.scrollTo(0, 0);
            }
          }
        }
      }
    }
  }

  return (
    <ContentWrapper className="tool_rating_popup">
      <Box textAlign="right">
        <CancelButton className="tool_rating_close" onClick={props.onClose}>
          <img src={popup_close} alt="popup close" />
        </CancelButton>
      </Box>

      <ScrollWrapper>
        <TitleWrapper className="tools_rating_text_main">How was this tool for you today?</TitleWrapper>
        <SubTitleWrapper className="tools_rating_sub_text_main">
          These scales help to track your progress & evaluate whether this has been a useful tool specifically for
          you. It helps us understand which tools work best for you so we can recommend better ones each time.
        </SubTitleWrapper>

        <Box>

          <div className="tools_rating_main_wrapper">
            <QuestionWrapper>
              <span className="card-number">1</span>
              <span className="card-title">Please rate your level of distress</span>
            </QuestionWrapper>
            <SliderWrapper >
              <TAMSlider from="popup" distressScore={destress} updateDistressLevel={(val) => { updateDistressLevel(val) }} />
              <div className="slider_level">
                <div className="slider_level_text">None</div>
                <div className="slider_level_text">Moderate</div>
                <div className="slider_level_text">Extreme</div>
              </div>
            </SliderWrapper>
          </div>

        </Box>

        <Box className="tools_rating_wrapper">
          <QuestionWrapper>
            <span className="card-number">2</span>
            <span className="card-title">How helpful was this tool?</span>
          </QuestionWrapper>
          <ToolRatingWrapper>
            <StarRating
              size="large"
              defaultValue={userRating || props.toolDetail.toolRating}
              name={"star-rating"}
              className="mt-12 star-rating"
              from={props.from}
              onChange={(e, value) => {
                updateUserRating(value);
              }} />
          </ToolRatingWrapper>
        </Box>

        {error &&
          <TAMAlert
            key={'error'}
            kind="error"
            message={`Please give rating.`}
          />
        }

        <CustomerButtonWrapper>
          <CustomButton role="button" aria-label="submit the level of distress & tool rating" onClick={() => { submitHandler() }} color="#e87e1f" style={{ height: '54px' }}>
            Submit
          </CustomButton>
        </CustomerButtonWrapper>
      </ScrollWrapper>
    </ContentWrapper>
  );
};

ToolRating.propTypes = {
  onClose: propTypes.func,
};

export default ToolRating;
