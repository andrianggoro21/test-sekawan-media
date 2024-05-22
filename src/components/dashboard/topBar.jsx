import { Box, Flex, Input, InputGroup, InputLeftElement, IconButton, Avatar, Text } from "@chakra-ui/react";
import { SearchIcon, BellIcon } from "@chakra-ui/icons";

const TopBar = () => {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <InputGroup width={{ base: "full", md: "300px" }}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input placeholder="Search..." bg="white" borderRadius="md" />
      </InputGroup>
      <Flex alignItems="center">
        <IconButton
          icon={<BellIcon />}
          variant="ghost"
          aria-label="Notifications"
          mx={2}
        />
        <Box mr={2} textAlign="right">
          <Text fontWeight="bold">Jones Ferdinand</Text>
        </Box>
        <Avatar name="Jones Ferdinand" boxSize="36px" />
      </Flex>
    </Flex>
  );
};

export default TopBar;

