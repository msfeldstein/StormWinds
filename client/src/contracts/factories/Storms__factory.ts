/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Storms, StormsInterface } from "../Storms";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_artifactAdress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "enum Storms.StormType",
        name: "",
        type: "uint8",
      },
    ],
    name: "StormBegins",
    type: "event",
  },
  {
    inputs: [],
    name: "activeStorms",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum Storms.StormType",
        name: "_storm",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_endTime",
        type: "uint256",
      },
    ],
    name: "summon",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405273ff9c1b15b16263c61d017ee9f65c50e4ae0113d7600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555034801561006557600080fd5b50604051610e94380380610e94833981810160405281019061008791906101cb565b6100a36100986100ea60201b60201c565b6100f260201b60201c565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505061023d565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000815190506101c581610226565b92915050565b6000602082840312156101dd57600080fd5b60006101eb848285016101b6565b91505092915050565b60006101ff82610206565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b61022f816101f4565b811461023a57600080fd5b50565b610c488061024c6000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80633ccfd60b1461006757806344d1992c14610071578063715018a6146100935780638da5cb5b1461009d5780639e2efc02146100bb578063f2fde38b146100d7575b600080fd5b61006f6100f3565b005b6100796101be565b60405161008a959493929190610964565b60405180910390f35b61009b61037e565b005b6100a5610406565b6040516100b2919061091b565b60405180910390f35b6100d560048036038101906100d09190610826565b61042f565b005b6100f160048036038101906100ec91906107d4565b6105bc565b005b6100fb6106b4565b73ffffffffffffffffffffffffffffffffffffffff16610119610406565b73ffffffffffffffffffffffffffffffffffffffff161461016f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161016690610a12565b60405180910390fd5b60004790503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501580156101ba573d6000803e3d6000fd5b5050565b60008060008060004260036000806004811115610204577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60ff1660ff1681526020019081526020016000205411426003600060016004811115610259577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60ff1660ff16815260200190815260200160002054114260036000600260048111156102ae577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60ff1660ff1681526020019081526020016000205411426003600060036004811115610303577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60ff1660ff16815260200190815260200160002054114260036000600480811115610357577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60ff1660ff1681526020019081526020016000205411945094509450945094509091929394565b6103866106b4565b73ffffffffffffffffffffffffffffffffffffffff166103a4610406565b73ffffffffffffffffffffffffffffffffffffffff16146103fa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103f190610a12565b60405180910390fd5b61040460006106bc565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b42811161043b57600080fd5b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff166324845721336040518263ffffffff1660e01b815260040161049b9190610936565b60206040518083038186803b1580156104b357600080fd5b505afa1580156104c7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104eb91906107fd565b61052a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610521906109f2565b60405180910390fd5b8160036000856004811115610568577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60ff1660ff168152602001908152602001600020819055507f04f8f9e90dd778496d9abf40fc80933cb654a1025a3a54c4d5c53588828a0f35836040516105af91906109b7565b60405180910390a1505050565b6105c46106b4565b73ffffffffffffffffffffffffffffffffffffffff166105e2610406565b73ffffffffffffffffffffffffffffffffffffffff1614610638576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161062f90610a12565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156106a8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161069f906109d2565b60405180910390fd5b6106b1816106bc565b50565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b60008135905061078f81610bbd565b92915050565b6000815190506107a481610bd4565b92915050565b6000813590506107b981610beb565b92915050565b6000813590506107ce81610bfb565b92915050565b6000602082840312156107e657600080fd5b60006107f484828501610780565b91505092915050565b60006020828403121561080f57600080fd5b600061081d84828501610795565b91505092915050565b6000806040838503121561083957600080fd5b6000610847858286016107aa565b9250506020610858858286016107bf565b9150509250929050565b61086b81610a43565b82525050565b61087a81610a55565b82525050565b61088981610a9e565b82525050565b600061089c602683610a32565b91506108a782610adf565b604082019050919050565b60006108bf600483610a32565b91506108ca82610b2e565b602082019050919050565b60006108e2600983610a32565b91506108ed82610b57565b602082019050919050565b6000610905602083610a32565b915061091082610b80565b602082019050919050565b60006020820190506109306000830184610862565b92915050565b600060408201905061094b6000830184610862565b818103602083015261095c816108b2565b905092915050565b600060a0820190506109796000830188610871565b6109866020830187610871565b6109936040830186610871565b6109a06060830185610871565b6109ad6080830184610871565b9695505050505050565b60006020820190506109cc6000830184610880565b92915050565b600060208201905081810360008301526109eb8161088f565b9050919050565b60006020820190508181036000830152610a0b816108d5565b9050919050565b60006020820190508181036000830152610a2b816108f8565b9050919050565b600082825260208201905092915050565b6000610a4e82610a74565b9050919050565b60008115159050919050565b6000819050610a6f82610ba9565b919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6000610aa982610a61565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f6669726500000000000000000000000000000000000000000000000000000000600082015250565b7f706f7765726c6573730000000000000000000000000000000000000000000000600082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b60058110610bba57610bb9610ab0565b5b50565b610bc681610a43565b8114610bd157600080fd5b50565b610bdd81610a55565b8114610be857600080fd5b50565b60058110610bf857600080fd5b50565b610c0481610a94565b8114610c0f57600080fd5b5056fea26469706673582212203aead8c0f480e8fea5386093d100904b8a23c48b2870b28b76100dc77caa9fdf64736f6c63430008040033";

export class Storms__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _artifactAdress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Storms> {
    return super.deploy(_artifactAdress, overrides || {}) as Promise<Storms>;
  }
  getDeployTransaction(
    _artifactAdress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_artifactAdress, overrides || {});
  }
  attach(address: string): Storms {
    return super.attach(address) as Storms;
  }
  connect(signer: Signer): Storms__factory {
    return super.connect(signer) as Storms__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StormsInterface {
    return new utils.Interface(_abi) as StormsInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Storms {
    return new Contract(address, _abi, signerOrProvider) as Storms;
  }
}
