// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Enclave, Result, autoswitch} from "../../dependencies/sapphire/OPL.sol";

contract EnclaveV1 is Enclave {

    constructor(address host) Enclave(host, autoswitch("bsc")) {
    }

    function sendMessage(string memory message) public {
        postMessage("enclaveMessage", abi.encode(message));
    }
}