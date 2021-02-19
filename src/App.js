import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home';
import { Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import User from './pages/User';
import Bill from './pages/Bill';
import UserDetails from './pages/UserDetails';

function App() {
  return (
    <div className="App">
      <Header name="Andami Panchayat" />
      {/* <CreateUser street_names={[]} /> */}
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/user/:id">
          <UserDetails />
        </Route>
        <Route path="/user">
          <User />
        </Route>
        <Route path="/bill">
          <Bill />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
