import {Router} from 'express';
import * as controllers from '../controllers/user';


const router = Router();

//create fake data
router.get('/user/saveFakeDatas', controllers.saveFakeDatas);

router.get('/user/getAll', controllers.getAllUserController);
router.patch('/user/update', controllers.updateUsersController);

export default router;

