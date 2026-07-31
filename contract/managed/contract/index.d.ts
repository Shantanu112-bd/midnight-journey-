import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
}

export type ImpureCircuits<PS> = {
  storeMessage(context: __compactRuntime.CircuitContext<PS>,
               newMessage_0: string): __compactRuntime.CircuitResults<PS, []>;
  createAgreement(context: __compactRuntime.CircuitContext<PS>,
                  publicTitle_0: string,
                  privateAgreementDetailsHash_0: string): __compactRuntime.CircuitResults<PS, []>;
  verifyAgreement(context: __compactRuntime.CircuitContext<PS>,
                  expectedHash_0: string): __compactRuntime.CircuitResults<PS, boolean>;
  fileComplaint(context: __compactRuntime.CircuitContext<PS>,
                encryptedComplaintHash_0: string): __compactRuntime.CircuitResults<PS, []>;
  castPrivateVote(context: __compactRuntime.CircuitContext<PS>,
                  proposalId_0: string,
                  voteChoice_0: bigint): __compactRuntime.CircuitResults<PS, []>;
}

export type ProvableCircuits<PS> = {
  storeMessage(context: __compactRuntime.CircuitContext<PS>,
               newMessage_0: string): __compactRuntime.CircuitResults<PS, []>;
  createAgreement(context: __compactRuntime.CircuitContext<PS>,
                  publicTitle_0: string,
                  privateAgreementDetailsHash_0: string): __compactRuntime.CircuitResults<PS, []>;
  verifyAgreement(context: __compactRuntime.CircuitContext<PS>,
                  expectedHash_0: string): __compactRuntime.CircuitResults<PS, boolean>;
  fileComplaint(context: __compactRuntime.CircuitContext<PS>,
                encryptedComplaintHash_0: string): __compactRuntime.CircuitResults<PS, []>;
  castPrivateVote(context: __compactRuntime.CircuitContext<PS>,
                  proposalId_0: string,
                  voteChoice_0: bigint): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
}

export type Circuits<PS> = {
  storeMessage(context: __compactRuntime.CircuitContext<PS>,
               newMessage_0: string): __compactRuntime.CircuitResults<PS, []>;
  createAgreement(context: __compactRuntime.CircuitContext<PS>,
                  publicTitle_0: string,
                  privateAgreementDetailsHash_0: string): __compactRuntime.CircuitResults<PS, []>;
  verifyAgreement(context: __compactRuntime.CircuitContext<PS>,
                  expectedHash_0: string): __compactRuntime.CircuitResults<PS, boolean>;
  fileComplaint(context: __compactRuntime.CircuitContext<PS>,
                encryptedComplaintHash_0: string): __compactRuntime.CircuitResults<PS, []>;
  castPrivateVote(context: __compactRuntime.CircuitContext<PS>,
                  proposalId_0: string,
                  voteChoice_0: bigint): __compactRuntime.CircuitResults<PS, []>;
}

export type Ledger = {
  readonly message: string;
  readonly lastAgreementHash: string;
  readonly agreementCount: bigint;
  readonly complaintCount: bigint;
  readonly totalVotes: bigint;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
