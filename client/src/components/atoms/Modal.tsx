import { Dialog, DialogTitle } from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";

interface ModalProps {
  title: string;
  modal: boolean;
  children: React.ReactNode;
}

const DialogContent = styled.div`
  padding: 1.5rem;
`;

function Modal({ title, modal, children }: ModalProps) {
  return (
    <Dialog
      open={modal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogTitle textAlign={'center'} id={title}>
          <FormattedMessage id={title} />
        </DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
