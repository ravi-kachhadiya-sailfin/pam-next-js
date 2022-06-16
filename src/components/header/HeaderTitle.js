import React from "react";
import { HeaderTitleContainerWrapper } from "./HeaderTitle.styles";
import PropType from "prop-types";
// import YouTubeIcon from '@material-ui/icons/YouTube';
const HeaderTitle = (props) => {
  return (
    <>
      <HeaderTitleContainerWrapper className="unathorized">
        <span className="hello">{props.title}</span>

        <div className="hello-desc">{props.content}</div>
        {/* {props.link &&
          <VideoButton href={props.link} target={props.link}>
            <span className="btn-text">Learn more about PAM</span>
            <img src={VideoIcon} alt="video icon" className="video-icon" />
          </VideoButton>
        } */}
        <div className="hello-desc hello-sub-desc" style={{ padding: 'left' }}>{props.subcontent}</div>
      </HeaderTitleContainerWrapper>
    </>
  );
};

HeaderTitle.propTypes = {
  title: PropType.string.isRequired,
  content: PropType.string.isRequired,
};

export default HeaderTitle;
