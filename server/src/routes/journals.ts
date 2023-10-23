import * as JournalsController from "../controllers/journals";

import express from "express";

const router = express.Router();

router.get("/active-years", JournalsController.getActiveYears);

router.get("/", JournalsController.getJournals);
router.post("/", JournalsController.createJournal);
router.get("/:journalId", JournalsController.getJournal);
router.delete("/:journalId", JournalsController.deleteJournal);
router.patch("/:journalId", JournalsController.updateJournal);

export default router;
