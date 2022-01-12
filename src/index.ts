import * as bcrypt from 'bcrypt'

class Block {
  public index: number
  public hash: string
  public previousHash: string
  public data: string
  public timestamp: number

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index
    this.hash = hash
    this.previousHash = previousHash
    this.data = data
    this.timestamp = timestamp
  }
}

const genesisBlock: Block = new Block(0, 'fwegwgwgwegwe', '', 'hello!', 12345)

let blockchain: Block[] = [genesisBlock]

const getBlockchain = (): Block[] => blockchain

const getLatestBlock = (): Block => blockchain[blockchain.length - 1]

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000)

const calculateBlockHash = async (
  index: number,
  previousHash: string,
  timestamp: number,
  data: string
): Promise<string> => {
  const encrypted: string = await bcrypt.hash(
    index + previousHash + timestamp + data,
    10
  )
  // console.log('해시계산함수', encrypted)

  return encrypted
}

const createNewBlock = async (data: string): Promise<void> => {
  const previousBlock: Block = getLatestBlock()
  const newIndex: number = previousBlock.index + 1
  const nextTimestamp: number = getNewTimeStamp()
  const nextHash: string = await calculateBlockHash(
    newIndex,
    previousBlock.hash,
    nextTimestamp,
    data
  )
  // console.log('nextHash:', nextHash)

  const newBlock: Block = new Block(
    newIndex,
    nextHash,
    previousBlock.hash,
    data,
    nextTimestamp
  )

  await addBlock(newBlock)
}

const validateStructure = (aBlock: Block): boolean => {
  return (
    typeof aBlock.index === 'number' &&
    typeof aBlock.hash === 'string' &&
    typeof aBlock.previousHash === 'string' &&
    typeof aBlock.data === 'string' &&
    typeof aBlock.timestamp === 'number'
  )
}

const getHashOfBlock = (aBlock: Block): Promise<string> => {
  return calculateBlockHash(
    aBlock.index,
    aBlock.previousHash,
    aBlock.timestamp,
    aBlock.data
  )
}

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
  if (!validateStructure(candidateBlock)) {
    return false
  } else if (previousBlock.index + 1 !== candidateBlock.index) {
    return false
  } else if (previousBlock.hash !== candidateBlock.previousHash) {
    return false
  } else if (
    !getHashOfBlock(candidateBlock).then((hashValue) => {
      if (hashValue === candidateBlock.hash) return true
      return false
    })
  ) {
    return false
  } else {
    return true
  }
}

const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(candidateBlock, getLatestBlock())) {
    blockchain.push(candidateBlock)
  }
}

// createNewBlock('second').then((value) => {
//   console.log(getBlockchain())
// })

;(async () => {
  for (let i = 0; i < 5; i++) {
    await createNewBlock(`${i + 1}번째 블록입니다.`)
    // console.log(getBlockchain())
  }
  await console.log(getBlockchain())
})()
