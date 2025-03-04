import { Router } from "express";
import { DentistController } from "../controllers/DentistController";
const router = Router();

router.get("/", DentistController.getDentists);
router.post("/", DentistController.createDentist);
router.delete("/:id", DentistController.deleteDentist);
router.put("/:id", DentistController.updateDenstist);
router.put("/:id/active", DentistController.activeDentist);

export default router;
