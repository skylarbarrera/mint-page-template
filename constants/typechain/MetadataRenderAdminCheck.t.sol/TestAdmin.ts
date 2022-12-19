/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
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

export interface TestAdminInterface extends utils.Interface {
  functions: {
    "updateSomething(address)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "updateSomething"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "updateSomething",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "updateSomething",
    data: BytesLike
  ): Result;

  events: {
    "Ok()": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Ok"): EventFragment;
}

export interface OkEventObject {}
export type OkEvent = TypedEvent<[], OkEventObject>;

export type OkEventFilter = TypedEventFilter<OkEvent>;

export interface TestAdmin extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TestAdminInterface;

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
    updateSomething(
      target: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  updateSomething(
    target: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    updateSomething(target: string, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "Ok()"(): OkEventFilter;
    Ok(): OkEventFilter;
  };

  estimateGas: {
    updateSomething(
      target: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    updateSomething(
      target: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
