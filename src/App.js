import './App.css';
import MainTemplate from './components/MainTemplate/MainTemplate';
import Login from './components/Login/Login';
import Users from './components/Users/Users';
import AddUser from './components/Users/AddUser/AddUser';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <MainTemplate>
            <Routes>
              <Route exact path='/' element={<Login />} />
              <Route exact path='/users' element={<Users />} />
              <Route exact path='/adduser' element={<AddUser />} />
            </Routes>
          </MainTemplate>
        </Router>
      </header>
    </div>
  );
}

export default App;
