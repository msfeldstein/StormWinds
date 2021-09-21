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
        internalType: "string",
        name: "storm",
        type: "string",
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
        internalType: "string",
        name: "_stormName",
        type: "string",
      },
    ],
    name: "stormIsActive",
    outputs: [
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
    inputs: [
      {
        internalType: "string",
        name: "_storm",
        type: "string",
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
  "0x608060405273ff9c1b15b16263c61d017ee9f65c50e4ae0113d7600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503480156200006657600080fd5b506040516200133a3803806200133a83398181016040528101906200008c9190620001d7565b620000ac620000a0620000f460201b60201c565b620000fc60201b60201c565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505062000251565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600081519050620001d18162000237565b92915050565b600060208284031215620001ea57600080fd5b6000620001fa84828501620001c0565b91505092915050565b6000620002108262000217565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b620002428162000203565b81146200024e57600080fd5b50565b6110d980620002616000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80638da5cb5b1161005b5780638da5cb5b146100b8578063ae17cbfe146100d6578063de5a1ccf14610106578063f2fde38b146101225761007d565b80633ccfd60b1461008257806344d1992c1461008c578063715018a6146100ae575b600080fd5b61008a61013e565b005b610094610209565b6040516100a5959493929190610d0e565b60405180910390f35b6100b66102bd565b005b6100c0610345565b6040516100cd9190610ca6565b60405180910390f35b6100f060048036038101906100eb9190610994565b61036e565b6040516100fd9190610cf3565b60405180910390f35b610120600480360381019061011b91906109d9565b61039b565b005b61013c60048036038101906101379190610942565b610699565b005b610146610791565b73ffffffffffffffffffffffffffffffffffffffff16610164610345565b73ffffffffffffffffffffffffffffffffffffffff16146101ba576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101b190610dc5565b60405180910390fd5b60004790503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610205573d6000803e3d6000fd5b5050565b600080600080600042600360405161022090610c3d565b9081526020016040518091039020541142600360405161023f90610c7c565b9081526020016040518091039020541142600360405161025e90610c91565b9081526020016040518091039020541142600360405161027d90610c52565b9081526020016040518091039020541142600360405161029c90610c67565b90815260200160405180910390205411945094509450945094509091929394565b6102c5610791565b73ffffffffffffffffffffffffffffffffffffffff166102e3610345565b73ffffffffffffffffffffffffffffffffffffffff1614610339576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161033090610dc5565b60405180910390fd5b6103436000610799565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60004260038484604051610383929190610c0d565b90815260200160405180910390205411905092915050565b4281116103dd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103d490610de5565b60405180910390fd5b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff1663248457213386866040518463ffffffff1660e01b815260040161044193929190610cc1565b60206040518083038186803b15801561045957600080fd5b505afa15801561046d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610491919061096b565b6104d0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104c790610da5565b60405180910390fd5b61051084846040518060400160405280600481526020017f666972650000000000000000000000000000000000000000000000000000000081525061085d565b80610557575061055684846040518060400160405280600481526020017f73616e640000000000000000000000000000000000000000000000000000000081525061085d565b5b8061059e575061059d84846040518060400160405280600381526020017f696365000000000000000000000000000000000000000000000000000000000081525061085d565b5b806105e557506105e484846040518060400160405280600481526020017f77696e640000000000000000000000000000000000000000000000000000000081525061085d565b5b8061062c575061062b84846040518060400160405280600981526020017f6c696768746e696e67000000000000000000000000000000000000000000000081525061085d565b5b61063557600080fd5b8160038585604051610648929190610c0d565b9081526020016040518091039020819055507f0f54ab073e0daa386c22cd874a87237085ec95a377b9ff57c705846d24413788848460405161068b929190610d61565b60405180910390a150505050565b6106a1610791565b73ffffffffffffffffffffffffffffffffffffffff166106bf610345565b73ffffffffffffffffffffffffffffffffffffffff1614610715576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161070c90610dc5565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610785576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161077c90610d85565b60405180910390fd5b61078e81610799565b50565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000816040516020016108709190610c26565b604051602081830303815290604052805190602001208484604051602001610899929190610c0d565b604051602081830303815290604052805190602001201490509392505050565b6000813590506108c88161105e565b92915050565b6000815190506108dd81611075565b92915050565b60008083601f8401126108f557600080fd5b8235905067ffffffffffffffff81111561090e57600080fd5b60208301915083600182028301111561092657600080fd5b9250929050565b60008135905061093c8161108c565b92915050565b60006020828403121561095457600080fd5b6000610962848285016108b9565b91505092915050565b60006020828403121561097d57600080fd5b600061098b848285016108ce565b91505092915050565b600080602083850312156109a757600080fd5b600083013567ffffffffffffffff8111156109c157600080fd5b6109cd858286016108e3565b92509250509250929050565b6000806000604084860312156109ee57600080fd5b600084013567ffffffffffffffff811115610a0857600080fd5b610a14868287016108e3565b93509350506020610a278682870161092d565b9150509250925092565b610a3a81610e2c565b82525050565b610a4981610e3e565b82525050565b6000610a5b8385610e10565b9350610a68838584610e74565b610a7183610eb6565b840190509392505050565b6000610a888385610e21565b9350610a95838584610e74565b82840190509392505050565b6000610aac82610e05565b610ab68185610e21565b9350610ac6818560208601610e83565b80840191505092915050565b6000610adf602683610e10565b9150610aea82610ec7565b604082019050919050565b6000610b02600483610e21565b9150610b0d82610f16565b600482019050919050565b6000610b25600483610e21565b9150610b3082610f3f565b600482019050919050565b6000610b48600983610e10565b9150610b5382610f68565b602082019050919050565b6000610b6b600983610e21565b9150610b7682610f91565b600982019050919050565b6000610b8e600483610e21565b9150610b9982610fba565b600482019050919050565b6000610bb1602083610e10565b9150610bbc82610fe3565b602082019050919050565b6000610bd4600883610e10565b9150610bdf8261100c565b602082019050919050565b6000610bf7600383610e21565b9150610c0282611035565b600382019050919050565b6000610c1a828486610a7c565b91508190509392505050565b6000610c328284610aa1565b915081905092915050565b6000610c4882610af5565b9150819050919050565b6000610c5d82610b18565b9150819050919050565b6000610c7282610b5e565b9150819050919050565b6000610c8782610b81565b9150819050919050565b6000610c9c82610bea565b9150819050919050565b6000602082019050610cbb6000830184610a31565b92915050565b6000604082019050610cd66000830186610a31565b8181036020830152610ce9818486610a4f565b9050949350505050565b6000602082019050610d086000830184610a40565b92915050565b600060a082019050610d236000830188610a40565b610d306020830187610a40565b610d3d6040830186610a40565b610d4a6060830185610a40565b610d576080830184610a40565b9695505050505050565b60006020820190508181036000830152610d7c818486610a4f565b90509392505050565b60006020820190508181036000830152610d9e81610ad2565b9050919050565b60006020820190508181036000830152610dbe81610b3b565b9050919050565b60006020820190508181036000830152610dde81610ba4565b9050919050565b60006020820190508181036000830152610dfe81610bc7565b9050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b6000610e3782610e4a565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b83811015610ea1578082015181840152602081019050610e86565b83811115610eb0576000848401525b50505050565b6000601f19601f8301169050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f6669726500000000000000000000000000000000000000000000000000000000600082015250565b7f77696e6400000000000000000000000000000000000000000000000000000000600082015250565b7f706f7765726c6573730000000000000000000000000000000000000000000000600082015250565b7f6c696768746e696e670000000000000000000000000000000000000000000000600082015250565b7f73616e6400000000000000000000000000000000000000000000000000000000600082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f74656d706f72616c000000000000000000000000000000000000000000000000600082015250565b7f6963650000000000000000000000000000000000000000000000000000000000600082015250565b61106781610e2c565b811461107257600080fd5b50565b61107e81610e3e565b811461108957600080fd5b50565b61109581610e6a565b81146110a057600080fd5b5056fea2646970667358221220b03337214ccab32d03224e2eaa4409865a5e978da5121349693486e233fb746a64736f6c63430008040033";

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
