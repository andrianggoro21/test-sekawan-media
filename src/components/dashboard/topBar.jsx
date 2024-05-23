// topBar.jsx

import { useState } from 'react';
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { SearchIcon, BellIcon } from "@chakra-ui/icons";
import PropTypes from 'prop-types'; // Add PropTypes import

const TopBar = ({ onSearch, user }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <InputGroup width={{ base: "full", md: "300px" }}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Search..."
          bg="white"
          borderRadius="md"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </InputGroup>
      <Flex alignItems="center">
        <IconButton
          icon={<BellIcon />}
          variant="ghost"
          aria-label="Notifications"
          mx={2}
        />
        <Box mr={2} textAlign="right">
          <Text fontWeight="bold">{`${user.first_name} ${user.last_name}`}</Text>
        </Box>
        <Avatar name={`${user.first_name} ${user.last_name}`} boxSize="36px" />
      </Flex>
    </Flex>
  );
};

TopBar.propTypes = {
  onSearch: PropTypes.func.isRequired, // Adding PropTypes validation
  user: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
};

export default TopBar;
