import axios from "axios";
import { useEffect, useState } from "react";
import { IUser } from "./model";

const Navigation = () => {
  const [sort, setSort] = useState("");
  const [user, setUser] = useState<IUser[]>([]);

  localStorage.setItem("sort", sort);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get<IUser[]>(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUser(response.data);
      } catch {}
    }
    fetchUser();
  }, []);

  return (
    <nav className='"leftCard"'>
      <h4>Сортировка</h4>

      <button className="btnLeftCard" onClick={() => setSort("city")}>
        по городу{" "}
      </button>

      <button className="btnLeftCard" onClick={() => setSort("company")}>
        по компании{" "}
      </button>
    </nav>
  );
};

export default Navigation;
