import styled from "styled-components";
import { Heading } from "@chakra-ui/react";

import StatusTag from "./StatusTag";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  h2 {
    margin: ${({ theme }) => theme.space.three} 0;
  }
`;

const List = styled.ul`
  position: relative;
  width: max-content;
  list-style: none;
  ${({ theme }) => `
    padding-right: ${theme.space.five};
    border-right: 1px solid ${theme.colors.borderGrey};

    > li {
      margin-bottom: ${theme.space.one};
      &:last-child {
        margin-bottom: 0;
      }
    }
  `}
`;

const WorkflowStatus = (currentStatus) => {
  const workflows = [0, 1, 2, 3, 4, 5];

  const getStatus = (currentStatus, workflowStatus) =>
    currentStatus === workflowStatus
      ? "current"
      : workflowStatus >= currentStatus
      ? "comming"
      : "old";

  return (
    <Container>
      <Heading as="h2" size="xl" noOfLines={1}>
        ⬇️ Work flow steps
      </Heading>
      <List>
        {workflows.map((workflow, index) => (
          <li key={index}>
            <StatusTag
              workflowStatus={workflow}
              status={getStatus(currentStatus.currentStatus, workflow)}
            />
          </li>
        ))}
      </List>
    </Container>
  );
};

export default WorkflowStatus;
