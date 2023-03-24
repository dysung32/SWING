import React, { useRef, useState } from 'react';

import { ModalBackground, ModalBody } from '../styles/CommonEmotion';

function ModalClosable(props) {
  const outSection = useRef();

  return (
    <>
      {props.modalShow ? (
        <ModalBackground
          ref={outSection}
          onClick={(e) => {
            if (outSection.current === e.target) {
              console.log('모달 외부공간 클릭!');
              props.setModalShow(false);
              props.setIsLock(false);
              props.setWrongCode(false);
            }
          }}
        >
          <ModalBody>{props.children}</ModalBody>
        </ModalBackground>
      ) : null}
    </>
  );
}

export default ModalClosable;
