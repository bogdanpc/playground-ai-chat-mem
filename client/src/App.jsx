import AppRoutes from '@/routes';
import { BrowserRouter as Router } from "react-router-dom";

import './App.css';

function App() {

  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App;
