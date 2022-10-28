import { addRxPlugin, createRxDatabase, RxCollection, RxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/dexie";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { userSchema, UserType } from "./UserSchema";

addRxPlugin(RxDBDevModePlugin);

type UserDatabase = RxDatabase<{
  users: RxCollection<UserType>;
}>;

export async function initRXDB() {
  const db: UserDatabase = await createRxDatabase({
    name: "userdb",
    storage: getRxStorageDexie(),
  });

  await db.addCollections({
    users: {
      schema: userSchema,
    },
  });

  //   await db.users.bulkInsert([
  //     {
  //       id: `${Math.round(Math.random() * 1000000)}`,
  //       firstName: "John",
  //       lastName: "Doe",
  //       age: 23,
  //     },
  //     {
  //       id: `${Math.round(Math.random() * 1000000)}`,
  //       firstName: "Jane",
  //       lastName: "Doe",
  //       age: 23,
  //     },
  //   ]);

  const users$ = db.users.find({
    // selector: {
    //   age: 36,
    // },
  }).$;

  function addUser(user: UserType) {
    db.users.insert(user);
  }

  return {
    users$,
    addUser,
  };
}
