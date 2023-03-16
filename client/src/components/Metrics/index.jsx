import { useEffect, useState } from "react";
import styled from "styled-components";
import { Heading } from "@chakra-ui/react";
import Voters from "./Voters";

const Container = styled.div`
  ${({ theme }) => `
    margin-top: ${theme.space.five};
    padding-top: ${theme.space.five};
    border-top: 1px solid ${theme.colors.borderGrey};
  `}
`;

const Metrics = ({ contract }) => {
  const [oldEvents, setOldEvents] = useState([]);
  const [eventValue, setEventValue] = useState();

  useEffect(() => {
    const waitingFunctions = async () => {
      const oldEvents = await contract.getPastEvents("VoterRegistered", {
        fromBlock: 0,
        toBlock: "latest",
      });

      function removeDuplicates(arr) {
        return arr.filter((item, index) => arr.indexOf(item) === index);
      }

      oldEvents.forEach((event) => {
        setOldEvents((crr) =>
          removeDuplicates([...crr, event.returnValues.voterAddress])
        );
      });

      await contract.events
        .VoterRegistered({ fromBlock: "earliest" })
        .on("data", (event) => {
          setEventValue(event.returnValues.voterAddress);
        })
        .on("changed", (changed) => console.log("changed", changed))
        .on("error", (err) => console.log(err))
        .on("connected", (str) => console.log("connected"));
    };

    if (contract) {
      waitingFunctions();
    }
  }, [contract]);

  return (
    <Container>
      <Heading as="h2" size="xl" style={{ marginBottom: 24 }}>
        📊 Metrics
      </Heading>
      <Voters addressList={oldEvents} lastAddress={eventValue} />
    </Container>
  );
};

export default Metrics;
