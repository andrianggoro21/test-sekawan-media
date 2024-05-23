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
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useState } from "react";
import { useColorMode } from "@chakra-ui/react";

const Overview = ({ user, data }) => {
  const { colorMode } = useColorMode();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const {
    unresolved,
    overdue,
    open,
    on_hold,
    resolved,
    received,
    avg_first_response_time,
    avg_response_time,
    resolution_within_sla,
    unresolved_tickets,
    tasks,
    trends,
  } = data;

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

  // Filter tasks based on search query
  const filteredTasks = tasks.filter((task) =>
    task.label.toLowerCase().includes(searchQuery)
  );

  return (
    <Box p="6">
      <Flex justifyContent="space-between" alignItems="center" mb="6">
        <Heading>Overview</Heading>
        <TopBar onSearch={handleSearch} user={user} />
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 4 }} spacing="6">
        <Stat bgColor={colorMode === "light" ? "white" : "#0B2F37"} p="4" borderRadius="md" boxShadow="sm">
          <StatLabel>Unresolved</StatLabel>
          <StatNumber>{unresolved}</StatNumber>
        </Stat>
        <Stat bgColor={colorMode === "light" ? "white" : "#0B2F37"} p="4" borderRadius="md" boxShadow="sm">
          <StatLabel>Overdue</StatLabel>
          <StatNumber>{overdue}</StatNumber>
        </Stat>
        <Stat bgColor={colorMode === "light" ? "white" : "#0B2F37"} p="4" borderRadius="md" boxShadow="sm">
          <StatLabel>Open</StatLabel>
          <StatNumber>{open}</StatNumber>
        </Stat>
        <Stat bgColor={colorMode === "light" ? "white" : "#0B2F37"} p="4" borderRadius="md" boxShadow="sm">
          <StatLabel>On hold</StatLabel>
          <StatNumber>{on_hold}</StatNumber>
        </Stat>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6" mt="6">
        <Box bgColor={colorMode === "light" ? "white" : "#0B2F37"} p="4" borderRadius="md" boxShadow="sm">
          <Heading size="md" mb="4">
            Trends
          </Heading>
          <LineChart width={500} height={300} data={trends}>
            <Line type="monotone" dataKey="today" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </Box>
        <Box>
          <Stat bgColor={colorMode === "light" ? "white" : "#0B2F37"} p="4" borderRadius="md" boxShadow="sm">
            <StatLabel>Resolved</StatLabel>
            <StatNumber>{resolved}</StatNumber>
          </Stat>
          <Stat bgColor={colorMode === "light" ? "white" : "#0B2F37"} p="4" borderRadius="md" boxShadow="sm">
            <StatLabel>Received</StatLabel>
            <StatNumber>{received}</StatNumber>
          </Stat>
          <Stat bgColor={colorMode === "light" ? "white" : "#0B2F37"} p="4" borderRadius="md" boxShadow="sm">
            <StatLabel>Average First Response Time</StatLabel>
            <StatNumber>{avg_first_response_time}</StatNumber>
          </Stat>
          <Stat bgColor={colorMode === "light" ? "white" : "#0B2F37"} p="4" borderRadius="md" boxShadow="sm">
            <StatLabel>Average Response Time</StatLabel>
            <StatNumber>{avg_response_time}</StatNumber>
          </Stat>
          <Stat bgColor={colorMode === "light" ? "white" : "#0B2F37"} p="4" borderRadius="md" boxShadow="sm">
            <StatLabel>Resolution within SLA</StatLabel>
            <StatNumber>{resolution_within_sla}</StatNumber>
          </Stat>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6" mt="6">
        <Box bgColor={colorMode === "light" ? "white" : "#0B2F37"} p="4" borderRadius="md" boxShadow="sm">
          <Heading size="md" mb="4">
            Unresolved tickets
          </Heading>
          <Divider mb="4" />
          <Stack spacing="4">
            {unresolved_tickets.map((ticket, index) => (
              <Flex key={index} justifyContent="space-between">
                <Text>{ticket.label}</Text>
                <Text>{ticket.count}</Text>
              </Flex>
            ))}
          </Stack>
        </Box>
        <Box bgColor={colorMode === "light" ? "white" : "#0B2F37"} p="4" borderRadius="md" boxShadow="sm">
          <Heading size="md" mb="4">
            Tasks
          </Heading>
          <Divider mb="4" />
          <Stack spacing="4">
            {filteredTasks.map((task, index) => (
              <Flex key={index} alignItems="center">
                <Checkbox defaultChecked={task.completed} mr="4" />
                <Text flex="1">{task.label}</Text>
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
  user: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    unresolved: PropTypes.number.isRequired,
    overdue: PropTypes.number.isRequired,
    open: PropTypes.number.isRequired,
    on_hold: PropTypes.number.isRequired,
    resolved: PropTypes.number.isRequired,
    received: PropTypes.number.isRequired,
    avg_first_response_time: PropTypes.string.isRequired,
    avg_response_time: PropTypes.string.isRequired,
    resolution_within_sla: PropTypes.number.isRequired,
    trends: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        today: PropTypes.number.isRequired,
        yesterday: PropTypes.number.isRequired,
      })
    ).isRequired,
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
