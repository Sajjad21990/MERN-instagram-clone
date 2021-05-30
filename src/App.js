import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import "./App.css";
import NotFound from "./pages/404";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "./redux/actions/authActions";
import Alert from "./components/Alert";
import Message from "./pages/Message";
import Discover from "./pages/Discover";
import Profile from "./pages/Profile";
import Notification from "./pages/Notifications";
import PrivateRouter from "./Router/PrivateRouter";

function App() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, []);

  return (
    <Router>
      <Navbar />
      <Alert />
      <Switch>
        <Route exact path="/" component={auth.token ? Home : Login} />
        <Route exact path="/auth/register" component={Register} />
        <Route exact path="/auth/login" component={Login} />

        <PrivateRouter exact path="/messages" component={Message} />
        <PrivateRouter exact path="/notifications" component={Notification} />
        <PrivateRouter exact path="/discover" component={Discover} />
        <PrivateRouter exact path="/profile/:userId" component={Profile} />

        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
