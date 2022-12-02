import "./App.css";
import TabPanel from "./TabPanel";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


function App() {
  return (
    <div className="App">
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography component="h2" variant="h6S">
            Training app
          </Typography>
        </Toolbar>
      </AppBar>
      <TabPanel />
    </div>
  );
}

export default App;
