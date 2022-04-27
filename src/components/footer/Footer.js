import React, { useState, lazy, Suspense } from "react";
import { useHistory } from "react-router-dom";
import Link from 'next/link'


import { FooterSectionWrapper, FooterImage } from "./Footer.styles";

import { ROUTES } from "../../Routes";

import logo1 from "src/assets/images/logos/logo1.svg";
import logo2 from "src/assets/images/logos/logo2.svg";

const FeedbackPopUp = lazy(() => import(/* webpackChunkName: "FeedbackPopUp" */ "../FeedbackPopup"));
// import FeedbackPopUp from "app/features/FeedbackPopup";


/*Standared footer with appropriate links
 *
 */
const Footer = (props) => {
  const [feedback, setFeedback] = useState(false);
  const history = useHistory();

  const scrollTop = () => {
    document.documentElement.scrollTop = 0;
  }

  const feedbackPopUpClose = (value) => {
    setFeedback(value);


    setTimeout(() => {
      scrollTop();
    }, [100])
  }


  return (
    <FooterSectionWrapper className={props.adminClassName}>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
            <FooterImage className="footer_logo" onClick={() => { history.push(ROUTES.default) }} src={logo1.src} alt="pam" height="100px" />
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 footer-link-menu">
            <div>
              <Link href={ROUTES.tools}>
                <a role="navigation" onClick={scrollTop} className="text-underline-hover">All Tools</a>
              </Link>
            </div>
            <div>
              <div className="feedback" role="link" onClick={() => { feedbackPopUpClose(true); }}>
                Feedback
              </div>
            </div>
            <div>
              <Link href={ROUTES.team}>
                <a onClick={scrollTop} role="navigation" className="text-underline-hover">About PAM</a>
              </Link>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
            <FooterImage className="footer_logo_stanford" src={logo2.src} alt="pam" height="60px" />
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 footer-link-menu standford_card">
            <div>
              <div>
                <a target="_blank" rel="noreferrer" href={"https://med.stanford.edu/ "} className="text-underline-hover">
                  Stanford Medicine
                </a>
              </div>
              <div>
                <a target="_blank" rel="noreferrer" href={"https://www.stanford.edu/"} className="text-underline-hover">Stanford University</a>
              </div>
              <div>
                <a target="_blank" rel="noreferrer" href={"https://www.stanford.edu/site/privacy/"} className="text-underline-hover">Stanford Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-line" style={{ borderTop: "1px solid #78E0FA" }}>
          <div className="col-md-6 col-xs-8 p-0 copy_right_text" style={{ color: "#78E0FA" }}>
            Copyright {new Date().getFullYear()}. Stanford University.
          </div>
          <div className="col-md-6 col-xs-4 text-right terms_text  p-0">
            <Link href={ROUTES.privacypolicy}>
              <a onClick={scrollTop} role="navigation" className="text-underline-hover">Privacy</a>
            </Link>
            <Link href={ROUTES.tnc}>
              <a onClick={scrollTop} role="navigation" className="mr-0 text-underline-hover">Terms of Use</a>
            </Link>
          </div>
        </div>
      </div >
      {feedback &&
        <Suspense fallback={<p> Loading...</p>}>
          <FeedbackPopUp feedback={feedback} setFeedback={feedbackPopUpClose} />
        </Suspense>
      }
    </FooterSectionWrapper >
  );
};

Footer.propTypes = {};

export default Footer;
