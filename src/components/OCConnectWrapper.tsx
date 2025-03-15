'use client'

import { ReactNode } from 'react';
import { OCConnect } from '@opencampus/ocid-connect-js';

interface OCConnectProps {
  children: ReactNode;
  opts: any;
  sandboxMode: boolean;
}

export default function OCConnectWrapper({ children, opts, sandboxMode }: OCConnectProps) {
  return (
    <OCConnect opts={opts} sandboxMode={sandboxMode}>
      {children}
    </OCConnect>
  );
}