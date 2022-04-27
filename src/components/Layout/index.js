import { useContext, useState, useEffect } from 'react';
import propTypes from "prop-types";
import { useHistory } from 'react-router-dom';

import NavBar from "../../../src/components/navbar/NavBar";
import Footer from "../../../src/components/footer/Footer";

import { AppStoreContext } from "../../../src/providers/AppStoreProvider";
import { ROUTES } from '../../../src/Routes';
import { userAuth, logOut } from '../../../src/common/commonFunction';
import { validateUserSession } from "../../../pages/api/auth";

import { UserContext } from "src/providers/UserInfo";

const Layout = (props) => {
  const history = useHistory();
  const { setModal } = useContext(AppStoreContext);
  const [sessionId, setSessionId] = useState("");
  const { userInfo } = useContext(UserContext);
  const [userName, setUserName] = useState("login");
  const [menuItemsHorizontal, setMenuItemsHorizontal] = useState([]);
  const [menuItemsVertical, setMenuItemsVertical] = useState([]);
  const [subMenuItemsVertical, setSubMenuItemsVertical] = useState([]);

  useEffect(() => {
    const MENU_ITEMS_HORIZANTAL = [
      {
        title: "Home",
        isAllow: true,
        onClick: () => {
          history.push(ROUTES.default);
        },
        routePath: ROUTES.default,
      },
      {
        title: "My Progress",
        isAllow: userAuth() ? true : false,
        onClick: () => {
          history.push(ROUTES.my_progress);
        },
        routePath: ROUTES.my_progress,
      },
      {
        title: "Tools",
        isAllow: true,
        onClick: () => history.push(ROUTES.tools),
        routePath: ROUTES.tools,
      },
      {
        title: "FAQ",
        isAllow: true,
        onClick: () => history.push(ROUTES.faq),
        routePath: ROUTES.faq,
      },
      {
        title: "About",
        isAllow: true,
        onClick: () => history.push(ROUTES.team),
        routePath: ROUTES.team,
      },
      {
        title: "Privacy",
        isAllow: true,
        onClick: () => history.push(ROUTES.privacypolicy),
        routePath: ROUTES.privacypolicy,
      },
      {
        title: userName,
        isAllow: true,
        openProfilePopup: userAuth() ? true : false,
        onClick: () => setModal({ modalId: 1 }),
        routePath: "",
      },
      {
        title: "Donate",
        isAllow: true,
        isDonateButton: true,
      },
    ];

    const MENU_ITEMS_VERTICAL = [
      {
        title: "Home",
        isAllow: true,
        onClick: () => {
          history.push(ROUTES.default);
        },
        routeName: "home",
        routePath: ROUTES.default,
      },

      {
        title: "My Progress",
        isAllow: userAuth() ? true : false,
        onClick: () => {
          history.push(ROUTES.my_progress);
        },
        routeName: "myProgress",
        routePath: ROUTES.my_progress,
      },
      {
        title: "Tools",
        isAllow: true,
        onClick: () => history.push(ROUTES.tools),
        routeName: "tools",
        routePath: ROUTES.tools,
      },
      {
        title: "FAQs",
        isAllow: true,
        onClick: () => history.push(ROUTES.faq),
        routeName: "faqs",
        routePath: ROUTES.faq,
      },
      {
        title: "About",
        isAllow: true,
        onClick: () => history.push(ROUTES.team),
        routeName: "about",
        routePath: ROUTES.team,
      },
      {
        title: "Privacy",
        isAllow: true,
        onClick: () => history.push(ROUTES.privacypolicy),
        routeName: "privacypolicy",
        routePath: ROUTES.privacypolicy,
      },
      {
        title: "My Profile",
        isAllow: userAuth() ? true : false,
        onClick: () => {
        },
        routeName: "myProfile",
      },
      {
        title: "Donate",
        isAllow: false,
        isDonateButton: true,
      },
    ];

    const SUB_MENU_ITEMS_VERTICAL = [
      {
        title: "General Profile",
        isAllow: userAuth() ? true : false,
        onClick: () => history.push(ROUTES.profile),
        routeName: "profile",
        routePath: ROUTES.profile,
      },
      {
        title: "Professional Profile",
        isAllow: userAuth() ? true : false,
        onClick: () => history.push(ROUTES.aboutme),
        routeName: "aboutme",
        routePath: ROUTES.aboutme,
      },
    ];

    setMenuItemsHorizontal(MENU_ITEMS_HORIZANTAL);
    setMenuItemsVertical(MENU_ITEMS_VERTICAL);
    setSubMenuItemsVertical(SUB_MENU_ITEMS_VERTICAL);
  }, [])

  useEffect(() => {
    if (sessionId !== localStorage.getItem("sessionId")) {
      setSessionId(localStorage.getItem("sessionId"));
    }

    validateUserSession().then((res) => {
      if (res) {
        if (res.authorization_check && res.is_verified === 0) {
          logOut();
        }
        if (res.sessionId && res.is_verified === 0) {
          localStorage.setItem("sessionId", res.sessionId);
          setSessionId(res.sessionId);
        }
      }
    });
  }, [sessionId]);

  useEffect(() => {
    // console.log("user", userInfo);
    setUserName(userInfo?.name?.length > 10 ? userInfo.name.split(" ")[0] : userInfo.name);
  }, [userInfo])






  return (
    <>
      <NavBar userName={userName} menuItemsHorizontal={menuItemsHorizontal} menuItemsVertical={menuItemsVertical} subMenuItemsVertical={subMenuItemsVertical} />
      {props.children}
      <Footer />
    </>
  );
}

Layout.propTypes = {
  isLoggedIn: propTypes.bool,
};

export default Layout;
