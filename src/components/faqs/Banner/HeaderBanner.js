import React, { useRef, useState } from 'react';
import { HeaderSection, HeaderBannerContainerWrapper } from './HeaderBanner.styles';
// import headerImg from 'app/shared/assets/images/FAQs.png';
import headerBgImg from 'app/shared/assets/images/FAQs Light bg.png';

import { BrowserDetect, OSDetect } from 'app/shared/Utils/index';
// import LottieGif from "app/shared/assets/images/lottie_gifs/FAQ_header.gif";
// import faqBgImg from 'app/shared/assets/images/faq-shape.svg';

// import "../../shared/assets/css/owl.carousel.min.css";
// import "../../shared/assets/css/owl.theme.min.css";
// import "../../shared/assets/css/testimonialSlider.css";

/*Header Banner which have Banner and title for the entire app.
 *
 */
const HeaderBanner = (props) => {
  const ref = useRef(null);
  const [LottieGif, setImage] = useState()
  const [browser] = useState(BrowserDetect());
  const [OS] = useState(OSDetect());

  React.useEffect(() => {
    if (browser === "safari" || OS === "MacOS") {
      import("app/shared/assets/images/lottie_gifs/FAQ_header.gif").then((img) => setImage(img.default))
    } else {
      import("@lottiefiles/lottie-player");
    }
  }, [OS, browser])


  return (
    <HeaderSection>
      <HeaderBannerContainerWrapper>
        <div className="faq_banner">
          <div className="faq_banner_text">
            <div className="faq_main_text">FAQs</div>
            <div className="faq_text">
              Information about PAM and answers to common questions.
            </div>
          </div>
          <div className="faq_image">
            <img className="TAM-Hero_bg" alt="FAQs" src={headerBgImg} />
            {/* <img className="TAM-Hero" alt="FAQs" src={headerImg} /> */}
            <div className="TAM-Hero" >
              {(browser === "safari" || OS === "MacOS") ?
                <img className="TAM-Hero TAM-Hero-login safari-img-faq" src={LottieGif} alt={"faq"} />
                :
                <lottie-player
                  id="firstLottie"
                  ref={ref}
                  autoplay
                  loop
                  mode="normal"
                  src="https://assets1.lottiefiles.com/packages/lf20_2kmiqtdf.json"
                  class="TAM-Hero TAM-Hero-login"
                ></lottie-player>
              }
            </div>
          </div>
        </div>
      </HeaderBannerContainerWrapper>
    </HeaderSection >



    // <HeaderBannerContainerWrapper className="login_after_banner">
    //   <div className="how-it-works-mobile">{props.bannerTitle}</div>
    //   <lottie-player
    //     id="firstLottie"
    //     ref={ref}
    //     autoplay
    //     loop
    //     mode="normal"
    //     src="https://assets1.lottiefiles.com/packages/lf20_2kmiqtdf.json"
    //     class="TAM-Hero TAM-Hero-login"
    //   ></lottie-player>

    // </HeaderBannerContainerWrapper>
  );
};

export default HeaderBanner;
