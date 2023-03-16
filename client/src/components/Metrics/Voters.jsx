import { Wrap, WrapItem, VStack, Heading } from "@chakra-ui/react";

const Voters = ({ addressList, lastAddress }) => {
  const length = addressList.length;
  return (
    <VStack align="stretch">
      <Heading as="h4" size="lg" style={{ marginBottom: 8 }}>
        Voter{length > 1 ? "s" : ""} list ({lastAddress ? length + 1 : length})
      </Heading>
      <VStack align="stretch">
        {lastAddress && (
          <span style={{ fontSize: 16 }}>🆕 : {lastAddress}</span>
        )}
        <Wrap>
          {addressList.map((addr, index) => (
            <WrapItem
              style={{ listStyle: "none", fontSize: 16, width: "fit-content" }}
              key={index}
            >
              👤 : {`${addr.substring(0, 5)}...${addr.substr(addr.length - 5)}`}
            </WrapItem>
          ))}
        </Wrap>
      </VStack>
    </VStack>
  );
};

export default Voters;
