import React, { ReactNode } from 'react';

type ModalWrapperProps = {
  children: ReactNode;
  openModal: boolean;
};

const ModalWrapper = ({ children, openModal }: ModalWrapperProps) => {
  React.useEffect(() => {
    const body = document.body;
    if (openModal) {
      body.classList.add('no-scroll');
    } else {
      body.classList.remove('no-scroll');
    }
    return () => {
      body.classList.remove('no-scroll');
    };
  }, [openModal]);

  return <>{children}</>;
};

export default ModalWrapper;
