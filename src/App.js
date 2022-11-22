import { Routes, Route } from "react-router-dom"

import { Home, UserList, UserDetails } from './pages';

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/users" element={ <UserList/> } />
        <Route path="/user/:username" element={ <UserDetails/> } />
      </Routes>
    </div>
  );
}

export default App;
