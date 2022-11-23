// test/TodoList.test.ts
// Load dependencies
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('TodoList', () => {
  const deployTodoListFixture = async () => {
    const [owner, address1, address2] = await ethers.getSigners();
    const TodoList = await ethers.getContractFactory("TodoList");
    const todoList = await TodoList.deploy();

    await todoList.deployed();

    return { TodoList, todoList, owner, address1, address2 };
  }

  describe('Deployment', () => {
    it('Should return the latest task', async () => {
      const { todoList, owner } = await loadFixture(deployTodoListFixture);
  
      await todoList.createTask("Greeting new friend!");
      const latestTaskId = await todoList.totalSupply();
      expect(await todoList.ownerOf(latestTaskId.toNumber())).to.equal(owner.address);
      const task = await todoList.getOne(latestTaskId);
      expect(task.content).to.equal("Greeting new friend!");
    });

    it('Should completed the latest task', async () => {
      const { todoList } = await loadFixture(deployTodoListFixture);

      await todoList.createTask("Greeting new friend!");

      const latestTaskId = await todoList.totalSupply();
      const task = await todoList.getOne(latestTaskId);

      expect(task.isCompleted).to.equal(false);

      await todoList.toggleCompleted(latestTaskId);
      const task1 = await todoList.getOne(latestTaskId);
      expect(task1.isCompleted).to.equal(true);

      const taskArray = await todoList.getAll();
      expect(taskArray.length).to.equal(latestTaskId);
    });
  });

  describe('Behavior', () => {
    it('Should burning a middle task', async () => {
      const { todoList, owner } = await loadFixture(deployTodoListFixture);

      await todoList.createTask("Greeting new friend!");

      const latestTaskId = await todoList.totalSupply();
      expect(await todoList.ownerOf(latestTaskId)).to.equal(owner.address);

      await todoList.createTask("How are you?");

      const nextLatestTaskId = await todoList.totalSupply();
      expect(await todoList.ownerOf(nextLatestTaskId)).to.equal(owner.address);

      await todoList.createTask("What are you doing?");
      
      const nextNextLatestTaskId = await todoList.totalSupply();
      expect(await todoList.ownerOf(nextNextLatestTaskId)).to.equal(owner.address);

      await todoList.burn(2);

      const taskArray = await todoList.getAll();

      expect(
        todoList.ownerOf(2)
      ).to.be.rejectedWith("ERC721: invalid token ID");
    });
  });
});
