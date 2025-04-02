import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" Component={RegisterForm} />
                <Route path="/login" Component={LoginForm} />
            </Routes>
        </Router>
    );
};

export default App;