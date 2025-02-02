import { AccordionData } from "./component/accordion/util/accordionTypes";
declare const PERA_WALLET_CONNECT_MODAL_ID = "pera-wallet-connect-modal-wrapper";
declare const PERA_WALLET_REDIRECT_MODAL_ID = "pera-wallet-redirect-modal-wrapper";
/**
 * Creates a PeraWalletConnectModal instance and renders it on the DOM.
 *
 * @param {rejectPromise} rejectPromise - the reject callback of the PeraWalletConnect.connect method
 * @param {string} uri - uri to be passed to Pera Wallet via deeplink
 * @param {VoidFunction} closeCallback - callback to be called when user closes the modal
 * @returns {void}
 */
declare function openPeraWalletConnectModal(rejectPromise?: (error: any) => void): (uri: string, closeCallback: VoidFunction) => void;
/**
 * Creates a PeraWalletRedirectModal instance and renders it on the DOM.
 *
 * @returns {void}
 */
declare function openPeraWalletRedirectModal(): void;
/**
 * Removes the PeraWalletConnectModal from the DOM.
 * @returns {void}
 */
declare function removeModalWrapperFromDOM(modalId: string): void;
declare function getPeraConnectModalAccordionData(uri: string): AccordionData[];
export { getPeraConnectModalAccordionData };
export { PERA_WALLET_CONNECT_MODAL_ID, PERA_WALLET_REDIRECT_MODAL_ID, openPeraWalletConnectModal, openPeraWalletRedirectModal, removeModalWrapperFromDOM };
