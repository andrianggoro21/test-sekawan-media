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
  } from "@chakra-ui/react";
  import { HamburgerIcon } from "@chakra-ui/icons";
  import TopBar from "./topBar";

  const Tickets = ({ data }) => {
    const priorityColorScheme = (priority) => {
      switch (priority) {
        case "high":
          return "red";
        case "normal":
          return "green";
        case "low":
          return "yellow";
        default:
          return "gray";
      }
    };
  
    return (
      <Box p={6}>
        <Flex justifyContent="space-between" alignItems="center" mb="6">
          <Heading>Tickets</Heading>
          <TopBar />
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
              {data?.map((ticket) => (
                <Tr key={ticket.id}>
                  <Td>
                    <HStack spacing={3}>
                      <Avatar src={ticket?.avatar} />
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="bold">{ticket?.title}</Text>
                        <Text fontSize="sm" color="gray.500">
                          Updated 1 day ago
                        </Text>
                      </VStack>
                    </HStack>
                  </Td>
                  <Td>{ticket?.customerName}</Td>
                  <Td>{ticket?.date}</Td>
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
      </Box>
    );
  };
  
  Tickets.propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        customer_name: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        priority: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      })
    ).isRequired,
  };
  
  export default Tickets;
  
