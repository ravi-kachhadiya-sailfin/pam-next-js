import React, { useState, useContext } from 'react';
import Image from 'next/image'
import { CardContent, CardMedia, Box, Card } from '@material-ui/core';
import calendarCheckedImage from 'app/shared/assets/images/calendar_icon.svg';
import cardImage from 'app/shared/assets/images/card.jpeg';
import heartOutlinedImage from 'app/shared/assets/images/empty_heart.svg';
import playIcon from 'app/shared/assets/images/playIcon.png';
import shareOutlinedImage from 'app/shared/assets/images/share.svg';
import StarRating from 'app/tamComponents/StarRating';
import ShareTool from 'app/tamComponents/shareTool';
import NormalTooltip from 'app/tamComponents/Tooltip';

import {
  CardDescription,
  CardPlayIcon,
  CardReadMore,
  CardSubTitle,
  CardSubTitleSubScript,
  CardTag,
  CardTags,
  CardTagTitle,
  CardTitle,
  ToolCardTime,
  ToolsModifiedCard,
  TagsWrapper,
} from './styles';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import {
  CardIconButton,
} from 'app/tamComponents/ToolsCard/tool-detail/style';

import { setFavouriteTool } from 'app/shared/services/toolServices';
import { userAuthenticationValidate, makeURL, navigateToDetail } from 'app/shared/Utils/index';
import { useHistory } from 'react-router';
import { AppStoreContext } from 'app/shared/store/AppStoreProvider';
import { ROUTES } from 'app/Routes';
import Reminder from 'app/tamComponents/reminder';
import { imagePlaceholder } from 'app/shared/Utils/index';

const ToolsCard = (props) => {
  const auth = userAuthenticationValidate();
  const history = useHistory();
  const { setModal } = useContext(AppStoreContext);
  const [scroll] = useState('paper');
  let cardData = props.cardData

  if (!!cardData.tool) {
    cardData = { ...cardData, ...cardData.tool }
    delete cardData.tool
  }
  const [toolID] = useState(cardData.id);
  const [rating] = useState(auth ? cardData.toolRating : 0);
  const [tags] = useState(cardData.toolTag ? cardData.toolTag?.length < 4 ? cardData.toolTag.map((ele) => ele.tag.name.split('').map((x, i) => i === 0 ? x.toUpperCase() : x).join('')).join(', ') : cardData.toolTag?.slice(0, 4).map((ele) => ele.tag.name.split('').map((x, i) => i === 0 ? x.toUpperCase() : x).join('')).join(', ') : []);
  const [isFavourite, setFavourite] = useState(auth ? cardData.favoriteTool : false);
  const [hasReminder, setHasReminder] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)

  const updateFav = () => {
    if (auth) {
      setFavouriteTool({ toolID });
      setFavourite(!isFavourite);
    } else {
      setModal({ modalId: 1, data: { redirect: 'tools', toolId: toolID } });

      setTimeout(() => {
        window.scroll({ top: 50, behavior: 'smooth' });
      }, 100)
    }
  };

  const summery = cardData.summary;
  const helpSummery = cardData.benefit;

  const openSharing = () => {
    if (auth) {
      setShareOpen(!shareOpen)
    } else {
      setModal({ modalId: 1, data: { redirect: 'tools', toolId: toolID } });

      setTimeout(() => {
        window.scroll({ top: 50, behavior: 'smooth' });
      }, 100)
    }
  }

  return (
    <>
      <ToolsModifiedCard id={props.id} className={`${shareOpen ? "share-overflow" : ""} cardContent`}>
        <div className="toolsTime">
          <CardTag>New</CardTag>
          {(cardData && (cardData.videoLink && cardData.videoLink !== "null")) &&
            <CardPlayIcon>
              <Image src={playIcon} onClick={() => navigateToDetail(cardData, history, cardData.id, ROUTES)} alt="play-icon" height="100%" width="100%" />
            </CardPlayIcon>
          }
          <CardMedia className="tool-img" component="img" alt={cardData.title || ""} onError={imagePlaceholder} image={cardData.thumbnailImage ? cardData.thumbnailImage : cardImage} onClick={() => navigateToDetail(cardData, history, cardData.id, ROUTES)} />
          <Box className="toolsCardTitle">
            <ToolCardTime className="T timeFont">{cardData.duration.replace(" ", "").replace(" ", "") + " mins"}</ToolCardTime>
          </Box>
        </div>
        <CardContent className="card-content">
          <Box className="tool-description">
            <CardTitle onClick={() => navigateToDetail(cardData, history, cardData.id, ROUTES)} role="navigation" className="cursor-p">
              {cardData.title.trim()}
            </CardTitle>
            <CardDescription>{summery}</CardDescription>
            <CardReadMore onClick={() => navigateToDetail(cardData, history, cardData.id, ROUTES)} role="navigation">more...</CardReadMore>
          </Box>

          <Box className="tool-speciality">
            <CardSubTitle>This tool may help to</CardSubTitle>
            <CardSubTitleSubScript>{helpSummery}</CardSubTitleSubScript>
          </Box>

          <TagsWrapper>
            <CardTagTitle>Tags</CardTagTitle>
            <CardTags>{tags}</CardTags>

            <Box container className="tags">
              <Box item>

                <StarRating
                  size="large"
                  defaultValue={rating}
                  name={props.id}
                  disabled={true}
                  disabledFrom="toolsCard"
                  className={`mt-12 card-star-rating ${props.className}`}
                />
              </Box>
              <Box item className="share-tool">
                <NormalTooltip title="Share">
                  <CardIconButton aria-label="share a tool" onClick={() => { openSharing() }} className={`tool-card ${props.className}`}>
                    <Image src={shareOutlinedImage} className="share-icon" alt="Share icon" height="28" />
                  </CardIconButton>
                </NormalTooltip>

                <NormalTooltip title="Calendar">
                  <CardIconButton className={`tool-card ${props.className}`} aria-label="calendar" onClick={() => { setHasReminder(!hasReminder) }}>
                    <Image src={calendarCheckedImage} className="calendar-icon" alt="calendar icon" height="28" />
                  </CardIconButton>
                </NormalTooltip>

                <NormalTooltip title="Favorite">
                  <CardIconButton className={`tool-card ${props.className}`} aria-label="favorite" onClick={() => updateFav()}>
                    {isFavourite === false ? (
                      <Image src={heartOutlinedImage} alt="favorite icon" className="heart-icon" height="28" />
                    ) : (
                      <i className="fa fa-heart favorite-icon"></i>
                    )}
                  </CardIconButton>
                </NormalTooltip>

              </Box>
              {shareOpen && <Card className="share-main-wrapper" onClick={openSharing}>
                <Card onClick={openSharing}>
                  <ShareTool
                    onClose={openSharing}
                    toolId={cardData.id}
                    title={cardData.title}
                    description={cardData.summary}
                    shareUrl={makeURL(cardData, window.location.origin, cardData.id, ROUTES)}
                    image={cardData.thumbnailImage}
                  />
                </Card>
              </Card>}
            </Box>
          </TagsWrapper>
        </CardContent>

        {hasReminder &&

          <Dialog className="donate-card"
            open={hasReminder}
            style={{ maxWidth: "1018px !important" }}
            onClose={() => { setHasReminder(false) }}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogContent dividers={scroll === 'paper'} className="donate-text">
              <DialogContentText
                id="scroll-dialog-description"
                tabIndex={-1}
              >
                <Reminder className="" closePopup={() => { setHasReminder(false) }} location={makeURL(cardData, window.location.origin, ROUTES)} title={'PAM - ' + cardData.title} discription={cardData.summary} />


              </DialogContentText>
            </DialogContent>
          </Dialog>
        }
      </ToolsModifiedCard>

    </>
  );
};

ToolsCard.propTypes = {};

export default ToolsCard;
