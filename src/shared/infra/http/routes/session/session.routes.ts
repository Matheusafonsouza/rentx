import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenController';
import { SendForgotPasswordMailController } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';

const sessionRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();
const sendForgotPasswordMailController = new SendForgotPasswordMailController();

sessionRoutes.post('/sessions', authenticateUserController.handle);
sessionRoutes.post('/refresh-token', refreshTokenController.handle);
sessionRoutes.post('/forgot-password', sendForgotPasswordMailController.handle);

export { sessionRoutes };
