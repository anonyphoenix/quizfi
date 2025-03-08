'use client'
import { FC, ReactNode } from 'react';
import { OCConnect } from '@opencampus/ocid-connect-js';

interface OCIDProviderProps {
  children: ReactNode;
  opts: any;
  sandboxMode: boolean;
}

const OCConnectWrapper: FC<OCIDProviderProps> = ({ children, opts, sandboxMode }) => (
  <OCConnect opts={opts} sandboxMode={sandboxMode}>
    {children}
  </OCConnect>
);

export default OCConnectWrapper;
