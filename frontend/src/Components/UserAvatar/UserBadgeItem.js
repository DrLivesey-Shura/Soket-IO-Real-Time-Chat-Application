import { Box } from "@chakra-ui/react";
import React from "react";

const UserBadgeItem = ({ handleFunction }) => {
  return (
    <Box
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="purple"
      cursor="pointer"
      onClick={handleFunction}
    ></Box>
  );
};

export default UserBadgeItem;
