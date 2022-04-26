import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Helmet } from "react-helmet";

import { Popover, Box } from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import {
    DefaultNavBar,
    NavBarBrand,
    NavBarSubBrand,
    NavBarButton,
    NavBarBrandMobile,
    NavBarSearchMobile,
    NavBarDonateButtonMobile,
    NavBarSection,
    NavBarHeadline,
    ProfilePopoverBox,
    BoxContainerWrapper,
} from "./NavBar.styles";

import PopUp from "./Popup";
import TextPopUp from './TextPopup';
import NavBarMenuList from "./NavBarMenuList";

import { handleClose, handleOpen, userAuthenticationValidate } from "src/common/commonFunction";
import { ROUTES } from "src/Routes";
import { AppStoreContext } from "src/providers/AppStoreProvider";
import { MetaContext } from "src/providers/MetaProvider";

import logo1 from "src/assets/images/logos/logo1.svg";
import stanfordMedLogo from "src/assets/images/logos/logo2.svg";
import logomobile from "src/assets/images/logos/logomobile.svg";
import heart from "src/assets/images/logos/heart.svg";
import search from "src/assets/images/search_mobile.svg";

/*Navigation Bar for the application.
 *
 */
const NavBar = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { setModal } = React.useContext(AppStoreContext);
    // const { userInfo } = React.useContext(UserContext);
    const { meta } = React.useContext(MetaContext);
    const [isDonate, setIsDonate] = useState(false)
    const [isTextPopup, setIsTextPopup] = useState(false)
    const auth = userAuthenticationValidate()

    const drawerWidth = 240;

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
            background: "#09425A",
            color: "#f0f4f5eb !important",
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
            borderBottom: "1px solid #1a7285",
            background: "#13364a",
        },
        drawerIconButton: {
            color: "#F0F4F5",
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
        selectedMenu: {
            background: "#009ABB",
        },
        sideMenuUL: {
            padding: "0px"
        },
        userName: {
            padding: "0px 10px",
        },
        subMenu: {
            margin: "0px 16px",
            padding: "4px 16px"
        }
    }));

    const routeNames = {
        "/": "home",
        "/home": "home",
        "/aboutme": "aboutme",
        "/profile": "profile",
        "/faq": "faqs",
        "/tools": "tools",
        "/my-progress": "myProgress",
        "/about": "about",
        "/privacypolicy": "privacypolicy",
    };

    const menuItems = {
        home: false,
        myProgress: false,
        tools: false,
        resources: false,
        aboutme: false,
        myProfile: false,
        faqs: false,
        about: false,
        profile: false,
        feedback: false,
        donate: false
    }

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [selectedMenu, setSelectedMenu] = React.useState(menuItems)
    const [selectedMenuItem, setSelectedMenuItem] = useState();
    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const [pathName, setPathName] = useState(props.location?.pathname);
    // const [feedback, setFeedback] = useState(false);
    // const [userName, setUserName] = useState("login");

    useEffect(() => {
        setPathName(props.location?.pathname);
    }, [selectedMenuItem, props.location?.pathname])

    // useEffect(() => {
    //   console.log("user", userInfo);
    //   setUserName(userInfo.name.length > 10 ? userInfo.name.split(" ")[0] : userInfo.name);
    // }, [userInfo])

    useEffect(() => {
        setSelectedMenuItem(Object.keys(selectedMenu).find(key => selectedMenu[key]));
    }, [selectedMenu])

    // const selectedMenuItem = Object.keys(selectedMenu).find(key => selectedMenu[key]);

    const handleDrawerOpen = () => {
        if (pathName === "/profile" || pathName === "/aboutme") {
            setSubMenuOpen(true);
            setSelectedMenu({ ...selectedMenu, "myProfile": true, [pathName.split("/")[1]]: true })
            // console.log("in handleDrawerOpen", pathName.split("/")[1])
            setSelectedMenuItem(pathName.split("/")[1]);
        }
        else {
            setSelectedMenu({ ...selectedMenu, [routeNames[pathName]]: true })
            setSelectedMenuItem(routeNames[pathName]);
        }
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // console.log(selectedMenuItem, selectedMenu)

    const handleDonate = () => {
        setSelectedMenu({ ...selectedMenu, [selectedMenuItem]: false, donate: true })
        setOpen(false);
        // window.open('https://medicalgiving.stanford.edu/', '_blank');

        setIsDonate(true);
    };
    const openPopup = (event) => {
        //console.log("event", event)
        setAnchorEl(event.currentTarget);
    };

    const closePopup = () => {
        handleClose();
        setAnchorEl(null);
    };

    const logOut = () => {
        const sessionId = localStorage.getItem("lastSessionId");

        localStorage.clear();
        sessionStorage.clear();

        localStorage.setItem("sessionId", sessionId);

        props.history.push(ROUTES.default);
        props.history.go(0);
        window.scroll({ top: 0, behavior: 'smooth' });
    };

    const profilePopoverItemClick = (item) => {
        setAnchorEl(null);

        switch (item) {
            case "/profile":
            case "/aboutme":
                props.history.push(item);
                window.scroll({ top: 0, behavior: 'smooth' });
                break;

            case "logout":
                logOut();
                break;
            default: ;
        }
    };


    const [text, setText] = useState("")
    const [openSearchBar, setSearchBar] = useState(false);
    const submitSearch = () => {
        if (text) {
            sessionStorage.setItem("search", text)
            window.location.href = "/search/" + text
        }
        setSearchBar(false);
    }

    // const feedbackPopUpClose = (value) => {
    //   //console.log("feedback:", value)
    //   setFeedback(value);
    //   setSelectedMenu({ ...selectedMenu, "feedback": value });
    // }

    const donatePopupClose = () => {
        setSelectedMenu({ ...selectedMenu, "donate": false });
    }

    const handleVerticalSideMenu = (routeName, redirect) => {
        // console.log("routename clicked",)
        if (routeName !== "myProfile") {
            if (routeName === "profile" || routeName === "aboutme") {
                setSelectedMenu({ ...selectedMenu, [selectedMenuItem]: false, [routeName === "aboutme" ? "profile" : "aboutme"]: false, "myProfile": true, [routeName]: true, })
            }
            else {
                setSelectedMenu({ ...selectedMenu, [selectedMenuItem]: false, "aboutme": false, "profile": false, "myProfile": false, [routeName]: true });
            }
            setOpen(false);
            setSubMenuOpen(false);
            redirect();
        }
        else {
            // console.log(pathName);
            if (pathName !== "/profile" && pathName !== "/aboutme") {
                // console.log("here", selectedMenuItem, routeName);
                setSelectedMenu({ ...selectedMenu, [selectedMenuItem]: false, [routeName]: true })
            }
            setSubMenuOpen(!subMenuOpen);
        }
    }

    useEffect(() => {
        if (anchorEl) {
            handleOpen();
        }
    }, [anchorEl]);

    // console.log("userName", userName);
    return (
        <NavBarSection className={["/", "/home", "/faq"].includes(props?.location?.pathname) && "header-over-banner"}>
            <Helmet>

                {/* Primary Meta Tags */}
                <title>{meta.title}</title>
                <link rel="canonical" href={meta.url} />
                <meta name="title" content={meta.title} />
                <meta name="description" content={meta.description} />
                <meta name="keywords" content={meta.keywords} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={meta.url} />
                <meta property="og:title" content={meta.title} />
                <meta property="og:description" content={meta.description} />
                <meta property="og:image" content={meta.image} />

                {/* Twitter  */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={meta.url} />
                <meta property="twitter:title" content={meta.title} />
                <meta property="twitter:description" content={meta.description} />
                <meta property="twitter:image" content={meta.image} />
            </Helmet>

            <div className={classes.root}>
                <CssBaseline />
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    {/* <div className={classes.userName}>
            <ListItemText>{getUserInfo("name")}</ListItemText>
          </div> */}
                    <div className={classes.drawerHeader}>
                        <ListItemText className={classes.userName}>
                            {props.userName}
                        </ListItemText>
                        <IconButton onClick={handleDrawerClose} className={classes.drawerIconButton}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon fontSize="large" /> : <ChevronRightIcon fontSize="medium" />}
                        </IconButton>
                    </div>

                    <List>
                        {(props.menuItemsVertical && props.menuItemsVertical.length > 0) &&
                            props.menuItemsVertical.map((x, i) => x.isAllow && (
                                <>
                                    <ListItem button role={x.routeName === "myProfile" ? "button" : "navigation"} className={selectedMenu[x.routeName] && x.routeName !== "myProfile" && classes.selectedMenu} onClick={() => { handleVerticalSideMenu(x.routeName, x.onClick) }}>
                                        <ListItemText>{x.title}</ListItemText>
                                    </ListItem>
                                    {x.routeName === "myProfile" && subMenuOpen && (props.subMenuItemsVertical && props.subMenuItemsVertical.length > 0) &&
                                        props.subMenuItemsVertical.map((subMenu, i) => subMenu.isAllow && (
                                            <ListItem button role="navigation" className={`${selectedMenu[subMenu.routeName] && classes.selectedMenu} ${classes.subMenu}`} onClick={() => { handleVerticalSideMenu(subMenu.routeName, subMenu.onClick) }}>
                                                <ListItemText>{subMenu.title}</ListItemText>
                                            </ListItem>))}
                                </>
                            ))}
                        <ListItem button className={selectedMenu.donate && classes.selectedMenu}
                            onClick={handleDonate}>
                            <ListItemText>Donate</ListItemText>
                        </ListItem>
                    </List>
                </Drawer>

            </div>

            {/* <Link to="#">HOME</Link> to <Link to="#">741741</Link>  */}
            <NavBarHeadline>Crisis Lines: For immediate help Call&nbsp;<a href={"tel:1-800-273-8255"} style={{ cursor: "pointer" }}>1-800-273-8255</a>&nbsp;or&nbsp;<span role="navigation" aria-label="" onClick={() => setIsTextPopup("https://www.crisistextline.org/")}>Text the Crisis Line.</span>&nbsp; International numbers can be found&nbsp;<span role="navigation" aria-label="external website for nternational numbers" style={{ fontStyle: "normal" }} onClick={() => setIsTextPopup("https://www.opencounseling.com/suicide-hotlines")}>here</span></NavBarHeadline>

            <section
                style={{
                    width: "100%",
                }}
            >
                <DefaultNavBar>
                    <div className="container-fluid">
                        <div className="header_wrapper">
                            <div className="navbar-header">
                                <NavBarButton data-toggle="collapse" data-target="#navbar23654" onClick={handleDrawerOpen}>
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                </NavBarButton>
                                <NavBarBrand>
                                    <img src={logo1} alt="PAM Pause A Moment" onClick={() => { window.location.href = "/" }} />
                                    <img className="mobile-logo" src={logomobile} alt="PAM Pause A Moment" onClick={() => { window.location.href = "/" }} />
                                </NavBarBrand>
                                <NavBarSubBrand>
                                    <img src={stanfordMedLogo} alt="Stanford medicine" />
                                </NavBarSubBrand>
                                <div className="search_btn_donate">
                                    <NavBarDonateButtonMobile onClick={handleDonate} className={openSearchBar && "donate_hide"}>
                                        <img src={heart} alt="PAM Pause A Moment" />
                                        Donate</NavBarDonateButtonMobile>
                                    <NavBarSearchMobile className={openSearchBar && "search-box"}>
                                        {!openSearchBar ? <img src={search} alt="search" onClick={() => { setSearchBar(true) }} />
                                            : <> <input className="mobile_search" type="search" onKeyUp={(e) => { if (e.keyCode === 13) { submitSearch() } }} value={text} onChange={(e) => { setText(e.target.value) }} id="search" autoComplete="off" />
                                                <img src={search} alt="search" onClick={() => { submitSearch() }} />
                                            </>
                                        }
                                    </NavBarSearchMobile>
                                    {auth ?
                                        <NavBarBrandMobile className="login_link" onClick={() => profilePopoverItemClick("logout")}>Logout</NavBarBrandMobile>
                                        : <NavBarBrandMobile className="login_link" onClick={() => setModal({ modalId: 1 })}>Login</NavBarBrandMobile>
                                    }
                                </div>
                            </div>
                            <NavBarMenuList
                                searchBar={true}
                                menuItems={props.menuItemsHorizontal}
                                popupOpenHandler={openPopup}
                                donatePopupClose={donatePopupClose}
                            // setFeedback={feedbackPopUpClose}
                            />
                        </div>

                    </div>
                </DefaultNavBar>
            </section>
            {isTextPopup && <TextPopUp setShowPopup={(bl) => { setIsTextPopup(bl) }} link={isTextPopup} />}
            {isDonate && <PopUp setShowPopup={(bl) => { setIsDonate(bl) }} donatePopupClose={donatePopupClose} />}
            {/* {feedback && <FeedbackPopUp feedback={feedback} setFeedback={feedbackPopUpClose} />} */}
            <Popover className="menu_dropdown_wrapper"
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={closePopup}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                PaperProps={{ style: { minWidth: 275 } }}
            >
                <BoxContainerWrapper >
                    {/* <Box className="popover-close">
            <i
              className="fa fa-times-circle"
              onClick={closePopup}
              aria-hidden="true"
            ></i>
          </Box> */}
                    {/* <Box className="popover-username">{getUserInfo("name")}</Box> */}
                    <Box>
                        <ProfilePopoverBox className="menu_dropdown_input"
                            onClick={() => profilePopoverItemClick("/profile")}
                        >
                            <Box className="menu_dropdown_text">General Profile</Box>
                            <Box>
                                <i className="fa fa-chevron-right"></i>
                            </Box>
                        </ProfilePopoverBox>
                        <ProfilePopoverBox className="menu_dropdown_input"
                            onClick={() => profilePopoverItemClick("/aboutme")}
                        >
                            <Box className="menu_dropdown_text">Professional Profile</Box>
                            <Box>
                                <i className="fa fa-chevron-right"></i>
                            </Box>
                        </ProfilePopoverBox>
                        <ProfilePopoverBox className="menu_dropdown_input"

                            onClick={() => profilePopoverItemClick("logout")}
                        >
                            <Box className="menu_dropdown_text">Logout</Box>
                        </ProfilePopoverBox>
                    </Box>
                </BoxContainerWrapper>
            </Popover>
        </NavBarSection >
    );
};
NavBar.propTypes = {
    /* List of items which needs to be in Menu*/
    menuItems: PropTypes.array,
};
export default withRouter(NavBar);
