import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const TAMAlert = ({ kind, message, className, ...props }) => {
  return (
    <Alert className={className}
      severity={kind}
      style={{
        marginBottom: '1rem',
        marginTop: '2rem',
      }}
      action={
        props.onClose ? <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            if (props.onClose) {
              props.onClose();
            } else {
              return 0;
            }
          }}
        >
          <CloseIcon fontSize="medium" />
        </IconButton>
          : null
      }
    >
      <label className="alert-message" style={{ whiteSpace: 'pre-line' }}>{message}</label>
    </Alert>
  );
};

TAMAlert.propTypes = {
  kind: PropTypes.oneOfType(['success', 'error', 'info']),
  message: PropTypes.string,
};

export default TAMAlert;
