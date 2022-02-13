import { findUser } from '../database/users/users.statics';
import { connect, disconnect } from '../mongo';

(async () => {
  connect();
  const id = 'c257fbd8-fdce-411a-91a5-30fc1b50299e';
  try {
    const user = await findUser(id);
    console.log(user);
    setTimeout(() => {
      disconnect();
    }, 2000);
  } catch (e) {
    console.error(e);
  }
})();
