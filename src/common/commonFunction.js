import PlaceHolderImage from "../assets/images/placeholder_logo.png";
import logo from '../assets/images/logos/logo1.svg';

export const adminAuthenticationToken = () => {
    const HEADERS =
        localStorage.getItem('adminToken') != null
            ? 'Bearer ' + JSON.parse(localStorage.getItem('adminToken'))['accessToken']
            : null;

    return HEADERS;
}

export const userAuthenticationToken = () => {
    const HEADERS =
        (localStorage.getItem('token') != null && JSON.parse(localStorage.getItem('token'))['accessToken'])
            ? 'Bearer ' + JSON.parse(localStorage.getItem('token'))['accessToken'] || ""
            : "";

    return HEADERS;
}

export const getSessionId = () => {
    let sessionId = localStorage.getItem('sessionId') || "";
    sessionId = userAuthenticationValidate() ? "" : sessionId;

    return sessionId;
}

export const userAuthenticationValidate = () => {
    const HEADERS =
        localStorage.getItem('token') != null
            ? 'Bearer ' + JSON.parse(localStorage.getItem('token'))['accessToken']
            : null;

    let USER = localStorage.getItem('user') != null
        ? JSON.parse(localStorage.getItem('user')) : null;

    if (USER && USER?.id && USER?.email && USER?.name && USER?.createdAt) {
        USER = true
    }
    else {
        USER = false
    }
    return (HEADERS && USER) ? true : false;
}

export const logOut = () => {
    // console.log("dsf");
    // debugger
    const sessionId = localStorage.getItem("lastSessionId");
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem("sessionId", sessionId);
    window.location.replace("/");
    window.scroll({ top: 0, behavior: 'smooth' });
};

export const makeURL = (cardData, origin, id, ROUTES) => {
    if (cardData.slug === "flexible-thinking") {
        return origin + ROUTES.flexi + "/" + id;
    } else if (cardData.slug === "find-a-solution") {
        return origin + ROUTES.probsolve + "/" + id;
    } else if (cardData.slug === "fill-your-bucket") {
        return origin + ROUTES.fillbucket + "/" + id;
    } else if (cardData.slug === "stop-second-guessing-yourself") {
        return origin + ROUTES.hindsightBias + "/" + id;
    } else if (cardData.slug === "gratitude") {
        return origin + ROUTES.gratitude + "/" + id;
    } else if (cardData.slug === "shift-positive") {
        return origin + ROUTES.shift_positive + "/" + id;
    } else {
        return origin + ROUTES.tool_detail + "/" + id;
    }
};

export const navigateToDetail = (cardData, history, id, ROUTES) => {
    if (cardData.slug === "flexible-thinking") {
        history.push({ pathname: ROUTES.flexi, state: { id: id } });
    } else if (cardData.slug === "find-a-solution") {
        history.push({ pathname: ROUTES.probsolve, state: { id: id } });
    } else if (cardData.slug === "fill-your-bucket") {
        history.push({ pathname: ROUTES.fillbucket, state: { id: id } });
    } else if (cardData.slug === "stop-second-guessing-yourself") {
        history.push({ pathname: ROUTES.hindsightBias, state: { id: id } });
    } else if (cardData.slug === "gratitude") {
        history.push({ pathname: ROUTES.gratitude, state: { id: id } });
    } else if (cardData.slug === "shift-positive") {
        history.push({ pathname: ROUTES.shift_positive, state: { id: id } });
    } else {
        history.push({ pathname: ROUTES.tool_detail, state: { id: id } });
    }

    window.scroll({ top: 0, behavior: 'smooth' });
};

export const userAuth = () => {
    if (localStorage.getItem('user') && localStorage.getItem('token')) {
        return true
    }

    return false;
}

export const defaultMetaData = {
    title: "Pause A Moment",
    description: "The COVID-19 pandemic has taken a toll. Pause a moment to focus on your well-being.",
    image: logo,
    url: global?.location?.href,
    keywords: "mental health, mood, burnout, anxiety, stress, PTSD, Depression, trauma, cbt, cognitive behavioral therapy, COVID, healthcare worker, meditation, visualization, relaxation, problem solving, breathing, behavioral activation, behavior activation, positive psychology, activity scheduling, cognitive bias, loving kindness, treatment resistant depression, compassion, self-compassion, rumination, hindsight bias, second guess, reappraisal, gratitude",
}

export const getWATrakingID = () => {
    return window.REACT_APP_ANALYTICS_TRACKING_ID;
}

export const convertToStringItems = (item) => {
    if (typeof item == 'object') {
        Object.keys(item).forEach((i) => {
            if (item[i] != null && item[i] !== undefined && typeof item[i] != 'object') item[i] = item[i].toString();
            return 0;
        });
    }

    return item;
};

export const imagePlaceholder = (e) => {
    e.target.src = PlaceHolderImage;
}

export const getDeviceSize = () => {
    let breakpoints = {
        '(min-width: 1200px)': 'xl',
        '(min-width: 992px) and (max-width: 1199.98px)': 'lg',
        '(min-width: 768px) and (max-width: 991.98px)': 'md',
        '(min-width: 576px) and (max-width: 767.98px)': 'sm',
        '(max-width: 575.98px)': 'xs',
    };

    for (let media in breakpoints) {
        if (window.matchMedia(media).matches) {
            return breakpoints[media];
        }
    }

    return null;
};

export const handleOpen = () => {
    setTimeout(() => {
        document.body.style.removeProperty('overflow');
        var temp = document.body.style.cssText;
        temp = temp + "overflow:hidden !important;";
        document.body.style.cssText = temp;
    }, 100);
    // console.log("open body css:", document.body.style.cssText)
}

export const handleClose = () => {
    setTimeout(() => {
        document.body.style.removeProperty('overflow');
        var temp = document.body.style.cssText;
        temp = temp + "overflow:auto !important;";
        document.body.style.cssText = temp;
    }, 100);
}

export function BrowserDetect() {

    const userAgent = navigator.userAgent;
    let browserName;

    if (userAgent.match(/chrome|chromium|crios/i)) {
        browserName = "chrome";
    } else if (userAgent.match(/firefox|fxios/i)) {
        browserName = "firefox";
    } else if (userAgent.match(/safari/i)) {
        browserName = "safari";
    } else if (userAgent.match(/opr\//i)) {
        browserName = "opera";
    } else if (userAgent.match(/edg/i)) {
        browserName = "edge";
    } else {
        browserName = "No browser detection";
    }

    return browserName;
}

export function OSDetect() {

    let OS;

    if (navigator.appVersion.indexOf("Win") !== -1)
        OS = "Windows OS";
    else if (navigator.appVersion.indexOf("Mac") !== -1)
        OS = "MacOS";
    else if (navigator.appVersion.indexOf("X11") !== -1)
        OS = "UNIX OS";
    else if (navigator.appVersion.indexOf("Linux") !== -1)
        OS = "Linux OS";

    return OS;
}

// console.log("close body css:", document.body.style.cssText)

export const convertTestimonialArray = (items, tabletMode = true, size = 2) => {

    if (items === null) {
        return null;
    }

    const deviceCode = getDeviceSize();
    let concurrentTestimonialSize = 1;

    if (tabletMode) {
        concurrentTestimonialSize = ['md', 'sm', 'xs'].indexOf(deviceCode) > -1 ? 1 : size
    }
    else {
        concurrentTestimonialSize = ['sm', 'xs'].indexOf(deviceCode) > -1 ? 1 : size
    }

    const finalTestimonialArr = [];

    for (let i = 0; i < items.length; i++) {
        let newIndex = i + (concurrentTestimonialSize - 1) >= items.length ? null : i + (concurrentTestimonialSize - 1);
        const tmpTestimonialContainer = [];

        if (newIndex !== null) {
            for (let innerI = i; innerI <= newIndex; innerI++) {
                tmpTestimonialContainer.push(items[innerI]);
            }
            i = newIndex;
        } else {
            for (let innerI = i; innerI < items.length; innerI++) {
                tmpTestimonialContainer.push(items[innerI]);
                i = innerI;
            }
        }
        finalTestimonialArr.push({ Items: tmpTestimonialContainer });
    }

    return finalTestimonialArr;
};

export const scrollTop = () => {
    document.documentElement.scrollTop = 0;
}