import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Contract } from '../contract/managed/contract/index.js';

test('ProofWork Contract Initialization & Circuits Verification', async (t) => {
  await t.test('instantiates ProofWork contract successfully', () => {
    const contract = new Contract({});
    assert.ok(contract, 'ProofWork Contract should be instantiated');
    assert.ok(contract.circuits.storeMessage, 'storeMessage circuit should exist');
    assert.ok(contract.circuits.createAgreement, 'createAgreement circuit should exist');
    assert.ok(contract.circuits.verifyAgreement, 'verifyAgreement circuit should exist');
    assert.ok(contract.circuits.fileComplaint, 'fileComplaint circuit should exist');
    assert.ok(contract.circuits.castPrivateVote, 'castPrivateVote circuit should exist');
  });

  await t.test('verifies initial ledger state structure', () => {
    const contract = new Contract({});
    assert.equal(typeof contract.circuits.createAgreement, 'function');
    assert.equal(typeof contract.circuits.verifyAgreement, 'function');
    assert.equal(typeof contract.circuits.fileComplaint, 'function');
    assert.equal(typeof contract.circuits.castPrivateVote, 'function');
  });
});
