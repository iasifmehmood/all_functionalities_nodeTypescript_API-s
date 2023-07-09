import { Request, Response } from 'express';
import { UserService } from '../Services/userService';
import { UserDTO } from '../DTO/userDTO';
import { UserEntity } from '../Entity/userEntity';
import { hashPassword } from '../Decorators/hashPasswordDecorator';
import MailService from '../Services/mailService';
import { SendMailDTO } from '../DTO/sendMailDTO';

export class UserController {
  private userService: UserService;
  private mailService: MailService; // Add an instance of the MailService class

  constructor() {
    this.userService = new UserService();
    //to solve type undefined method-1
    this.createUser = this.createUser.bind(this); // Bind the createUser method to the class instance
    //this.createUser = this.createUser.bind(this); ensures that the createUser method of the
    //UserController is bound to the class instance, allowing it to access instance properties,
    //such as userService, correctly when it is invoked from the route handler.
    this.mailService = MailService.getInstance(); // Create an instance of the MailService class
  }

  //to solve type undefined method-2 and method-3 from routes
  // createUser = async (req: Request, res: Response): Promise<void> => {
  @hashPassword
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body as UserDTO;
      const user: UserEntity = { name, email, password };

      const createdUser = await this.userService.createUser(user);

      if (createdUser) {
        const mailOptions: SendMailDTO = {
          requestId: 'User Creation',
          options: {
            from: 'hr@softoo.co',
            to: user.email,
            subject: 'Welcome to Our Website',
            text: `Dear ${user.name}, welcome to our website!`,
          },
        };

        await this.mailService.createConnection(); // Establish the email connection
        await this.mailService.sendMail(mailOptions); // Send the email
      }
      res.status(201).json(createdUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add user' });
    }
  }
}
