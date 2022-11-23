import "./App.css";
import TabPanel from "./TabPanel";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography component="div" variant="h6S">
            <h2>Training app</h2>
          </Typography>
        </Toolbar>
      </AppBar>
      <TabPanel />   
    </div>
  );
}

export default App;
