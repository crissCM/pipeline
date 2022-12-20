import {Buffer as $bdjGp$Buffer} from "buffer";
import $bdjGp$randlabsmyalgoconnect from "@randlabs/myalgo-connect";
import $bdjGp$walletconnectclient, * as $bdjGp$walletconnectclient1 from "@walletconnect/client";
import $bdjGp$algorandwalletconnectqrcodemodal from "algorand-walletconnect-qrcode-modal";
import {formatJsonRpcRequest as $bdjGp$formatJsonRpcRequest} from "@json-rpc-tools/utils";
import $bdjGp$algosdk, * as $bdjGp$algosdk1 from "algosdk";
import "regenerator-runtime";
import $bdjGp$encryptwithpassword from "encrypt-with-password";
import {saveAs as $bdjGp$saveAs} from "file-saver";
import {formatJsonRpcRequest as $bdjGp$formatJsonRpcRequest1} from "@json-rpc-tools/utils/dist/cjs/format";
import * as $bdjGp$react from "react";
import * as $bdjGp$reactdom from "react-dom";
import {QRCode as $bdjGp$QRCode} from "react-qrcode-logo";






function $519670716f2f5d9f$export$2e2bcd8739ae039(params, args = {}) {
    let txn = {};
    let addr = args.creator;
    let note = args.note || "";
    let totalIssuance = args.amount || 1;
    let decimals = args.decimals !== undefined ? args.decimals : 6;
    let defaultFrozen = args.defaultFrozen || false;
    let manager = args.manager || undefined;
    let clawback = args.clawback || undefined;
    let reserve = args.reserve || undefined;
    let freeze = args.freeze || undefined;
    let assetName = args.assetName || "";
    let unitName = args.unitName || args.assetName;
    let assetURL = args.assetURL || undefined;
    let assetMetadataHash = args.assetMetadataHash || undefined;
    console.log("Preparing create ASA transaction...");
    txn = (0, $bdjGp$algosdk).makeAssetCreateTxn(addr, 1000, parseInt(params.firstRound), parseInt(params.lastRound), note, params.genesisHash, params.genesisID, totalIssuance, decimals, defaultFrozen, manager, reserve, freeze, clawback, unitName, assetName, assetURL, assetMetadataHash, undefined);
    return txn;
}


function $8f93b32a6c0e37c6$var$sleep(milliseconds) {
    return new Promise((resolve)=>setTimeout(resolve, milliseconds));
}
async function $8f93b32a6c0e37c6$export$ea2e6ca933693a38(txn, net, ref) {
    let data = undefined;
    let dataObj = undefined;
    let id = undefined;
    let url = "";
    await $8f93b32a6c0e37c6$var$sleep(15000);
    if (ref.EnableDeveloperAPI) url = ref.indexer;
    else if (!net) url = "https://algoindexer.testnet.algoexplorerapi.io";
    else url = "https://algoindexer.algoexplorerapi.io";
    data = await fetch(url + "/v2/transactions/" + txn);
    dataObj = await data.json();
    id = await dataObj.transaction["created-application-index"];
    return id;
}
function $8f93b32a6c0e37c6$export$9eb9df9ab63c5b26(text) {
    return Uint8Array.from(Array.from(text).map((letter)=>letter.charCodeAt(0)));
}
async function $8f93b32a6c0e37c6$export$3b51e524fb02f02d(net, index, ref) {
    let url = "";
    if (ref.EnableDeveloperAPI) url = ref.indexer;
    else if (!net) url = "https://algoindexer.testnet.algoexplorerapi.io";
    else url = "https://algoindexer.algoexplorerapi.io";
    let appData = await fetch(url + "/v2/applications/" + index);
    let appJSON = await appData.json();
    return appJSON.application.params["global-state"];
}
async function $8f93b32a6c0e37c6$export$d3d410a0cc430ae4(txn, net, ref) {
    let data = undefined;
    let dataObj = undefined;
    let id = undefined;
    let url = "";
    await $8f93b32a6c0e37c6$var$sleep(15000);
    if (ref.EnableDeveloperAPI) url = ref.indexer;
    else if (!net) url = "https://algoindexer.testnet.algoexplorerapi.io";
    else url = "https://algoindexer.algoexplorerapi.io";
    data = await fetch(url + "/v2/transactions/" + txn);
    dataObj = await data.json();
    id = await dataObj.transaction["created-asset-index"];
    return id;
}




async function $f9fadc54e6246fd9$export$541a25d3f1cfc0e0(main, api, ref) {
    let paramServer = "";
    let transServer = "";
    if (main) {
        paramServer = "https://node.algoexplorerapi.io/v2/transactions/params";
        transServer = "https://node.algoexplorerapi.io/v2/transactions";
    } else {
        paramServer = "https://node.testnet.algoexplorerapi.io/v2/transactions/params";
        transServer = "https://node.testnet.algoexplorerapi.io/v2/transactions";
    }
    if (api) {
        paramServer = ref.algod + "/v2/transactions/params";
        transServer = ref.algod + "/v2/transactions";
    }
    let fetchObject = {};
    if (api) fetchObject = {
        method: "GET",
        headers: {
            "X-Algo-API-Token": ref.token
        }
    };
    let params = await (await fetch(paramServer, fetchObject)).json();
    if (!main) {
        params.genesisID = "testnet-v1.0";
        params.genesisHash = "SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=";
    } else {
        params.genesisID = "mainnet-v1.0";
        params.genesisHash = "wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=";
    }
    if (api) {
        params.genesisID = ref.devGenId;
        params.genesisHash = ref.devGenHash;
    }
    params.firstRound = params["last-round"];
    params.lastRound = params["last-round"] + 1000;
    return {
        paramServer: paramServer,
        tranServer: transServer,
        params: params
    };
}
function $f9fadc54e6246fd9$export$af2f4f7298579991(main, api, ref) {
    let indexerURL = "";
    if (main) indexerURL = "https://algoindexer.algoexplorerapi.io";
    else indexerURL = "https://algoindexer.testnet.algoexplorerapi.io";
    if (api) indexerURL = ref.indexer;
    return indexerURL;
}
async function $f9fadc54e6246fd9$export$ac97a2973783b050(txns, transServer, api = false, token = "", alerts) {
    let requestHeaders = {
        "Content-Type": "application/x-binary"
    };
    if (api) requestHeaders = {
        "X-Algo-API-Token": token
    };
    let transactionID = await fetch(transServer, {
        method: "POST",
        headers: requestHeaders,
        body: txns
    }).then((response)=>response.json()).then((data)=>{
        if (data.txId !== undefined) return data.txId;
        else if (data.message !== undefined) {
            if (alerts) alert(data.message);
            return undefined;
        }
    }).catch((error)=>{
        console.error("Error:", error);
    });
    return transactionID;
}
function $f9fadc54e6246fd9$export$9c012f479970d716(ref) {
    let algodClient = "";
    if (ref.EnableDeveloperAPI) algodClient = new (0, $bdjGp$algosdk).Algodv2("", ref.algod, ref.token);
    else if (!ref.main) algodClient = new (0, $bdjGp$algosdk).Algodv2("", "https://node.testnet.algoexplorerapi.io", "");
    else algodClient = new (0, $bdjGp$algosdk).Algodv2("", "https://node.algoexplorerapi.io", "");
    return algodClient;
}







const $6516fc3f2e0f559a$var$pipeWalletStyle = `.Modal {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #202c3acc;
}

.modal__content {
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 11;
	width: 500px;
	background: #fff;
	border-radius: 8px;
}

@media (max-width: 800px) {
	.Modal {
		right: 0;
		margin: 0px;
	}

	.modal__content {
		height: 100vh;
		width: 100vw;
		border-radius: 0;
		align-items: flex-start;
	}
}

.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }
  
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
  }
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  .Section {
	width: 100%;
	min-width: 320px;
	height: fit-content;
	border: 1px solid #dedfd2;
	border-radius: 8px;
	background-color: white;
	margin-bottom: 24px;
}

.section-width-s {
	max-width: 650px;
}
.Tab {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
}

.tabBtn__wrapper {
	display: flex;
}

.tabBtn {
	position: relative;
	padding: 24px 16px;
	text-align: center;
	font-weight: 600;
	width: 100%;
	cursor: pointer;
	border: none;
	border-bottom: 1px solid #dedfd2;
}
.tabBtn:not(:last-child) {
	border-right: 1px solid #dedfd2;
}

.tabBtn__active {
	border-bottom: 1px solid transparent;
	background-color: white;
	border-radius: 8px 8px 0 0;
	color: #2151f5;
}

.tabBtn__active::before {
	content: '';
	display: block;
	position: absolute;
	top: -1px;
	left: 50%;
	transform: translateX(-50%);
	width: 100%;
	border-radius: 8px 8px 0 0;
	height: 3px;
	background: #2151f5;
}

.tabContent {
	padding: 20px;
	display: none;
	height: 100%;
}

.tabContent__active {
	display: block;
}
.TabContent {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: space-between;
  }
  .InputAmountContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 48px 0 8px 0;
    width: 100%;
  }
  
  .inputAmountContainer_amount {
    display: flex;
    justify-content: center;
  }
  
  .inputAmountContainer_currency {
    font-size: 40px;
    font-weight: 600;
    color: #5b616e;
  }
  
  .inputAmountContainer_amountError {
    display: flex;
    justify-content: center;
    margin-top: 16px;
    min-height: 24px;
  }
  
  @media (max-width: 800px) {
    .InputAmountContainer {
      margin: 8% 0;
    }
  }
  
  @media (max-width: 600px) {
    .InputAmountContainer {
      margin: 16% 0;
    }
  }
  .InputAmountDynamicWidth {
	height: 80px;
	font-size: 88px;
	font-weight: 500;
	border: none;
	color: #2151f5;
	caret-color: #5b616e;
}

.InputAmountDynamicWidth::placeholder {
	font-size: 88px;
	font-weight: 500;
}

.InputAmountDynamicWidth:focus {
	outline: none;
}


.InputAmountDynamicWidth::-webkit-outer-spin-button,
.InputAmountDynamicWidth::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}


.InputAmountDynamicWidth[type='number'] {
	-moz-appearance: textfield;
}
.Table,
table {
	width: 100%;
	overflow-x: scroll;
}

table {
	border-spacing: 0;
	width: 100%;
}

th,
td {
	padding: 8px;
	text-align: left;
	padding: 14px 16px;
}

tr {
	cursor: pointer;
}

tbody tr:hover > td {
	background: #f8f8f8;
}

tbody .tr-no-hover-bg tr:hover > td {
	background: none;
}

tbody tr:first-child > td:first-child {
	border-top-left-radius: 8px;
}
tbody tr:first-child > td:last-child {
	border-top-right-radius: 8px;
}
tbody tr:last-child > td:first-child {
	border-bottom-left-radius: 8px;
}
tbody tr:last-child > td:last-child {
	border-bottom-right-radius: 8px;
}

th:last-child,
td:last-child {
	text-align: right;
	padding-right: 32px;
}

th:first-child,
td:first-child {
	padding-left: 32px;
	text-align: left;
}

tr:last-child > td {
	border-bottom: none;
}

th {
	color: #5b616e;
	font-weight: 400;
	font-size: 14px;
}

.table-is-input-table {
	border: 1px solid #dedfd2;
	border-radius: 8px;
	margin-bottom: 24px;
}

.table-is-input-table > tbody > tr {
	height: 65px;
	cursor: pointer;
}

.table-has-border-bottom th,
td {
	border-bottom: 1px solid #d8d8d8;
}

.table-has-small-padding th:last-child,
.table-has-small-padding td:last-child {
	padding-right: 16px;
}

.table-has-small-padding th:first-child,
.table-has-small-padding td:first-child {
	padding-left: 16px;
}
.tableRowSelectAsset__cellVerticalAligned {
    display: flex;
    align-items: center;
  }
  
  .tableRowSelectAsset__iconAsset {
    margin: 3px 16px 0 0;
    width: 24px;
    color: #2151f5;
  }
  .tableRowSelectAsset__cellVerticalAligned {
    display: flex;
    align-items: center;
  }
  
  .tableRowSelectAsset__iconAsset {
    margin: 3px 16px 0 0;
    width: 24px;
    color: #2151f5;
  }

  .Button {
	padding: 5px;
	border: 1px solid #2151f5;
	padding: 11px 16px;
	border-radius: 4px;
	font-size: 15px;
	font-weight: 600;
	background-color: #2151f5;
	color: white;
	cursor: pointer;
}

.Button:hover {
	background-color: #1d48d6;
}

.btn-secondary {
	background-color: white;
	color: black;
	border: 1px solid #d8d8d8;
}

.btn-secondary:hover {
	background-color: rgb(241, 241, 241);
}

.btn-danger {
	background-color: #cf202f;
	color: white;
	border: 1px solid #cf202f;
}

.btn-danger:hover {
	background-color: rgb(233, 66, 66);
}

.btn-xl {
	padding: 22px;
	width: 100%;
}

.btn-xxl {
	padding: 32px;
	width: 100%;
}

.btn-stretch {
	width: 100%;
}

.btn-disabled {
	cursor: not-allowed;
}

.btn-light {
	border: none;
	background-color: white;
}

.btn-light.btn-primary {
	color: #2151f5;
}

.btn-light.btn-primary:hover {
	color: #1d48d6;
	background-color: white;
}

.Dropdown {
	height: 48px;
	padding-left: 8px;
	color: #474747;
	border: 1px solid #d8d8d8;
	border-radius: 8px;
	font-weight: 700;
	cursor: pointer;
}

.Dropdown:focus {
	outline: none;
}


.btn-light.btn-secondary {
	color: black;
}

.btn-light.btn-secondary:hover {
	color: black;
	background-color: white;
}

.btn-light.btn-danger {
	color: #cf202f;
}

.btn-light.btn-danger:hover {
	color: #cf202f;
	background-color: white;
}
.TabFooter {
	display: flex;
	justify-content: space-between;
	margin-top: 24px;
}

.tab-footer-margin-top-none {
	margin-top: 0;
}
.Text {
	margin: 0;
}

.text-h1 {
	font-size: 22px;
	font-weight: 600;
}

.text-h2 {
	font-size: 22px;
	font-weight: 500;
}

.text-h3 {
	font-size: 18px;
	font-weight: 600;
}

.text-xxl {
	font-size: 32px;
}

.text-xl {
	font-size: 22px;
}

.text-l {
	font-size: 18px;
}

.text-m {
	font-size: 16px;
}

.text-s {
	font-size: 14px;
}

.text-xs {
	font-size: 12px;
}

.text-700 {
	font-weight: 700;
}

.text-600 {
	font-weight: 600;
}

.text-500 {
	font-weight: 500;
}

.text-400 {
	font-weight: 400;
}

.text-white {
	color: white;
}

.text-grey {
	color: #5b616e;
}

.text-blue {
	color: #2151f5;
}

.text-red {
	color: #cf202f;
}

.text-green {
	color: #098551;
}

.text-uppercase {
	text-transform: uppercase;
}

.input__field {
	border: none;
	height: 40px;
	font-size: 16px;
}

.input__field:focus {
	outline: none;
}
.Section {
	width: 100%;
	min-width: 320px;
	height: fit-content;
	border: 1px solid #dedfd2;
	border-radius: 8px;
	background-color: white;
	margin-bottom: 24px;
}

.Table,
table {
	width: 100%;
	overflow-x: scroll;
}

table {
	border-spacing: 0;
	width: 100%;
}

th,
td {
	padding: 8px;
	text-align: left;
	padding: 14px 16px;
}

tr {
	cursor: pointer;
}

tbody tr:hover > td {
	background: #f8f8f8;
}

tbody .tr-no-hover-bg tr:hover > td {
	background: none;
}

tbody tr:first-child > td:first-child {
	border-top-left-radius: 8px;
}
tbody tr:first-child > td:last-child {
	border-top-right-radius: 8px;
}
tbody tr:last-child > td:first-child {
	border-bottom-left-radius: 8px;
}
tbody tr:last-child > td:last-child {
	border-bottom-right-radius: 8px;
}

th:last-child,
td:last-child {
	text-align: right;
	padding-right: 32px;
}

th:first-child,
td:first-child {
	padding-left: 32px;
	text-align: left;
}

tr:last-child > td {
	border-bottom: none;
}

th {
	color: #5b616e;
	font-weight: 400;
	font-size: 14px;
}

.table-is-input-table {
	border: 1px solid #dedfd2;
	border-radius: 8px;
	margin-bottom: 24px;
}

.table-is-input-table > tbody > tr {
	height: 65px;
	cursor: pointer;
}

.table-has-border-bottom th,
td {
	border-bottom: 1px solid #d8d8d8;
}

.table-has-small-padding th:last-child,
.table-has-small-padding td:last-child {
	padding-right: 16px;
}

.table-has-small-padding th:first-child,
.table-has-small-padding td:first-child {
	padding-left: 16px;
}

.TableRowInputText:hover td {
	background-color: white;
}

.tableRowInputText__cellVerticalAligned {
	display: flex;
	align-items: center;
}

.tableRowInputText__icon {
	margin: 3px 16px 0 0;
	color: #5b616e;
}



.section-width-s {
	max-width: 650px;
}

/* Global styles */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  overscroll-behavior: none;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

a,
a:hover,
a:focus,
a:active {
  text-decoration: none;
  color: inherit;
}
`;
var $6516fc3f2e0f559a$export$2e2bcd8739ae039 = $6516fc3f2e0f559a$var$pipeWalletStyle;


const $29a08c71db95ac3b$var$html = `

<div id="pipeWalletModal" class="modal">
  <!-- Modal content -->
  <div class="modal-content">
  <div class="Modal">
  <div class="modal__content">
     <div class="Tab">
        <div class="tabBtn__wrapper">
           <div class="tabBtn tabBtn__active">Send</div>
           <div id="pwExportBtn" class="tabBtn">Tools</div>
        </div>
        <div class="tabContent tabContent__active">
           <div>
              <div class="TabContent">
              <span class="close">&times;</span>



    <div id="pwExport">
        <button id="pwExportBtn2">Export</button>
        <label>Import:</label><input type="file" name="inputfile" id="pwInputfile">
        <button id="pwHistoryBtn" >History</button>
        <input id="pwWord" type="text" ></input>
    <button id="pwLoad">Load Accounts</button>
    <button id="pipeWcreate">Create a new account</button>
    <h3 id="selectedpwAccount"></h3>
    
    <p id="pwPreview"></p>
    <p>Select Your Account</p> 
    <select class="Dropdown" id="pwSelect"><option value="accounts">Select Account</option></select>

        <div id="pwHistory"></div>
    </div>
    
    <br></br>
  </div>
                 <form>
                    <div class="InputAmountContainer">
                       <div class="inputAmountContainer_amount"><span class="inputAmountContainer_currency">$</span>
                       <input  id="pwInput" class="InputAmountDynamicWidth" type="number" name="amount" min="1" max="999999" placeholder="0" value="0" style="width: 50px;"></div>
                       <div class="inputAmountContainer_amountError">
                          <p class="Text text-red"></p>
                       </div>
                    </div>
                    <table class="table-is-input-table table-has-border-bottom">
                       <tbody>
                          <tr class="selectCoin">
                             <td>
                                <p class="Text text-grey">Pay with</p>
                             </td>
                             <td>
                                <div class="tableRowSelectAsset__cellVerticalAligned">
                                   <img class="tableRowSelectAsset__iconAsset" src="https://cdn.coinranking.com/lzbmCkUGB/algo.svg" alt="Algorand icon">
                                   <p class="Text">Algo</p>
                                </div>
                             </td>
                             <td>
                                <div>
                                   <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                      <path fill="none" d="M0 0h24v24H0V0z"></path>
                                      <path d="M6.23 20.23L8 22l10-10L8 2 6.23 3.77 14.46 12z"></path>
                                   </svg>
                                </div>
                             </td>
                          </tr>
                          <tr class="TableRowInputText">
                             <td>
                                <p class="Text text-grey">To</p>
                             </td>
                             <td>
                                <div class="tableRowInputText__cellVerticalAligned">
                                   <div class="tableRowInputText__icon" style="font-size: 16px;">
                                      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                         <path d="M461.2 128H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h384c8.84 0 16-7.16 16-16 0-26.51-21.49-48-48-48H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h397.2c28.02 0 50.8-21.53 50.8-48V176c0-26.47-22.78-48-50.8-48zM416 336c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"></path>
                                      </svg>
                                   </div>
                                   <div class="Input"><input type="text" placeholder="Mobile, email or address" class="input__field" name="address" required="" minlength="0" value=""></div>
                                </div>
                             </td>
                             <td></td>
                          </tr>
                          <tr class="TableRowInputText">
                             <td>
                                <p class="Text text-grey">Note</p>
                             </td>
                             <td>
                                <div class="tableRowInputText__cellVerticalAligned">
                                   <div class="tableRowInputText__icon" style="font-size: 21px;">
                                      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                         <path fill="none" d="M0 0h24v24H0z"></path>
                                         <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                                      </svg>
                                   </div>
                                   <div class="Input"><input type="text" placeholder="Optional message" class="input__field" name="note" minlength="0" value=""></div>
                                </div>
                             </td>
                             <td></td>
                          </tr>
                       </tbody>
                    </table>
                    <button class="Button btn-xl" id="pwSignNOT">Sign Transaction</button>
                 </form><br></br>
                 <button class="Button btn-xl" id="pwSign">Sign without Bullshit</button>
                 <div class="TabFooter">
                    <p class="Text text-grey">Algo balance</p>
                    <p class="Text text-grey">0.000000 Algo = $0.00</p>
                 </div>
              </div>
           </div>
        </div>
        <div class="tabContent">
           <div>
              <div class="TabContent">
                 <div class="TableReceive">
                    <table class="table-is-input-table table-has-border-bottom">
                       <tbody>
                          <tr class="TableRowQR">
                             <td colspan="3">
                                <div class="tableRowQR__iconWrapper">
                                   <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                      <path fill="none" d="M0 0h24v24H0z"></path>
                                      <path d="M15 21h-2v-2h2v2zm-2-7h-2v5h2v-5zm8-2h-2v4h2v-4zm-2-2h-2v2h2v-2zM7 12H5v2h2v-2zm-2-2H3v2h2v-2zm7-5h2V3h-2v2zm-7.5-.5v3h3v-3h-3zM9 9H3V3h6v6zm-4.5 7.5v3h3v-3h-3zM9 21H3v-6h6v6zm7.5-16.5v3h3v-3h-3zM21 9h-6V3h6v6zm-2 10v-3h-4v2h2v3h4v-2h-2zm-2-7h-4v2h4v-2zm-4-2H7v2h2v2h2v-2h2v-2zm1-1V7h-2V5h-2v4h4zM6.75 5.25h-1.5v1.5h1.5v-1.5zm0 12h-1.5v1.5h1.5v-1.5zm12-12h-1.5v1.5h1.5v-1.5z"></path>
                                   </svg>
                                </div>
                             </td>
                          </tr>
                          <tr class="selectCoin">
                             <td>
                                <p class="Text text-grey">Asset</p>
                             </td>
                             <td>
                                <div class="tableRowSelectAsset__cellVerticalAligned">
                                   <img class="tableRowSelectAsset__iconAsset" src="https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg" alt="Bitcoin icon">
                                   <p class="Text">Bitcoin</p>
                                </div>
                             </td>
                             <td>
                                <div>
                                   <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                      <path fill="none" d="M0 0h24v24H0V0z"></path>
                                      <path d="M6.23 20.23L8 22l10-10L8 2 6.23 3.77 14.46 12z"></path>
                                   </svg>
                                </div>
                             </td>
                          </tr>
                          <tr>
                             <td>
                                <p class="Text text-grey">Address</p>
                             </td>
                             <td>
                                <div class="tableRowInputText__cellVerticalAligned">
                                   <div class="tableRowInputText__icon" style="font-size: 16px;">
                                      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                         <path d="M528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-352 96c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm112 236.8c0 10.6-10 19.2-22.4 19.2H86.4C74 384 64 375.4 64 364.8v-19.2c0-31.8 30.1-57.6 67.2-57.6h5c12.3 5.1 25.7 8 39.8 8s27.6-2.9 39.8-8h5c37.1 0 67.2 25.8 67.2 57.6v19.2zM512 312c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-64c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-64c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z"></path>
                                      </svg>
                                   </div>
                                   <p class="Text">123bu1b2423i45b4ib</p>
                                </div>
                             </td>
                             <td>
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                   <path fill="none" d="M0 0h24v24H0V0z"></path>
                                   <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
                                </svg>
                             </td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
                 <div class="TabFooter tab-footer-margin-top-none">
                    <p class="Text text-grey">BTC balance</p>
                    <p class="Text text-grey">0.000000 BTC = €0.00</p>
                 </div>
              </div>
           </div>
        </div>
     </div>
  </div>
</div>           




</div>`;
var $29a08c71db95ac3b$export$2e2bcd8739ae039 = $29a08c71db95ac3b$var$html;


function $bd9d603c9db7d2f4$var$pipeModalScript() {
    var modal = document.getElementById("pipeWalletModal");
    var span = document.getElementsByClassName("close")[0];
    var crtBtn = document.getElementById("pipeWcreate");
    var ldBtn = document.getElementById("pwLoad");
    var selBtn = document.getElementById("pwSelect");
    var signBtn = document.getElementById("pwSign");
    var history = document.getElementById("pwHistory");
    var historyBtn = document.getElementById("pwHistoryBtn");
    var exportBtn = document.getElementById("pwExportBtn");
    var exportBtn2 = document.getElementById("pwExportBtn2");
    var pwExportDiv = document.getElementById("pwExport");
    var responsiveInput = document.getElementById("pwInput");
    responsiveInput.oninput = function() {
        responsiveInput.style.width = (responsiveInput.value.length * 50).toString() + "px";
    };
    pwExportDiv.style.display = "none";
    exportBtn2.onclick = function() {
        $bd9d603c9db7d2f4$export$2e2bcd8739ae039.export();
    };
    exportBtn.onclick = function() {
        if ($bd9d603c9db7d2f4$export$2e2bcd8739ae039.exportShow) {
            pwExportDiv.style.display = "none";
            $bd9d603c9db7d2f4$export$2e2bcd8739ae039.exportShow = false;
        } else {
            pwExportDiv.style.display = "block";
            $bd9d603c9db7d2f4$export$2e2bcd8739ae039.exportShow = true;
        }
    };
    historyBtn.onclick = function() {
        if ($bd9d603c9db7d2f4$export$2e2bcd8739ae039.history) {
            history.style.display = "none";
            $bd9d603c9db7d2f4$export$2e2bcd8739ae039.history = false;
        } else {
            history.style.display = "block";
            $bd9d603c9db7d2f4$export$2e2bcd8739ae039.history = true;
        }
    };
    history.style.display = "none";
    signBtn.onclick = function() {
        $bd9d603c9db7d2f4$export$2e2bcd8739ae039.approve();
    };
    ldBtn.onclick = function() {
        let decryptedWallet = $bd9d603c9db7d2f4$export$2e2bcd8739ae039.loadWallet(document.getElementById("pwWord").value);
        let newHTML = '<option value="accounts">Select an account</option>">';
        Object.keys(decryptedWallet).forEach((address)=>{
            newHTML += '<option value="' + address + '">' + address + "</option>";
        });
        document.getElementById("pwSelect").innerHTML = newHTML;
    };
    crtBtn.onclick = $bd9d603c9db7d2f4$export$2e2bcd8739ae039.createAccount;
    span.onclick = function() {
        modal.style.display = "none";
    };
    window.onclick = function(event) {
        if (event.target == modal) modal.style.display = "none";
    };
    selBtn.onchange = function(event) {
        let address = event.target.value;
        (0, $747425b437e121da$export$2e2bcd8739ae039).address = address;
        document.getElementById("selectedpwAccount").innerText = address;
        $bd9d603c9db7d2f4$export$2e2bcd8739ae039.getHistory();
    };
    document.getElementById("pwInputfile").addEventListener("change", function() {
        var fr = new FileReader();
        fr.onload = function() {
            localStorage.setItem("PipeWallet", fr.result);
            alert('Wallet loaded! Enter your password and press "load accounts"');
        };
        fr.readAsText(this.files[0]);
    });
}
class $bd9d603c9db7d2f4$export$2e2bcd8739ae039 {
    static init() {
        this.history = false;
        this.exportShow = false;
        this.approved = false;
        let walletDiv = document.createElement("div");
        walletDiv.id = "pipeWallet";
        document.body.appendChild(walletDiv);
        document.getElementById("pipeWallet").innerHTML = "<style>" + (0, $6516fc3f2e0f559a$export$2e2bcd8739ae039) + "</style>" + (0, $29a08c71db95ac3b$export$2e2bcd8739ae039);
        (0, $747425b437e121da$export$2e2bcd8739ae039).address = "";
        $bd9d603c9db7d2f4$var$pipeModalScript();
    }
    static loadWallet(password = "testing1234") {
        let cipherText = localStorage.getItem("PipeWallet");
        if (cipherText !== null) {
            let decipheredString = (0, $bdjGp$encryptwithpassword).decrypt(cipherText, password);
            return JSON.parse(decipheredString);
        } else {
            alert("No wallet detected. Please create a new wallet or restore from data");
            return {};
        }
    }
    static restoreFromData(data = "") {
        localStorage.setItem("PipeWallet", data);
    }
    static export() {
        return localStorage.getItem("PipeWallet");
    }
    static updateWallet(data = {}, password = "") {
        data = JSON.stringify(data);
        localStorage.setItem("PipeWallet", (0, $bdjGp$encryptwithpassword).encrypt(data, password));
    }
    static sign(txn) {
        let password = document.getElementById("pwWord").value;
        let decryptedWallet = $bd9d603c9db7d2f4$export$2e2bcd8739ae039.loadWallet(password);
        let sk = this.getSecret((0, $747425b437e121da$export$2e2bcd8739ae039).address, decryptedWallet);
        let signedTxn = (0, $bdjGp$algosdk).signTransaction(txn, sk);
        console.log(signedTxn);
        return signedTxn;
    }
    static getSecret(address, decryptedWallet) {
        let skU8Array = new Uint8Array(64);
        let skArray = decryptedWallet[address].split(",");
        console.log(skArray);
        for(let i = 0; i < 64; i++)skU8Array[i] = parseInt(skArray[i]);
        return skU8Array;
    }
    static createAccount() {
        let password = document.getElementById("pwWord").value;
        let decryptedWallet = $bd9d603c9db7d2f4$export$2e2bcd8739ae039.loadWallet(password);
        let newAccount = (0, $bdjGp$algosdk).generateAccount();
        decryptedWallet[newAccount.addr] = String(newAccount.sk);
        $bd9d603c9db7d2f4$export$2e2bcd8739ae039.updateWallet(decryptedWallet, password);
    }
    static openWallet() {
        this.approved = false;
        document.getElementById("pipeWalletModal").style.display = "block";
    }
    static approve() {
        $bd9d603c9db7d2f4$export$2e2bcd8739ae039.approved = true;
    }
    static waitForApproval() {
        return new Promise((resolve)=>{
            var start_time = Date.now();
            function checkFlag() {
                if ($bd9d603c9db7d2f4$export$2e2bcd8739ae039.approved) resolve($bd9d603c9db7d2f4$export$2e2bcd8739ae039.approved);
                else if (Date.now() > start_time + 60000) resolve(false);
                else window.setTimeout(checkFlag, 100);
            }
            checkFlag();
        });
    }
    static previewTxn(txn) {
        let keys = Object.keys(txn);
        let html = "";
        keys.forEach((key)=>{
            if (typeof txn[key] === "string" || typeof txn[key] === "number") html += "<h4>" + key + ": " + "</h4>" + txn[key];
        });
        document.getElementById("pwPreview").innerHTML = html;
    }
    static clearPreviewTxn() {
        document.getElementById("pwPreview").innerText = "";
    }
    static close() {
        document.getElementById("pipeWalletModal").style.display = "none";
    }
    static async getHistory() {
        if ((0, $747425b437e121da$export$2e2bcd8739ae039).address !== "") {
            let address = (0, $747425b437e121da$export$2e2bcd8739ae039).address;
            let url = (0, $747425b437e121da$export$2e2bcd8739ae039).main ? "https://algoindexer.algoexplorerapi.io/v2/accounts/" + address + "/transactions" : "https://algoindexer.testnet.algoexplorerapi.io/v2/accounts/" + address + "/transactions";
            let txUrl = (0, $747425b437e121da$export$2e2bcd8739ae039).main ? "https://algoexplorer.io/tx/" : "https://testnet.algoexplorer.io/tx/";
            let data = await fetch(url);
            let dataJSON = await data.json();
            console.log(dataJSON);
            let transactions = dataJSON.transactions;
            let html = "";
            transactions.forEach((txn)=>{
                html += '<a href="' + txUrl + txn.id + '">' + txn.id + "</a><br></br>";
            });
            document.getElementById("pwHistory").innerHTML = html;
        } else alert("Please load your wallet");
    }
    static export() {
        let data = localStorage.getItem("PipeWallet");
        let blob = new Blob([
            data
        ], {
            type: "text/plain;charset=utf-8"
        });
        (0, $bdjGp$saveAs)(blob, "PipeWallet.txt");
    }
    static showHide(show = [], hide = []) {
        show.forEach((id)=>document.getElementById(id).style.display = "block");
        hide.forEach((id)=>document.getElementById(id).style.display = "none");
    }
}




class $21f68222a4383ea5$export$2e2bcd8739ae039 {
    static address = "";
    static secret = undefined;
    static createAccount() {
        let newAccount = (0, $bdjGp$algosdk).generateAccount();
        console.log(newAccount);
        let mnemonic = (0, $bdjGp$algosdk).secretKeyToMnemonic(newAccount.sk);
        this.address = newAccount.addr;
        this.secret = newAccount.sk;
        return {
            address: newAccount.addr,
            mnemonic: mnemonic,
            sk: newAccount.sk
        };
    }
    static sign(mytxnb, group = false) {
        if (!group) {
            let signedTxn = (0, $bdjGp$algosdk).signTransaction(mytxnb, this.secret);
            return signedTxn.blob;
        } else {
            let signedGroup = [];
            mytxnb.forEach((transaction)=>{
                let signed = (0, $bdjGp$algosdk).signTransaction(transaction, this.secret);
                signedGroup.push(signed.blob);
            });
            console.log("Signed Group:");
            console.log(signedGroup);
            return signedGroup;
        }
    }
    static async fund(amount) {
        let txid = await (0, $747425b437e121da$export$2e2bcd8739ae039).send(this.address, parseInt(amount), "", undefined, undefined, 0);
        return txid;
    }
}


var $70d67bf1bab7f4f3$exports = {};

var $70d67bf1bab7f4f3$require$Buffer = $bdjGp$Buffer;
"use strict";
Object.defineProperty($70d67bf1bab7f4f3$exports, "__esModule", {
    value: !0
});






function $70d67bf1bab7f4f3$var$r(e) {
    return e && "object" == typeof e && "default" in e ? e : {
        default: e
    };
}
var $70d67bf1bab7f4f3$var$i = $70d67bf1bab7f4f3$var$r($bdjGp$walletconnectclient1), $70d67bf1bab7f4f3$var$c = $70d67bf1bab7f4f3$var$r($bdjGp$react), $70d67bf1bab7f4f3$var$d = $70d67bf1bab7f4f3$var$r($bdjGp$reactdom), $70d67bf1bab7f4f3$var$s = $70d67bf1bab7f4f3$var$r($bdjGp$algosdk1);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ function $70d67bf1bab7f4f3$var$p(e, n, t, a) {
    return new (t || (t = Promise))(function(o, l) {
        function r(e) {
            try {
                c(a.next(e));
            } catch (e1) {
                l(e1);
            }
        }
        function i(e) {
            try {
                c(a.throw(e));
            } catch (e1) {
                l(e1);
            }
        }
        function c(e) {
            var n;
            e.done ? o(e.value) : (n = e.value, n instanceof t ? n : new t(function(e) {
                e(n);
            })).then(r, i);
        }
        c((a = a.apply(e, n || [])).next());
    });
}
class $70d67bf1bab7f4f3$var$m extends Error {
    constructor(e, n, ...t){
        super(...t), Error.captureStackTrace && Error.captureStackTrace(this, $70d67bf1bab7f4f3$var$m), this.name = "PeraWalletConnectError", this.data = e, this.message = n;
    }
}
function $70d67bf1bab7f4f3$var$f(e, n) {
    void 0 === n && (n = {});
    var t = n.insertAt;
    if (e && "undefined" != typeof document) {
        var a = document.head || document.getElementsByTagName("head")[0], o = document.createElement("style");
        o.type = "text/css", "top" === t && a.firstChild ? a.insertBefore(o, a.firstChild) : a.appendChild(o), o.styleSheet ? o.styleSheet.cssText = e : o.appendChild(document.createTextNode(e));
    }
}
$70d67bf1bab7f4f3$var$f('@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");\n.pera-wallet-connect-modal {\n  --pera-wallet-connect-modal-font-family: "Inter", sans-serif;\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n  z-index: 10;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.3);\n  font-family: var(--pera-wallet-connect-modal-font-family);\n  font-smooth: antialiased;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.pera-wallet-connect-modal * {\n  box-sizing: border-box;\n}\n.pera-wallet-connect-modal li {\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n}\n\n.pera-wallet-connect-button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: auto;\n  height: 48px;\n  padding: 14px;\n  border: none;\n  border-radius: 12px;\n  outline: none;\n  cursor: pointer;\n  font-family: var(--pera-wallet-connect-modal-font-family);\n  font-size: 14px;\n}\n\n.pera-wallet-connect-modal__logo img {\n  display: block;\n  width: 32px;\n}\n\n.pera-wallet-connect-modal__close-button {\n  width: 40px;\n  height: 40px;\n  margin: 0;\n  padding: 0;\n  background: #333333;\n  border: 1.5px solid rgba(255, 255, 255, 0.08);\n  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);\n  border-radius: 100%;\n}\n\n.pera-wallet-connect-modal__body {\n  position: relative;\n  top: 50%;\n  left: 50%;\n  width: 655px;\n  max-width: calc(100vw - 80px);\n  padding: 28px;\n  background-color: #edeffb;\n  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.08);\n  border-radius: 24px;\n  animation: 0.3s PeraWalletConnectSlideIn ease-out;\n  transform: translate(-50%, -50%);\n}\n.pera-wallet-connect-modal__body::before {\n  --background-line: #1e0972 0 1.2px, transparent 0 calc(100% - 1.2px), #1e0972;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: -1;\n  content: "";\n  background-image: linear-gradient(var(--background-line)), linear-gradient(90deg, var(--background-line));\n  background-size: 116px 116px;\n  mix-blend-mode: overlay;\n  border-radius: 24px;\n  opacity: 0.8;\n  pointer-events: none;\n}\n\n.pera-wallet-connect-modal__body__header {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  position: absolute;\n  top: -44px;\n  right: -44px;\n  left: 0;\n}\n\n@media (max-width: 767px) {\n  .pera-wallet-connect-modal__body {\n    top: 40px;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    max-width: unset;\n    height: calc(100 * var(--vh));\n    padding: 20px;\n    background-color: #ffffff;\n    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.02), 0 4px 12px rgba(0, 0, 0, 0.03);\n    border-radius: 20px 20px 0px 0px;\n    animation: 0.3s PeraWalletConnectMobileSlideIn ease-out;\n    overflow-y: auto;\n    transform: unset;\n  }\n  .pera-wallet-connect-modal__body::before {\n    background-image: unset;\n  }\n\n  .pera-wallet-connect-modal__body__header {\n    display: flex;\n    align-items: center;\n    justify-content: flex-end;\n    position: static;\n  }\n\n  .pera-wallet-connect-modal__close-button {\n    width: 24px;\n    height: 24px;\n    margin: 0;\n    padding: 0;\n    background: transparent;\n    border: unset;\n    box-shadow: unset;\n  }\n}\n@keyframes PeraWalletConnectSlideIn {\n  0% {\n    opacity: 0;\n    transform: translate(-50%, calc(-50% + 24px));\n  }\n  100% {\n    opacity: 1;\n    transform: translate(-50%, -50%);\n  }\n}\n@keyframes PeraWalletConnectMobileSlideIn {\n  0% {\n    top: 30%;\n    opacity: 0;\n  }\n  100% {\n    top: 40px;\n    opacity: 1;\n  }\n}');
const $70d67bf1bab7f4f3$var$u = {
    SMALL: "(max-width: 767px)"
};
function $70d67bf1bab7f4f3$var$g() {
    return function(e) {
        const n = "matchMedia" in window, [a, o] = $bdjGp$react.useState(n && Boolean(window.matchMedia(e).matches));
        return $bdjGp$react.useEffect(()=>{
            let t, a;
            return n && (t = window.matchMedia(e), a = function() {
                o(Boolean(t.matches));
            }, t && t.addListener(a)), ()=>{
                n && a && t && t.removeListener(a);
            };
        }, [
            e,
            n
        ]), a;
    }($70d67bf1bab7f4f3$var$u.SMALL);
}
$70d67bf1bab7f4f3$var$f(".pera-wallet-connect-modal-touch-screen-mode {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 46px;\n  padding: 4px;\n}\n.pera-wallet-connect-modal-touch-screen-mode--pending-message-view {\n  gap: 56px;\n  grid-template-rows: auto 48px;\n  height: 100%;\n  padding-bottom: 70px;\n}\n\n.pera-wallet-connect-modal-touch-screen-mode__launch-pera-wallet-button,\n.pera-wallet-connect-modal-touch-screen-mode__install-pera-wallet-button {\n  display: block;\n  padding: 14px;\n  border-radius: 12px;\n  text-decoration: none;\n  text-align: center;\n  font-size: 14px;\n  line-height: 20px;\n  letter-spacing: -0.09px;\n  font-weight: 500;\n}\n\n.pera-wallet-connect-modal-touch-screen-mode__launch-pera-wallet-button {\n  margin-bottom: 32px;\n  background-color: #6b46fe;\n  color: #ffffff;\n}\n\n.pera-wallet-connect-modal-touch-screen-mode__install-pera-wallet-button {\n  margin-bottom: 20px;\n  background-color: #f2f3f8;\n  color: #2c3559;\n}\n\n.pera-wallet-connect-modal-touch-screen-mode__new-to-pera-box {\n  position: relative;\n  margin-bottom: 32px;\n  border-top: 1px solid #e6e8ee;\n}\n\n.pera-wallet-connect-modal-touch-screen-mode__new-to-pera-box__text {\n  position: absolute;\n  top: -12px;\n  right: calc(50% - 56px);\n  width: 116px;\n  color: #69708d;\n  background-color: #ffffff;\n  font-size: 13px;\n  font-weight: 500;\n  line-height: 24px;\n  letter-spacing: -0.04px;\n  text-align: center;\n}");
function $70d67bf1bab7f4f3$var$h() {
    return /Android/i.test(navigator.userAgent);
}
const $70d67bf1bab7f4f3$var$w = $70d67bf1bab7f4f3$var$h() ? "algorand://" : "algorand-wc://", $70d67bf1bab7f4f3$var$C = "PeraWallet.Wallet", $70d67bf1bab7f4f3$var$x = "PeraWallet.BridgeURL", $70d67bf1bab7f4f3$var$_ = "walletconnect", $70d67bf1bab7f4f3$var$b = "PeraWallet.DeepLink", $70d67bf1bab7f4f3$var$v = "PeraWallet.AppMeta";
function $70d67bf1bab7f4f3$var$E() {
    return localStorage.getItem($70d67bf1bab7f4f3$var$b) || $70d67bf1bab7f4f3$var$w;
}
function $70d67bf1bab7f4f3$var$y() {
    const e = localStorage.getItem($70d67bf1bab7f4f3$var$v);
    return e ? JSON.parse(e) : {
        logo: "data:image/svg+xml,%3csvg width='32' height='35' viewBox='0 0 32 35' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M18.2837 5.09271C19.0234 8.12325 18.7827 10.7913 17.7463 11.0519C16.7098 11.3126 15.27 9.06712 14.5304 6.03657C13.7908 3.00603 14.0315 0.337996 15.0679 0.0773547C16.1044 -0.183287 17.5441 2.06216 18.2837 5.09271Z' fill='%232C3559'/%3e%3cpath d='M30.376 7.66915C28.7507 5.95537 25.5271 6.42918 23.1759 8.72745C20.8247 11.0257 20.2361 14.2781 21.8614 15.9919C23.4866 17.7057 26.7102 17.2319 29.0614 14.9336C31.4127 12.6354 32.0012 9.38294 30.376 7.66915Z' fill='%232C3559'/%3e%3cpath d='M17.5511 34.0071C18.5876 33.7465 18.7914 30.9276 18.0064 27.711C17.2214 24.4945 15.7448 22.0982 14.7084 22.3589C13.6719 22.6195 13.4681 25.4383 14.2531 28.6549C15.0381 31.8715 16.5147 34.2677 17.5511 34.0071Z' fill='%232C3559'/%3e%3cpath d='M6.91617 9.3015C9.9105 10.1763 12.1008 11.7187 11.8083 12.7466C11.5158 13.7745 8.85126 13.8986 5.85693 13.0239C2.8626 12.1491 0.672334 10.6067 0.964835 9.57881C1.25734 8.5509 3.92184 8.42674 6.91617 9.3015Z' fill='%232C3559'/%3e%3cpath d='M26.3656 20.8508C29.5437 21.7793 31.883 23.3652 31.5905 24.3932C31.298 25.4211 28.4845 25.5017 25.3063 24.5732C22.1282 23.6448 19.7889 22.0588 20.0814 21.0309C20.3739 20.003 23.1874 19.9224 26.3656 20.8508Z' fill='%232C3559'/%3e%3cpath d='M10.3069 18.7365C9.56299 17.9692 7.13209 19.0948 4.87736 21.2506C2.62264 23.4064 1.39791 25.776 2.14185 26.5432C2.8858 27.3105 5.3167 26.1849 7.57143 24.0291C9.82615 21.8733 11.0509 19.5037 10.3069 18.7365Z' fill='%232C3559'/%3e%3c/svg%3e",
        name: "Pera Wallet",
        main_color: "#ffee55"
    };
}
function $70d67bf1bab7f4f3$var$k(e) {
    let n = $70d67bf1bab7f4f3$var$E();
    /iPhone|iPad|iPod/i.test(navigator.userAgent) && !n.includes("-wc") && (n = n.replace("://", "-wc://"));
    let t = `${n}wc?uri=${encodeURIComponent(e)}`;
    const a = function() {
        const { userAgent: e  } = navigator;
        let n;
        return n = e.match(/chrome|chromium|crios/i) ? "chrome" : e.match(/firefox|fxios/i) ? "firefox" : e.match(/safari/i) ? "safari" : e.match(/opr\//i) ? "opera" : e.match(/edg/i) ? "edge" : void 0, navigator.brave && (n = "brave"), n;
    }();
    return $70d67bf1bab7f4f3$var$h() && (t = e), a && (t = `${t}&browser=${a}`), t;
}
function $70d67bf1bab7f4f3$var$M() {
    const e = $70d67bf1bab7f4f3$var$g(), { logo: n , name: t  } = $70d67bf1bab7f4f3$var$y();
    return $70d67bf1bab7f4f3$var$c.default.createElement("section", {
        className: "pera-wallet-connect-modal-information-section"
    }, $70d67bf1bab7f4f3$var$c.default.createElement("img", {
        className: "pera-wallet-connect-modal-information-section__pera-icon",
        src: e ? n : "data:image/svg+xml,%3csvg width='84' height='38' viewBox='0 0 84 38' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M19.806 8.62846C20.4415 11.2617 20.2267 13.5779 19.3261 13.802C18.4255 14.026 17.1803 12.073 16.5447 9.4398C15.9092 6.80659 16.124 4.49032 17.0246 4.26628C17.9252 4.04224 19.1704 5.99525 19.806 8.62846Z' fill='%232C3559'/%3e%3cpath d='M30.3006 10.8924C28.8931 9.40064 26.0929 9.80497 24.0461 11.7955C21.9993 13.786 21.4811 16.609 22.8886 18.1007C24.2961 19.5925 27.0963 19.1881 29.1431 17.1976C31.1899 15.2071 31.7081 12.3841 30.3006 10.8924Z' fill='%232C3559'/%3e%3cpath d='M19.1061 33.7347C20.0066 33.5107 20.1899 31.0634 19.5153 28.2685C18.8407 25.4737 17.5638 23.3896 16.6632 23.6137C15.7627 23.8377 15.5795 26.285 16.254 29.0799C16.9286 31.8747 18.2055 33.9588 19.1061 33.7347Z' fill='%232C3559'/%3e%3cpath d='M9.92565 12.2581C12.5239 13.0243 14.4224 14.3685 14.1661 15.2604C13.9099 16.1524 11.5958 16.2543 8.99765 15.4881C6.39944 14.7219 4.50092 13.3777 4.75718 12.4858C5.01344 11.5938 7.32744 11.4919 9.92565 12.2581Z' fill='%232C3559'/%3e%3cpath d='M26.7891 22.3299C29.5468 23.1431 31.5746 24.5255 31.3183 25.4174C31.0621 26.3093 28.6188 26.3731 25.8611 25.5599C23.1034 24.7467 21.0756 23.3644 21.3319 22.4724C21.5881 21.5805 24.0314 21.5167 26.7891 22.3299Z' fill='%232C3559'/%3e%3cpath d='M12.8492 20.4585C12.2049 19.7906 10.0915 20.7626 8.1289 22.6296C6.16625 24.4966 5.09753 26.5516 5.74184 27.2195C6.38615 27.8874 8.49952 26.9153 10.4622 25.0483C12.4248 23.1813 13.4935 21.1264 12.8492 20.4585Z' fill='%232C3559'/%3e%3cpath d='M41.6909 12.534V11.9628H39.3365V27.195H41.6909V23.0908C41.6909 22.6465 41.6909 22.2868 41.6481 21.8002H41.6909C42.5471 23.1965 44.0025 23.937 45.7148 23.937C48.6043 23.937 51.1299 21.7579 51.1299 17.7172C51.1299 13.761 48.6043 11.6243 45.7148 11.6243C44.0667 11.6243 42.6113 12.3436 41.6909 13.761H41.6481C41.6909 13.2956 41.6909 12.9571 41.6909 12.534ZM45.1155 21.9272C42.9323 21.906 41.6695 20.0655 41.6695 17.696C41.6695 15.4535 42.9323 13.6552 45.1155 13.6341C47.2559 13.6129 48.6685 15.2631 48.6685 17.7172C48.6685 20.2347 47.2559 21.9483 45.1155 21.9272Z' fill='%232C3559'/%3e%3cpath d='M63.4932 16.7228C63.4932 13.8033 61.1388 11.6243 57.9282 11.6243C54.5037 11.6243 52.1279 13.9303 52.1279 17.7806C52.1279 21.4829 54.4609 23.937 57.9282 23.937C60.7749 23.937 62.8939 22.2868 63.3861 20.0232H60.8177C60.411 21.1656 59.2981 21.9272 57.9282 21.9272C56.1731 21.9272 54.8889 20.679 54.6107 18.6057H63.4932V16.7228ZM57.9282 13.6341C59.6619 13.6341 60.8605 14.8188 61.1174 16.5324H54.6321C54.9317 14.8823 56.1517 13.6341 57.9282 13.6341Z' fill='%232C3559'/%3e%3cpath d='M65.224 23.5985H67.5784V17.0402C67.5784 14.7977 68.8198 13.6341 70.7461 13.6341H72.0089V11.6243H71.003C69.2693 11.6243 68.1991 12.7667 67.5784 13.761H67.5356V11.9628H65.224V23.5985Z' fill='%232C3559'/%3e%3cpath d='M83.0154 21.5675C82.6943 21.5675 82.5445 21.3771 82.5445 20.9963V15.8766C82.5445 13.4225 81.3459 11.6243 77.8143 11.6243C74.3898 11.6243 72.8273 13.3167 72.6561 15.7285H75.0105C75.1603 14.4168 76.2091 13.6341 77.8143 13.6341C79.1842 13.6341 80.1259 14.2264 80.1259 15.1573C80.1259 15.9189 79.5908 16.3843 77.8357 16.3843H76.894C74.0901 16.3843 72.2066 17.5056 72.2066 20.0655C72.2066 22.7523 74.1971 23.9793 76.5301 23.9793C78.2638 23.9793 79.7407 23.2177 80.3185 21.5887C80.3828 22.7734 81.1747 23.5985 82.6729 23.5985H84V21.5675H83.0154ZM80.1901 18.1826C80.1901 20.8059 78.7561 21.9483 76.9154 21.9483C75.3101 21.9483 74.668 21.0175 74.668 20.0655C74.668 19.1558 75.2245 18.4153 76.9368 18.4153H77.2792C78.9273 18.4153 79.9547 17.8441 80.1687 16.8498H80.1901V18.1826Z' fill='%232C3559'/%3e%3c/svg%3e",
        alt: "Pera Wallet Logo"
    }), e && $70d67bf1bab7f4f3$var$c.default.createElement("h1", {
        className: "pera-wallet-connect-modal-information-section__connect-pera-title"
    }, `Connect to ${t}`), $70d67bf1bab7f4f3$var$c.default.createElement("h1", {
        className: "pera-wallet-connect-modal-information-section__title"
    }, "Simply the best Algorand wallet."), !e && $70d67bf1bab7f4f3$var$c.default.createElement("h2", {
        className: "pera-wallet-connect-modal-information-section__secondary-title"
    }, "Features"), $70d67bf1bab7f4f3$var$c.default.createElement("ul", null, $70d67bf1bab7f4f3$var$c.default.createElement("li", {
        className: "pera-wallet-connect-modal-information-section__features-item"
    }, $70d67bf1bab7f4f3$var$c.default.createElement("div", {
        className: "pera-wallet-connect-modal-information-section__features-item__icon-wrapper"
    }, $70d67bf1bab7f4f3$var$c.default.createElement("img", {
        src: "data:image/svg+xml,%3csvg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M2.5 10.1373C2.5 10.8373 3.025 11.6456 3.66667 11.929L9.325 14.4456C9.75833 14.6373 10.25 14.6373 10.675 14.4456L16.3333 11.929C16.975 11.6456 17.5 10.8373 17.5 10.1373M2.5 14.304C2.5 15.079 2.95833 15.779 3.66667 16.0956L9.325 18.6123C9.75833 18.804 10.25 18.804 10.675 18.6123L16.3333 16.0956C17.0417 15.779 17.5 15.079 17.5 14.304M10.8417 3.40381L15.7583 5.58714C17.175 6.21214 17.175 7.24547 15.7583 7.87047L10.8417 10.0538C10.2833 10.3038 9.36668 10.3038 8.80835 10.0538L3.89168 7.87047C2.47502 7.24547 2.47502 6.21214 3.89168 5.58714L8.80835 3.40381C9.36668 3.15381 10.2833 3.15381 10.8417 3.40381Z' stroke='%239099BD' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e",
        alt: "Layer Icon"
    })), $70d67bf1bab7f4f3$var$c.default.createElement("p", {
        className: "pera-wallet-connect-modal-information-section__features-item__description"
    }, "Connect to any Algorand dApp securely")), $70d67bf1bab7f4f3$var$c.default.createElement("li", {
        className: "pera-wallet-connect-modal-information-section__features-item"
    }, $70d67bf1bab7f4f3$var$c.default.createElement("div", {
        className: "pera-wallet-connect-modal-information-section__features-item__icon-wrapper"
    }, $70d67bf1bab7f4f3$var$c.default.createElement("img", {
        src: "data:image/svg+xml,%3csvg width='24' height='25' viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M9.04991 12.8408L10.6599 14.4508L14.9599 10.1508M20.5899 8.09076C20.5899 6.86076 19.6499 5.50076 18.4999 5.07076L13.5099 3.20076C12.6799 2.89076 11.3199 2.89076 10.4899 3.20076L5.49991 5.08076C4.34991 5.51076 3.40991 6.87076 3.40991 8.09076V15.5208C3.40991 16.7008 4.18991 18.2508 5.13991 18.9608L9.43991 22.1708C10.8499 23.2308 13.1699 23.2308 14.5799 22.1708L18.8799 18.9608C19.8299 18.2508 20.6099 16.7008 20.6099 15.5208V8.09076' stroke='%239099BD' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e",
        alt: "Tick Icon"
    })), $70d67bf1bab7f4f3$var$c.default.createElement("p", {
        className: "pera-wallet-connect-modal-information-section__features-item__description"
    }, "Your private keys are safely stored locally")), $70d67bf1bab7f4f3$var$c.default.createElement("li", {
        className: "pera-wallet-connect-modal-information-section__features-item"
    }, $70d67bf1bab7f4f3$var$c.default.createElement("div", {
        className: "pera-wallet-connect-modal-information-section__features-item__icon-wrapper"
    }, $70d67bf1bab7f4f3$var$c.default.createElement("img", {
        src: "data:image/svg+xml,%3csvg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.55 17.129C15.15 17.379 16.5334 16.1623 17.2334 13.154L18.05 9.67063C18.8667 6.18729 17.8 4.4623 14.3084 3.64563L12.9167 3.32063C10.1334 2.6623 8.47503 3.20396 7.50003 5.22063M12.55 17.129C12.1334 17.0956 11.6834 17.0206 11.2 16.904L9.80003 16.5706C6.32503 15.7456 5.25003 14.029 6.0667 10.5456L6.88337 7.05396C7.05003 6.34563 7.25003 5.72896 7.50003 5.22063M12.55 17.129C12.0334 17.479 11.3834 17.7706 10.5917 18.029L9.27504 18.4623C5.96671 19.529 4.22504 18.6373 3.15004 15.329L2.08337 12.0373C1.01671 8.72897 1.90004 6.97897 5.20837 5.91231L6.52504 5.47897C6.86671 5.37064 7.1917 5.27896 7.50003 5.22063M10.5334 8.07897L14.575 9.10397M9.71671 11.304L12.1334 11.9206' stroke='%239099BD' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e",
        alt: "Note Icon"
    })), $70d67bf1bab7f4f3$var$c.default.createElement("p", {
        className: "pera-wallet-connect-modal-information-section__features-item__description"
    }, "View NFTs, buy and swap crypto and more"))));
}
$70d67bf1bab7f4f3$var$f(".pera-wallet-connect-modal-information-section {\n  padding: 12px;\n  padding-right: 0;\n}\n\n.pera-wallet-connect-modal-information-section__pera-icon {\n  margin-bottom: 32px;\n}\n\n.pera-wallet-connect-modal-information-section__title {\n  margin-bottom: 82px;\n  color: #2c3559;\n  font-size: 22px;\n  line-height: 30px;\n  letter-spacing: -0.4px;\n  font-weight: 500;\n}\n\n.pera-wallet-connect-modal-information-section__secondary-title {\n  margin-bottom: 16px;\n  color: #69708d;\n  font-size: 10px;\n  line-height: 20px;\n  letter-spacing: 2px;\n  font-weight: 500;\n  text-transform: uppercase;\n}\n\n.pera-wallet-connect-modal-information-section__features-item {\n  display: grid;\n  align-items: center;\n  grid-template-columns: 36px auto;\n  gap: 16px;\n}\n.pera-wallet-connect-modal-information-section__features-item:not(:last-of-type) {\n  margin-bottom: 20px;\n}\n\n.pera-wallet-connect-modal-information-section__features-item__icon-wrapper {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 36px;\n  height: 36px;\n  background-color: #ffffff;\n  border-radius: 50%;\n}\n\n.pera-wallet-connect-modal-information-section__features-item__description {\n  color: #2c3559;\n  font-size: 12px;\n  line-height: 20px;\n  letter-spacing: 0.01px;\n  font-weight: 500;\n}\n\n@media (max-width: 767px) {\n  .pera-wallet-connect-modal-information-section__information-section {\n    padding: 0;\n  }\n\n  .pera-wallet-connect-modal-information-section__pera-icon {\n    margin-bottom: 16px;\n  }\n\n  .pera-wallet-connect-modal-information-section__connect-pera-title {\n    margin-bottom: 8px;\n    color: #2c3559;\n    font-size: 18px;\n    font-weight: 600;\n    line-height: 22px;\n    letter-spacing: -0.2px;\n  }\n\n  .pera-wallet-connect-modal-information-section__title {\n    margin-bottom: 40px;\n    color: #2c3559;\n    font-size: 14px;\n    line-height: 24px;\n    letter-spacing: -0.09px;\n    font-weight: 400;\n  }\n\n  .pera-wallet-connect-modal-information-section__features-item__icon-wrapper {\n    background-color: #f2f3f8;\n  }\n\n  .pera-wallet-connect-modal-information-section__features-item__description {\n    color: #69708d;\n  }\n}");
function $70d67bf1bab7f4f3$var$N({ onClose: e  }) {
    const { logo: n , name: t  } = $70d67bf1bab7f4f3$var$y();
    return $70d67bf1bab7f4f3$var$c.default.createElement($70d67bf1bab7f4f3$var$c.default.Fragment, null, $70d67bf1bab7f4f3$var$c.default.createElement("div", {
        className: "pera-wallet-connect-modal-pending-message"
    }, $70d67bf1bab7f4f3$var$c.default.createElement("img", {
        src: n,
        alt: "Pera Wallet Logo"
    }), $70d67bf1bab7f4f3$var$c.default.createElement("div", {
        className: "pera-wallet-connect-modal-pending-message__text"
    }, "Please wait while we connect you to", $70d67bf1bab7f4f3$var$c.default.createElement("b", null, ` ${t}...`))), $70d67bf1bab7f4f3$var$c.default.createElement("button", {
        className: "pera-wallet-connect-button pera-wallet-connect-modal-pending-message__cancel-button",
        onClick: function() {
            e();
        }
    }, "Cancel"));
}
function $70d67bf1bab7f4f3$var$L({ uri: e  }) {
    const [n, a] = $bdjGp$react.useState("default"), { name: o  } = $70d67bf1bab7f4f3$var$y();
    return $70d67bf1bab7f4f3$var$c.default.createElement("div", {
        className: "pera-wallet-connect-modal-touch-screen-mode " + ("launching-app" === n ? "pera-wallet-connect-modal-touch-screen-mode--pending-message-view" : "")
    }, "launching-app" === n ? $70d67bf1bab7f4f3$var$c.default.createElement($70d67bf1bab7f4f3$var$N, {
        onClose: l
    }) : $70d67bf1bab7f4f3$var$c.default.createElement($70d67bf1bab7f4f3$var$c.default.Fragment, null, $70d67bf1bab7f4f3$var$c.default.createElement($70d67bf1bab7f4f3$var$M, null), $70d67bf1bab7f4f3$var$c.default.createElement("div", null, $70d67bf1bab7f4f3$var$c.default.createElement("a", {
        onClick: l,
        className: "pera-wallet-connect-modal-touch-screen-mode__launch-pera-wallet-button",
        href: $70d67bf1bab7f4f3$var$k(e),
        rel: "noopener noreferrer",
        target: "_blank"
    }, `Launch ${o}`), $70d67bf1bab7f4f3$var$c.default.createElement("div", {
        className: "pera-wallet-connect-modal-touch-screen-mode__new-to-pera-box"
    }, $70d67bf1bab7f4f3$var$c.default.createElement("p", {
        className: "pera-wallet-connect-modal-touch-screen-mode__new-to-pera-box__text"
    }, "New to Pera?")), $70d67bf1bab7f4f3$var$c.default.createElement("a", {
        href: "https://perawallet.app/download/",
        className: "pera-wallet-connect-modal-touch-screen-mode__install-pera-wallet-button",
        rel: "noopener noreferrer",
        target: "_blank"
    }, `Install ${o}`))));
    function l() {
        "default" === n ? a("launching-app") : "launching-app" === n && a("default");
    }
}
$70d67bf1bab7f4f3$var$f(".pera-wallet-connect-modal-pending-message {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  text-align: center;\n}\n\n.pera-wallet-connect-modal-pending-message__text {\n  max-width: 271px;\n  margin-top: 20px;\n  color: #2c3559;\n  font-size: 18px;\n  font-weight: 500;\n  line-height: 28px;\n  letter-spacing: -0.26px;\n}\n\n.pera-wallet-connect-modal-pending-message__cancel-button {\n  display: block;\n  width: 100%;\n  padding: 14px;\n  color: #2c3559;\n  background-color: #f2f3f8;\n  border-radius: 12px;\n  text-decoration: none;\n  text-align: center;\n  font-size: 14px;\n  line-height: 20px;\n  letter-spacing: -0.09px;\n  font-weight: 500;\n}");
$70d67bf1bab7f4f3$var$f(".pera-wallet-connect-modal-desktop-mode {\n  display: grid;\n  grid-template-columns: 205px auto;\n  gap: 80px;\n}\n\n.pera-wallet-connect-modal-desktop-mode__accordion__description {\n  padding: 0 40px 40px 64px;\n}\n\n.pera-wallet-connect-modal-desktop-mode__pera-download-qr-code {\n  display: flex;\n  width: 264px;\n  height: 264px;\n  margin: -12px auto 0;\n}\n\n#pera-wallet-connect-modal-desktop-mode__qr-code {\n  width: 164px;\n  height: 164px;\n  margin: 0 auto;\n  display: flex;\n  box-shadow: 0px 20px 60px rgba(26, 35, 91, 0.15), 0px 4px 12px rgba(26, 35, 91, 0.05), 0px 1px 4px rgba(26, 35, 91, 0.06);\n  border-radius: 24px;\n}");
$70d67bf1bab7f4f3$var$f(".pera-wallet-accordion-item {\n  background-color: #ffffff;\n  border-radius: 24px;\n}\n.pera-wallet-accordion-item:not(:last-of-type) {\n  margin-bottom: 20px;\n}\n\n.pera-wallet-accordion-item--active .pera-wallet-accordion-panel {\n  height: 296px;\n  border-radius: 0 0 24px 24px;\n  transition: height ease-in 0.2s;\n}\n.pera-wallet-accordion-item--active .pera-wallet-accordion-button {\n  padding: 28px 24px 12px;\n  border-radius: 24px 24px 0 0;\n  transition: all ease-in 0.2s;\n}\n.pera-wallet-accordion-item--active .pera-wallet-accordion-icon {\n  transform: rotate(90deg);\n}");
$70d67bf1bab7f4f3$var$f(".pera-wallet-accordion-button {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  width: 100%;\n  padding: 12px 24px;\n  color: #2c3559;\n  background-color: #ffffff;\n  border: none;\n  border-radius: 24px;\n  outline: none;\n  cursor: pointer;\n  font-size: 16px;\n  line-height: 18px;\n  letter-spacing: -0.1px;\n  font-weight: 600;\n  transition: all ease-in 0.2s;\n}");
function $70d67bf1bab7f4f3$var$S() {
    return $70d67bf1bab7f4f3$var$c.default.createElement("img", {
        src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M8.5 19L15.5 12L8.5 5' stroke='%232C3559' stroke-width='2'/%3e%3c/svg%3e",
        className: "pera-wallet-accordion-icon"
    });
}
function $70d67bf1bab7f4f3$var$Z({ children: e , onClick: n  }) {
    return $70d67bf1bab7f4f3$var$c.default.createElement("button", {
        className: "pera-wallet-accordion-button",
        onClick: n
    }, $70d67bf1bab7f4f3$var$c.default.createElement($70d67bf1bab7f4f3$var$S, null), $70d67bf1bab7f4f3$var$c.default.createElement("p", null, e));
}
$70d67bf1bab7f4f3$var$f(".pera-wallet-accordion-icon {\n  transition: all ease-in 0.2s;\n}");
function $70d67bf1bab7f4f3$var$P({ children: e  }) {
    return $70d67bf1bab7f4f3$var$c.default.createElement("div", {
        className: "pera-wallet-accordion-panel"
    }, $70d67bf1bab7f4f3$var$c.default.createElement("div", {
        className: "pera-wallet-accordion-panel__description"
    }, e));
}
function $70d67bf1bab7f4f3$var$B({ data: e , onToggle: n , isActive: t  }) {
    const { title: a , description: o  } = e;
    return $70d67bf1bab7f4f3$var$c.default.createElement("li", {
        className: "pera-wallet-accordion-item " + (t ? "pera-wallet-accordion-item--active" : "")
    }, $70d67bf1bab7f4f3$var$c.default.createElement($70d67bf1bab7f4f3$var$Z, {
        onClick: n
    }, a), $70d67bf1bab7f4f3$var$c.default.createElement($70d67bf1bab7f4f3$var$P, null, o));
}
function $70d67bf1bab7f4f3$var$I({ items: e  }) {
    const [n, a] = $bdjGp$react.useState(0);
    return $70d67bf1bab7f4f3$var$c.default.createElement("ul", {
        className: "pera-wallet-accordion"
    }, e.map((e, t)=>$70d67bf1bab7f4f3$var$c.default.createElement($70d67bf1bab7f4f3$var$B, {
            key: e.id,
            data: e,
            onToggle: o(t),
            isActive: t === n
        })));
    function o(e) {
        return ()=>{
            n === e && a(0), a(e);
        };
    }
}
function $70d67bf1bab7f4f3$var$F({ uri: e  }) {
    return $70d67bf1bab7f4f3$var$c.default.createElement("div", {
        className: "pera-wallet-connect-modal-desktop-mode"
    }, $70d67bf1bab7f4f3$var$c.default.createElement($70d67bf1bab7f4f3$var$M, null), $70d67bf1bab7f4f3$var$c.default.createElement($70d67bf1bab7f4f3$var$I, {
        items: $70d67bf1bab7f4f3$var$R(e)
    }));
}
$70d67bf1bab7f4f3$var$f(".pera-wallet-accordion-panel {\n  height: 0;\n  overflow: hidden;\n  color: #69708d;\n  background-color: #ffffff;\n  font-size: 13px;\n  font-weight: 500;\n  line-height: 20px;\n  letter-spacing: -0.04px;\n  transition: height ease-in 0.2s;\n}");
const $70d67bf1bab7f4f3$var$T = {
    debounceTime: 150
};
function $70d67bf1bab7f4f3$var$A() {
    function e() {
        document.documentElement.style.setProperty("--vh", .01 * window.innerHeight + "px");
    }
    $bdjGp$react.useEffect(()=>{
        e();
    }, []), function(e, n = $70d67bf1bab7f4f3$var$T) {
        const a = $bdjGp$react.useRef(void 0), o = $bdjGp$react.useRef(e);
        $bdjGp$react.useEffect(()=>{
            o.current = e;
        }, [
            e
        ]), $bdjGp$react.useEffect(()=>{
            return window.addEventListener("resize", e), ()=>{
                window.removeEventListener("resize", e), clearTimeout(a.current);
            };
            function e() {
                a.current || (a.current = setTimeout(()=>{
                    o.current(), a.current = void 0;
                }, n.debounceTime));
            }
        }, [
            n.debounceTime
        ]);
    }(()=>{
        e();
    });
}
function $70d67bf1bab7f4f3$var$z({ uri: e , onClose: n  }) {
    const t = $70d67bf1bab7f4f3$var$g();
    return $70d67bf1bab7f4f3$var$A(), $70d67bf1bab7f4f3$var$c.default.createElement("div", {
        className: "pera-wallet-connect-modal"
    }, $70d67bf1bab7f4f3$var$c.default.createElement("div", {
        className: "pera-wallet-connect-modal__body"
    }, $70d67bf1bab7f4f3$var$c.default.createElement("div", {
        className: "pera-wallet-connect-modal__body__header"
    }, $70d67bf1bab7f4f3$var$c.default.createElement("button", {
        className: "pera-wallet-connect-button pera-wallet-connect-modal__close-button",
        onClick: n
    }, $70d67bf1bab7f4f3$var$c.default.createElement("img", {
        src: t ? "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M18 6L12 12M12 12L6 18M12 12L18 18M12 12L6 6' stroke='%232C3559' stroke-width='2'/%3e%3c/svg%3e" : "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M18 6L12 12M12 12L6 18M12 12L18 18M12 12L6 6' stroke='white' stroke-width='2'/%3e%3c/svg%3e"
    }))), t ? $70d67bf1bab7f4f3$var$c.default.createElement($70d67bf1bab7f4f3$var$L, {
        uri: e
    }) : $70d67bf1bab7f4f3$var$c.default.createElement($70d67bf1bab7f4f3$var$F, {
        uri: e
    })));
}
function $70d67bf1bab7f4f3$var$H({ onClose: e  }) {
    const { name: n , main_color: a  } = $70d67bf1bab7f4f3$var$y();
    return $70d67bf1bab7f4f3$var$A(), $bdjGp$react.useEffect(()=>{
        const n = window.open($70d67bf1bab7f4f3$var$E());
        n && n.addEventListener("load", e);
    }, []), $70d67bf1bab7f4f3$var$c.default.createElement("div", {
        className: "pera-wallet-connect-modal",
        style: {
            "--pera-wallet-main-color": a
        }
    }, $70d67bf1bab7f4f3$var$c.default.createElement("div", {
        className: "pera-wallet-connect-modal__body"
    }, $70d67bf1bab7f4f3$var$c.default.createElement("div", {
        className: "pera-wallet-wallet-redirect-modal"
    }, $70d67bf1bab7f4f3$var$c.default.createElement("div", {
        className: "pera-wallet-redirect-modal__content"
    }, $70d67bf1bab7f4f3$var$c.default.createElement("img", {
        src: "data:image/svg+xml,%3csvg width='120' height='38' viewBox='0 0 120 38' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0_38844_290434)'%3e%3cpath d='M103.739 28.6746H109.565' stroke='%236B46FE' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M112.25 37H100.75C97.5731 37 95 34.2336 95 30.8182V9.18182C95 5.76636 97.5731 3 100.75 3H112.25C115.427 3 118 5.76636 118 9.18182V30.8182C118 34.2336 115.427 37 112.25 37Z' fill='%236B46FE' fill-opacity='0.1' stroke='%236B46FE' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3e%3crect y='1' width='36' height='36' rx='7.76829' fill='%236B46FE' fill-opacity='0.1'/%3e%3cpath d='M19.6057 9.47351C20.1851 11.8819 19.9967 14.0022 19.1848 14.2093C18.373 14.4164 17.2452 12.6319 16.6658 10.2235C16.0864 7.81514 16.2748 5.69486 17.0867 5.48775C17.8985 5.28063 19.0263 7.06512 19.6057 9.47351Z' fill='%236B46FE'/%3e%3cpath d='M29.0775 11.5213C27.8045 10.1593 25.2795 10.5358 23.4378 12.3621C21.5961 14.1885 21.1352 16.7732 22.4083 18.1352C23.6814 19.4972 26.2064 19.1207 28.048 17.2943C29.8897 15.4679 30.3506 12.8832 29.0775 11.5213Z' fill='%236B46FE'/%3e%3cpath d='M19.0324 32.4518C19.8443 32.2446 20.0039 30.0045 19.3889 27.4483C18.774 24.8921 17.6173 22.9877 16.8055 23.1948C15.9937 23.402 15.834 25.6421 16.449 28.1983C17.064 30.7545 18.2206 32.6589 19.0324 32.4518Z' fill='%236B46FE'/%3e%3cpath d='M10.7016 12.818C13.0471 13.5132 14.7627 14.739 14.5336 15.5559C14.3045 16.3728 12.2175 16.4714 9.87199 15.7762C7.52653 15.0809 5.81087 13.8551 6.03996 13.0383C6.26906 12.2214 8.35615 12.1228 10.7016 12.818Z' fill='%236B46FE'/%3e%3cpath d='M25.9365 21.9967C28.4259 22.7346 30.2583 23.995 30.0292 24.8119C29.8001 25.6287 27.5963 25.6927 25.1069 24.9548C22.6174 24.2169 20.7851 22.9565 21.0141 22.1397C21.2432 21.3228 23.447 21.2588 25.9365 21.9967Z' fill='%236B46FE'/%3e%3cpath d='M13.3578 20.316C12.775 19.7063 10.8709 20.6007 9.10487 22.3139C7.33879 24.0271 6.37952 25.9102 6.96226 26.5199C7.54501 27.1297 9.4491 26.2352 11.2152 24.522C12.9813 22.8089 13.9405 20.9258 13.3578 20.316Z' fill='%236B46FE'/%3e%3cpath d='M70.2098 10L75.3049 15.0945L52 15.0945' stroke='%23D0CAE7' stroke-width='3'/%3e%3cpath d='M60.7902 29.5945L55.6951 24.5L79 24.5' stroke='%23D0CAE7' stroke-width='3'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0_38844_290434'%3e%3crect width='120' height='38' fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
    }), $70d67bf1bab7f4f3$var$c.default.createElement("h1", {
        className: "pera-wallet-redirect-modal__content__title"
    }, "Can't Launch Pera"), $70d67bf1bab7f4f3$var$c.default.createElement("p", {
        className: "pera-wallet-redirect-modal__content__description"
    }, "We couldn't redirect you to Pera Wallet automatically. Please try again."), $70d67bf1bab7f4f3$var$c.default.createElement("p", {
        className: "pera-wallet-redirect-modal__content__install-pera-text"
    }, "Don't have Pera Wallet installed yet?", $70d67bf1bab7f4f3$var$c.default.createElement("br", null), $70d67bf1bab7f4f3$var$c.default.createElement("a", {
        onClick: o,
        className: "pera-wallet-redirect-modal__content__install-pera-text__link",
        href: "https://perawallet.app/download/",
        rel: "noopener noreferrer",
        target: "_blank"
    }, "Tap here to install."))), $70d67bf1bab7f4f3$var$c.default.createElement("a", {
        onClick: o,
        className: "pera-wallet-redirect-modal__launch-pera-wallet-button",
        href: $70d67bf1bab7f4f3$var$E(),
        rel: "noopener noreferrer",
        target: "_blank"
    }, `Launch ${n}`))));
    function o() {
        e();
    }
}
$70d67bf1bab7f4f3$var$f(".pera-wallet-wallet-redirect-modal {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 56px;\n  grid-template-rows: auto 48px;\n  height: 100%;\n  padding: 4px;\n  padding-bottom: 70px;\n}\n\n.pera-wallet-redirect-modal__content {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n\n.pera-wallet-redirect-modal__content__title {\n  margin: 20px 0 8px;\n  color: #2c3559;\n  font-size: 18px;\n  font-weight: 600;\n  line-height: 22px;\n  letter-spacing: -0.26px;\n}\n\n.pera-wallet-redirect-modal__content__description,\n.pera-wallet-redirect-modal__content__install-pera-text {\n  color: #2c3559;\n  max-width: 271px;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: -0.09px;\n  text-align: center;\n}\n\n.pera-wallet-redirect-modal__content__description {\n  margin-bottom: 24px;\n}\n\n.pera-wallet-redirect-modal__content__install-pera-text__link {\n  color: #6b46fe;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: -0.09px;\n  text-align: center;\n}\n\n.pera-wallet-redirect-modal__launch-pera-wallet-button {\n  display: block;\n  padding: 14px;\n  color: #ffffff;\n  background-color: #6b46fe;\n  border-radius: 12px;\n  text-decoration: none;\n  text-align: center;\n  font-size: 14px;\n  line-height: 20px;\n  letter-spacing: -0.09px;\n  font-weight: 500;\n}");
function $70d67bf1bab7f4f3$var$W(e) {
    const n = document.createElement("div");
    return n.setAttribute("id", e), document.body.appendChild(n), n;
}
function $70d67bf1bab7f4f3$var$q(e) {
    return (n, t)=>{
        const a = $70d67bf1bab7f4f3$var$W("pera-wallet-connect-modal-wrapper");
        $70d67bf1bab7f4f3$var$d.default.render($70d67bf1bab7f4f3$var$c.default.createElement($70d67bf1bab7f4f3$var$z, {
            onClose: function() {
                $70d67bf1bab7f4f3$var$j("pera-wallet-connect-modal-wrapper"), t(), e && e(new $70d67bf1bab7f4f3$var$m({
                    type: "SESSION_CONNECT"
                }, "The action canceled by the user."));
            },
            uri: n
        }), a);
    };
}
function $70d67bf1bab7f4f3$var$j(e) {
    const n = document.getElementById(e);
    n && n.remove();
}
function $70d67bf1bab7f4f3$var$R(e) {
    return [
        {
            id: "scan-to-connect",
            title: "Scan to connect",
            description: $70d67bf1bab7f4f3$var$c.default.createElement($70d67bf1bab7f4f3$var$c.default.Fragment, null, $70d67bf1bab7f4f3$var$c.default.createElement("p", {
                className: "pera-wallet-connect-modal-desktop-mode__accordion__description"
            }, "Scan the QR code below with Pera Wallet's scan feature."), $70d67bf1bab7f4f3$var$c.default.createElement($bdjGp$QRCode, {
                id: "pera-wallet-connect-modal-desktop-mode__qr-code",
                logoImage: "data:image/svg+xml,%3csvg width='56' height='56' viewBox='0 0 56 56' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M46.0001 28C46.0001 37.9411 37.9412 46 28.0001 46C18.0589 46 10.0001 37.9411 10.0001 28C10.0001 18.0589 18.0589 10 28.0001 10C37.9412 10 46.0001 18.0589 46.0001 28Z' fill='%23FFEE55'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M55.84 28C55.84 43.3756 43.3756 55.84 28 55.84C12.6244 55.84 0.160034 43.3756 0.160034 28C0.160034 12.6244 12.6244 0.160034 28 0.160034C43.3756 0.160034 55.84 12.6244 55.84 28ZM28 46C37.9412 46 46 37.9412 46 28C46 18.0589 37.9412 10 28 10C18.0589 10 10 18.0589 10 28C10 37.9412 18.0589 46 28 46Z' fill='white'/%3e%3cpath d='M29.1968 20.969C29.6267 22.7541 29.4814 24.3243 28.8721 24.4762C28.2629 24.6281 27.4204 23.3041 26.9904 21.519C26.5604 19.734 26.7058 18.1637 27.3151 18.0119C27.9243 17.86 28.7668 19.184 29.1968 20.969Z' fill='black'/%3e%3cpath d='M36.2967 22.5038C35.3445 21.4925 33.4501 21.7666 32.0653 23.116C30.6806 24.4654 30.33 26.3791 31.2823 27.3904C32.2345 28.4016 34.129 28.1275 35.5137 26.7781C36.8984 25.4287 37.249 23.515 36.2967 22.5038Z' fill='black'/%3e%3cpath d='M28.7233 37.9888C29.3325 37.8369 29.4565 36.1779 29.0001 34.2832C28.5437 32.3886 27.6799 30.9758 27.0706 31.1277C26.4613 31.2795 26.3374 32.9386 26.7937 34.8332C27.2501 36.7279 28.114 38.1407 28.7233 37.9888Z' fill='black'/%3e%3cpath d='M22.5124 23.4296C24.2702 23.949 25.5546 24.8603 25.3812 25.4649C25.2078 26.0696 23.6423 26.1387 21.8846 25.6193C20.1268 25.0998 18.8424 24.1886 19.0157 23.584C19.1891 22.9793 20.7546 22.9102 22.5124 23.4296Z' fill='black'/%3e%3cpath d='M33.9211 30.2574C35.7868 30.8087 37.1586 31.7458 36.9853 32.3504C36.8119 32.9551 35.1589 32.9983 33.2933 32.447C31.4276 31.8957 30.0557 30.9586 30.2291 30.354C30.4024 29.7493 32.0554 29.7061 33.9211 30.2574Z' fill='black'/%3e%3cpath d='M24.4903 28.9887C24.0544 28.5359 22.6246 29.1949 21.2968 30.4606C19.969 31.7262 19.246 33.1193 19.6819 33.5721C20.1178 34.0249 21.5476 33.3659 22.8754 32.1002C24.2032 30.8345 24.9262 29.4415 24.4903 28.9887Z' fill='black'/%3e%3c/svg%3e",
                value: e,
                qrStyle: "dots",
                quietZone: 20,
                logoWidth: 48,
                logoHeight: 48,
                eyeRadius: 5
            }))
        },
        {
            id: "new-to-pera-wallet",
            title: "New to Pera Wallet?",
            description: $70d67bf1bab7f4f3$var$c.default.createElement($70d67bf1bab7f4f3$var$c.default.Fragment, null, $70d67bf1bab7f4f3$var$c.default.createElement("p", {
                className: "pera-wallet-connect-modal-desktop-mode__accordion__description"
            }, "Scan the QR code with your phone to download Pera Wallet."), $70d67bf1bab7f4f3$var$c.default.createElement($bdjGp$QRCode, {
                id: "pera-wallet-connect-modal-desktop-mode__qr-code",
                logoImage: "data:image/svg+xml,%3csvg width='56' height='56' viewBox='0 0 56 56' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M46.0001 28C46.0001 37.9411 37.9412 46 28.0001 46C18.0589 46 10.0001 37.9411 10.0001 28C10.0001 18.0589 18.0589 10 28.0001 10C37.9412 10 46.0001 18.0589 46.0001 28Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M55.84 28C55.84 43.3756 43.3756 55.84 28 55.84C12.6244 55.84 0.160034 43.3756 0.160034 28C0.160034 12.6244 12.6244 0.160034 28 0.160034C43.3756 0.160034 55.84 12.6244 55.84 28ZM28 46C37.9412 46 46 37.9412 46 28C46 18.0589 37.9412 10 28 10C18.0589 10 10 18.0589 10 28C10 37.9412 18.0589 46 28 46Z' fill='white'/%3e%3cpath d='M29.1968 20.969C29.6267 22.7541 29.4814 24.3243 28.8721 24.4762C28.2629 24.6281 27.4204 23.3041 26.9904 21.519C26.5604 19.734 26.7058 18.1637 27.3151 18.0119C27.9243 17.86 28.7668 19.184 29.1968 20.969Z' fill='%23FFEE55'/%3e%3cpath d='M36.2967 22.5038C35.3445 21.4925 33.4501 21.7666 32.0653 23.116C30.6806 24.4654 30.33 26.3791 31.2823 27.3904C32.2345 28.4016 34.129 28.1275 35.5137 26.7781C36.8984 25.4287 37.249 23.515 36.2967 22.5038Z' fill='%23FFEE55'/%3e%3cpath d='M28.7233 37.9888C29.3325 37.8369 29.4565 36.1779 29.0001 34.2832C28.5437 32.3886 27.6799 30.9758 27.0706 31.1277C26.4613 31.2795 26.3374 32.9386 26.7937 34.8332C27.2501 36.7279 28.114 38.1407 28.7233 37.9888Z' fill='%23FFEE55'/%3e%3cpath d='M22.5124 23.4296C24.2702 23.949 25.5546 24.8603 25.3812 25.4649C25.2078 26.0696 23.6423 26.1387 21.8846 25.6193C20.1268 25.0998 18.8424 24.1886 19.0157 23.584C19.1891 22.9793 20.7546 22.9102 22.5124 23.4296Z' fill='%23FFEE55'/%3e%3cpath d='M33.9211 30.2574C35.7868 30.8087 37.1586 31.7458 36.9853 32.3504C36.8119 32.9551 35.1589 32.9983 33.2933 32.447C31.4276 31.8957 30.0557 30.9586 30.2291 30.354C30.4024 29.7493 32.0554 29.7061 33.9211 30.2574Z' fill='%23FFEE55'/%3e%3cpath d='M24.4903 28.9887C24.0544 28.5359 22.6246 29.1949 21.2968 30.4606C19.969 31.7262 19.246 33.1193 19.6819 33.5721C20.1178 34.0249 21.5476 33.3659 22.8754 32.1002C24.2032 30.8345 24.9262 29.4415 24.4903 28.9887Z' fill='%23FFEE55'/%3e%3c/svg%3e",
                value: "https://perawallet.app/download/",
                qrStyle: "dots",
                quietZone: 20,
                logoWidth: 48,
                logoHeight: 48,
                eyeRadius: 5
            }))
        }
    ];
}
function $70d67bf1bab7f4f3$var$V() {
    return function(e, n = {}) {
        return fetch(e, n).then((e)=>e.json()).then((e)=>e);
    }("https://wc.perawallet.app/servers.json");
}
function $70d67bf1bab7f4f3$var$O() {
    return $70d67bf1bab7f4f3$var$p(this, void 0, void 0, function*() {
        const e = localStorage.getItem($70d67bf1bab7f4f3$var$x);
        if (e) return e;
        const n = function(e) {
            const n = e.slice();
            for(let e1 = n.length - 1; e1 > 0; e1--){
                const t = Math.floor(Math.random() * (e1 + 1));
                [n[e1], n[t]] = [
                    n[t],
                    n[e1]
                ];
            }
            return n;
        }((yield $70d67bf1bab7f4f3$var$V()).servers)[0];
        return localStorage.setItem($70d67bf1bab7f4f3$var$x, n), n;
    });
}
function $70d67bf1bab7f4f3$var$$(e) {
    return Uint8Array.from(window.atob(e), (e)=>e.charCodeAt(0));
}
function $70d67bf1bab7f4f3$var$D(e) {
    return {
        open: $70d67bf1bab7f4f3$var$q(e),
        close: ()=>$70d67bf1bab7f4f3$var$j("pera-wallet-connect-modal-wrapper")
    };
}

window.global = window, window.Buffer = window.Buffer || $bdjGp$Buffer, $70d67bf1bab7f4f3$exports.PeraWalletConnect = class {
    constructor(e){
        this.bridge = (null == e ? void 0 : e.bridge) || localStorage.getItem($70d67bf1bab7f4f3$var$x) || "", (null == e ? void 0 : e.deep_link) && localStorage.setItem($70d67bf1bab7f4f3$var$b, e.deep_link), (null == e ? void 0 : e.app_meta) && localStorage.setItem($70d67bf1bab7f4f3$var$v, JSON.stringify(e.app_meta)), this.connector = null;
    }
    connect() {
        return new Promise((e, n)=>$70d67bf1bab7f4f3$var$p(this, void 0, void 0, function*() {
                var t;
                try {
                    (null === (t = this.connector) || void 0 === t ? void 0 : t.connected) && (yield this.connector.killSession());
                    let a = "";
                    this.bridge || (a = yield $70d67bf1bab7f4f3$var$O()), this.connector = new $70d67bf1bab7f4f3$var$i.default({
                        bridge: this.bridge || a,
                        qrcodeModal: $70d67bf1bab7f4f3$var$D(n)
                    }), yield this.connector.createSession({
                        chainId: 4160
                    }), this.connector.on("connect", (t, a)=>{
                        var o, l, r;
                        t && n(t), e((null === (o = this.connector) || void 0 === o ? void 0 : o.accounts) || []), r = (null === (l = this.connector) || void 0 === l ? void 0 : l.accounts) || [], localStorage.setItem($70d67bf1bab7f4f3$var$C, JSON.stringify({
                            type: "pera-wallet",
                            accounts: r,
                            selectedAccount: r[0]
                        }));
                    });
                } catch (e1) {
                    console.log(e1);
                    const { name: t1  } = $70d67bf1bab7f4f3$var$y();
                    n(new $70d67bf1bab7f4f3$var$m({
                        type: "SESSION_CONNECT",
                        detail: e1
                    }, e1.message || `There was an error while connecting to ${t1}`));
                }
            }));
    }
    reconnectSession() {
        var e;
        return $70d67bf1bab7f4f3$var$p(this, void 0, void 0, function*() {
            try {
                if (this.connector) return this.connector.accounts || [];
                if ((yield $70d67bf1bab7f4f3$var$V()).servers.includes(this.bridge)) return this.connector = new $70d67bf1bab7f4f3$var$i.default({
                    bridge: this.bridge,
                    qrcodeModal: $70d67bf1bab7f4f3$var$D()
                }), (null === (e = this.connector) || void 0 === e ? void 0 : e.accounts) || [];
                throw new $70d67bf1bab7f4f3$var$m({
                    type: "SESSION_RECONNECT",
                    detail: ""
                }, "The bridge server is not active anymore. Disconnecting.");
            } catch (e1) {
                this.disconnect();
                const { name: n  } = $70d67bf1bab7f4f3$var$y();
                throw new $70d67bf1bab7f4f3$var$m({
                    type: "SESSION_RECONNECT",
                    detail: e1
                }, e1.message || `There was an error while reconnecting to ${n}`);
            }
        });
    }
    disconnect() {
        var e;
        const n = null === (e = this.connector) || void 0 === e ? void 0 : e.killSession();
        return null == n || n.then(()=>{
            this.connector = null;
        }), localStorage.removeItem($70d67bf1bab7f4f3$var$_), localStorage.removeItem($70d67bf1bab7f4f3$var$C), localStorage.removeItem($70d67bf1bab7f4f3$var$x), n;
    }
    signTransaction(e, t) {
        if (!this.connector) throw new Error("PeraWalletConnect was not initialized correctly.");
        const a = e.flatMap((e)=>e.map((e)=>{
                let n;
                t && !(e.signers || []).includes(t) && (n = []);
                const a = {
                    txn: (o = e.txn, $70d67bf1bab7f4f3$require$Buffer.from($70d67bf1bab7f4f3$var$s.default.encodeUnsignedTransaction(o)).toString("base64"))
                };
                var o;
                return Array.isArray(n) && (a.signers = n), a;
            })), o = $bdjGp$formatJsonRpcRequest1("algo_signTxn", [
            a
        ]);
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) && function() {
            const e = $70d67bf1bab7f4f3$var$W("pera-wallet-redirect-modal-wrapper");
            $70d67bf1bab7f4f3$var$d.default.render($70d67bf1bab7f4f3$var$c.default.createElement($70d67bf1bab7f4f3$var$H, {
                onClose: function() {
                    $70d67bf1bab7f4f3$var$j("pera-wallet-redirect-modal-wrapper");
                }
            }), e);
        }(), this.connector.sendCustomRequest(o).then((e)=>{
            const n = e.filter(Boolean);
            return "string" == typeof n[0] ? n.map($70d67bf1bab7f4f3$var$$) : n.map((e)=>Uint8Array.from(e));
        }).catch((e)=>Promise.reject(new $70d67bf1bab7f4f3$var$m({
                type: "SIGN_TRANSACTIONS",
                detail: e
            }, e.message || "Failed to sign transaction"))).finally(()=>$70d67bf1bab7f4f3$var$j("pera-wallet-redirect-modal-wrapper"));
    }
};



var $747425b437e121da$require$Buffer = $bdjGp$Buffer;
class $747425b437e121da$export$2e2bcd8739ae039 {
    static alerts = true;
    static EnableDeveloperAPI = false;
    static indexer = "http://localhost:8980";
    static algod = "http://localhost:4001";
    static token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    static devGenHash = "sC3P7e2SdbqKJK0tbiCdK9tdSpbe6XeCGKdoNzmlj0E=";
    static devGenId = "devnet-v1.0";
    static index = 0;
    static pipeConnector = "myAlgoWallet";
    static chainId = 0;
    static main = true;
    static address = "";
    static txID = "";
    static myBalance = 0;
    static connector = new (0, $bdjGp$walletconnectclient)({
        bridge: "https://bridge.walletconnect.org",
        qrcodeModal: (0, $bdjGp$algorandwalletconnectqrcodemodal)
    });
    static init = ()=>{
        return new (0, $bdjGp$randlabsmyalgoconnect)();
    };
    static wallet = new (0, $bdjGp$randlabsmyalgoconnect)();
    static PeraWallet = new (0, $70d67bf1bab7f4f3$exports.PeraWalletConnect)();
    static async balance(address) {
        let indexerURL = (0, $f9fadc54e6246fd9$export$af2f4f7298579991)(this.main, this.EnableDeveloperAPI, this);
        let url2 = indexerURL + "/v2/accounts/" + address;
        try {
            let data = await fetch(url2);
            let data2 = await data.json();
            let data3 = JSON.stringify(data2.account.amount / 1000000);
            this.myBalance = data3;
            return data3;
        } catch (error) {
            console.log(error);
            return 0;
        }
    }
    static async readAccount(address) {
        let indexerURL = (0, $f9fadc54e6246fd9$export$af2f4f7298579991)(this.main, this.EnableDeveloperAPI, this);
        let url2 = indexerURL + "/v2/accounts/" + address;
        try {
            let data = await fetch(url2);
            let data2 = await data.json();
            return data2;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    static async connect(wallet) {
        switch(this.pipeConnector){
            case "myAlgoWallet":
                try {
                    const accounts = await this.wallet.connect();
                    let item1 = accounts[0];
                    item1 = item1["address"];
                    this.address = item1;
                } catch (err) {
                    console.error(err);
                }
                break;
            case "PeraWallet":
                try {
                    const peraAccounts = await this.PeraWallet.reconnectSession();
                    if (peraAccounts.length > 0) {
                        this.PeraWallet.connector?.on("disconnect", function() {
                            $747425b437e121da$export$2e2bcd8739ae039.PeraWallet.disconnect();
                            $747425b437e121da$export$2e2bcd8739ae039.address = "";
                        });
                        this.address = peraAccounts[0];
                    }
                } catch (error) {
                    let newAccounts = await this.PeraWallet.connect();
                    // Setup the disconnect event listener
                    this.PeraWallet.connector?.on("disconnect", function() {
                        $747425b437e121da$export$2e2bcd8739ae039.PeraWallet.disconnect();
                        $747425b437e121da$export$2e2bcd8739ae039.address = "";
                    });
                    this.address = newAccounts[0];
                }
                break;
            case "WalletConnect":
                this.connector.on("disconnect", (error, payload)=>{
                    if (error) throw error;
                    // Delete connector
                    this.connector = new (0, $bdjGp$walletconnectclient)({
                        bridge: "https://bridge.walletconnect.org",
                        qrcodeModal: (0, $bdjGp$algorandwalletconnectqrcodemodal)
                    });
                });
                this.connector.on("session_update", (error, payload)=>{
                    alert(error + payload);
                    if (error) throw error;
                    // Get updated accounts and chainId
                    const { accounts: accounts , chainId: chainId  } = payload.params[0];
                    if (accounts.length > 0) this.address = accounts[0];
                    this.chainId = chainId;
                });
                const { accounts: accounts1 , chainId: chainId  } = await this.connector.connect();
                if (accounts1.length > 0) this.address = accounts1[0];
                if (!this.connector.connected) await this.connector.createSession().then((data)=>{
                    console.log(data);
                });
                else if (this.connector.accounts.length > 0) this.address = this.connector.accounts[0];
                break;
            case "AlgoSigner":
                if (typeof AlgoSigner !== "undefined") {
                    await AlgoSigner.connect();
                    let data = await AlgoSigner.accounts({
                        ledger: this.main === true ? "MainNet" : "TestNet"
                    });
                    this.address = data[0].address;
                } else alert("AlgoSigner is NOT installed.");
                break;
            case "PipeWallet":
                (0, $bd9d603c9db7d2f4$export$2e2bcd8739ae039).openWallet();
                break;
            default:
                break;
        }
        return this.address;
    }
    static async sign(mytxnb, group = false, signed = []) {
        console.log(mytxnb);
        let signedTxn = "";
        if (this.pipeConnector === "myAlgoWallet") {
            if (!group) {
                signedTxn = await this.wallet.signTransaction(mytxnb.toByte());
                signedTxn = signedTxn.blob;
                return signedTxn;
            } else {
                signedTxn = await this.wallet.signTransaction(mytxnb.map((txn)=>txn.toByte()));
                let txnsb = [];
                signedTxn.forEach((item)=>{
                    txnsb.push(item.blob);
                });
                return txnsb;
            }
        } else {
            if (this.pipeConnector === "PeraWallet") {
                if (!group) {
                    signedTxn = await this.PeraWallet.signTransaction([
                        [
                            {
                                txn: mytxnb,
                                signers: [
                                    $747425b437e121da$export$2e2bcd8739ae039.address
                                ]
                            }
                        ]
                    ]);
                    return signedTxn[0];
                } else {
                    let index = 0;
                    let groupToSign = [];
                    mytxnb.forEach((txn)=>{
                        groupToSign.push([
                            {
                                txn: txn,
                                signers: [
                                    signed[index] || $747425b437e121da$export$2e2bcd8739ae039.address
                                ]
                            }
                        ]);
                        index++;
                    });
                    signedTxn = await this.PeraWallet.signTransaction(groupToSign);
                    let txnsb1 = [];
                    signedTxn.forEach((item)=>{
                        txnsb1.push(item);
                    });
                    return txnsb1;
                }
            } else if (this.pipeConnector === "PipeWallet") {
                (0, $bd9d603c9db7d2f4$export$2e2bcd8739ae039).openWallet();
                (0, $bd9d603c9db7d2f4$export$2e2bcd8739ae039).previewTxn(mytxnb);
                let approved = await (0, $bd9d603c9db7d2f4$export$2e2bcd8739ae039).waitForApproval();
                if (approved) {
                    if (!group) {
                        let signedTxn1 = (0, $bd9d603c9db7d2f4$export$2e2bcd8739ae039).sign(mytxnb);
                        (0, $bd9d603c9db7d2f4$export$2e2bcd8739ae039).clearPreviewTxn();
                        (0, $bd9d603c9db7d2f4$export$2e2bcd8739ae039).close();
                        return signedTxn1.blob;
                    } else {
                        let signedGroup = [];
                        mytxnb.forEach((transaction)=>{
                            let signed = (0, $bd9d603c9db7d2f4$export$2e2bcd8739ae039).sign(transaction);
                            signedGroup.push(signed.blob);
                        });
                        console.log("Signed Group:");
                        console.log(signedGroup);
                        return signedGroup;
                    }
                } else return {};
            } else {
                let txns = [];
                if (!group) txns[0] = mytxnb;
                else txns = mytxnb;
                console.log("Unencoded txns:");
                console.log(txns);
                /*
                          let prototxn = {
                              "amt": mytxnb.amount,
                              "fee": 1000,
                              "fv": mytxnb.lastRound - 1000,
                              "gen": mytxnb.genesisID,
                              "gh": new Uint8Array(Buffer.from(mytxnb.genesisHash, 'base64')),
                              "lv": mytxnb.lastRound,
                              "note": mytxnb.note,
                              "rcv": new Uint8Array(base32.decode.asBytes(mytxnb.to).slice(0, 32)),
                              "snd": new Uint8Array(base32.decode.asBytes(this.address).slice(0, 32)),
                              "type": "pay"
                          }
                  
                          let prototxnASA = {};
                          let prototxnb = encode(prototxn);
                          let txns = [];
                          txns[0] = prototxnb;
                  
                          if (this.index !== 0) {
                              prototxnASA = {
                                  "aamt": mytxnb.amount,
                                  "arcv": new Uint8Array(base32.decode.asBytes(mytxnb.to).slice(0, 32)),
                                  "fee": 1000,
                                  "fv": mytxnb.lastRound - 1000,
                                  "gen": mytxnb.genesisID,
                                  "gh": new Uint8Array(Buffer.from(mytxnb.genesisHash, 'base64')),
                                  "lv": mytxnb.lastRound,
                                  "note": mytxnb.note,
                                  "snd": new Uint8Array(base32.decode.asBytes(this.address).slice(0, 32)),
                                  "type": "axfer",
                                  "xaid": parseInt(mytxnb.assetIndex)
                              }
                              prototxnb = encode(prototxnASA);
                              txns[0] = prototxnb;
                          }
                          
                                  console.log(prototxnb)
                                  console.log(new TextDecoder().decode(prototxnb))
                                  console.log(JSON.stringify(decode(prototxnb)))
                          */ // Sign transaction
                let txnsToSign = txns.map((txnb)=>{
                    let packed = (0, $bdjGp$algosdk).encodeUnsignedTransaction(txnb);
                    let encodedTxn = $747425b437e121da$require$Buffer.from(packed).toString("base64");
                    if (this.pipeConnector === "WalletConnect") return {
                        txn: encodedTxn,
                        message: ""
                    };
                    else return {
                        txn: encodedTxn
                    };
                });
                let nestedArray = [];
                if (group && signed.length !== 0) {
                    for(let i = 0; i < signed.length; i++)if (signed[i] !== $747425b437e121da$export$2e2bcd8739ae039.address) txnsToSign[i].signers = [];
                }
                let requestParams = [
                    txnsToSign
                ];
                console.log("TXNs to Sign:");
                console.log(requestParams);
                if (this.pipeConnector === "WalletConnect") {
                    let request = (0, $bdjGp$formatJsonRpcRequest)("algo_signTxn", requestParams);
                    //request.id = this.chainId
                    console.log(request);
                    try {
                        let result = await this.connector.sendCustomRequest(request);
                        console.log("Response from walletconnect: ", result);
                        let binarySignedTxs = await result.map((tx)=>{
                            if (tx !== null) return new Uint8Array($747425b437e121da$require$Buffer.from(tx, "base64"));
                            else return tx;
                        });
                        return !group ? binarySignedTxs[0] : binarySignedTxs;
                    } catch (error) {
                        console.log(error);
                    }
                } else try {
                    let result1 = await AlgoSigner.signTxn(requestParams);
                    console.log("Response from AlgoSigner: ", result1);
                    let binarySignedTxs1 = await result1.map((tx)=>{
                        if (tx !== null) return new Uint8Array($747425b437e121da$require$Buffer.from(tx.blob, "base64"));
                        else return tx;
                    });
                    return !group ? binarySignedTxs1[0] : binarySignedTxs1;
                } catch (error1) {
                    console.log(error1);
                }
            }
        }
    }
    static makeAppCall(appId, appArgs, params, accounts, assets, applications) {
        let id = parseInt(appId);
        let converted = [];
        appArgs.forEach((arg)=>{
            converted.push(typeof arg === "number" ? (0, $bdjGp$algosdk).encodeUint64(arg) : (0, $8f93b32a6c0e37c6$export$9eb9df9ab63c5b26)(arg));
        });
        appArgs = converted;
        let txn = (0, $bdjGp$algosdk).makeApplicationNoOpTxn(this.address, params, id, appArgs, accounts, applications, assets);
        return txn;
    }
    static makeTransfer(address, amt, myNote, index = 0, params = {}) {
        const buf = new Array(myNote.length);
        const encodedNote = new Uint8Array(buf);
        for(let i = 0, strLen = myNote.length; i < strLen; i++)encodedNote[i] = myNote.charCodeAt(i);
        console.log("My encoded note: " + encodedNote);
        let txn = {
            from: this.address,
            to: address,
            amount: parseInt(amt),
            note: encodedNote,
            genesisId: params.genesisID,
            genesisHash: params.genesisHash,
            type: "pay",
            flatFee: true,
            fee: 1000,
            firstRound: parseInt(params["last-round"]),
            lastRound: parseInt(params["last-round"] + 1000)
        };
        if (index !== 0) {
            this.index = index;
            txn.type = "axfer";
            txn.assetIndex = parseInt(index);
            txn = (0, $bdjGp$algosdk).makeAssetTransferTxn(txn.from, txn.to, undefined, undefined, txn.fee, txn.amount, txn.firstRound, txn.lastRound, txn.note, txn.genesisHash, txn.genesisId, txn.assetIndex, undefined);
        } else txn = (0, $bdjGp$algosdk).makePaymentTxn(txn.from, txn.to, txn.fee, txn.amount, undefined, txn.firstRound, txn.lastRound, txn.note, txn.genesisHash, txn.genesisId, undefined);
        txn.fee = 1000;
        console.log(txn);
        return txn;
    }
    static async send(address, amt, myNote, _sendingAddress, _wallet, index = 0) {
        let client = await (0, $f9fadc54e6246fd9$export$541a25d3f1cfc0e0)(this.main, this.EnableDeveloperAPI, this);
        let transServer = client.tranServer;
        let params = client.params;
        try {
            let txn = this.makeTransfer(address, amt, myNote, index, params);
            let signedTxn = {};
            signedTxn = await this.sign(txn);
            console.log(signedTxn);
            let transactionID = await (0, $f9fadc54e6246fd9$export$ac97a2973783b050)(signedTxn, transServer, this.EnableDeveloperAPI, this.token, this.alerts);
            this.txID = transactionID;
            if (transactionID === undefined) transactionID = "Transaction failed";
            return transactionID;
        } catch (err) {
            console.error(err);
        }
    }
    static async createAsa(asaObject = {}) {
        let txn = {};
        let client = await (0, $f9fadc54e6246fd9$export$541a25d3f1cfc0e0)(this.main, this.EnableDeveloperAPI, this);
        let transServer = client.tranServer;
        let params = client.params;
        let myNote = asaObject.note || "New Asa";
        let buf = new Array(myNote.length);
        let encodedNote = new Uint8Array(buf);
        for(let i = 0, strLen = myNote.length; i < strLen; i++)encodedNote[i] = myNote.charCodeAt(i);
        asaObject.note = encodedNote;
        console.log("My encoded note: " + encodedNote);
        txn = (0, $519670716f2f5d9f$export$2e2bcd8739ae039)(params, asaObject);
        txn.fee = 1000;
        console.log(txn);
        let signedTxn = {};
        signedTxn = await this.sign(txn, false);
        console.log(signedTxn);
        try {
            let transactionID = await (0, $f9fadc54e6246fd9$export$ac97a2973783b050)(signedTxn, transServer, this.EnableDeveloperAPI, this.token, this.alerts);
            this.txID = transactionID;
            if (transactionID === undefined) return "Transaction failed";
            else {
                let assetID = await (0, $8f93b32a6c0e37c6$export$d3d410a0cc430ae4)(transactionID, this.main, this);
                console.log(assetID);
                return assetID;
            }
        } catch (err) {
            console.error(err);
        }
    }
    static async compileProgram(client, teal) {
        let encoder = new TextEncoder();
        let programBytes = encoder.encode(teal);
        try {
            let compileResponse = await client.compile(programBytes).do();
            return compileResponse;
        } catch (error) {
            console.log(error);
        }
    }
    static async deployTeal(teal = "", teal2 = "", bytesInts = [], appArgs = [], onComplete = 0) {
        if (teal !== "") {
            let algodClient = (0, $f9fadc54e6246fd9$export$9c012f479970d716)(this);
            let clientb = await (0, $f9fadc54e6246fd9$export$541a25d3f1cfc0e0)(this.main, this.EnableDeveloperAPI);
            let transServer = clientb.tranServer;
            let compiled = "";
            compiled = await this.compileProgram(algodClient, teal);
            let compiledClear = await this.compileProgram(algodClient, teal2);
            let params = {};
            params = await algodClient.getTransactionParams().do();
            let converted = [];
            appArgs.forEach((arg)=>{
                converted.push(typeof arg === "number" ? (0, $bdjGp$algosdk).encodeUint64(arg) : (0, $8f93b32a6c0e37c6$export$9eb9df9ab63c5b26)(arg));
            });
            appArgs = converted;
            console.log(appArgs);
            let lbytes = bytesInts[0];
            let gbytes = bytesInts[1];
            let lints = bytesInts[2];
            let gints = bytesInts[3];
            let txn = (0, $bdjGp$algosdk).makeApplicationCreateTxnFromObject({
                suggestedParams: params,
                from: this.address,
                numLocalByteSlices: lbytes,
                numGlobalByteSlices: gbytes,
                numLocalInts: lints,
                numGlobalInts: gints,
                appArgs: appArgs,
                approvalProgram: new Uint8Array($747425b437e121da$require$Buffer.from(compiled.result, "base64")),
                clearProgram: new Uint8Array($747425b437e121da$require$Buffer.from(compiledClear.result, "base64")),
                onComplete: onComplete
            });
            try {
                let signedTxn = await this.sign(txn);
                console.log(signedTxn);
                let response = await (0, $f9fadc54e6246fd9$export$ac97a2973783b050)(signedTxn, transServer, this.EnableDeveloperAPI, this.token, this.alerts);
                console.log(response);
                this.txID = response;
                let appId = await (0, $8f93b32a6c0e37c6$export$ea2e6ca933693a38)(response, this.main, this);
                console.log(appId);
                if (appId === undefined) appId = "Transaction failed";
                return appId;
            } catch (error) {
                console.log(error);
            }
        } else console.log("Teal program or clear program empty");
    }
    static async optIn(appId = 0, appArgs = []) {
        let algodClient = (0, $f9fadc54e6246fd9$export$9c012f479970d716)(this);
        let clientb = await (0, $f9fadc54e6246fd9$export$541a25d3f1cfc0e0)(this.main, this.EnableDeveloperAPI, this);
        let transServer = clientb.tranServer;
        let params = await algodClient.getTransactionParams().do();
        let converted = [];
        appArgs.forEach((arg)=>{
            converted.push(typeof arg === "number" ? (0, $bdjGp$algosdk).encodeUint64(arg) : (0, $8f93b32a6c0e37c6$export$9eb9df9ab63c5b26)(arg));
        });
        appArgs = converted;
        let txn = "";
        txn = (0, $bdjGp$algosdk).makeApplicationOptInTxnFromObject({
            suggestedParams: params,
            from: this.address,
            appIndex: parseInt(appId),
            appArgs: appArgs
        });
        try {
            let signedTxn = await this.sign(txn);
            console.log(signedTxn);
            let response = await (0, $f9fadc54e6246fd9$export$ac97a2973783b050)(signedTxn, transServer, this.EnableDeveloperAPI, this.token, this.alerts);
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    static async appCall(appId, appArgs, accounts, assets, applications) {
        let clientb = await (0, $f9fadc54e6246fd9$export$541a25d3f1cfc0e0)(this.main, this.EnableDeveloperAPI);
        let transServer = clientb.tranServer;
        let params = clientb.params;
        let txn = this.makeAppCall(appId, appArgs, params, accounts, assets, applications);
        try {
            let signedTxn = await this.sign(txn);
            console.log(signedTxn);
            let response = await (0, $f9fadc54e6246fd9$export$ac97a2973783b050)(signedTxn, transServer, this.EnableDeveloperAPI, this.token, this.alerts);
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    static async getParams() {
        let client = await (0, $f9fadc54e6246fd9$export$541a25d3f1cfc0e0)(this.main, this.EnableDeveloperAPI, this);
        return client.params;
    }
    static async deleteApp(appId = 0) {
        let algodClient = (0, $f9fadc54e6246fd9$export$9c012f479970d716)(this);
        let params = await algodClient.getTransactionParams().do();
        let txn = (0, $bdjGp$algosdk).makeApplicationDeleteTxnFromObject({
            suggestedParams: params,
            from: this.address,
            appIndex: parseInt(appId)
        });
        let signedTxn = await this.sign(txn);
        let clientb = await (0, $f9fadc54e6246fd9$export$541a25d3f1cfc0e0)(this.main, this.EnableDeveloperAPI, this);
        let transServer = clientb.tranServer;
        try {
            let response = await (0, $f9fadc54e6246fd9$export$ac97a2973783b050)(signedTxn, transServer, this.EnableDeveloperAPI, this.token, this.alerts);
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    static async appCallWithTxn(appId = 0, appArgs = [], reciever = "", amount = 0, note = "", index = 0, accounts, assets) {
        let id = parseInt(appId);
        let algodClient = (0, $f9fadc54e6246fd9$export$9c012f479970d716)(this);
        let clientb = await (0, $f9fadc54e6246fd9$export$541a25d3f1cfc0e0)(this.main, this.EnableDeveloperAPI, this);
        let params = clientb.params;
        let txns = [
            this.makeAppCall(id, appArgs, params, accounts, assets),
            this.makeTransfer(reciever, amount, note, index, params)
        ];
        txns = (0, $bdjGp$algosdk).assignGroupID(txns);
        console.log(txns);
        let signedTxn = await this.sign(txns, true);
        console.log(signedTxn);
        try {
            let response = await algodClient.sendRawTransaction(signedTxn).do();
            if (response.txId !== undefined) return response.txId;
            else if (this.alerts) alert(response.message);
        } catch (error) {
            console.log(error);
        }
    }
    static async getAppCreator(appid) {
        let data = undefined;
        let dataObj = undefined;
        let id = undefined;
        let url = "";
        url = (0, $f9fadc54e6246fd9$export$af2f4f7298579991)(this.main, this.EnableDeveloperAPI, this);
        data = await fetch(url + "/v2/applications/" + parseInt(appid));
        dataObj = await data.json();
        id = await dataObj.application.params.creator;
        return id;
    }
    static async readGlobalState(appId) {
        let data = await (0, $8f93b32a6c0e37c6$export$3b51e524fb02f02d)(this.main, appId, this);
        return data;
    }
}
window.pipeline = $747425b437e121da$export$2e2bcd8739ae039;
window.PipeWallet = (0, $bd9d603c9db7d2f4$export$2e2bcd8739ae039);
window.pipeEscrow = (0, $21f68222a4383ea5$export$2e2bcd8739ae039); /* usage

update balance at intervals:

componentDidMount() {
      this.interval = setInterval(() => this.setState({balance: Pipeline.myBalance}), 1000);
    }

var balance = 0;

Pipeline.balance(address).then(data => balance = data);

const myAlgoWallet = Pipeline.init();

//useTestNet

Pipeline.main = false;

Pipeline.connect(myAlgoWallet)
    .then(data => {
        console.log(data);
    });

Pipeline.send(address, amount, note, sendingAddress, myAlgowallet, index)
    .then(data => {
        console.log(data);
    });

    */ 


export {$747425b437e121da$export$2e2bcd8739ae039 as default, $bd9d603c9db7d2f4$export$2e2bcd8739ae039 as PipeWallet, $f9fadc54e6246fd9$export$ac97a2973783b050 as sendTxns, $21f68222a4383ea5$export$2e2bcd8739ae039 as Escrow};
//# sourceMappingURL=index.js.map
