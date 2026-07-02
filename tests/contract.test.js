import assert from 'node:assert';
import { test } from 'node:test';
import * as contract from '../contract/managed/contract/index.js';

test('Midnight Moonshots Contract compiles and generates managed bindings', () => {
  assert.ok(contract, 'Contract module should be defined');
  assert.ok(Object.keys(contract).length > 0, 'Contract module should have exports');
});
