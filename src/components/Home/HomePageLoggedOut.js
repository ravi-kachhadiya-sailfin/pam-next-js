/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
// import PropTypes from "prop-types";
import { ToolsSectionWrapper } from "./HomePage.styles";
import { MetaContext } from '../../providers/MetaProvider';
import logo from 'src/assets/images/logos/logo1.svg';

import {
  CardContentWrapper,
  CardsTitle,
  CardsWrapper,
  ClearALLButton,
  ContinueButton,
} from "../cards/Cards.styles";
import ToolsTabs from "../tabs/ToolsTabs";
import Icon1 from "src/assets/images/Icon1.png";
import Icon2 from "src/assets/images/Icon2.png";
import Icon3 from "src/assets/images/Icon3.png";
import Icon4 from "src/assets/images/Icon4.png";
import Icon5 from "src/assets/images/Icon5.png";
import Icon6 from "src/assets/images/Icon6.png";
import MultiReactionCard from "../cards/MultiReactionCard";
import SingleChoiceCard from "../cards/SingleChoiceCard";
import TAMSlider from "../slider/Slider";
import Testimonial from "./Testimonial";
import {
  BANNER_CAROUSEL_DATA,
  BANNER_TITLE,
  HEADER_CONTENT,
  HEADER_TITLE,
} from "../../common/constants";
// import banner_img_1 from "app/shared/assets/images/banner_img_1.png";
import HeaderBanner from "../header/HeaderBanner";
// import ScrollToTop from "app/shared/Utils/ScrollToTop";
import TAMAlert from '../alert/TAMAlert';
import {
  saveInitialScreener,
  saveInitialScreenerLoggedIn,
} from "../../../pages/api/initialScreener";
// import { useAuth } from "../registration/authService";
import { userAuthenticationValidate } from '../../common/commonFunction';
import { ROUTES } from "../../Routes";
// import "bootstrap/dist/css/bootstrap.min.css";

const HomePageLoggedOut = (props) => {
  const history = useHistory();
  const [auth, setAuth] = useState(false);
  const [changeBool, setChangeBool] = useState(false)
  const [distressScore, setDistressScore] = useState(0)
  const [errorMessage, setErrorMessage] = useState('');
  const { setMeta } = useContext(MetaContext);




  useEffect(() => {
    const tempAuth = userAuthenticationValidate();
    setAuth(tempAuth)

    props.title({ title: HEADER_TITLE, content: HEADER_CONTENT });
    props.banner({
      data: (
        <HeaderBanner
          // bannerImagePath={banner_img_1}
          bannerTitle={BANNER_TITLE}
          bannerCarouselData={BANNER_CAROUSEL_DATA}
        />
      ),
    });

    const metaData = {
      title: "Pause A Moment",
      description: "The COVID-19 pandemic has taken a toll. Pause a moment to focus on your well-being.",
      image: logo,
      url: window.location.href
    }
    setMeta(metaData);
  }, []);

  const TITLE = "DISCOVER TOOLS TO";
  const TABLIST = [
    {
      icon: Icon1,
      label: <>Help me lift my mood or feel more energized</>,
      altText: "help me lift my mood or feel more energized",
      clickEvent: () => { history.push(`${ROUTES.tools}/f1`); }
    },
    {
      icon: Icon2,
      label: (
        <>
          Help me cope when
          things feel stressful.
        </>
      ),
      altText: "Help me cope when things feel stressful.",
      clickEvent: () => { history.push(`${ROUTES.tools}/f2`); }
    },
    {
      icon: Icon3,
      label: (
        <>
          Help me cope with
          trauma
        </>
      ),
      altText: "Help me cope with trauma",
      clickEvent: () => { history.push(`${ROUTES.tools}/f3`); }
    },
    {
      icon: Icon4,
      label: (
        <>
          Help me deal with
          anxiety
        </>
      ),
      altText: "Help me deal with anxiety",
      clickEvent: () => { history.push(`${ROUTES.tools}/f4`); }
    },
    {
      icon: Icon5,
      label: <>Help me relax</>,
      altText: "Help me relax",
      clickEvent: () => { history.push(`${ROUTES.tools}/f5`); }
    },
    {
      icon: Icon6,
      label: <>View all tools</>,
      altText: "View all",
      clickEvent: () => { history.push(ROUTES.tools); }
    },
  ];

  const ititalScreenSubmit = async () => {
    if (sessionStorage.getItem('feelingEmotion')) {
      if (auth) {
        saveInitialScreenerLoggedIn().then((toolsData) => {
          localStorage.setItem("toolData", JSON.stringify(toolsData))
          localStorage.setItem("prevPage", "home")
          history.push(ROUTES.recommendation, { toolsData });
          window.scrollTo(0, 0);
        });
      } else {
        // console.log("hello")
        saveInitialScreener().then((toolsData) => {
          // console.log("hello", toolsData)
          localStorage.setItem("toolData", JSON.stringify(toolsData))
          localStorage.setItem("prevPage", "home")
          history.push(ROUTES.recommendation, { toolsData });
          window.scrollTo(0, 0);
        });
      }
    } else {
      setErrorMessage('Please select your current mood!');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  }

  //console.log("home page deployment checking....");
  //console.log("home page deployment file mode checking....");

  return (
    <>
      <ToolsSectionWrapper id="find-right-tools">
        <div className="container">
          <div className="row ">
            <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 help_me_find">
              <CardsTitle>HELP ME FIND THE RIGHT TOOLS</CardsTitle>
              <MultiReactionCard
                number={1}
                question={" How are you feeling?"}
                changeBool={changeBool}
                description={"Pick your current mood"}
                choices={[
                  "HAPPY",
                  "CONTENT",
                  "SAD",
                  "AFRAID",
                  "GUILTY",
                  "ANGERY",
                  "WORRIED",
                  "STRESSED",
                  "GRIEVING",
                  "NOT_SURE",
                ]}
              />

              <CardsWrapper className="rate_card"
                bootstrapClass={"col-xs-12 col-sm-12 col-md-12 col-lg-12"}
              >
                <div className="card-header">
                  <span className="card-number">2</span>
                  <span className="card-title">
                    Please rate your level of distress (at this time)?
                  </span>
                </div>
                <CardContentWrapper className="rate_level"
                  bootstrapClass={"col-xs-12 col-sm-12 col-md-12 col-lg-12"}
                >
                  <TAMSlider distressScore={distressScore} setDistressScore={(val) => { setDistressScore(val) }} changeBool={changeBool} />
                  <div className="slider_level">
                    <div className="slider_level_text">None</div>
                    <div className="slider_level_text">Moderate</div>
                    <div className="slider_level_text">Extreme</div>
                  </div>
                </CardContentWrapper>
              </CardsWrapper>

              <SingleChoiceCard
                number={3}
                changeBool={changeBool}
                question={"Have you experienced a traumatic event?"}
                description={
                  "This may include: life-threatening experiences, witnessing deaths or death of a loved " +
                  "one or colleague, significant exposure to COVID-related deaths or complications, " +
                  "physical or sexual assault."
                }
                choices={[
                  {
                    id: "hasTraunmaticEvent",
                    title: "Yes",
                    value: "hasTraunmaticEvent",
                    name: "hasTraunmaticEvent",
                  },
                  {
                    id: "hasNotTraunmaticEvent",
                    title: "No",
                    value: "hasNotTraunmaticEvent",
                    name: "hasNotTraunmaticEvent",
                  },
                ]}
              />

              {errorMessage && (
                <div className="row">
                  <div className="col-xs-12">
                    <TAMAlert key={'error_message'} kind="error" message={errorMessage} />
                  </div>
                </div>
              )
              }

              <div className="row">
                <div className="col-xs-12">
                  {/*<input type="button" className="continue-button" value="Continue"/>*/}
                  <ContinueButton
                    role="submit"
                    aria-label="Submit initial screener"
                    onClick={async () => {
                      ititalScreenSubmit()
                    }}
                  />
                </div>
                <div className="col-xs-12 text-center text-underline">
                  <ClearALLButton
                    role="button"
                    aria-label="reset initial screener form"
                    onClick={() => {
                      window.scroll({
                        top: 500,
                        behavior: "smooth",
                      });
                      sessionStorage.setItem("hasTraumaticEvent", "No");
                      sessionStorage.setItem("distressLevel", 0);
                      sessionStorage.setItem("feelingEmotion", "");
                      setChangeBool(!changeBool)
                      setDistressScore(0)
                    }}
                  >
                    Clear all my choices
                  </ClearALLButton>
                </div>
              </div>
              {/* <Cards /> */}
            </div>
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 discover_tools">
              <ToolsTabs title={TITLE} tabsList={TABLIST} />
            </div>
          </div>
        </div>
        <Testimonial />
      </ToolsSectionWrapper>
    </>
  );
};

HomePageLoggedOut.propTypes = {};

export default HomePageLoggedOut;
