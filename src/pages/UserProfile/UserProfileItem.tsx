import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IUser } from "../../components/model";
import Navigation from "../../components/Navigation";
import ReactLoading from "react-loading";

const UserProfileItem = () => {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [read, setRead] = useState<boolean>(true);
  const [user, setUser] = useState<IUser | null>(null);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const changeStreet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStreet(e.target.value);
  };

  const changeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const changeZipeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZipcode(e.target.value);
  };

  const changePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const changeWebsite = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsite(e.target.value);
  };

  async function fetchUsers() {
    try {
      setLoading(true);
      const response = await axios.get<IUser>(
        "https://jsonplaceholder.typicode.com/users/" + params.id
      );
      setUser(response.data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  async function editUsers() {
    try {
      setLoading(true);
      const response = await axios.patch<IUser>(
        "https://jsonplaceholder.typicode.com/users/" + params.id,
        {
          name: name,
          username: username,
          email: email,
          street: street,
          city: city,
          zipcode: zipcode,
          phone: phone,
        }
      );
      setUser(response.data);
      setLoading(false);
    } catch {}
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="mainUserProfile">
      <Navigation />
      <div className="mainHeader">
        {loading && (
          <ReactLoading
            type={"bars"}
            color={"green"}
            height={100}
            width={100}
          />
        )}
        <div className="header">
          <h2>Профиль пользователя</h2>
          <button onClick={() => setRead(false)} className="btnEdit">
            Редактировать
          </button>
        </div>

        <div className="informationUser">
          <div className="name">
            Name
            <input
              readOnly={read}
              type="text"
              placeholder="name"
              onChange={(e) => changeName(e)}
              value={name ? name : user?.name}
            ></input>
          </div>
          <div className="userName">
            Username
            <input
              defaultValue={user?.username}
              type="text"
              placeholder="username"
              readOnly={read}
              onChange={(e) => changeUsername(e)}
              value={username ? username : user?.username}
            ></input>
          </div>
          <div className="email">
            E-mail
            <input
              defaultValue={user?.email}
              type="text"
              placeholder="example@mail.ru"
              readOnly={read}
              onChange={(e) => changeEmail(e)}
              value={email ? email : user?.email}
            />
          </div>

          <div className="street">
            Street
            <input
              defaultValue={user?.address.street}
              type="text"
              placeholder="Street"
              readOnly={read}
              onChange={(e) => changeStreet(e)}
              value={street ? street : user?.address.street}
              required={true}
            />
          </div>

          <div className="city">
            City
            <input
              defaultValue={user?.address.city}
              type="Moskow"
              placeholder="Иван Иванов"
              readOnly={read}
              onChange={(e) => changeCity(e)}
              value={city ? city : user?.address.city}
            />
          </div>

          <div className="zipecode">
            Zipe Code
            <input
              type="text"
              placeholder="123456"
              readOnly={read}
              onChange={(e) => changeZipeCode(e)}
              value={zipcode ? zipcode : user?.address.zipcode}
            />
          </div>

          <div className="phone">
            Phone
            <input
              defaultValue={user?.phone}
              type="89999999999"
              placeholder="Иван Иванов"
              readOnly={read}
              onChange={(e) => changePhone(e)}
              value={phone ? phone : user?.phone}
            />
          </div>

          <div className="website">
            Website
            <input
              defaultValue={user?.website}
              type="text"
              placeholder="www.example.com"
              readOnly={read}
              onChange={(e) => changeWebsite(e)}
              value={website ? website : user?.website}
            />
          </div>

          <div className="comment">
            Comment
            <textarea>Enter your message</textarea>
          </div>
          <button className="btnAdd" onClick={editUsers}>
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileItem;
