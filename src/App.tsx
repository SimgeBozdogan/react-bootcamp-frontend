import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/HomePage";
import Phonebook from "./components/Phonebook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="phonebook" element={<Phonebook />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
