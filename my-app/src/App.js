// import logo from './logo.svg';
// import './App.css';
import Products from './Pages/Products';
import Routingg from './Pages/Routes';

import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routingg></Routingg>
    </div>
    </BrowserRouter>
  );
}

export default App;
