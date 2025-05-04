import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import "./index.css";
import Home from "./components/Home.jsx";
import Events from "./components/Events.jsx";
import UpcomingEvents from "./components/UpcomingEvents.jsx";
import Footer from "./components/Footer.jsx";
import AboutUs from "./components/AboutUs.jsx";
import MatchCard from "./components/MatchCard.jsx";
import DummyMatchDetails from "./components/DummyMatchDetails.jsx";
import RegTourney from "./components/RegTourney.jsx";
import NavBar from "./components/NavBar.jsx";
import RegTeamInfoForm from "./components/RegTeamInfoForm.jsx";
import SuperAdminLogin from "./components/SuperAdmin/SuperAdminLogin";
import SuperAdmin from "./components/SuperAdmin/SuperAdmin";
import Admin from "./components/Admin/Admin";
import AdminDashboard from "./components/Admin/AdminDashboard";
import TournamentDetails from "./components/TournamentDetails.jsx";
import ViewPlayers from "./components/ViewPlayers.jsx";
import PlayerDetails from "./components/PlayerDetails.jsx";
import Standings from "./components/Standings.jsx";

function App() {
  const location = useLocation();

  // Define routes where NavBar should NOT be shown
  const hideNavBarRoutes = [
    "/admin",
    "/adminlogin",
    "/superadmin8080808080",
    "/superadminakakakakak",
  ];

  // Define routes where Footer should NOT be shown
  const hideFooterRoutes = [
    "/",
    "/admin",
    "/adminlogin",
    "/superadmin8080808080",
    "/superadminakakakakak",
  ];

  const shouldShowNavBar = !hideNavBarRoutes.includes(location.pathname);
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <div className="h-full">
      {shouldShowNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/events" element={<Events />}></Route>
        <Route path="/upcoming" element={<UpcomingEvents />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/superadmin8080808080" element={<SuperAdminLogin />} />
        <Route path="/superadminakakakakak" element={<SuperAdmin />} />
        <Route path="/adminlogin" element={<Admin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/card" element={<MatchCard />}></Route>
        <Route path="/tournament/:id" element={<TournamentDetails />} />
        <Route path="/player/:id" element={<PlayerDetails />} />
        <Route path="/standings/:id" element={<Standings />} />
        <Route path="/ViewPlayers/:id" element={<ViewPlayers />} />
        <Route
          path="/MatchDetails/:matchId"
          element={<DummyMatchDetails />}
        />
        <Route path="/register" element={<RegTourney />}></Route>
        <Route path="/registerteam/:id" element={<RegTeamInfoForm />}></Route>
      </Routes>
      {shouldShowFooter && <Footer />}
    </div>
  );
}


export default App;