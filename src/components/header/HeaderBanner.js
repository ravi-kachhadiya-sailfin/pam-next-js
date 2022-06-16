import React, { useRef, useState } from 'react';
import { HeaderBannerContainerWrapper } from './HeaderBanner.styles';
import PropType from 'prop-types';
import Carousel from '../carousel';
import { BrowserDetect, OSDetect } from 'src/common/commonFunction';
import LottieGifHeadPhone from "src/assets/images/lottie_gifs/headphone-illustration.gif";
// import LottieGif from "app/shared/assets/images/lottie_gifs/headphone-illustration.gif";
// import LottieGif from "app/shared/assets/images/lottie_gifs/headphone-illustration-0.png";
// import "../../shared/assets/css/owl.carousel.min.css";
// import "../../shared/assets/css/owl.theme.min.css";
// import "../../shared/assets/css/testimonialSlider.css";

/*Header Banner which have Banner and title for the entire app.
 *
 */
const HeaderBanner = (props) => {
  const ref = useRef(null);
  const [LottieGif, setImage] = useState()
  const [browser, setBrowser] = useState();
  const [OS, setOS] = useState();

  React.useEffect(() => {
    const tempBrowser = BrowserDetect();
    const tempOS = OSDetect();
    setBrowser(tempBrowser);
    setBrowser(tempOS);

    if (browser === "safari" || OS === "MacOS") {
      setImage(LottieGifHeadPhone.src);
    } else {
      import("@lottiefiles/lottie-player");
    }
  }, [OS, browser])


  // console.log("os", OS);

  return (
    <HeaderBannerContainerWrapper>

      <div className="how-it-works-mobile" onClick={() => window.location.href = "#find-right-tools"}>{props.bannerTitle}</div>
      {(browser === "safari" || OS === "MacOS") ?
        <img className="TAM-Hero safari-img" onClick={() => window.location.href = "#find-right-tools"} src={LottieGif} alt={props.bannerTitle} />
        : <lottie-player
          id="firstLottie"
          ref={ref}
          autoplay
          loop
          mode="normal"
          renderer="svg"
          src="https://assets1.lottiefiles.com/packages/lf20_aaodbj8k/STN-TAM-Hero graphic animation/TAM-hero graphic.json"
          className="TAM-Hero"
          onClick={() => window.location.href = "#find-right-tools"}
        ></lottie-player>
      }
      <div className="banner-theme">
        <div className="how-it-works-desktop" onClick={() => window.location.href = "#find-right-tools"}>{props.bannerTitle}</div>
        <Carousel textAlign="right" interval={6000} className="home-banner-slider">
          {!!props.bannerCarouselData && props.bannerCarouselData.map((element, i) => (
            <div className="banner-container" key={element.title + i}>
              <div className="banner-sub-title">{element.title} </div>
              <div className="banner-tag-line">{element.line}</div>
            </div>
          ))}
        </Carousel>
      </div>
    </HeaderBannerContainerWrapper>
  );
};

HeaderBanner.propTypes = {
  bannerTitle: PropType.string.isRequired,
  bannerCarouselData: PropType.array.isRequired,
};

export default HeaderBanner;
