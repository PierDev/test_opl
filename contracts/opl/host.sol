// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Host, Result} from "../../dependencies/sapphire/OPL.sol";
import {EnumerableSet} from "../../dependencies/utils/structs/EnumerableSet.sol";

contract HostV1 is Host {

    string[] public receivedMessages;

    constructor(address _enclave) Host(_enclave) {
        registerEndpoint("enclaveMessage", _oplMessage);
    }

    function _oplMessage(bytes calldata _args) internal returns (Result) {
        (string memory message) = abi.decode(_args, (string));
        receivedMessages.push(message);
        return Result.Success;
    }

    function getMessages() public view returns(string[] memory) {
        return receivedMessages;
    }
}