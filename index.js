import MyAlgo from '@randlabs/myalgo-connect'
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { encode, decode } from "algo-msgpack-with-bigint";
import base32 from 'hi-base32';
import { CachedKeyDecoder } from 'algo-msgpack-with-bigint/dist/CachedKeyDecoder';


export default class Pipeline {
    static init() {
        this.EnableDeveloperAPI = false;
        this.indexer = "http://localhost:8980";
        this.algod = "http://localhost:4001";
        this.token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
        this.devGenHash = "sC3P7e2SdbqKJK0tbiCdK9tdSpbe6XeCGKdoNzmlj0E="
        this.devGenId = "devnet-v1.0"
        this.index = 0;
        this.pipeConnector = "myAlgoWallet";
        this.main = true;
        this.address = "";
        this.txID = "";
        this.myBalance = 0;
        

        return new MyAlgo();
    }

    static async balance(address) {

        let indexerURL = 'https://'

        if (this.main == true) {
            indexerURL = indexerURL + 'algoexplorerapi.io/idx2/v2/accounts/'
        }
        else {
            indexerURL = indexerURL + "testnet.algoexplorerapi.io/idx2/v2/accounts/"
        }

        if (this.EnableDeveloperAPI === true) { indexerURL = this.indexer + "/v2/accounts/" }

        let url2 = indexerURL + address
        try {
            let data = await fetch(url2)
            let data2 = await data.json()
            let data3 = JSON.stringify(data2.account.amount / 1000000) + ' Algos'
            this.myBalance = data3;
            return data3;
        } catch (error) {
            console.log(error);
            return 0;
        }
    }

    static async connect(wallet) {
        this.address = "";

        switch (this.pipeConnector) {
            case "myAlgoWallet":
                try {
                    const accounts = await wallet.connect()
                    let item1 = accounts[0]
                    item1 = item1['address']
                    this.address = item1;
                    return item1;
                } catch (err) {
                    console.error(err)
                }
                break;
            case "WalletConnect":
                this.connector = new WalletConnect({
                    bridge: "https://bridge.walletconnect.org", // Required
                    qrcodeModal: QRCodeModal,
                });
                this.connector.on("connect", (error, payload) => {
                    if (error) {
                        throw error;
                    }
                    this.address = payload.params[0].accounts[0];
                }
                );

                this.connector.on("session_update", (error, payload) => {
                    alert(error + payload)
                    if (error) {
                        throw error;
                    }
                    // Get updated accounts 

                });

                if (!this.connector.connected) {

                    await this.connector.createSession().then(data => {console.log(data)})

                }
                else {
                    await this.connector.killSession();
                    await this.connector.createSession();
                }
                break;
            case "AlgoSigner":
                if (typeof AlgoSigner !== 'undefined') {
                    await AlgoSigner.connect()
                    let data = await AlgoSigner.accounts({ ledger: (this.main === true) ? 'MainNet' : 'TestNet' })
                    let SignerAdd = data[0].address
                    this.address = SignerAdd;
                    return SignerAdd

                } else {
                    alert('AlgoSigner is NOT installed.');
                };
                break;
            default:
                break;
        }

        const getAddress = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.connector.accounts[0]);
            }, 10000);
        });

        const address = await getAddress;
        return address;
    }

    static async walletConnectSign(mytxnb) {

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
        /*
                console.log(prototxnb)
                console.log(new TextDecoder().decode(prototxnb))
                console.log(JSON.stringify(decode(prototxnb)))
        */
        // Sign transaction
        const txnsToSign = txns.map(txnb => {
            const encodedTxn = Buffer.from(txnb).toString("base64");

            if (this.pipeConnetor === "WalletConnect") {
                return {
                    txn: encodedTxn,
                    message: 'Description of transaction being signed',
                    // Note: if the transaction does not need to be signed (because it's part of an atomic group
                    // that will be signed by another party), specify an empty singers array like so:
                    // signers: [],
                };
            }
            else {
                return { txn: encodedTxn }
            }
        });

        const requestParams = [txnsToSign];
        console.log(requestParams)

        if (this.pipeConnector === "WalletConnect") {

            var request = formatJsonRpcRequest("algo_signTxn", requestParams);

            request.id = this.connector._handshakeId;

            console.log(request);

            try {
                const result = await this.connector.sendCustomRequest(request);
                const signedPartialTxn = result[0]
                const rawSignedTxn = Buffer.from(signedPartialTxn, "base64");
                return new Uint8Array(rawSignedTxn);
            }
            catch (error) { console.log(error) }
        }
        else {
            try {
                const result = await AlgoSigner.signTxn(requestParams)
                const signedPartialTxn = result[0].blob
                const rawSignedTxn = Buffer.from(signedPartialTxn, "base64");
                return new Uint8Array(rawSignedTxn);
            }
            catch (error) { console.log(error) }
        }
    }

    static async send(address, amt, myNote, _sendingAddress, wallet, index = 0) {

        let paramServer = 'https://'
        let transServer = 'https://'

        if (this.main == true) {
            paramServer = paramServer + 'algoexplorerapi.io/v2/transactions/params/'
            transServer = transServer + 'algoexplorerapi.io/v2/transactions/'
        }
        else {
            paramServer = paramServer + "testnet.algoexplorerapi.io/v2/transactions/params/"
            transServer = transServer + "testnet.algoexplorerapi.io/v2/transactions/"
        }

        if (this.EnableDeveloperAPI === true) {
            paramServer = this.algod + "/v2/transactions/params/";
            transServer = this.algod + "/v2/transactions/";
        }

        var buf = new Array(myNote.length)
        var encodedNote = new Uint8Array(buf)
        for (var i = 0, strLen = myNote.length; i < strLen; i++) {
            encodedNote[i] = myNote.charCodeAt(i)
        }

        console.log('My encoded note: ' + encodedNote)

        try {
            let params = {};
            if (this.EnableDeveloperAPI === false) {
                params = await (await fetch(paramServer)).json()
            }
            else {
                params = await (await fetch(paramServer, {
                    method: "GET",
                    headers: {
                        'X-Algo-API-Token': this.token,
                    }
                })).json()
                console.log("Params: " + JSON.stringify(params))
            }


            let txn = {
                from: this.address,
                to: address,
                amount: parseInt(amt),
                note: encodedNote,
                genesisID: 'mainnet-v1.0',
                genesisHash: 'wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=',
                type: 'pay',
                flatFee: true,
                fee: 1000,
                firstRound: params['last-round'],
                lastRound: params['last-round'] + 1000,
            }

            if (index !== 0) {
                this.index = index;
                txn.type = 'axfer'
                txn.assetIndex = parseInt(index)

            }

            if (this.main == false) {
                txn.genesisID = 'testnet-v1.0';
                txn.genesisHash = 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=';
            }

            if (this.EnableDeveloperAPI === true) {
                txn.genesisID = this.devGenId;
                txn.genesisHash = this.devGenHash;
            }

            console.log(txn);

            let signedTxn = {};

            if (this.pipeConnector === "myAlgoWallet") {
                signedTxn = await wallet.signTransaction(txn)
                signedTxn = signedTxn.blob;
            }
            else {
                signedTxn = await this.walletConnectSign(txn)
                if(this.pipeConnector === "AlgoSigner"){
                    console.log(signedTxn)
                }
            }

            console.log(signedTxn)

            let requestHeaders = { 'Content-Type': 'application/x-binary' };

            if (this.EnableDeveloperAPI === true) {
                requestHeaders = {
                    'X-Algo-API-Token': this.token
                }
            }

            let transactionID = await fetch(transServer, {
                method: 'POST',
                headers: requestHeaders,
                body: signedTxn
            })
                .then(response => response.json())
                .then(data => {
                    return data.txId
                })
                .catch(error => {
                    console.error('Error:', error)
                })

            this.txID = transactionID
            if (transactionID === undefined){transactionID = "Transaction failed"}
            return transactionID
        } catch (err) {
            console.error(err)
        }
    }
}

/* usage

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
