import React, { useEffect, useState } from "react";
import { FaDonate } from "react-icons/fa";
import { Modal, ModalHeader, ModalBody, Row, Button } from "reactstrap";
import "./Projects.css";
const Projects = ({ state }) => {
  const [modal, setModal] = useState(false);
  const [projects, setProjects] = useState("");
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    const { contract } = state;
    console.log(contract);
    const projectDetails = async () => {
      const projects = await contract.methods.allProjects().call();
      setProjects(projects);
    };
    contract && projectDetails();
  }, [state]);
  const donateEth = async (event) => {
    event.preventDefault();
    try {
      const { contract, web3 } = state;
      const eth = amount;
      const weiValue = web3.utils.toWei(eth);
      const accounts = await web3.eth.getAccounts();
      await contract.methods
        .donate()
        .send({ from: accounts[0], value: weiValue, gas: 30000000 });
      setAmount(0);
      alert("Transaction Successfull");
    } catch (error) {
      alert("Transaction Not successfull");
    }
  };
  const setamt = async (value) => {
    setAmount(value);
  };
  return (
    <section className="project-section">
      <h1 className="title">Projects </h1>
      <div className="card-wrapper">
        {projects &&
          projects.map((project) => {
            return (
              <a
              href={project.githubLink}
                className="project-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="card-img">
                  <img src={project.image} alt="No Image" />
                </div>
                <div className="card-text">
                  <h3>{project.name}</h3>
                  <p>{project.description} </p>
                </div>
              </a>
            );
          })}
      </div>
      {/*  =========popup bootstrap==========  */}

      <Modal size="md" isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>
          Enter the ETH you want to donate!
        </ModalHeader>
        <ModalBody>
          <form onSubmit={donateEth}>
            <Row>
              <input
                id="eth"
                type="text"
                value={amount}
                onChange={(event) => setamt(event.target.value)}
              />
              <Button className="mt-4">Send</Button>
            </Row>
          </form>
        </ModalBody>
      </Modal>
      {/*  =========popup bootstrap end==========  */}
      <p className="donate" onClick={() => setModal(true)}>
        Liked the dummyValue's ? Consider donating Eth's{" "}
        <FaDonate className="icon" />
      </p>
    </section>
  );
};

export default Projects;
