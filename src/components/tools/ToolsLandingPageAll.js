import React, { useEffect, useState, useContext } from 'react';

import ToolsStaticComponent from './ToolsStaticComponent';
import ToolsCard from '../../tamComponents/ToolsCard/index';
import { Box } from '@material-ui/core';

import throttle from 'lodash.throttle';

import {
  ToolsBody,
  ToolsCardContainer,
  ToolsContainerSection,
  ToolsBottomButtonContainer,
  ToolContainer,
  RecomamndedPageToolDiscription
} from './ToolsPageComponent.styles';
import { getRecommendedTools } from './ToolsServices'
import CustomButton from 'app/tamComponents/button';

import check_arrow from "app/shared/assets/images/recommanded_arrow_right.svg";

import Caraousel from 'app/tamComponents/carouselToolsCard';
import CarouselItem from 'app/tamComponents/carouselToolsCard/CarouselItem';
import { defaultMetaData, convertTestimonialArray, getDeviceSize } from 'app/shared/Utils/index';
import { MetaContext } from 'app/shared/context/MetaProvider';
import { scrollTop } from 'app/shared/Utils/index';
import { useHistory, Link } from "react-router-dom";
import { ROUTES } from 'app/Routes';

const ToolsLandingPageAll = (props) => {
  const [quickToolsData, setQuickToolsData] = useState(null)
  let [specializedToolsData, setSpecializedToolsData] = useState(null)
  let [healthCondition, setHealthCondition] = useState([])
  let [prevPage, setPrevpage] = useState("home");
  const [msg, setMsg] = useState("Loading...");
  const { setMeta } = useContext(MetaContext);
  const history = useHistory();

  let deviceCode = getDeviceSize();
  const [deviceSize, setDeviceSize] = useState(['md', 'sm', 'xs'].indexOf(deviceCode))

  const handleResize = throttle(() => {
    deviceCode = getDeviceSize()
    setDeviceSize(['md', 'sm', 'xs'].indexOf(deviceCode));
  }, 500);

  useEffect(() => {
    window.addEventListener('resize', handleResize)
  }, [handleResize]);

  useEffect(() => {
    let config = {
      perPage: 6,
      quickToolPage: 3,
      specializedToolPage: 3
    }
    getRecommendedTools(config).then((res) => {
      let toolsData = res
      if (!!toolsData && !!toolsData.data) {
        setQuickToolsData(toolsData.data.quickTools.list)
        setSpecializedToolsData(toolsData.data.specializedTools.list)
        setHealthCondition(toolsData.data.healthCondition)
        setPrevpage(localStorage.getItem("prevPage"))
        setMsg([...toolsData.data.quickTools.list, ...toolsData.data.specializedTools.list].length > 0 ? "" : "No tools found")
      }
    }).catch((e) => {
      setMsg("Something went wrong. Please try again later.")
    })

    const metaData = {
      title: "PAM | Recommendation",
      url: window.location.href,
    }
    setMeta({ ...defaultMetaData, ...metaData });

    return () => {
      setMeta(defaultMetaData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const quickToolsDataArray = convertTestimonialArray(quickToolsData);
  const specialToolsDataArray = convertTestimonialArray(specializedToolsData);
  // const quickToolsData = useMemo(() => {
  //   if (location.state) {
  //     return location.state.toolsData.quickTools.list;
  //   }
  // }, [location]);

  // const specializedToolsData = useMemo(() => {
  //   if (location.state) {
  //     return location.state.toolsData.specializedTools.list;
  //   }
  // }, [location]);

  return (
    <ToolsBody className={prevPage !== "home" && "personalize-tool-body"}>
      <div className="container">
        <ToolsStaticComponent prevPage={prevPage} healthCondition={healthCondition} />
        <ToolsContainerSection>
          <ToolsCardContainer>
            <h1 className="cursor-p" role="navigation" onClick={() => { scrollTop(); history.push(ROUTES.quick_tools) }}>
              QUICK TOOLS <img className="right-arrow" src={check_arrow} alt="check_arrow" />
            </h1>
            <div className="discription">Easy to learn, quick to do</div>
            <div className="time">Approx 5 mins each</div>
            {deviceSize < 0 ?
              <>
                {msg &&
                  <Box className="no-Tool-found">
                    <span>{msg}</span>
                  </Box>
                }
                {quickToolsData && quickToolsData.length > 0 && (
                  <ToolContainer>
                    {quickToolsData
                      ? quickToolsData.map((ele, index) => (
                        <div key={ele.id}>
                          <ToolsCard cardData={ele} className="without-carousel-card" />
                        </div>
                      ))
                      : null}
                  </ToolContainer>
                )}
                {/* {quickToolsData && quickToolsData?.length === 0 && (
                  <Box className="no-Tool-found">
                    <span>No tools found</span>
                  </Box>
                )} */}
              </>
              : <>
                {msg &&
                  <Box className="no-Tool-found">
                    <span>{msg}</span>
                  </Box>
                }
                {quickToolsDataArray && quickToolsDataArray.length > 0 && (
                  // <ToolContainer>
                  <div className="row main_tools_slider_row">
                    <div className="col-md-12 sliderContainer main_tools_slider">
                      <Caraousel
                        indicatorIconButtonProps={{
                          style: {
                            border: '1px solid #a9bdc5',
                          },
                        }}
                        navButtonsAlwaysInvisible={!(quickToolsDataArray?.length > 1)}
                        navButtonsAlwaysVisible={quickToolsDataArray?.length > 1}
                        withCustomButton={true}
                      >
                        {quickToolsDataArray
                          && quickToolsDataArray.map((item, index) => {
                            return (
                              <CarouselItem allItems={quickToolsDataArray} desktopMode={true} data={item.Items[0]} length={2} index={index} key={index} component={ToolsCard} />
                            );
                          })}
                      </Caraousel>
                    </div>
                  </div>
                  // </ToolContainer>
                )}
                {/* {quickToolsDataArray && quickToolsDataArray?.length === 0 && (
                  <Box className="no-Tool-found">
                    <span>No tools found</span>
                  </Box>
                )} */}
              </>}
          </ToolsCardContainer>
          <ToolsCardContainer>
            <h1 className="cursor-p special-tool-title" role="navigation" onClick={() => { scrollTop(); history.push(ROUTES.special_tools) }}>
              SPECIALIZED TOOLS  <img className="right-arrow" src={check_arrow} alt="check_arrow" />
            </h1>
            {prevPage === "home" ?
              <RecomamndedPageToolDiscription>
                <div className="mb-7">These are in-depth tools that can help with the challenges and stressors you've been facing. They take a bit longer to learn, but with regular practice you can master them!</div>
                <>We recommend taking a moment for a brief assessment of how you're doing <Link to={ROUTES.my_progress} onClick={scrollTop}>here</Link>. This will help you track your progress and allows us to recommend tools that have helped others with similar profiles and experiences.</>
              </RecomamndedPageToolDiscription>
              : <RecomamndedPageToolDiscription>
                These are in-depth tools that can help with the challenges and stressors you've been facing. They take a bit longer to learn, but with regular practice you can master them!
              </RecomamndedPageToolDiscription>
            }
            <div className="time">Approximately 15 minutes the first time you try them. They will take less time with practice</div>
            {deviceSize < 0 ?
              <>
                {msg &&
                  <Box className="no-Tool-found">
                    <span>{msg}</span>
                  </Box>
                }
                {specializedToolsData && specializedToolsData.length > 0 && (
                  <ToolContainer>
                    {specializedToolsData
                      ? specializedToolsData.map((ele) => (
                        <div key={ele.id}>
                          <ToolsCard cardData={ele} id={ele.id} className="without-carousel-card" />
                        </div>
                      ))
                      : null}
                  </ToolContainer>
                )}
                {/* {specializedToolsData && specializedToolsData?.length === 0 && (
                  <Box className="no-Tool-found">
                    <span>No tools found</span>
                  </Box>
                )} */}
              </>
              :
              <>
                {msg &&
                  <Box className="no-Tool-found">
                    <span>{msg}</span>
                  </Box>
                }
                {specialToolsDataArray && specialToolsDataArray.length > 0 && (
                  <div className="row">
                    <div className="col-md-12 sliderContainer">
                      <Caraousel
                        indicatorIconButtonProps={{
                          style: {
                            border: '1px solid #a9bdc5',
                          },
                        }}
                        navButtonsAlwaysInvisible={!(specialToolsDataArray?.length > 1)}
                        navButtonsAlwaysVisible={specialToolsDataArray?.length > 1}
                        withCustomButton={true}
                      >
                        {specialToolsDataArray
                          && specialToolsDataArray.map((item, index) => {
                            return (
                              <CarouselItem allItems={specialToolsDataArray} desktopMode={true} data={item.Items[0]} length={2} itemLength={2} index={index} key={index} component={ToolsCard} />
                            );
                          })}
                      </Caraousel>
                    </div>
                  </div>
                  // </ToolContainer>
                )}
                {/* {specialToolsDataArray && specialToolsDataArray?.length === 0 && (
                  <Box className="no-Tool-found">
                    <span>No tools found</span>
                  </Box>
                )} */}
              </>}
          </ToolsCardContainer>
        </ToolsContainerSection>
        <ToolsContainerSection>
          <ToolsBottomButtonContainer>
            <div className="btn-recommanded-page">
              <CustomButton color="#0099BA" aria-label="go to home page" onClick={() => { scrollTop(); history.push(ROUTES.default) }}>Not quite right? Start again</CustomButton>
            </div>
            <div className="btn-recommanded-page">
              <CustomButton color="#09425A" role="navigation" onClick={() => { scrollTop(); history.push(ROUTES.tools) }}>Explore other tools</CustomButton>
            </div>
          </ToolsBottomButtonContainer>
        </ToolsContainerSection>
      </div>
    </ToolsBody>
  );
};

ToolsLandingPageAll.propTypes = {};

export default ToolsLandingPageAll;
