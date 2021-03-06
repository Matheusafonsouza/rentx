import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserUseController';

import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated';

const rentalsRouter = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRouter.get('/', ensureAuthenticated, listRentalsByUserController.handle);

rentalsRouter.post('/', ensureAuthenticated, createRentalController.handle);
rentalsRouter.post(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalController.handle
);

export { rentalsRouter };
