const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
var app = express();
var contractInteraction = require("./Web3/contractInteraction");
var doTx = contractInteraction.doTransaction;
var getNonce = contractInteraction.getNonceForAddress;
var getInfo = contractInteraction.getInfo;
app.use(bodyParser.json());
app.use(cors());
// address = 0xeE21a5572f6089924AF72019F653E32812e87cF4;  /nonce/0xeE21a5572f6089924AF72019F653E32812e87cF4
app.get("/nonce/:address", (req, res) => {
    console.log(req.params.address);
    var address = req.params.address;

    getNonce(address).then((value) => {
        console.log(value);
        var message = {
            nonce: value
        }
        res.status(200).send(message);
    }).catch((err) => {
        console.log(err);
    });
});
app.post("/publish", (req, res) => {
    // web3 code calling
    var txObj = req.body;
    var nonce = req.body.nonce;

    // console.log(req);
    console.log(txObj);
    delete txObj.nonce;



    txObjString = JSON.stringify(txObj);
    doTx(txObjString, nonce).then((value) => {
        console.log(value);
        res.status(200).send(value.transactionHash);
    }).catch((err) => {
        res.status(200).send("tao holo");
    });
});
app.get("/verify/:tx", (req, res) => {

    var info = getInfo(req.params.tx);
    info.then((value) => {
        console.log("sending from then " + value);
        res.status(200).send(value);
    }).catch((error) => {
        console.log("Sending from catch");
        res.status(400).send("Transaction Hash Not Found");
    });

});

app.get("/test/", (req, res) => {

    res.status(200).send("used for testing stuffs");

});

var port = 9092;
app.listen(port, () => {
    console.log("server started successfully at port " + port);
});