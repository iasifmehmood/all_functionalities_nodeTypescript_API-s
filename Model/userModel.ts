import { UserEntity } from '../Entity/userEntity';
import QueryDB from '../Providers/DatabaseProvider';

export class UserModel {
  async createUser(user: UserEntity): Promise<UserEntity> {
    const { name, email, password } = user;
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    const values = [name, email, password];
    try {
      let result = await QueryDB(query, values);
      const insertedId = (result as any).insertId as number;
      return { id: insertedId, ...user };
    } catch (error) {
      throw new Error('Failed to add user');
    }
  }
}
