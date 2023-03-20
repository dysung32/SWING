import React, { useState } from 'react';

import { ModalBackground, ModalBody } from '../styles/CommonEmotion';

function ModalBasic(props) {
  return (
    <>
      <ModalBackground>
        <ModalBody>{props.children}</ModalBody>
      </ModalBackground>
    </>
  );
}

export default ModalBasic;
