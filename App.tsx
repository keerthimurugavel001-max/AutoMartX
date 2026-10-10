import "./App.css";
import { useState } from "react";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Vehicles from "./Vehicles";
import About from "./About";
import SellVehicle from "./SellVehicles";
type Page = "login" | "signup" | "home" | "vehicles" | "about" | "sell";
function App() {
  const [page, setPage] = useState<Page>("login");
  if (page === "login") {
    return (
      <Login
        onLogin={() => setPage("home")}
        onSignup={() => setPage("signup")}
      />
    );
  }
  if (page === "signup") {
    return <Signup onSignup={() => setPage("login")} />;
  }
  if (page === "vehicles") {
    return <Vehicles onBack={() => setPage("home")} />;
  }
  if (page === "about") {
    return <About onBack={() => setPage("home")} />;
  }
  if (page === "sell") {
    return <SellVehicle onBack={() => setPage("home")} />;
  }
  return (
    <Home
      onLogout={() => setPage("login")}
      onVehicles={() => setPage("vehicles")}
      onAbout={() => setPage("about")}
      onSell={() => setPage("sell")}
    />
  );
}
export default App;