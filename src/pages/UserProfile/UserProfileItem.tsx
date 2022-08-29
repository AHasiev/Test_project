import axios, { AxiosError } from "axios";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IUser } from "../../components/model";
import Navigation from "../../components/Navigation";
import ReactLoading from "react-loading";

interface UserProfilePagesParams {
  id: string;
  onClick: (user: IUser) => void;
  users: IUser[];
}

const UserProfileItem: FC<UserProfilePagesParams> = () => {
  const [value, setValue] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [nameDirty, setNameDirty] = useState<boolean>(false)
  const [nameDirtyError, setNameDirtyError] = useState<string>('Поле имя не может быть пустым')
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
  const [error, setError] = useState("");

  // const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   console.log(value);
  // };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

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


  const blurHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'name':
        setNameDirty(true)
        break
    };
  };
 
  async function fetchUsers() {
    try {
      setError("");
      setLoading(true);
      const response = await axios.get<IUser>(
        "https://jsonplaceholder.typicode.com/users/" + params.id
      );
      // console.log(respons.data);
      setUser(response.data);
      setLoading(false);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }

  async function editUsers() {
    try {
      setError("");
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
      console.log(response.data);
      setUser(response.data);
      setLoading(false);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="mainUserProfile">
      <Navigation users={[]} />
      <div className="mainHeader">
      {loading && <ReactLoading
              type={"bars"}
              color={"green"}
              height={100}
              width={100}
            />}
        <div className="header">
          <h2>Профиль пользователя</h2>
          <button onClick={() => setRead(false)} className="btnEdit">
            Редактировать
          </button>
        </div>

        <div className="informationUser">
          <div className="name">
            Name
            {(nameDirty && nameDirtyError) && <span className="messageName">{nameDirtyError}</span>}
            <input
            onBlur={e => blurHandle(e)}
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
            <input type="text" placeholder="Enter your message" />
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

function user(user: any, onClick: any): React.FC<UserProfilePagesParams> {
  throw new Error("Function not implemented.");
}
