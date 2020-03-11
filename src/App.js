import React from 'react';
// Stylesheets
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// Components
import Sidebar from './components/sidebar/sidebar';
import RepositoriesList from './components/repositoriesList/repositoriesList';

function App() {
  return (
    <div className="App">
      <Sidebar></Sidebar>
      <RepositoriesList></RepositoriesList>
    </div>
  );
}

export default App;
