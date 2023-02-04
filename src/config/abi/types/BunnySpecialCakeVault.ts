/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
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
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface BunnySpecialCakeVaultInterface extends utils.Interface {
  functions: {
    "bunnyId()": FunctionFragment;
    "bunnyMintingStation()": FunctionFragment;
    "cakeVault()": FunctionFragment;
    "campaignId()": FunctionFragment;
    "canClaim(address)": FunctionFragment;
    "changeCampaignId(uint256)": FunctionFragment;
    "changeEndBlock(uint256)": FunctionFragment;
    "changeNumberPoints(uint256)": FunctionFragment;
    "changeThresholdTimestamp(uint256)": FunctionFragment;
    "endBlock()": FunctionFragment;
    "hasClaimed(address)": FunctionFragment;
    "mintNFT()": FunctionFragment;
    "numberPoints()": FunctionFragment;
    "owner()": FunctionFragment;
    "pancakeProfile()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "thresholdTimestamp()": FunctionFragment;
    "tokenURI()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "bunnyId", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "bunnyMintingStation",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "cakeVault", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "campaignId",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "canClaim", values: [string]): string;
  encodeFunctionData(
    functionFragment: "changeCampaignId",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "changeEndBlock",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "changeNumberPoints",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "changeThresholdTimestamp",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "endBlock", values?: undefined): string;
  encodeFunctionData(functionFragment: "hasClaimed", values: [string]): string;
  encodeFunctionData(functionFragment: "mintNFT", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "numberPoints",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pancakeProfile",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "thresholdTimestamp",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "tokenURI", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "bunnyId", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "bunnyMintingStation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "cakeVault", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "campaignId", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "canClaim", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "changeCampaignId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeEndBlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeNumberPoints",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeThresholdTimestamp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "endBlock", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasClaimed", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mintNFT", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "numberPoints",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pancakeProfile",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "thresholdTimestamp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "BunnyMint(address,uint256,uint8)": EventFragment;
    "NewCampaignId(uint256)": EventFragment;
    "NewEndBlock(uint256)": EventFragment;
    "NewNumberPoints(uint256)": EventFragment;
    "NewThresholdTimestamp(uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "BunnyMint"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewCampaignId"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewEndBlock"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewNumberPoints"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewThresholdTimestamp"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export type BunnyMintEvent = TypedEvent<
  [string, BigNumber, number],
  { to: string; tokenId: BigNumber; bunnyId: number }
>;

export type BunnyMintEventFilter = TypedEventFilter<BunnyMintEvent>;

export type NewCampaignIdEvent = TypedEvent<
  [BigNumber],
  { campaignId: BigNumber }
>;

export type NewCampaignIdEventFilter = TypedEventFilter<NewCampaignIdEvent>;

export type NewEndBlockEvent = TypedEvent<[BigNumber], { endBlock: BigNumber }>;

export type NewEndBlockEventFilter = TypedEventFilter<NewEndBlockEvent>;

export type NewNumberPointsEvent = TypedEvent<
  [BigNumber],
  { numberPoints: BigNumber }
>;

export type NewNumberPointsEventFilter = TypedEventFilter<NewNumberPointsEvent>;

export type NewThresholdTimestampEvent = TypedEvent<
  [BigNumber],
  { thresholdTimestamp: BigNumber }
>;

export type NewThresholdTimestampEventFilter =
  TypedEventFilter<NewThresholdTimestampEvent>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface BunnySpecialCakeVault extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: BunnySpecialCakeVaultInterface;

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
    bunnyId(overrides?: CallOverrides): Promise<[number]>;

    bunnyMintingStation(overrides?: CallOverrides): Promise<[string]>;

    cakeVault(overrides?: CallOverrides): Promise<[string]>;

    campaignId(overrides?: CallOverrides): Promise<[BigNumber]>;

    canClaim(
      _userAddress: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    changeCampaignId(
      _campaignId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    changeEndBlock(
      _endBlock: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    changeNumberPoints(
      _numberPoints: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    changeThresholdTimestamp(
      _thresholdTimestamp: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    endBlock(overrides?: CallOverrides): Promise<[BigNumber]>;

    hasClaimed(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    mintNFT(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    numberPoints(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pancakeProfile(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    thresholdTimestamp(overrides?: CallOverrides): Promise<[BigNumber]>;

    tokenURI(overrides?: CallOverrides): Promise<[string]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  bunnyId(overrides?: CallOverrides): Promise<number>;

  bunnyMintingStation(overrides?: CallOverrides): Promise<string>;

  cakeVault(overrides?: CallOverrides): Promise<string>;

  campaignId(overrides?: CallOverrides): Promise<BigNumber>;

  canClaim(_userAddress: string, overrides?: CallOverrides): Promise<boolean>;

  changeCampaignId(
    _campaignId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  changeEndBlock(
    _endBlock: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  changeNumberPoints(
    _numberPoints: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  changeThresholdTimestamp(
    _thresholdTimestamp: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  endBlock(overrides?: CallOverrides): Promise<BigNumber>;

  hasClaimed(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  mintNFT(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  numberPoints(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  pancakeProfile(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  thresholdTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

  tokenURI(overrides?: CallOverrides): Promise<string>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    bunnyId(overrides?: CallOverrides): Promise<number>;

    bunnyMintingStation(overrides?: CallOverrides): Promise<string>;

    cakeVault(overrides?: CallOverrides): Promise<string>;

    campaignId(overrides?: CallOverrides): Promise<BigNumber>;

    canClaim(_userAddress: string, overrides?: CallOverrides): Promise<boolean>;

    changeCampaignId(
      _campaignId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    changeEndBlock(
      _endBlock: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    changeNumberPoints(
      _numberPoints: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    changeThresholdTimestamp(
      _thresholdTimestamp: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    endBlock(overrides?: CallOverrides): Promise<BigNumber>;

    hasClaimed(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    mintNFT(overrides?: CallOverrides): Promise<void>;

    numberPoints(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    pancakeProfile(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    thresholdTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    tokenURI(overrides?: CallOverrides): Promise<string>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "BunnyMint(address,uint256,uint8)"(
      to?: string | null,
      tokenId?: BigNumberish | null,
      bunnyId?: BigNumberish | null
    ): BunnyMintEventFilter;
    BunnyMint(
      to?: string | null,
      tokenId?: BigNumberish | null,
      bunnyId?: BigNumberish | null
    ): BunnyMintEventFilter;

    "NewCampaignId(uint256)"(campaignId?: null): NewCampaignIdEventFilter;
    NewCampaignId(campaignId?: null): NewCampaignIdEventFilter;

    "NewEndBlock(uint256)"(endBlock?: null): NewEndBlockEventFilter;
    NewEndBlock(endBlock?: null): NewEndBlockEventFilter;

    "NewNumberPoints(uint256)"(numberPoints?: null): NewNumberPointsEventFilter;
    NewNumberPoints(numberPoints?: null): NewNumberPointsEventFilter;

    "NewThresholdTimestamp(uint256)"(
      thresholdTimestamp?: null
    ): NewThresholdTimestampEventFilter;
    NewThresholdTimestamp(
      thresholdTimestamp?: null
    ): NewThresholdTimestampEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    bunnyId(overrides?: CallOverrides): Promise<BigNumber>;

    bunnyMintingStation(overrides?: CallOverrides): Promise<BigNumber>;

    cakeVault(overrides?: CallOverrides): Promise<BigNumber>;

    campaignId(overrides?: CallOverrides): Promise<BigNumber>;

    canClaim(
      _userAddress: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    changeCampaignId(
      _campaignId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    changeEndBlock(
      _endBlock: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    changeNumberPoints(
      _numberPoints: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    changeThresholdTimestamp(
      _thresholdTimestamp: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    endBlock(overrides?: CallOverrides): Promise<BigNumber>;

    hasClaimed(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    mintNFT(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    numberPoints(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pancakeProfile(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    thresholdTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    tokenURI(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    bunnyId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    bunnyMintingStation(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    cakeVault(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    campaignId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    canClaim(
      _userAddress: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    changeCampaignId(
      _campaignId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    changeEndBlock(
      _endBlock: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    changeNumberPoints(
      _numberPoints: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    changeThresholdTimestamp(
      _thresholdTimestamp: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    endBlock(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    hasClaimed(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    mintNFT(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    numberPoints(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pancakeProfile(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    thresholdTimestamp(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenURI(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
