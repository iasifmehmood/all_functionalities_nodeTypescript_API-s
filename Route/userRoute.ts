import express, { Router } from 'express';
import { UserController } from '../Controller/userController';

const router: Router = express.Router();

const userController = new UserController();

router.post('/', userController.createUser);
//method-3
//router.post('/', (req, res) => userController.createUser(req, res));

export default router;
