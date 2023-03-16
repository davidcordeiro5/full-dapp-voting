import { HStack, VStack, Tag, Box, Heading, Text } from "@chakra-ui/react";

const Profile = ({ user }) => {
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
            {user.isVoter && (
              <Tag colorScheme="cyan" size="lg">
                Voter
              </Tag>
            )}
            {!user.isVoter && <Tag size="lg">Not voter</Tag>}
          </VStack>
        )}
      </HStack>
    </Box>
  );
};

export default Profile;
