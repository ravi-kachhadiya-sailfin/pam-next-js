import { Box } from '@material-ui/core';
import Image from 'next/image'

import {
  // CancelButton,
  ContentWrapper,
  // TitleWrapper,
  SubTitleWrapper,
  SliderWrapper,
  QuestionWrapper,
  // ToolRatingWrapper,
  // CardRating,
  CustomerButtonWrapper,
  ScrollWrapper,
} from './style';
import TAMSlider from 'app/tamComponents/slider/Slider';
import CustomButton from 'app/tamComponents/button';
import propTypes from 'prop-types';
import { useState } from 'react';
import { submitPreDestress } from 'app/tamComponents/ToolsCard/tool-detail/toolDetailService';
// import popup_close from 'app/shared/assets/images/popup_close.svg';

// import StarRating from 'app/tamComponents/StarRating';


const ToolRating = ({ userRating, updateUserRating, ...props }) => {
  // let lvl = sessionStorage.getItem("distressLevel") == null ? 3 : parseInt(sessionStorage.getItem("distressLevel")
  const [destress, updateDistressLevel] = useState(0)

  let submitHandler = async () => {
    let tool = props.toolDetail
    let dbody = {
      "toolId": tool.id,
      "pre_score": destress
    }

    let dtres = await submitPreDestress(dbody)
    if (dtres.statusCode === 200) {
      sessionStorage.setItem("crntDistressScore", destress)
      props.setPreDtresId(dtres.data.activity.id);

      if (props.youtubePlayer) {
        props.youtubePlayer.current.internalPlayer.playVideo();
      }

      props.onClose()
    }
  }

  return (
    <ContentWrapper className="tool_rating_popup">
      {/* <Box textAlign="right">
        <CancelButton className="tool_rating_close" onClick={props.onClose}>
          <Image src={popup_close} alt="popup close" />
        </CancelButton>
      </Box> */}

      <ScrollWrapper>
        <SubTitleWrapper className="tools_rating_sub_text_main">
          Before you get started, let us know how you’re feeling so that we can see if the tools are helping you feel different or better after you use them.
        </SubTitleWrapper>

        <Box>

          <div className="tools_rating_main_wrapper">
            <QuestionWrapper>
              <span className="card-title">Please rate your level of distress</span>
            </QuestionWrapper >
            <SliderWrapper>
              <TAMSlider from="popup" distressScore={destress} updateDistressLevel={(val) => { updateDistressLevel(val) }} />
              <div className="slider_level">
                <div className="slider_level_text">None</div>
                <div className="slider_level_text">Moderate</div>
                <div className="slider_level_text">Extreme</div>
              </div>
            </SliderWrapper>
          </div >

        </Box >

        <CustomerButtonWrapper>
          <CustomButton onClick={() => { submitHandler() }} color="#e87e1f" style={{ height: '54px' }}>
            Submit
          </CustomButton>
        </CustomerButtonWrapper>
      </ScrollWrapper >
    </ContentWrapper >
  );
};

ToolRating.propTypes = {
  onClose: propTypes.func,
};

export default ToolRating;
