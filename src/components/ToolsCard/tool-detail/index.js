import { useEffect, useState, useRef, useContext } from 'react';
import { Box, Card } from '@material-ui/core';
import { useLocation, useParams, Redirect } from 'react-router';
import { defaultMetaData, } from 'app/shared/Utils/index'; // handleClose as popupClose, handleOpen
import { MetaContext } from 'app/shared/context/MetaProvider';
import NormalTooltip from 'app/tamComponents/Tooltip';
import { toolDetails } from "app/shared/enums";
// import Modal from '@material-ui/core/Modal';

import ShareTool from 'app/tamComponents/shareTool';

import {
  ToolsBody,
  ToolDataWrapper,
  ToolPageTitle,
  SubText,
  ToolDescription,
  MediaWrapper,
  ToolDetailWrapper,
  ToolSpecialityTitle,
  ToolSpeciality,
  TagsWrapper,
  CardTagTitle,
  CardTags,
  CardIconButton,
  ExploreToolsWrappers,
  ModalWrapper,
} from './style';

import StarRating from 'app/tamComponents/StarRating';

import CustomButton from 'app/tamComponents/button';
import shareOutlinedImage from 'app/shared/assets/images/share.svg';
import calendarCheckedImage from 'app/shared/assets/images/calendar_icon.svg';
import heartOutlinedImage from 'app/shared/assets/images/empty_heart.svg';
import { getToolDetail, setFavouriteTool } from 'app/shared/services/toolServices';
import { AppStoreContext } from 'app/shared/store/AppStoreProvider';
// import { useAuth } from 'app/features/registration/authService';
import { userAuthenticationValidate } from 'app/shared/Utils/index';
import ToolRating from './tool-rating/index';
import PreDistress from './pre-distress/index';
// import { InlineShareButtons } from 'sharethis-reactjs';
import Reminder from '../../reminder';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
// import { getDeviceSize } from 'app/shared/Utils/index';
// import throttle from 'lodash.throttle';
// import { Popover } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { ROUTES } from "app/Routes";
import AskLogin from "app/tamComponents/ToolsCard/tool-detail/textPopup";

import YouTube from 'react-youtube';

import { submitPreDestress } from 'app/tamComponents/ToolsCard/tool-detail/toolDetailService';

const ToolDetail = (props) => {
  const auth = userAuthenticationValidate();
  const history = useHistory();

  const location = useLocation();
  const { setMeta } = useContext(MetaContext);

  const youtubePlayer = useRef(null);

  const [toolDetail, setToolDetail] = useState(null);
  const [isFavourite, setFavourite] = useState(false);
  const [rating, setRating] = useState(0);
  const [shareOpen, setShareOpen] = useState(false)
  const { id } = useParams()
  const [hasReminder, setHasReminder] = useState(false)
  const descriptionElementRef = useRef(null);
  const [videoStart, setVideoStart] = useState(false);
  const [preDistressOpen, setPreDistressOpen] = useState(false);
  const [preDtresId, setPreDtresId] = useState(null);
  const [toolId, setToolId] = useState("");

  const [scroll] = useState('paper');

  const youtubeOpts = {
    width: "100%",
    height: "800px",
    rel: 1
  }

  // let toolId;
  // if (!id) {
  //   if (!location.state || !location.state.id) {
  //     window.location.href = "/tools"
  //   } else {
  //     // eslint-disable-next-line react-hooks/rules-of-hooks
  //     toolId = useRef(location.state.id)
  //   }
  // } else {
  //   toolId = {
  //     current: id
  //   }
  // }

  useEffect(() => {
    if (!id) {
      if (!location?.state?.id) {
        history.push(ROUTES.tools)
        window.scroll({ top: 0, behavior: 'smooth' });
      } else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const toolID = { current: location.state.id }
        setToolId(toolID);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  // let deviceCode = getDeviceSize();
  // const [deviceSize, setDeviceSize] = useState(['xs'].indexOf(deviceCode))

  // const handleResize = throttle(() => {
  //   deviceCode = getDeviceSize()
  //   setDeviceSize(['xs'].indexOf(deviceCode));
  // }, 500);

  // useEffect(() => {
  //   window.addEventListener('resize', handleResize)
  // }, [handleResize]);




  const tags = useRef('');
  const { setModal } = useContext(AppStoreContext);
  const [showPopup, setShowPopup] = useState(false);

  const fetchData = () => {
    getToolDetail(toolId.current).then((res) => {
      //console.log(res);
      tags.current = res ? res.toolTag.map((ele) => ele.tag.name.split('').map((x, i) => i === 0 ? x.toUpperCase() : x).join('')).join(', ') : '';
      if (res.videoLink) {
        res.videoLink = res.videoLink.replace("?", "/")
        res.videoLink = res.videoLink.replace("watch", "embed")
        res.videoLink = res.videoLink.replace("v=", "")
      }
      const metaToolDetails = toolDetails.find(x => x.id === res.id);
      const metaData = {
        title: metaToolDetails.title,
        url: `${window.location.href}/${toolId.current}`,
        image: res.thumbnailImage,
        description: metaToolDetails.description,
        keywords: metaToolDetails.keywords
      }
      setMeta(metaData);
      setToolDetail(res);
      setFavourite(res.favoriteTool);
      setRating(res.toolRating);
    });
  };

  const updateFav = () => {
    if (auth) {
      setFavouriteTool({ toolID: toolId.current });
      setFavourite(!isFavourite);
    } else {
      setModal({ modalId: 1, data: { redirect: 'tools', toolId: toolId.current } });
      setTimeout(() => {
        window.scroll({ top: 0, behavior: 'smooth' });
      }, 100)
    }
  };

  const updateRating = (value) => {
    if (auth) {
      //console.log('success');
      // setToolRating({ toolID: toolId.current, rating: value });
      setRating(value);
      togglePopUp();
    } else {
      setRating(0);
      togglePopUp();
    }
  };

  const loginPopupOpen = () => {
    setModal({ modalId: 1, data: { redirect: ROUTES.tools, toolId: toolId.current }, onClose: () => history.push(ROUTES.tools) });
    setTimeout(() => {
      window.scroll({ top: 0, behavior: 'smooth' });
    }, 100);
  }

  const togglePopUp = () => {
    setShowPopup(!showPopup);
  };

  const openSharing = () => {
    if (auth) {
      //console.log("shareOpen", shareOpen)
      // if (shareOpen) {
      //   popupClose()
      // }
      // else {
      //   handleOpen()
      // }
      setShareOpen(!shareOpen)
    } else {
      setModal({ modalId: 1, data: { redirect: 'tools', toolId: toolId.current } });
      window.scroll({ top: 0, behavior: 'smooth' });
    }
  }

  // function heightFromTop(element) {

  //   var elementHightFromTop = element.offsetTop - window.scrollY;

  //   return elementHightFromTop - 83;
  // };

  // function widthFromLeft(element) {

  //   var elementWidtghFromLeft = element.offsetLeft;

  //   return elementWidtghFromLeft - 240;
  // };

  const preDistressScoreSubmit = async () => {
    let dbody = {
      "toolId": toolDetail.id,
      "pre_score": sessionStorage.getItem("crntDistressScore")
    }

    let dtres = await submitPreDestress(dbody)
    if (dtres.statusCode === 200) {
      setPreDtresId(dtres.data.activity.id);
    }
  }

  const onVideoStart = () => {
    if (!videoStart) {
      if (sessionStorage.getItem("crntDistressScore") && sessionStorage.getItem("crntDistressScore") > -1) {
        //console.log("Call Start API");

        preDistressScoreSubmit();
      }
      else {
        youtubePlayer.current.internalPlayer.pauseVideo();
        scrollTop()
        setPreDistressOpen(true);
      }
    }
    setVideoStart(true)
  }


  const onVideoEnd = () => {
    //console.log("Open pop up");

    youtubePlayer.current.internalPlayer.seekTo(0);
    youtubePlayer.current.internalPlayer.pauseVideo();

    setTimeout(() => {
      scrollTop();
      updateRating(rating);
    }, 500);
  }

  useEffect(() => {
    return () => {
      setMeta(defaultMetaData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (toolId) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toolId])


  const scrollTop = () => {
    var topScroll = 70;
    document.body.scrollTop = topScroll;
    document.documentElement.scrollTop = topScroll;
  }

  const preDistressPopupClose = () => {
    setPreDistressOpen(false)
  }

  // const askLoginPopupClose = () => {
  //   console.log(".... redirect");
  //   if (auth === false) {
  //     setModal({ modalId: 1 });
  //     window.scroll({ top: 0, behavior: 'smooth' });
  //   }
  //   history.push(ROUTES.tools);
  // }


  //console.log("Tool details rating: ", rating);
  // console.log("youtube ref", youtubePlayer);

  if (id) {
    return <Redirect
      to={{
        pathname: ROUTES.tool_detail,
        state: { id: id }
      }}
    />
  }

  // if (!userAuthenticationValidate() && toolDetail && toolDetail.isLoginRequired) {
  //   return (
  //     <>
  //       <AskLogin />
  //     </>
  //   )
  // }

  // const addRemoveDropdown = (add = true) => {
  //   console.log("share", add, shareOpen);
  //   let dropdown = document.getElementById("dropdown-container");
  //   if (add) {
  //     dropdown.classList.add("show");
  //   } else if (shareOpen) {
  //     dropdown.classList.remove("show");
  //   }
  // }


  return (
    <>
      <ToolsBody>
        <div className="container">
          {toolDetail && (
            <>
              <ToolDataWrapper>

                <div className="probsolve_title_group">
                  <ToolPageTitle>{toolDetail.title}</ToolPageTitle>
                  <SubText>Time duration {toolDetail.duration + " minutes"}</SubText>
                </div>
                <div className="probsolve_text_btn_group">
                  <ToolDescription>{toolDetail.summary}</ToolDescription>
                </div>
              </ToolDataWrapper>

              <MediaWrapper>
                <YouTube
                  videoId={toolDetail.videoLink ? toolDetail.videoLink.split('/').splice(-1)[0] : "-d_AA9H4z9U"}
                  opts={youtubeOpts}
                  ref={youtubePlayer}
                  onPlay={() => { onVideoStart(); }}
                  onEnd={() => { onVideoEnd() }}
                />
              </MediaWrapper>

              <div id="border" className="luke_border"></div>

              <ToolDetailWrapper>
                <Box className="tools_details_text" width="100%">
                  <ToolSpecialityTitle>This tool can help to:</ToolSpecialityTitle>
                  <ToolSpeciality>{toolDetail.benefit}</ToolSpeciality>
                </Box>
                <Box className="tools_details_text" width="100%">
                  <TagsWrapper>
                    <CardTagTitle>Tags</CardTagTitle>
                    <CardTags>{tags.current}</CardTags>
                  </TagsWrapper>
                </Box>
                <div>
                  <Box className="tags ">
                    <Box className="tags-details-first ">
                      <StarRating
                        className="tools_details_page mt-12 star-rating"
                        name={toolId.current}
                        defaultValue={rating}
                        size="large"
                        disabled={true}
                        onChange={(e, value) => {
                          updateRating(value);
                          scrollTop();
                        }} />
                    </Box>
                    <Box className="tags-details-icon">
                      <NormalTooltip title={`${shareOpen ? "" : "Share"}`}>
                        <div className={`dropup new-share-card-dropdown ${shareOpen ? "add-bottom-arrow" : ""}`} >
                          <CardIconButton aria-label="share" id="share-btn" onClick={() => { openSharing(); }}>
                            <img src={shareOutlinedImage} alt="share icon" height="28" />
                          </CardIconButton>
                          {shareOpen &&
                            <Card Card className="share-card-wrapper dropdown-menu show" aria-labelledby="share-btn">
                              <ShareTool
                                onClose={openSharing}
                                toolId={toolDetail.id}
                                title={toolDetail.title}
                                description={toolDetail.summary}
                                shareUrl={window.location.origin + "/tool-detail/" + toolId.current} // (defaults to current url)}
                                image={toolDetail.thumbnailImage}
                              />
                            </Card>
                          }
                        </div>
                      </NormalTooltip>

                      <NormalTooltip title="Calendar">
                        <CardIconButton aria-label="calendar" onClick={() => { setHasReminder(!hasReminder) }}>
                          <img src={calendarCheckedImage} alt="calendar icon" height="28" />
                        </CardIconButton>
                      </NormalTooltip>

                      <NormalTooltip title="Favorite">
                        <CardIconButton aria-label="favorite" onClick={updateFav}>
                          {isFavourite === false || isFavourite === undefined || isFavourite === null ? (
                            <img src={heartOutlinedImage} alt="favorite icon" height="28" />
                          ) : (
                            <i className="fa fa-heart favorite-icon"></i>
                          )}
                        </CardIconButton>
                      </NormalTooltip>

                    </Box>
                    <ExploreToolsWrappers className="tools_details_button">
                      <CustomButton onClick={() => { scrollTop(); history.push(ROUTES.tools) }} color="#09425a">Explore other tools</CustomButton>
                    </ExploreToolsWrappers>


                    {/* {shareOpen &&
                      <Popover className="new-share-card"
                        open={shareOpen}
                        anchorEl={shareOpen}
                        onClose={openSharing}

                        PaperProps={{ style: { minWidth: 275 } }}
                        style={{ top: heightFromTop(document.getElementById('share-btn')), left: deviceSize === 0 ? 0 : widthFromLeft(document.getElementById('share-btn')) }}
                      >

                        <Card Card className="share-card-wrapper">
                          <ShareTool
                            onClose={openSharing}
                            toolId={toolDetail.id}
                            title={toolDetail.title}
                            description={toolDetail.summary}
                            shareUrl={window.location.origin + "/tool-detail/" + toolId.current} // (defaults to current url)}
                            image={toolDetail.thumbnailImage}
                          />
                        </Card>
                      </Popover>
                    } */}
                  </Box>
                </div>
              </ToolDetailWrapper>
              {/* <ToolDetailWrapper>

            </ToolDetailWrapper> */}
              {/* <ExploreToolsWrappers>
              <CustomButton onClick={() => { window.location.href = '/tools' }} color="#09425a">Explore other tools</CustomButton>
            </ExploreToolsWrappers> */}
            </>
          )}
          {
            hasReminder &&

            <Dialog className="donate-card"
              open={hasReminder}
              style={{ maxWidth: "1018px !important" }}
              onClose={() => { setHasReminder(false) }}
              scroll={scroll}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
            >
              <DialogContent dividers={scroll === 'paper'} className="donate-text">
                <DialogContentText
                  id="scroll-dialog-description"
                  ref={descriptionElementRef}
                  tabIndex={-1}
                >
                  <Reminder closePopup={() => { setHasReminder(false) }} location={window.location.origin + "/tool-detail/" + toolId.current} title={'PAM - ' + toolDetail.title} discription={toolDetail.summary} />

                </DialogContentText>
              </DialogContent>
            </Dialog>
          }
          {
            !!showPopup && <ModalWrapper open={showPopup} onClose={togglePopUp}>
              <ToolRating screen="tool-details" from="popup" auth={auth} toolDetail={toolDetail} activityID={preDtresId} userRating={rating} updateUserRating={setRating} updateRating={(val) => { updateRating(val) }} showLoginPopup={loginPopupOpen} onClose={togglePopUp} />
            </ModalWrapper>
          }

          {
            preDistressOpen && <ModalWrapper open={preDistressOpen}>
              <PreDistress toolDetail={toolDetail} youtubePlayer={youtubePlayer} onClose={preDistressPopupClose} setPreDtresId={setPreDtresId} />
            </ModalWrapper>
          }

          {
            (!userAuthenticationValidate() && toolDetail && toolDetail.isLoginRequired) &&
            <AskLogin toolId={toolDetail.id} />
          }
        </div >
      </ToolsBody >
    </>
  );
};

export default ToolDetail;
