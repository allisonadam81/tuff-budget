const express = require('express');
const router = express.Router();
import { Request, Response } from 'express';


// IMPORT CONTROLLERS
const lineItemController = require('../controllers/lineItemController');


// REQUEST HANDLERS
router.post('/:budgetID/:lineItemID', lineItemController.createLineItem, (req: Request, res: Response) => {
  res.status(200).json(res.locals);
});

router.delete('/:budgetID/:lineItemID', lineItemController.deleteLineItem, (req: Request, res: Response) => {
  res.status(200).send('Successfully deleted line item');
});
  

router.patch('/:budgetID/:lineItemID', lineItemController.patchLineItem, (req: Request, res: Response) => {
  res.status(200).json(res.locals)
})


// EXPORT ROUTER
module.exports = router;
