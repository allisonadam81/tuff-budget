export {};

import { NextFunction } from '../../types';
import { Request, Response } from 'express';
const db = require('../models/dbModels');

const lineItemController = {
  // middleware to delete an existing line item in the database
  deleteLineItem: (req: Request, res: Response, next: NextFunction) => {
    const { lineItemID, budgetID } = req.params;
    const params: Number[] = [Number(lineItemID)]
    // define query to delete specified budget
    const sqlQuery = `
    UPDATE lineitems
    SET isActive = false
    WHERE ID = $1;
    `;

    // query the database and insert new budget
    db.query(sqlQuery, params)
      .then((queryResults: any) => {
        res.locals.queryResults = queryResults;
        return next();
      })
      .catch((err: any) => {
        return next({
          log: 'Express error in deleteLineItem middleware',
          status: 400,
          message: {
            err: `lineItemController.deleteLineItem: ERROR: ${err}`,
          },
        });
      });
  },

  // middleware to enter a new line item into a database
  createLineItem: (req: Request, res: Response, next: NextFunction) => {
    //FIXME: REFACTOR ME probably a better way to do this
    const {
      budgetID,
      description,
      category,
      expAmount,
      actAmount,
      isFixed,
      isRecurring,
      lIndex
    } = req.body;

    const params = [
      budgetID,
      description,
      category,
      expAmount,
      actAmount || -1,
      isFixed,
      isRecurring,
      lIndex
    ];

    const sqlQuery = `
    INSERT INTO lineitems (budgetID, description, category, expAmount, actAmount, isFixed, isRecurring, isActive, lIndex)
    VALUES ($1, $2, $3, $4, $5, $6, $7, true, $8)
    RETURNING ID;
    `;

    // query the database to create a new li and return the new line item ID
    db.query(sqlQuery, params)
      .then((queryResults: any) => {
        res.locals.lineItemID = queryResults.rows[0].id;
        return next();
      })
      .catch((err: any) => {
        return next({
          log: 'Express error in createLineItem middleware',
          status: 400,
          message: {
            err: `lineItemController.createLineItem: ERROR: ${err}`,
          },
        });
      });
  },
};

module.exports = lineItemController;
