"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
// interface Human { name:string; age:number; gender:string; }
// const sayHi = (person:Human):string => {
//     console.log(`Hello ${person.name}, you are ${person.age}, you are a ${person.gender}!`);
// }
class Block {
    constructor(index, hash, prevHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.prevHash = prevHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calculateBlockHash = (index, prevHash, timestamp, data) => CryptoJS.SHA256(index + prevHash + timestamp + data).toString();
Block.validateStructure = (aBlock) => typeof aBlock.index === "number" && typeof aBlock.hash === "string" && typeof aBlock.prevHash == "string" && typeof aBlock.timestamp === "number" && typeof aBlock.data === "string";
const genesisBlock = new Block(0, "797979", "", "Hi", 123456);
let blockchain = [genesisBlock];
const getBlockchain = () => blockchain;
const getLatestBlock = () => blockchain[blockchain.length - 1];
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const prevBlock = getLatestBlock();
    const newIndex = prevBlock.index + 1;
    const newTimestamp = getNewTimeStamp();
    const newHash = Block.calculateBlockHash(newIndex, prevBlock.hash, newTimestamp, data);
    const newBlock = new Block(newIndex, newHash, prevBlock.hash, data, newTimestamp);
    addBlock(newBlock);
    return newBlock;
};
const getHashforBlock = (aBlock) => Block.calculateBlockHash(aBlock.index, aBlock.prevHash, aBlock.timestamp, aBlock.data);
const isBlockValid = (candidateBlock, prevBlock) => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    }
    else if (prevBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (prevBlock.hash !== candidateBlock.prevHash) {
        return false;
    }
    else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};
const addBlock = (candidateBlock) => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
};
createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");
console.log(blockchain);
//# sourceMappingURL=index.js.map