import PropTypes from "prop-types";
import Modal from "react-modal";
import classes from "./CustomModal.module.scss";

const CustomReactModal = (props) => {
  const {
    children,
    id,
    testId,
    contentLabel,
    isOpen,
    onRequestClose,
    onAfterOpen,
  } = props;

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(51, 51, 51, 0.28)",
      zIndex: "99",
    },
    content: {
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translateX(-50%)",
      borderRadius: "0.75rem",
      paddingTop: "1rem",
      width: "80%",
      maxWidth: "576px",
    },
  };

  Modal.setAppElement("#root");

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel={contentLabel}
      id={id}
      testId={testId}
      role="dialog"
    >
      <div className={classes.CustomReactModal}>
        <button
          className={classes.CustomReactModal__Close}
          type="button"
          onClick={onRequestClose}
          title="close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-close"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        {children}
      </div>
    </Modal>
  );
};

CustomReactModal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.element,
  ]),
  id: PropTypes.string,
  testId: PropTypes.string,
  contentLabel: PropTypes.string,
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  onAfterOpen: PropTypes.func,
};

export default CustomReactModal;
