import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Flex,
  Avatar,
  Text,
  Badge,
  VStack,
  HStack,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  Button,
  Select,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import TopBar from './topBar';

const Tickets = ({ user, tickets, customers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');

  const priorityColorScheme = (priority) => {
    switch (priority) {
      case "High":
        return "red";
      case "Medium":
        return "green";
      case "Low":
        return "yellow";
      default:
        return "gray";
    }
  };

  const getCustomerName = (customerId) => {
    const customer = customers.find((customer) => customer.customer_id === customerId);
    return customer ? `${customer.first_name} ${customer.last_name}` : "Unknown Customer";
  };

  const handlePriorityFilterChange = (e) => {
    setPriorityFilter(e.target.value);
    setCurrentPage(1); // Reset to the first page when filter changes
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const filteredTickets = tickets.filter(ticket =>
    priorityFilter === 'All' || ticket.priority === priorityFilter
  ).filter(ticket =>
    ticket.subject.toLowerCase().includes(searchQuery) ||
    getCustomerName(ticket.customer_id).toLowerCase().includes(searchQuery)
  );

  const sortedTickets = filteredTickets.sort((a, b) => 
    sortOrder === 'asc' ? new Date(a.created_at) - new Date(b.created_at) : new Date(b.created_at) - new Date(a.created_at)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedTickets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
    setCurrentPage(1); 
  };


  return (
    <Box p={6}>
      <Flex justifyContent="space-between" alignItems="center" mb="6">
        <Heading>Tickets</Heading>
        <TopBar onSearch={handleSearch} user={user} />
      </Flex>
      <Flex mb="4" justifyContent='right' gap={4}>
        <Select
          width="auto"
          value={priorityFilter}
          onChange={handlePriorityFilterChange}
          placeholder="Filter by Priority"
        >
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </Select>
        <Select
          width="auto"
          value={sortOrder}
          onChange={handleSortOrderChange}
        >
          <option value="asc">Sort by Date (Asc)</option>
          <option value="desc">Sort by Date (Desc)</option>
        </Select>
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Ticket details</Th>
              <Th>Customer name</Th>
              <Th>Date</Th>
              <Th>Priority</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems.map((ticket) => (
              <Tr key={ticket.ticket_id}>
                <Td>
                  <HStack spacing={3}>
                    <Avatar name={getCustomerName(ticket.customer_id)} src={ticket?.avatar} />
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="bold">{ticket?.subject}</Text>
                      <Text fontSize="sm" color="gray.500">
                        Updated {new Date(ticket?.updated_at).toLocaleDateString()}
                      </Text>
                    </VStack>
                  </HStack>
                </Td>
                <Td>{getCustomerName(ticket.customer_id)}</Td>
                <Td>{new Date(ticket?.created_at).toLocaleDateString()}</Td>
                <Td>
                  <Badge colorScheme={priorityColorScheme(ticket?.priority)}>
                    {ticket?.priority}
                  </Badge>
                </Td>
                <Td>
                  <IconButton
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                    variant="ghost"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex justifyContent="space-between" alignItems="center" mt="4">
        <Button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          isDisabled={currentPage === 1}
        >
          Previous
        </Button>
        <Text>
          Page {currentPage} of {totalPages}
        </Text>
        <Button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          isDisabled={currentPage === totalPages}
        >
          Next
        </Button>
        <Select
          width="auto"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value={8}>8</option>
        </Select>
      </Flex>
    </Box>
  );
};

Tickets.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
  tickets: PropTypes.arrayOf(
    PropTypes.shape({
      ticket_id: PropTypes.number.isRequired,
      subject: PropTypes.string.isRequired,
      customer_id: PropTypes.number.isRequired,
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    })
  ).isRequired,
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      customer_id: PropTypes.number.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Tickets;
