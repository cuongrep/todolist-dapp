import { ethers } from "hardhat";

async function main() {

  // For deploy TodoList
  const [deployer] = await ethers.getSigners()
  console.log('deployer.address', deployer.address);
  const TodoList = await ethers.getContractFactory('TodoList', deployer);
  const todoList = await TodoList.deploy();
  await todoList.deployed();

  console.log(todoList.address);

  const address = JSON.stringify({ address: todoList.address }, null, 4);
  console.log('Deployed TodoListAddress:', todoList.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
