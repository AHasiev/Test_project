import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IUser } from "../../components/model";
import Navigation from "../../components/Navigation";
import ReactLoading from "react-loading";

const UserListPages = () => {
  const [user, setUser] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sort, setSort] = useState(localStorage.getItem("sort"));

  async function fetchUser() {
    try {
      setError("");
      setLoading(true);
      const respons = await axios.get<IUser[]>(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUser(respons.data);
      setLoading(false);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const collatore = new Intl.Collator("en-EN");

  const sortUser = () => {
    switch (sort) {
      case "city":
        return user
          .slice()
          .sort((a, b) => collatore.compare(a.address.city, b.address.city));
      case "company":
        return user
          .slice()
          .sort((a, b) => collatore.compare(a.company.name, b.company.name));
      default:
        return user;
    }
  };

  return (
    <div className="body">
      <div className="main">
        <Navigation />
        <div className="rightCard">
          <h2>Список пользователей</h2>
          {loading ? (
            <ReactLoading
              type={"bars"}
              color={"green"}
              height={100}
              width={100}
            />
          ) : (
            <>
              {sortUser().map((user) => {
                return (
                  <div key={user.id} className="listCard">
                    <li>Name: {user.name}</li>
                    <li>City: {user.address.city}</li>
                    <li>Company: {user.company.name}</li>
                    <Link key={user.id} to={`/profile/${user.id}`}>
                      <button className="btnRightCard">Подробнее</button>
                    </Link>
                  </div>
                );
              })}
            </>
          )}
          {error && <h3>{error}</h3>}

          <p>Найдено 10 пользователей</p>
        </div>
      </div>
    </div>
  );
};

export default UserListPages;
