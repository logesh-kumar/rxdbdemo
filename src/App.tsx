import { Observable } from "rxjs";
import { useObservableState } from "observable-hooks";
import "./App.css";
import { UserType } from "./UserSchema";

export type AppProps = {
  users$: Observable<UserType[]>;
  addUser: (user: UserType) => void;
};

function App({ addUser, users$ }: AppProps) {
  const users: UserType[] | undefined = useObservableState(users$);

  const addUserHandler = () => {
    // Add a new user with form data
    const firstName = (document.getElementById("firstName") as HTMLInputElement)
      .value;
    const lastName = (document.getElementById("lastName") as HTMLInputElement)
      .value;
    const age = (document.getElementById("age") as HTMLInputElement).value;
    addUser({
      id: `${Math.round(Math.random() * 1000000)}`,
      firstName,
      lastName,
      age: parseInt(age),
    });
  };

  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addUserHandler();
        }}
      >
        <input required type="text" name="firstName" id="firstName" />
        <input required type="text" name="lastName" id="lastName" />
        <input required type="number" name="age" id="age" />
        <button type="submit">Add User</button>
      </form>

      <ul>
        {users?.length ? (
          users?.map((user) => (
            <li key={user.id}>
              {user.firstName} {user.lastName} {user.age}
            </li>
          ))
        ) : (
          <li>No users</li>
        )}
      </ul>
    </div>
  );
}

export default App;
