import React, { useCallback } from 'react';
import HeaderTitle from '../../tamComponents/header/HeaderTitle';
import { BANNER_TITLE, BANNER_CAROUSEL_DATA } from '../../shared/constants';
import Header from '../../tamComponents/header/Header';
import HeaderBanner from '../../tamComponents/header/LoggedInHeader';
import banner_img_1 from '../../shared/assets/images/loggedin.png';
import HomePageLoggedIn from './HomePageLoggedIn';

const LoggedInCOmponent = (props) => {

  const homeHeaderTitle = (
    <HeaderTitle
      title={<>{'Welcome Back ' + (!!JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).name : "")}<br /></>}
      subcontent={"It’s great to see you Pause A Moment for yourself today."}
    />
  );

  var changeTitle = useCallback(({ title, content }) => { }, []
  );

  const homeHeaderBanner = (
    <HeaderBanner style={{ marginTop: "-240px !important" }} bannerImagePath={banner_img_1} bannerTitle={BANNER_TITLE} bannerCarouselData={BANNER_CAROUSEL_DATA} />
  );
  const changeBanner = useCallback(({ data }) => { }, []);

  return (
    <>
      <Header headerTitle={homeHeaderTitle} headerBanner={homeHeaderBanner} />
      <HomePageLoggedIn title={changeTitle} banner={changeBanner} />
    </>
  );
};
LoggedInCOmponent.propTypes = {};

export default LoggedInCOmponent;
