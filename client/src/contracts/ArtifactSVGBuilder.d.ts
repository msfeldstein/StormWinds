/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface ArtifactSVGBuilderInterface extends ethers.utils.Interface {
  functions: {
    "getClassification(uint256)": FunctionFragment;
    "getGear(uint256)": FunctionFragment;
    "getStorm(uint256)": FunctionFragment;
    "svgForToken(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getClassification",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getGear",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getStorm",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "svgForToken",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "getClassification",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getGear", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getStorm", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "svgForToken",
    data: BytesLike
  ): Result;

  events: {};
}

export class ArtifactSVGBuilder extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: ArtifactSVGBuilderInterface;

  functions: {
    getClassification(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getGear(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getStorm(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    svgForToken(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  getClassification(
    tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  getGear(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  getStorm(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  svgForToken(
    _tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    getClassification(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getGear(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    getStorm(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    svgForToken(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    getClassification(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getGear(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getStorm(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    svgForToken(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getClassification(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getGear(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getStorm(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    svgForToken(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
