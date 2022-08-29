import { Route, Routes } from "react-router-dom";
import { IUser } from "./components/model";
import UserListPages from "./pages/UserList/UserListPages";
import UserProfileItem from "./pages/UserProfile/UserProfileItem";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserListPages users={[]} id={""} />} />
      <Route path="/profile/:id"
        element={
          <UserProfileItem
            id={""}
            onClick={function (user: IUser): void {
              throw new Error("Function not implemented.");
            }}
            users={[]}
          />
        }
      />
    </Routes>
  );
}

export default App;
