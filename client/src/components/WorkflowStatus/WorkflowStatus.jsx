import styled from "styled-components";

import StatusTag from "./StatusTag";

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  width: max-content;
  list-style: none;
  > li {
    margin-bottom: ${({ theme }) => theme.space.one};

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const WorkflowStatus = (currentStatus) => {
  const workflows = [0, 1, 2, 3, 4, 5];

  const getStatus = (currentStatus, workflowStatus) =>
    currentStatus === workflowStatus
      ? "current"
      : currentStatus <= workflowStatus
      ? "old"
      : "comming";

  return (
    <Container>
      {workflows.map((workflow, index) => (
        <li key={index}>
          <StatusTag
            workflowStatus={workflow}
            status={getStatus(1, workflow)}
          />
        </li>
      ))}
    </Container>
  );
};

export default WorkflowStatus;
