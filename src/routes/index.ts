import { Router } from 'express';

import { todosRoutes } from './todos.routes';
import { userRoutes } from './user.routes';

const router = Router();

router.use('/todos', todosRoutes);
router.use('/user', userRoutes);

export { router };
