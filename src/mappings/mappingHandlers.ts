import { SubstrateBlock, SubstrateEvent, SubstrateExtrinsic } from '@subql/types';
import { Block, Extrinsic, Event } from '../types';

export async function handleBlock(block: SubstrateBlock): Promise<void> {
  console.log("⬜️ Handling new block: #" + block.block.header.number.toString())

  let blockRecord = new Block(
    block.block.header.number.toString(),
    block.block.header.hash.toString(),
    block.block.header.parentHash.toString()
  );
  blockRecord.timestamp = block.timestamp;

  await blockRecord.save();
}

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
  console.log("🖍️ Handling new call: " + extrinsic.extrinsic.method.method)
  let extrinsicRecord = new Extrinsic(
    extrinsic.idx.toString(),
    extrinsic.block.block.header.number.toString(),
    extrinsic.extrinsic.method.method,
    extrinsic.extrinsic.method.section,
    extrinsic.extrinsic.signer.toString(),
    extrinsic.extrinsic.nonce.toNumber(),
    JSON.stringify(extrinsic.extrinsic.args)
  );
  await extrinsicRecord.save();
}

export async function handleEvent(event: SubstrateEvent): Promise<void> {
  console.log("﹗ Handling new event: " + event.event.method)
  let eventRecord = new Event(
    event.idx.toString(),
    event.block.block.header.number.toString(),
    event.event.method,
    event.event.section,
    event.event.data.toString()
  );
  eventRecord.extrinsicId = event.extrinsic?.idx.toString();
  await eventRecord.save();
}
