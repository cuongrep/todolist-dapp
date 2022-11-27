import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Card, Container, Button, Form, Table, Row, Col } from 'react-bootstrap';
import { getProvider, getAccount, getEthereumContract, isWalletConnected, connectWallet } from '../utils/metamask';
import { useGlobalState, truncate } from '../utils/store';
import { TodoListABI } from '../abi/TodoListABI'

type Props = {
  contract: ethers.Contract
};

type Task = {
  id: number;
  content: string;
  completed: boolean;
}

const Content = ({ contract }: Props) => {
  const [connectedAccount] = useGlobalState('connectedAccount');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [content, setContent] = useState<string>('');

  const getTasks = async () => {
    const result = await contract.getAllOfSender();
    console.log("result", result);

    if (result && result.length !== 0) {
      const handledTasks = result.map(task => {
        return {
          id: task.id.toNumber(),
          content: task.content,
          completed: task.isCompleted
        }
      });

      setTasks(handledTasks);
    }
    console.log("getTasks Reload");
    // setTasks(fakeTask);
  }

  useEffect(() => {
    getTasks();

    return () => {
      setTasks([]);
    }
  }, [connectedAccount]);

  const updateTaskContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  }

  const handleCheckBox = async (taskId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked, taskId);
    await toggleCompleted(taskId);
  }

  const requestCreateTask = async () => {
    console.log("requestCreateNewTask")
    const transaction: Promise<any> = await contract.createTask(content);
    await transaction.wait();
    console.log("created a new Task");
    setContent("");
    getTasks();
  }

  const handleCreateTask = async () => {
    console.log("handleCreateNewTask")
    if (content === '') return;
    await requestCreateTask();
    console.log("handledCreateNewTask")
  }

  const requestDeleteTask = async(taskId: number) => {
    console.log("requestDeleteTask");
    const transaction: Promise<any> = await contract.burn(taskId);
    await transaction.wait();
    console.log("deleted an existing Task");
    setContent("");
    getTasks();
  }

  const toggleCompleted = async (taskId: number) => {
    const transaction: Promise<any> = await contract.toggleCompleted(taskId);
    await transaction.wait();
    getTasks();
  }
  

  return (
    <Container fluid>
      <Row >
        <Col md={3}>
        </Col>
        <Col className="justify-content-md-center" md={6}>
        <Card>
            <Card.Header>
              {connectedAccount ? (
                <button>Connected to Your Todo List</button>
              ) : (
                <button onClick={() => connectWallet()}>Connect to Your Todo List</button>
              )}
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group as={Row} className="mb-3" controlId="id">
                  <Col sm={5}>
                    <Form.Control
                      type="text"
                      placeholder={'Task content'}
                      onChange={updateTaskContent}
                    />
                  </Col>
                  <Col sm={{ span: 5}}>
                    <Button variant="primary" onClick={handleCreateTask}>
                      Create Task
                    </Button>
                  </Col>
                </Form.Group>
              </Form> 
              <div>
                <Table responsive="md" striped bordered hover>
                  <thead >
                    <tr className='d-flex'>
                      <th className='col-1'>#</th>
                      <th className='col-1'>Del</th>
                      <th className='col-9'>Task</th>
                      <th className='col-1'>Done</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((t, index) => (
                      <tr key={`task.${index}`} className='d-flex'>
                        <td className='col-1'>{t.id}</td>
                        <td className='col-1'>
                          <button className="btn btn-outline-danger" onClick={() => requestDeleteTask(t.id)}>
                            {/* <i className="icon bi-envelope"></i> */}
                            <i className="icon bi bi-x"></i>
                          </button>
                        </td>
                        <td className='col-9'>{t.content}</td>
                        <td className='col-1'>
                          <input
                            type="checkbox"
                            checked={t.completed}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckBox(t.id, e)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
            <Card.Footer>
              <div>
                <button>Buy me a cup of coffee ☕ if you think the webapp is useful. </button>
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col md={3}></Col>
        </Row>
    </Container>
  );
}

export default function TodoList() {  
  const todoListAddress = process.env.TodoListAddress;
  const todoListContract = getEthereumContract(todoListAddress, TodoListABI);
  
  useEffect(() => {
    isWalletConnected().then(() => console.log('Blockchain Loaded'));
  }, []);

  if (todoListContract) {
    return (
      <Content contract={todoListContract} />
    );
  } else {
    console.log("TodoListABI", TodoListABI);
    return (
      <>
        <p>Please install Metamask and connect to Wallet</p>
      </>
    );
  }
};
