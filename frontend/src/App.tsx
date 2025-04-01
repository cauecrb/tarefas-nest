import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" Component={RegisterForm} />
            </Routes>
        </Router>
    );
};

export default App;