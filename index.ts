let blockchain:Block[] = [genesisBlock];

const getBlockchain = ():Block[] => blockchain;

const getLastestBlock = ():Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = ():number => Math.round(new Date().getTime() / 1000 );

const createNewBlock = (data:string):Block =>  {
    const prevBlock:Block = getLastestBlock();
    const newIndex: number = prevBlock.index + 1;
    const newTimestamp:number = getNewTimeStamp();
    const newHash:string = Block.calculateBlockHash(
        newIndex,
        prevBlock.hash,
        newTimestamp,
        data
    );
    const newBlock:Block = new Block(
        newIndex,
        newHash,
        prevBlock.hash,
        data,
        newTimestamp
    );
    addBlock(newBlock);
    return newBlock;

};

const getHashforBlock = (aBlock:Block):string =>
    Block.calculateBlockHash(
        aBlock.index,
        aBlock.prevHash,
        aBlock.timestamp,
        aBlock.data,
    );
const isBlockValid = (candiateBlock:Block, prevBlock:Block): boolean => {
    if(!Block.validateStructure(candidateBlock){
        return false;
    } else if (prevBlock.index +1 !== candidateBlock.index) {
        return false;
    } else if (prevBlock.hash !== candidateBlock.prevHash) {
        return false;
    } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    } else {
        return true;
    }
};

const addBlock = (candidateBlock:Block): void => {
    if(isBlockValid(candidateBlock, getLatestBlock())){
        blockchain.push(candidateBlock);
    }
};

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockchain);
export ();