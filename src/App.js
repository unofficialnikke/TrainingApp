import "./App.css";
import Customer from "./Components/Customer";
import Home from "./Home";
import Training from "./Components/Training";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6S">
            <h2>Training app</h2>
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
          <Link to="/">Home</Link>{"  "}
          <Link to="/customer">Customer</Link>{"  "}
          <Link to="/training">Training</Link>{"  "}
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/training" element={<Training />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
