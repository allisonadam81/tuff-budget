const express = require('express');
const router = express.Router();
import { Request, Response } from 'express';

// IMPORT CONTROLLERS
const budgetsController = require('../controllers/budgetsController');

// REQUEST HANDLERS
router.get('/:userID', budgetsController.getBudgets, budgetsController.getLineItems, function (req: Request, res: Response) {
    res.status(200).json(res.locals.userBudgets);
  }
);

router.post(
  '/:userID/:budgetID',
  budgetsController.createBudget,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.createdBudget);
  }
);

router.delete(
  '/:userID/:budgetID',
  budgetsController.deleteBudget,
  function (req: Request, res: Response) {
    res.status(200).send('Successfully deleted budget');
  }
);

// EXPORT ROUTER
module.exports = router;
