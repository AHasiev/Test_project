import axios, { Axios, AxiosError } from "axios";
import React, { FC, useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import { IUser } from "./model";

interface NavigationParams {
  users: IUser[];
}

const Navigation: FC<NavigationParams> = () => {
  const [sort, setSort] = useState("");
  const [user, setUser] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  localStorage.setItem("sort", sort);

  async function fetchUser() {
    try {
      setError("");
      setLoading(true);
      const response = await axios.get<IUser[]>(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUser(response.data);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <nav className='"leftCard"'>
      <h4>Сортировка</h4>
     
      <button className="btnLeftCard" onClick={() => setSort("city")}>
        по городу
      </button>
      <button className="btnLeftCard" onClick={() => setSort("company")}>
        по компании
      </button>
    </nav>
  );
};

export default Navigation;
