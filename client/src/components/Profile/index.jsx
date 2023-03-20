import { HStack, VStack, Tag, Box, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Profile = ({ user, contract }) => {
  const [rencentVoter, setRencentVoter] = useState();
  const [isVoter, setIsVoter] = useState(false);
  const [voter, setVoter] = useState();

  useEffect(() => {
    if (!contract) {
      return;
    }
    const waitEvent = async () => {
      await contract.events
        .VoterRegistered({ fromBlock: "earliest" })
        .on("data", (event) => {
          setRencentVoter(event.returnValues.voterAddress);
        });
    };

    waitEvent();
  }, [contract]);

  useEffect(() => {
    if (user && user.address === rencentVoter) {
      setIsVoter(true);
    }
  }, [rencentVoter, user]);

  useEffect(() => {
    if (!user && !contract && !isVoter) {
      return;
    }
    const waitVoter = async () => {
      if (contract && (isVoter || user.isVoter)) {
        const t = await contract.methods
          .getVoter(user.address)
          .call({ from: user.address });

        setVoter((crr) => ({ ...crr, hasVoted: t[0] }));
      } else {
        setVoter((crr) => ({ ...crr, hasVoted: false }));
      }
    };

    waitVoter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isVoter]);

  const getUserEmoji = (user) => {
    if (!user) return `👤`;
    if (user.isOwner) return `🤴`;
    else if (user.isVoter) return `🙋‍♂️`;
    else if (user.isVoter) return `🙋‍♂️`;
    else return `🦹‍♂️`;
  };

  return (
    <Box
      alignSelf="end"
      p="16px"
      maxW="fit-content"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      style={{ marginTop: 40 }}
    >
      <Heading as="h3" size="xl" style={{ marginBottom: 8 }}>
        Profile
      </Heading>
      {user && (
        <Text fontSize="xl" as="i">{`${user.address.substring(
          0,
          5
        )}...${user.address.substr(user.address.length - 5)}`}</Text>
      )}
      <HStack spacing="24px">
        <span style={{ fontSize: 36 }}>{getUserEmoji(user)}</span>
        {user && (
          <VStack align="stretch">
            {user.isOwner && (
              <Tag colorScheme="orange" size="lg">
                Owner
              </Tag>
            )}
            {(user.isVoter || isVoter) && (
              <Tag colorScheme="cyan" size="lg">
                Voter
              </Tag>
            )}
            {!user.isVoter && !isVoter && <Tag size="lg">Not voter</Tag>}
            {voter?.hasVoted && (
              <Tag colorScheme="pink" size="lg">
                Has voted
              </Tag>
            )}
          </VStack>
        )}
      </HStack>
    </Box>
  );
};

export default Profile;
