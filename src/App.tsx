import { Route, Routes } from "react-router-dom";
import UserListPages from "./pages/UserList/UserListPages";
import UserProfileItem from "./pages/UserProfile/UserProfileItem";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserListPages />} />
      <Route path="/profile/:id" element={<UserProfileItem />} />
    </Routes>
  );
}

export default App;
