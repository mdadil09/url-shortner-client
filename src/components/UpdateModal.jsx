/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Modal from "react-modal";
import close from "../assests/close.svg";

const customStyles = {
  content: {
    width: "400px",
    height: "auto",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "16px",
    background: "var(--light-gohan, #FFF)",
    boxShadow:
      "0px 0px 1px 0px rgba(0, 0, 0, 0.20), 0px 0px 32px -8px rgba(0, 0, 0, 0.12), 0px 32px 32px -8px rgba(0, 0, 0, 0.08)",
  },
};

const UpdateModal = ({ modalIsOpen, setIsOpen, updateURL, url, setUrl }) => {
  const closeModal = (event) => {
    event.preventDefault();
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      portalClassName="modal"
    >
      <div className="modal-header">
        <div className="modal-header-text">Update Your Redirect URL</div>
        <button onClick={closeModal}>
          <img src={close} alt="close" />
        </button>
      </div>
      <div className="modal-content">
        <label htmlFor="">Enter New Redirect URL</label>
        <input
          type="text"
          placeholder="Enter New Redirect URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="modal-button" onClick={updateURL}>
          Update
        </button>
      </div>
    </Modal>
  );
};

export default UpdateModal;
