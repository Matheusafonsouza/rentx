import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenController';

const sessionRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

sessionRoutes.post('/sessions', authenticateUserController.handle);
sessionRoutes.post('/refresh-token', refreshTokenController.handle);

export { sessionRoutes };
