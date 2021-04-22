import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenController';
import { ResetPasswordUserController } from '@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController';
import { SendForgotPasswordMailController } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';

const sessionRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();
const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

sessionRoutes.post('/sessions', authenticateUserController.handle);
sessionRoutes.post('/refresh-token', refreshTokenController.handle);
sessionRoutes.post('/forgot-password', sendForgotPasswordMailController.handle);
sessionRoutes.post('/reset-password', resetPasswordUserController.handle);

export { sessionRoutes };
