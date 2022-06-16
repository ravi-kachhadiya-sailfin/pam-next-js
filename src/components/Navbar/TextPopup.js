import React from 'react';
import Image from 'next/image'
import { Box } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import { AnswerNormalText, } from "src/components/faqs/FAQPage.styles";
import { CancelButton } from "src/components/ToolsCard/tool-detail/tool-rating/style"

import popup_close from 'src/assets/images/popup_close.svg';

const TextPopUp = (props) => {
  const [scroll] = React.useState('paper');

  const handleClose = () => {
    props.setShowPopup(false);
  };

  const descriptionElementRef = React.useRef(null);

  // console.log("link", props.link);

  return (
    <div>
      <Dialog className="donate-card"
        open={true}
        style={{ maxWidth: "1018px !important" }}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent dividers={scroll === 'paper'} className="donate-text">
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Box textAlign="right" className="donate-img">
              <img onClick={() => { handleClose() }} src={popup_close.src} alt="popup close" />
              <CancelButton onClick={() => { handleClose() }}>
              </CancelButton>
            </Box>
            <div>
              <AnswerNormalText className="mb">
                You are connecting to a service that is not affiliated with Stanford University, Stanford Medicine, Stanford Healthcare or Pause A Moment (PAM). PAM will be here when you need us. We hope to see you back here soon. <a href={props.link} target={props.link} >Click here</a> to continue.
              </AnswerNormalText>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div >
  );
}

export default TextPopUp;