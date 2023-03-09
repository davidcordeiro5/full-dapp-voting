import styled from "styled-components";

import { workflowStatusText } from "../../utils.js";

const getColor = (status) =>
  status === "current" ? "#57b8e9" : status === "old" ? "#727272" : "#c1c1c1";

const Container = styled.div`
  font-weight: 700;
  font-size: 12px;
  border-radius: 4px;
  ${({ theme, status }) => `
    box-shadow: ${status !== "current" ? "none" : theme.shadow};
    padding: ${theme.space.one};
    opacity: ${status !== "current" ? 0.5 : 1};
    background-color: ${getColor(status)};
  `}
`;

const StatusTag = ({ workflowStatus, status }) => {
  return (
    <Container status={status}>{workflowStatusText(workflowStatus)}</Container>
  );
};

export default StatusTag;
