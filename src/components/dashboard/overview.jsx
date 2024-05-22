import PropTypes from "prop-types";
import {
  Box,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Divider,
  Flex,
  Checkbox,
  Badge,
} from "@chakra-ui/react";
import TopBar from "./topBar";

const Overview = ({ data }) => {
  const { unresolved, overdue, open, on_hold, unresolved_tickets, tasks } =
    data;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "red";
      case "new":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <Box p="6">
      <Flex justifyContent="space-between" alignItems="center" mb="6">
        <Heading>Overview</Heading>
        <TopBar />
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 4 }} spacing="6">
        <Stat bg="white" p="4" borderRadius="md" boxShadow="sm">
          <StatLabel>Unresolved</StatLabel>
          <StatNumber>{unresolved}</StatNumber>
        </Stat>
        <Stat bg="white" p="4" borderRadius="md" boxShadow="sm">
          <StatLabel>Overdue</StatLabel>
          <StatNumber>{overdue}</StatNumber>
        </Stat>
        <Stat bg="white" p="4" borderRadius="md" boxShadow="sm">
          <StatLabel>Open</StatLabel>
          <StatNumber>{open}</StatNumber>
        </Stat>
        <Stat bg="white" p="4" borderRadius="md" boxShadow="sm">
          <StatLabel>On hold</StatLabel>
          <StatNumber>{on_hold}</StatNumber>
        </Stat>
      </SimpleGrid>

      <Box bg="white" p="4" borderRadius="md" boxShadow="sm" mt="6">
        <Heading size="md" mb="4">
          Todays trends
        </Heading>
        {/* Replace with actual chart component */}
        <Box h="200px" bg="gray.100"></Box>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6" mt="6">
        {/* Unresolved Tickets */}
        <Box bg="white" p="4" borderRadius="md" boxShadow="sm">
          <Heading size="md" mb="4">
            Unresolved tickets
          </Heading>
          <Divider mb="4" />
          <Stack spacing="4">
            {unresolved_tickets.map((ticket, index) => (
              <Flex key={index} justifyContent="space-between">
                <Text>{ticket.status}</Text>
                <Text>{ticket.count}</Text>
              </Flex>
            ))}
          </Stack>
        </Box>
        {/* Tasks */}
        <Box bg="white" p="4" borderRadius="md" boxShadow="sm">
          <Heading size="md" mb="4">
            Tasks
          </Heading>
          <Divider mb="4" />
          <Stack spacing="4">
            {tasks.map((task, index) => (
              <Flex key={index} alignItems="center">
                <Checkbox defaultChecked={task.completed} mr="4" />
                <Text flex="1">{task.task}</Text>
                <Badge
                  colorScheme={getPriorityColor(task.priority)}
                  p="1"
                  borderRadius="md"
                >
                  {task.priority}
                </Badge>
              </Flex>
            ))}
          </Stack>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

Overview.propTypes = {
  data: PropTypes.shape({
    unresolved: PropTypes.number.isRequired,
    overdue: PropTypes.number.isRequired,
    open: PropTypes.number.isRequired,
    on_hold: PropTypes.number.isRequired,
    trends: PropTypes.object, // Replace with appropriate shape if you have more details
    unresolved_tickets: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
      })
    ).isRequired,
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        priority: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default Overview;
