"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[287],{30451:function(e,t,n){n.r(t),n.d(t,{SIWEController:function(){return p},W3mConnectingSiwe:function(){return y},W3mConnectingSiweView:function(){return _},createSIWEConfig:function(){return b},formatMessage:function(){return o.wvx},getAddressFromMessage:function(){return u},getChainIdFromMessage:function(){return g},getDidAddress:function(){return o.NmC},getDidChainId:function(){return o.ZzI},verifySignature:function(){return d}});var i=n(85014),s=n(28966);let r={FIVE_MINUTES_IN_MS:3e5};class a{constructor(e){let{enabled:t=!0,nonceRefetchIntervalMs:n=r.FIVE_MINUTES_IN_MS,sessionRefetchIntervalMs:i=r.FIVE_MINUTES_IN_MS,signOutOnAccountChange:s=!0,signOutOnDisconnect:a=!0,signOutOnNetworkChange:o=!0,...c}=e;this.options={enabled:t,nonceRefetchIntervalMs:n,sessionRefetchIntervalMs:i,signOutOnDisconnect:a,signOutOnAccountChange:s,signOutOnNetworkChange:o},this.methods=c}async getNonce(e){let t=await this.methods.getNonce(e);if(!t)throw Error("siweControllerClient:getNonce - nonce is undefined");return t}async getMessageParams(){let e=await this.methods.getMessageParams();return e||{}}createMessage(e){let t=this.methods.createMessage(e);if(!t)throw Error("siweControllerClient:createMessage - message is undefined");return t}async verifyMessage(e){let t=await this.methods.verifyMessage(e);return t}async getSession(){let e=await this.methods.getSession();if(!e)throw Error("siweControllerClient:getSession - session is undefined");return e}async signIn(){let e=i.Ni.state.address,t=await this.methods.getNonce(e);if(!e)throw Error("An address is required to create a SIWE message.");let n=s.p1.caipNetworkIdToNumber(i.fB.state.caipNetwork?.id);if(!n)throw Error("A chainId is required to create a SIWE message.");let r=await this.getMessageParams(),a=this.methods.createMessage({address:`eip155:${n}:${e}`,chainId:n,nonce:t,version:"1",iat:r.iat||new Date().toISOString(),...r}),o=i.MO.getConnectedConnector();"AUTH"===o&&i.Pc.pushTransactionStack({view:null,goBack:!1,replace:!0,onCancel(){i.Pc.replace("ConnectingSiwe")}});let c=await i.lZ.signMessage(a),l=await this.methods.verifyMessage({message:a,signature:c});if(!l)throw Error("Error verifying SIWE signature");let u=await this.methods.getSession();if(!u)throw Error("Error verifying SIWE signature");return this.methods.onSignIn&&this.methods.onSignIn(u),i._4.navigateAfterNetworkSwitch(),u}async signOut(){return this.methods.onSignOut?.(),this.methods.signOut()}}var o=n(20115);let c=/0x[a-fA-F0-9]{40}/u,l=/Chain ID: (?<temp1>\d+)/u;function u(e){return e.match(c)?.[0]||""}function g(e){return`eip155:${e.match(l)?.[1]||1}`}async function d({address:e,message:t,signature:n,chainId:i,projectId:s}){let r=(0,o.fJv)(e,t,n);return r||(r=await (0,o.V3z)(e,t,n,i,s)),r}var h=n(22328),f=n(94301);let w=(0,f.sj)({status:"uninitialized"}),p={state:w,subscribeKey:(e,t)=>(0,h.VW)(w,e,t),subscribe:e=>(0,f.Ld)(w,()=>e(w)),_getClient(){if(!w._client)throw Error("SIWEController client not set");return w._client},async getNonce(e){let t=this._getClient(),n=await t.getNonce(e);return this.setNonce(n),n},async getSession(){try{let e=this._getClient(),t=await e.getSession();return t&&(this.setSession(t),this.setStatus("success")),t}catch{return}},createMessage(e){let t=this._getClient(),n=t.createMessage(e);return this.setMessage(n),n},async verifyMessage(e){let t=this._getClient(),n=await t.verifyMessage(e);return n},async signIn(){let e=this._getClient(),t=await e.signIn();return t},async signOut(){let e=this._getClient();await e.signOut(),this.setStatus("ready"),this.setSession(void 0),e.onSignOut?.()},onSignIn(e){let t=this._getClient();t.onSignIn?.(e)},onSignOut(){let e=this._getClient();e.onSignOut?.()},setSIWEClient(e){w._client=(0,f.iH)(e),w.status="ready",i.hD.setIsSiweEnabled(e.options.enabled)},setNonce(e){w.nonce=e},setStatus(e){w.status=e},setMessage(e){w.message=e},setSession(e){w.session=e,w.status=e?"success":"ready"}};var S=n(70169),m=n(12937),C=m.iv`
  :host {
    display: flex;
    justify-content: center;
    gap: var(--wui-spacing-2xl);
  }

  wui-visual-thumbnail:nth-child(1) {
    z-index: 1;
  }
`;let y=class extends m.oi{constructor(){super(...arguments),this.dappImageUrl=i.hD.state.metadata?.icons,this.walletImageUrl=i.MO.getConnectedWalletImageUrl()}firstUpdated(){let e=this.shadowRoot?.querySelectorAll("wui-visual-thumbnail");e?.[0]&&this.createAnimation(e[0],"translate(18px)"),e?.[1]&&this.createAnimation(e[1],"translate(-18px)")}render(){return m.dy`
      <wui-visual-thumbnail
        ?borderRadiusFull=${!0}
        .imageSrc=${this.dappImageUrl?.[0]}
      ></wui-visual-thumbnail>
      <wui-visual-thumbnail .imageSrc=${this.walletImageUrl}></wui-visual-thumbnail>
    `}createAnimation(e,t){e.animate([{transform:"translateX(0px)"},{transform:t}],{duration:1600,easing:"cubic-bezier(0.56, 0, 0.48, 1)",direction:"alternate",iterations:1/0})}};y.styles=C,y=function(e,t,n,i){var s,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,i);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(a=(r<3?s(a):r>3?s(t,n,a):s(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a}([(0,S.customElement)("w3m-connecting-siwe")],y);var E=n(15376),v=n(99540),I=function(e,t,n,i){var s,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,i);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(a=(r<3?s(a):r>3?s(t,n,a):s(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a};let _=class extends m.oi{constructor(){super(...arguments),this.dappName=i.hD.state.metadata?.name,this.isSigning=!1}render(){return this.onRender(),m.dy`
      <wui-flex justifyContent="center" .padding=${["2xl","0","xxl","0"]}>
        <w3m-connecting-siwe></w3m-connecting-siwe>
      </wui-flex>
      <wui-flex
        .padding=${["0","4xl","l","4xl"]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="paragraph-500" align="center" color="fg-100"
          >${this.dappName??"Dapp"} needs to connect to your wallet</wui-text
        >
      </wui-flex>
      <wui-flex
        .padding=${["0","3xl","l","3xl"]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="small-400" align="center" color="fg-200"
          >Sign this message to prove you own this wallet and proceed. Canceling will disconnect
          you.</wui-text
        >
      </wui-flex>
      <wui-flex .padding=${["l","xl","xl","xl"]} gap="s" justifyContent="space-between">
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="neutral"
          @click=${this.onCancel.bind(this)}
          data-testid="w3m-connecting-siwe-cancel"
        >
          Cancel
        </wui-button>
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="main"
          @click=${this.onSign.bind(this)}
          ?loading=${this.isSigning}
          data-testid="w3m-connecting-siwe-sign"
        >
          ${this.isSigning?"Signing...":"Sign"}
        </wui-button>
      </wui-flex>
    `}onRender(){p.state.session&&i.IN.close()}async onSign(){this.isSigning=!0,i.Xs.sendEvent({event:"CLICK_SIGN_SIWE_MESSAGE",type:"track",properties:{network:i.fB.state.caipNetwork?.id||"",isSmartAccount:i.Ni.state.preferredAccountType===v.y_.ACCOUNT_TYPES.SMART_ACCOUNT}});try{p.setStatus("loading");let e=await p.signIn();return p.setStatus("success"),i.Xs.sendEvent({event:"SIWE_AUTH_SUCCESS",type:"track",properties:{network:i.fB.state.caipNetwork?.id||"",isSmartAccount:i.Ni.state.preferredAccountType===v.y_.ACCOUNT_TYPES.SMART_ACCOUNT}}),e}catch(n){let e=i.Ni.state.preferredAccountType,t=e===v.y_.ACCOUNT_TYPES.SMART_ACCOUNT;return t?i.KC.showError("This application might not support Smart Accounts"):i.KC.showError("Signature declined"),p.setStatus("error"),i.Xs.sendEvent({event:"SIWE_AUTH_ERROR",type:"track",properties:{network:i.fB.state.caipNetwork?.id||"",isSmartAccount:t}})}finally{this.isSigning=!1}}async onCancel(){let e=i.Ni.state.isConnected;e?(await i.lZ.disconnect(),i.IN.close()):i.Pc.push("Connect"),i.Xs.sendEvent({event:"CLICK_CANCEL_SIWE",type:"track",properties:{network:i.fB.state.caipNetwork?.id||"",isSmartAccount:i.Ni.state.preferredAccountType===v.y_.ACCOUNT_TYPES.SMART_ACCOUNT}})}};function b(e){return new a(e)}I([(0,E.SB)()],_.prototype,"isSigning",void 0),_=I([(0,S.customElement)("w3m-connecting-siwe-view")],_)},3749:function(e,t,n){var i=n(64826);function s(e,t,n,i){return{name:e,prefix:t,encoder:{name:e,prefix:t,encode:n},decoder:{decode:i}}}s("utf8","u",e=>{let t=new TextDecoder("utf8");return"u"+t.decode(e)},e=>{let t=new TextEncoder;return t.encode(e.substring(1))}),s("ascii","a",e=>{let t="a";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return t},e=>{e=e.substring(1);let t=function(e=0){if(null!=globalThis.Buffer&&null!=globalThis.Buffer.allocUnsafe){var t;return t=globalThis.Buffer.allocUnsafe(e),null!=globalThis.Buffer?new Uint8Array(t.buffer,t.byteOffset,t.byteLength):t}return new Uint8Array(e)}(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}),i.gh.base16,i.gh}}]);