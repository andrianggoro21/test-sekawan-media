import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";
import Sidebar from "../../components/dashboard/sidebar";
import MainContent from "./mainContent";

const Dashboard = ({ user }) => {
  return (
    <Box bgColor={"#F7F8FC"} maxW={"100vw"} minH={"100vh"}>
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
