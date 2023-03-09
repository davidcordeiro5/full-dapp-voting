import styled from "styled-components";

import { workflowStatusText } from "../../utils.js";

const getColor = (status) =>
  status === "current" ? "#e9b257" : status === "old" ? "#83cd79" : "#727272";

const Container = styled.div`
  font-weight: 700;
  ${({ theme, status }) => `
    transform: ${status !== "current" ? "scale(1)" : "scale(1.1)"};
    padding: ${theme.space.one};
    opacity: ${status !== "current" ? 0.5 : 1};
    background-color: ${getColor(status)};
  `}
`;

const StatusTag = ({ workflowStatus, status }) => {
  console.log("status", status);
  return (
    <Container status={status}>{workflowStatusText(workflowStatus)}</Container>
  );
};

export default StatusTag;
