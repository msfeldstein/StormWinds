/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ArtifactSVGBuilder,
  ArtifactSVGBuilderInterface,
} from "../ArtifactSVGBuilder";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "classification",
        type: "string",
      },
      {
        internalType: "string",
        name: "storm",
        type: "string",
      },
      {
        internalType: "string",
        name: "gear",
        type: "string",
      },
    ],
    name: "svgForStrings",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610af9806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063f7b47b2b14610030575b600080fd5b61004361003e366004610544565b610059565b604051610050919061094d565b60405180910390f35b6060610063610496565b84815260408051808201825260018082527f200000000000000000000000000000000000000000000000000000000000000060208084018290528086019384528486018981528551808701875293845283820192909252606086018390526080860188905285519351915194516000956100e49594909290918a91016105ee565b60405160208183030381529060405290506000816040516020016101089190610659565b604051602081830303815290604052905060006101656101278a610195565b84610131856102eb565b87516040808a015160808b015191516101519695949392906020016106c5565b6040516020818303038152906040526102eb565b9050806040516020016101789190610908565b604051602081830303815290604052945050505050949350505050565b6060816101d557505060408051808201909152600181527f3000000000000000000000000000000000000000000000000000000000000000602082015290565b8160005b81156101ff57806101e981610a12565b91506101f89050600a83610998565b91506101d9565b60008167ffffffffffffffff81111561022857634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015610252576020820181803683370190505b5090505b84156102e3576102676001836109cb565b9150610274600a86610a2d565b61027f906030610980565b60f81b8183815181106102a257634e487b7160e01b600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506102dc600a86610998565b9450610256565b949350505050565b80516060908061030b575050604080516020810190915260008152919050565b6000600361031a836002610980565b6103249190610998565b61032f9060046109ac565b9050600061033e826020610980565b67ffffffffffffffff81111561036457634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f19166020018201604052801561038e576020820181803683370190505b5090506000604051806060016040528060408152602001610a84604091399050600181016020830160005b8681101561041a576003818a01810151603f601282901c8116860151600c83901c8216870151600684901c831688015192909316870151600891821b60ff94851601821b92841692909201901b91160160e01b8352600490920191016103b9565b506003860660018114610434576002811461046057610488565b7f3d3d000000000000000000000000000000000000000000000000000000000000600119830152610488565b7f3d000000000000000000000000000000000000000000000000000000000000006000198301525b505050918152949350505050565b6040518060a001604052806005905b60608152602001906001900390816104a55790505090565b600082601f8301126104cd578081fd5b813567ffffffffffffffff808211156104e8576104e8610a6d565b604051601f8301601f19908116603f0116810190828211818310171561051057610510610a6d565b81604052838152866020858801011115610528578485fd5b8360208701602083013792830160200193909352509392505050565b60008060008060808587031215610559578384fd5b84359350602085013567ffffffffffffffff80821115610577578485fd5b610583888389016104bd565b94506040870135915080821115610598578384fd5b6105a4888389016104bd565b935060608701359150808211156105b9578283fd5b506105c6878288016104bd565b91505092959194509250565b600081516105e48185602086016109e2565b9290920192915050565b60008651610600818460208b016109e2565b865190830190610614818360208b016109e2565b8651910190610627818360208a016109e2565b855191019061063a8183602089016109e2565b845191019061064d8183602088016109e2565b01979650505050505050565b7f3c7376673e3c746578743e00000000000000000000000000000000000000000081526000825161069181600b8501602087016109e2565b7f3c2f746578743e3c2f7376673e00000000000000000000000000000000000000600b939091019283015250601801919050565b7f7b226e616d65223a2022417274696661637420230000000000000000000000008152600087516106fd816014850160208c016109e2565b7f3a20000000000000000000000000000000000000000000000000000000000000601491840191820152875161073a816016840160208c016109e2565b7f222c20226465736372697074696f6e223a202253746f726d57696e6473206172601692909101918201527f7469666163747320617265207573656420746f20636f6e74726f6c207468652060368201527f73746f726d73207468726f7567686f757420746865207265616c6d732e222c2060568201527f22696d616765223a2022646174613a696d6167652f7376672b786d6c3b62617360768201527f6536342c0000000000000000000000000000000000000000000000000000000060968201526108fb6108d26108cc6108a361089d61087461086e61081f609a89018f6105d2565b7f222c202261747472696275746573223a205b7b22636c6173736966696361746981527f6f6e223a20220000000000000000000000000000000000000000000000000000602082015260260190565b8c6105d2565b7f222c202273746f726d223a2022000000000000000000000000000000000000008152600d0190565b896105d2565b7f222c20226f626a656374223a20220000000000000000000000000000000000008152600e0190565b866105d2565b7f227d5d7d00000000000000000000000000000000000000000000000000000000815260040190565b9998505050505050505050565b7f646174613a6170706c69636174696f6e2f6a736f6e3b6261736536342c00000081526000825161094081601d8501602087016109e2565b91909101601d0192915050565b602081526000825180602084015261096c8160408501602087016109e2565b601f01601f19169190910160400192915050565b6000821982111561099357610993610a41565b500190565b6000826109a7576109a7610a57565b500490565b60008160001904831182151516156109c6576109c6610a41565b500290565b6000828210156109dd576109dd610a41565b500390565b60005b838110156109fd5781810151838201526020016109e5565b83811115610a0c576000848401525b50505050565b6000600019821415610a2657610a26610a41565b5060010190565b600082610a3c57610a3c610a57565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fdfe4142434445464748494a4b4c4d4e4f505152535455565758595a6162636465666768696a6b6c6d6e6f707172737475767778797a303132333435363738392b2fa26469706673582212205adef3fc99168d9b60b3a077a3e14e2934bfe914401f419c8639a51124fe5b8f64736f6c63430008040033";

export class ArtifactSVGBuilder__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ArtifactSVGBuilder> {
    return super.deploy(overrides || {}) as Promise<ArtifactSVGBuilder>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ArtifactSVGBuilder {
    return super.attach(address) as ArtifactSVGBuilder;
  }
  connect(signer: Signer): ArtifactSVGBuilder__factory {
    return super.connect(signer) as ArtifactSVGBuilder__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ArtifactSVGBuilderInterface {
    return new utils.Interface(_abi) as ArtifactSVGBuilderInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ArtifactSVGBuilder {
    return new Contract(address, _abi, signerOrProvider) as ArtifactSVGBuilder;
  }
}