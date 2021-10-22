import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageService";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

router.post('/authenticate', new AuthenticateUserController().handle)
router.post('/messages', ensureAuthenticated, new CreateMessageController().handle);

export { router }