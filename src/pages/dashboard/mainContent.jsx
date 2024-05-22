import { Routes, Route } from 'react-router-dom';
import Overview from '../../components/dashboard/overview';
import Tickets from '../../components/dashboard/Tickets';
import data from "../../data/data.json";

const MainContent = () => {
  return (
    <Routes>
      <Route path="overview" element={<Overview data={data.overview}/>} />
      <Route path="tickets" element={<Tickets data={data.tickets}/>} />
    </Routes>
  );
};

export default MainContent;
