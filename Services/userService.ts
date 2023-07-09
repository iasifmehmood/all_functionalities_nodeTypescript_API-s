import { UserEntity } from '../Entity/userEntity';
import { UserModel } from '../Model/userModel';

export class UserService {
  private userModel: UserModel;
  constructor() {
    this.userModel = new UserModel();
  }
  async createUser(user: UserEntity): Promise<UserEntity> {
    const createdUser = await this.userModel.createUser(user);

    return createdUser;
  }
}
