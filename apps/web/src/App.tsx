import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";
import FormPage from "./pages/FormPage";
import UsersList from './pages/UserList';
import UserPage from './pages/User';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/user" element={<UsersList />} />
          <Route path='/user/:id' element={<UserPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
