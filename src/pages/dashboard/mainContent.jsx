import { Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Overview from "../../components/dashboard/overview";
import Tickets from "../../components/dashboard/tickets";
import data from "../../data/mockData.json";
import calculateOverviewData from "./service/calculateOverviewData";

const MainContent = ({ user }) => {
  const overviewData = calculateOverviewData(data);
  return (
    <Routes>
      <Route path="overview" element={<Overview user={user} data={overviewData}/>} />
      <Route path="tickets" element={<Tickets user={user} tickets={data.Tickets} customers={data.Customers} />} />
    </Routes>
  );
};

MainContent.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
};

export default MainContent;

