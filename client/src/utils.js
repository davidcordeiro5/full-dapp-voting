import { WorkflowStatus } from "./globals.js";

export const workflowStatusText = (status) => {
  switch (status) {
    case WorkflowStatus.RegisteringVoters:
      return "Registering voters";
    case WorkflowStatus.ProposalsRegistrationStarted:
      return "Proposals registration started";
    case WorkflowStatus.ProposalsRegistrationEnded:
      return "Proposals registration ended";
    case WorkflowStatus.VotingSessionStarted:
      return "Voting session started";
    case WorkflowStatus.VotingSessionEnded:
      return "Voting session ended";
    case WorkflowStatus.VotesTallied:
      return "Votes tallied";
    default:
      return "";
  }
};
