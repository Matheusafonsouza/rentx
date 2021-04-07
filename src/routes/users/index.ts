import { Router } from 'express';

import { CreateUserController } from '../../modules/accounts/useCases/createUser/CreateUserController';
import { ListUsersController } from '../../modules/accounts/useCases/listUsers/ListUsersController';

const usersRoutes = Router();

const listUsersController = new ListUsersController();
const createUserController = new CreateUserController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.get('/', listUsersController.handle);

export { usersRoutes };
