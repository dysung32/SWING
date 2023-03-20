import React, { useState } from 'react';

import { ModalBackground, ModalBody } from '../styles/CommonEmotion';

function ModalBasic(props) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <ModalBackground>
        <ModalBody>{props.children}</ModalBody>
      </ModalBackground>
    </>
  );
}

export default ModalBasic;
