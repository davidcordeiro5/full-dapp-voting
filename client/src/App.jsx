import { ThemeProvider } from "styled-components";

import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Demo from "./components/Demo";
import WorkflowStatus from "./components/WorkflowStatus/WorkflowStatus";

import theme from "./theme.js";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <EthProvider>
        <div id="App">
          <div className="container">
            <WorkflowStatus />
            <Intro />
            <hr />
            <Demo />
          </div>
        </div>
      </EthProvider>
    </ThemeProvider>
  );
}

export default App;
