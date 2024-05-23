import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";
import Sidebar from "../../components/dashboard/sidebar";
import MainContent from "./mainContent";
import { useColorMode } from "@chakra-ui/react";

const Dashboard = ({ user }) => {
  const { colorMode } = useColorMode();
  return (
    <Box bgColor={colorMode === "light" ? "#F7F8FC" : "gray.900"} maxW={"100vw"} minH={"100vh"} transition="background-color 0.3s">
      <Sidebar />
      <Box ml={{ base: 0, md: "250px" }} p={2}>
        <MainContent user={user} />
      </Box>
    </Box>
  );
};

Dashboard.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
};
export default Dashboard;
