import { Box } from "@chakra-ui/react";
import Sidebar from "../../components/dashboard/sidebar";
import MainContent from "./mainContent";


const Dashboard = () => {
  return (
    <Box bgColor={"#F7F8FC"} maxW={"100vw"} minH={"100vh"}>
      <Sidebar />
      <Box ml={{ base: 0, md: "250px" }} p={2}>
        <MainContent />
      </Box>
    </Box>
  );
};

export default Dashboard;
