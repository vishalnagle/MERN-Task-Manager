import './App.css';
import { Login } from './component/Login';
import Register from './component/Register';
import { Welcome } from './component/Welcome';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskComponent from './todo/TaskComponent';
import { TaskProvider } from './context/TaskContext';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/UserContext';
function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/task" element={<TaskProvider><TaskComponent /></TaskProvider>} /></Routes>
        </Router>
      </AuthProvider>

    </div>
  );
}

export default App;
