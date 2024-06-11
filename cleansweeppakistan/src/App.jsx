import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from './Pages/AboutUs';
import ComplainHub from './Pages/ComplainHub';
import Home from './Pages/Home';
import Login from './Pages/Login';
import StatusAdmin from './Pages/StatusAdmin';
import StatusCivilian from './Pages/StatusCivilian';
import SweeperReport from './Pages/SweeperReport';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/complain-hub" element={<ComplainHub />} />
          <Route path="/login" element={<Login />} />
          <Route path="/status/civilian" element={<StatusCivilian />} />
          <Route element={<ProtectedRoute adminOnly />}>
            <Route path="/status/admin" element={<StatusAdmin />} />
            <Route path="/sweeper-report" element={<SweeperReport />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
