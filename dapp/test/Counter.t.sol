// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Counter} from "../src/Counter.sol";

contract CounterTest is Test {
    Counter public counter;

    function setUp() public {
        counter = new Counter();
       
    }

    function testRegisterDonorSuccess() public {
        uint256 donorID = 1;
        string memory name = "Alice";
        string memory bloodType = "O+";

        // Call registerDonor
       counter.registerDonor(donorID, name, bloodType);


    }

}
