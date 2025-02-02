import { AppMeta } from "./peraWalletTypes";
declare function generatePeraWalletAppDeepLink(): string;
declare function getPeraWalletAppMeta(): AppMeta;
/**
 * @param {string} uri WalletConnect uri
 * @returns {string} Pera Wallet deeplink
 */
declare function generatePeraWalletConnectDeepLink(uri: string): string;
export { generatePeraWalletAppDeepLink, getPeraWalletAppMeta, generatePeraWalletConnectDeepLink };
