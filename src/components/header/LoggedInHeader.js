import React, { useRef, useState } from 'react';
import { HeaderBannerContainerWrapper } from './HeaderBanner.styles';
import PropType from 'prop-types';
import LottieGifHeader from "src/assets/images/lottie_gifs/ripple-zen-3.gif";
import { BrowserDetect, OSDetect } from '../../common/commonFunction';

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
      setImage(LottieGif.src)
    } else {
      import("@lottiefiles/lottie-player");
    }
  }, [OS, browser])

  return (
    <HeaderBannerContainerWrapper className="login_after_banner">
      <div className="how-it-works-mobile">{props.bannerTitle}</div>
      {(browser === "safari" || OS === "MacOS") ?
        <img class="TAM-Hero TAM-Hero-login safari-img" onClick={() => window.location.href = "#find-right-tools"} src={LottieGif} alt={props.bannerTitle} />
        :
        <lottie-player
          id="firstLottie"
          ref={ref}
          autoplay
          loop
          mode="normal"
          src="https://assets1.lottiefiles.com/packages/lf20_2qb91az8.json"
          class="TAM-Hero TAM-Hero-login"
        ></lottie-player>
      }

    </HeaderBannerContainerWrapper>
  );
};

HeaderBanner.propTypes = {
  bannerImagePath: PropType.string.isRequired,
  bannerTitle: PropType.string.isRequired,
  bannerCarouselData: PropType.array.isRequired,
};

export default HeaderBanner;
