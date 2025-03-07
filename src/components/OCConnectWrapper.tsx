'use client'

import { OCConnect } from '@opencampus/ocid-connect-js';



export default function OCConnectWrapper({ children, opts, sandboxMode }: any) {
  return (
    <OCConnect opts={opts} sandboxMode={sandboxMode}>
      {children}
    </OCConnect>
  );
}