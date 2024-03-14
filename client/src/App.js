import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import SignUp from "./components/Forms/SignUp";
import SignIn from "./components/Forms/SignIn";
import Collabs from "./components/Collabs/AAA";
import New from "./components/New/AAA";
import Account from "./components/Account/AAA";
import HackPage from "./Pages/HackPage";

import { Container } from "react-bootstrap";

const App = () => {
  return (
    <Container fluid className="ps-4 pe-4">
      <Header />
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/collabs" element={<Collabs />} />
        <Route path="/hackathon/:id" element={<HackPage />} />
        <Route path="/new" element={<New />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
};

export default App;
