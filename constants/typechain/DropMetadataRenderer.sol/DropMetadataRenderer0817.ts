/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../common";

export interface DropMetadataRenderer0817Interface extends utils.Interface {
  functions: {
    "contractURI()": FunctionFragment;
    "initializeWithData(bytes)": FunctionFragment;
    "metadataBaseByContract(address)": FunctionFragment;
    "provenanceHashes(address)": FunctionFragment;
    "tokenURI(uint256)": FunctionFragment;
    "updateMetadataBase(address,string,string)": FunctionFragment;
    "updateMetadataBaseWithDetails(address,string,string,string,uint256)": FunctionFragment;
    "updateProvenanceHash(address,bytes32)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "contractURI"
      | "initializeWithData"
      | "metadataBaseByContract"
      | "provenanceHashes"
      | "tokenURI"
      | "updateMetadataBase"
      | "updateMetadataBaseWithDetails"
      | "updateProvenanceHash"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "contractURI",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "initializeWithData",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "metadataBaseByContract",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "provenanceHashes",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenURI",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateMetadataBase",
    values: [string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "updateMetadataBaseWithDetails",
    values: [string, string, string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateProvenanceHash",
    values: [string, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "contractURI",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "initializeWithData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "metadataBaseByContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "provenanceHashes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "updateMetadataBase",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateMetadataBaseWithDetails",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateProvenanceHash",
    data: BytesLike
  ): Result;

  events: {
    "MetadataUpdated(address,string,string,string,uint256)": EventFragment;
    "ProvenanceHashUpdated(address,bytes32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "MetadataUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProvenanceHashUpdated"): EventFragment;
}

export interface MetadataUpdatedEventObject {
  target: string;
  metadataBase: string;
  metadataExtension: string;
  contractURI: string;
  freezeAt: BigNumber;
}
export type MetadataUpdatedEvent = TypedEvent<
  [string, string, string, string, BigNumber],
  MetadataUpdatedEventObject
>;

export type MetadataUpdatedEventFilter = TypedEventFilter<MetadataUpdatedEvent>;

export interface ProvenanceHashUpdatedEventObject {
  target: string;
  provenanceHash: string;
}
export type ProvenanceHashUpdatedEvent = TypedEvent<
  [string, string],
  ProvenanceHashUpdatedEventObject
>;

export type ProvenanceHashUpdatedEventFilter =
  TypedEventFilter<ProvenanceHashUpdatedEvent>;

export interface DropMetadataRenderer0817 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DropMetadataRenderer0817Interface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    contractURI(overrides?: CallOverrides): Promise<[string]>;

    initializeWithData(
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    metadataBaseByContract(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, BigNumber] & {
        base: string;
        extension: string;
        contractURI: string;
        freezeAt: BigNumber;
      }
    >;

    provenanceHashes(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[string]>;

    tokenURI(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    updateMetadataBase(
      target: string,
      baseUri: string,
      newContractUri: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateMetadataBaseWithDetails(
      target: string,
      metadataBase: string,
      metadataExtension: string,
      newContractURI: string,
      freezeAt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateProvenanceHash(
      target: string,
      provenanceHash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  contractURI(overrides?: CallOverrides): Promise<string>;

  initializeWithData(
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  metadataBaseByContract(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<
    [string, string, string, BigNumber] & {
      base: string;
      extension: string;
      contractURI: string;
      freezeAt: BigNumber;
    }
  >;

  provenanceHashes(arg0: string, overrides?: CallOverrides): Promise<string>;

  tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  updateMetadataBase(
    target: string,
    baseUri: string,
    newContractUri: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateMetadataBaseWithDetails(
    target: string,
    metadataBase: string,
    metadataExtension: string,
    newContractURI: string,
    freezeAt: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateProvenanceHash(
    target: string,
    provenanceHash: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    contractURI(overrides?: CallOverrides): Promise<string>;

    initializeWithData(
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    metadataBaseByContract(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, BigNumber] & {
        base: string;
        extension: string;
        contractURI: string;
        freezeAt: BigNumber;
      }
    >;

    provenanceHashes(arg0: string, overrides?: CallOverrides): Promise<string>;

    tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    updateMetadataBase(
      target: string,
      baseUri: string,
      newContractUri: string,
      overrides?: CallOverrides
    ): Promise<void>;

    updateMetadataBaseWithDetails(
      target: string,
      metadataBase: string,
      metadataExtension: string,
      newContractURI: string,
      freezeAt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    updateProvenanceHash(
      target: string,
      provenanceHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "MetadataUpdated(address,string,string,string,uint256)"(
      target?: string | null,
      metadataBase?: null,
      metadataExtension?: null,
      contractURI?: null,
      freezeAt?: null
    ): MetadataUpdatedEventFilter;
    MetadataUpdated(
      target?: string | null,
      metadataBase?: null,
      metadataExtension?: null,
      contractURI?: null,
      freezeAt?: null
    ): MetadataUpdatedEventFilter;

    "ProvenanceHashUpdated(address,bytes32)"(
      target?: string | null,
      provenanceHash?: null
    ): ProvenanceHashUpdatedEventFilter;
    ProvenanceHashUpdated(
      target?: string | null,
      provenanceHash?: null
    ): ProvenanceHashUpdatedEventFilter;
  };

  estimateGas: {
    contractURI(overrides?: CallOverrides): Promise<BigNumber>;

    initializeWithData(
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    metadataBaseByContract(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    provenanceHashes(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenURI(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    updateMetadataBase(
      target: string,
      baseUri: string,
      newContractUri: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateMetadataBaseWithDetails(
      target: string,
      metadataBase: string,
      metadataExtension: string,
      newContractURI: string,
      freezeAt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateProvenanceHash(
      target: string,
      provenanceHash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    contractURI(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initializeWithData(
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    metadataBaseByContract(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    provenanceHashes(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenURI(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    updateMetadataBase(
      target: string,
      baseUri: string,
      newContractUri: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateMetadataBaseWithDetails(
      target: string,
      metadataBase: string,
      metadataExtension: string,
      newContractURI: string,
      freezeAt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateProvenanceHash(
      target: string,
      provenanceHash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
