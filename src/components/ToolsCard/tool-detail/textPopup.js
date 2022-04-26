import React, { useContext, useState } from 'react';
// import { Box } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
// import { AnswerNormalText, } from "app/features/faqs/FAQPage.styles"
// import popup_close from 'app/shared/assets/images/popup_close.svg';
import { userAuthenticationValidate } from 'app/shared/Utils/index';
import { useHistory } from "react-router-dom";
import { AppStoreContext } from 'app/shared/store/AppStoreProvider';
import { ROUTES } from "app/Routes";
// import { CancelButton } from "app/tamComponents/ToolsCard/tool-detail/tool-rating/style"
import { ProblemSolvingPopup } from 'app/features/ProblemSolving/style';

const TextPopUp = (props) => {
  const [scroll] = React.useState('paper');
  const auth = userAuthenticationValidate();
  const history = useHistory();
  const [open, setOpen] = useState(true);
  const { setModal } = useContext(AppStoreContext);

  const handleClose = () => {
    // console.log(".... redirect");
    if (auth === false) {
      setOpen(false);
      setModal({ modalId: 1, data: { toolId: props.toolId }, onClose: () => { history.push(ROUTES.tools); window.scroll({ top: 0, behavior: 'smooth' }); } });
      window.scroll({ top: 0, behavior: 'smooth' });
    }
    // history.push(ROUTES.tools);
  };

  const descriptionElementRef = React.useRef(null);

  // console.log("link", props.link);

  return (
    <div>
      <Dialog className="problem_solving_popup"
        open={open}

        // onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <ProblemSolvingPopup className="popup_card">
              <span className="popup_text">You can not use this tool without login, please register or login.</span><br />
              <div className="popup_text_btn">
                <div className="popup_btn" role="button" onClick={() => { history.push(ROUTES.tools); }}>Back to tools</div>
                <div className="popup_btn popup_btn_yes" role="button" aria-label="login" onClick={() => {
                  handleClose()
                }} >Login</div>
              </div>
            </ProblemSolvingPopup>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div >
  );
}

export default TextPopUp;