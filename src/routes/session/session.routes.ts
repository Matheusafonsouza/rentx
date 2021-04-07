import { Router } from 'express';

import { AuthenticateUserController } from '../../modules/accounts/useCases/authenticateUser/AuthenticateUserController';

const sessionRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

sessionRoutes.post('/sessions', authenticateUserController.handle);

export { sessionRoutes };
