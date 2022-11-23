// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract TodoList is ERC721Enumerable {
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIds;

  struct Task {
    uint id;
    address assignee;
    string content;
    bool isCompleted;
  }

  mapping(uint => Task) public _tasks;

  event TaskCreated(uint256 tokenId, address assignee, string content, bool isCompleted);
  
  event TaskCompleted(uint256 tokenId, address assignee, bool isCompleted);

  event TaskDeleted(uint256 tokenId, address assignee);

  constructor() ERC721("TodoList", "TDL"){
    createTask("Nice to meet you");
  }

  function createTask(string memory content) public {
    // 1st tokenId is 1
    _tokenIds.increment();
    uint256 newTaskId = _tokenIds.current();

    _safeMint(msg.sender, newTaskId);
    _tasks[newTaskId] = Task(newTaskId, msg.sender, content, false);

    emit TaskCreated(newTaskId, msg.sender, content, false);
  }

  function getByTaskId(uint256 taskId) public view returns (Task memory) {
    return _tasks[taskId];
  }

  // This function should be consider in 2 cases after burning a task (latest task, a middle task)
  function getAllOfSender() public view returns (Task[] memory) {
    if (balanceOf(msg.sender) > 0) {
      // total supply task
      uint256 numberOfTasks = balanceOf(msg.sender);
      // each element in the currentTasks will be initialized value is zero
      Task[] memory currentTasks = new Task[](numberOfTasks);

      for (uint256 i = 0; i < numberOfTasks; i++) {
        uint256 tokenId = tokenOfOwnerByIndex(msg.sender, i);
        currentTasks[i] = _tasks[tokenId];
      }

      return currentTasks;
    } else {
      Task[] memory currentTasks = new Task[](0);
      return currentTasks;
    }
  }

    // Who can invoke the method, owner of the smart contract or owner of the token?
  function burn(uint256 taskId) public {
    require(msg.sender == ownerOf(taskId), "The NFT does not belong to the sender");

    if(_exists(taskId)) {
      delete _tasks[taskId];
      _burn(taskId);

      emit TaskDeleted(taskId, msg.sender);
    }
  }

  // edit data of a minted taskId
  function toggleCompleted(uint256 taskId) public {
    Task memory task = _tasks[taskId];
    console.log("task.isCompleted: %s", task.isCompleted);
    task.isCompleted = !task.isCompleted;
    console.log("task.isCompleted: %s", task.isCompleted);
    _tasks[taskId] = task;

    emit TaskCompleted(taskId, msg.sender, task.isCompleted);
  }
}
