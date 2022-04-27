import React, { useCallback, useState } from 'react';
import HeaderTitle from 'src/components/header/HeaderTitle';
import HeaderBanner from 'src/components/header/HeaderBanner';
import { BANNER_CAROUSEL_DATA, BANNER_TITLE, HEADER_CONTENT, HEADER_TITLE } from 'src/common/constants';
import Header from 'src/components/header/Header';
import LoginPage from '../login/LoginPage';
import HomePageLoggedOut from './HomePageLoggedOut';

const LoggedOutComponent = (props) => {
  //    const {alert} = useAlerts();
  // const history = useHistory();
  // const location = useLocation();
  //const { t } = useTranslation();
  //const { currentUser } = useUsers();
  const homeHeaderTitle = <HeaderTitle title={HEADER_TITLE} content={HEADER_CONTENT} link={"https://www.youtube.com/watch?v=vclHsW-O3_Q"} />;
  const [headerTitle] = useState(homeHeaderTitle);

  var changeTitle = useCallback(({ title, content }) => { }, []
  );

  const homeHeaderBanner = (
    <HeaderBanner bannerTitle={BANNER_TITLE} bannerCarouselData={BANNER_CAROUSEL_DATA} />
  );

  const [headerBanner, setHeaderBanner] = useState(homeHeaderBanner);
  const changeBanner = useCallback(({ data }) => setHeaderBanner(data), []);
  // const closeModal = useCallback(({ isClose }) => setShowLogin(isClose),[]);
  const [showLogin] = useState(false);

  return (
    <>
      <Header headerTitle={headerTitle} headerBanner={headerBanner} />
      <LoginPage show={showLogin} />
      <HomePageLoggedOut title={changeTitle} banner={changeBanner} />
    </>
  );
};
LoggedOutComponent.propTypes = {};

export default LoggedOutComponent;
