import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Contract } from '../contract/managed/contract/index.js';

test('ProofWork Contract Initialization & Circuits Verification (Level 1 - Level 3)', async (t) => {
  await t.test('instantiates ProofWork contract successfully with 6 ZK circuits', () => {
    const contract = new Contract({});
    assert.ok(contract, 'ProofWork Contract should be instantiated');
    assert.ok(contract.circuits.storeMessage, 'storeMessage circuit should exist');
    assert.ok(contract.circuits.createAgreement, 'createAgreement circuit should exist');
    assert.ok(contract.circuits.verifyAgreement, 'verifyAgreement circuit should exist');
    assert.ok(contract.circuits.fileComplaint, 'fileComplaint circuit should exist');
    assert.ok(contract.circuits.castPrivateVote, 'castPrivateVote circuit should exist');
    assert.ok(contract.circuits.submitAnonymousFeedback, 'submitAnonymousFeedback circuit should exist');
  });

  await t.test('verifies circuit function signatures for Level 3 Anonymous Survey category', () => {
    const contract = new Contract({});
    assert.equal(typeof contract.circuits.createAgreement, 'function');
    assert.equal(typeof contract.circuits.verifyAgreement, 'function');
    assert.equal(typeof contract.circuits.fileComplaint, 'function');
    assert.equal(typeof contract.circuits.castPrivateVote, 'function');
    assert.equal(typeof contract.circuits.submitAnonymousFeedback, 'function');
  });
});
