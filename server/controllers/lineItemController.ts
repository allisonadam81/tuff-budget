import { NextFunction } from '../../types';
import { Request, Response } from 'express';
const db = require('../models/dbModels');

const lineItemController = {
  // middleware to delete an existing line item in the database
  deleteLineItem: (req: Request, res: Response, next: NextFunction) => {
    const { lineItemID, budgetID } = req.params;
    const params: Number[] = [Number(lineItemID)]
    // define query to delete specified budget
    // const sqlQuery = `
    // UPDATE lineitems
    // SET isActive = false
    // WHERE ID = $1
    // RETURNING *;
    // `;
    const sqlQuery = `
    DELETE FROM lineitems
    WHERE ID = $1
    RETURNING *;
    `

    // query the database and insert new budget
    db.query(sqlQuery, params)
      .then((queryResults: any) => {
        console.log(queryResults.rows);
        res.locals.lineItem = queryResults.rows[0];
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
    const { budgetID, lineItemID } = req.params
    const {
      description,
      category,
      expAmount,
      actAmount,
      isFixed,
      isRecurring,    
    } = req.body;

    const params = [
      budgetID,
      description,
      category,
      expAmount,
      actAmount,
      isFixed,
      isRecurring,
    ];

    const sqlQuery = `
    INSERT INTO lineitems (budgetID, description, category, expAmount, actAmount, isFixed, isRecurring, isActive)
    VALUES ($1, $2, $3, $4, $5, $6, $7, true)
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

  patchLineItem: (req: Request, res: Response, next: NextFunction) => {
    const { lineItemID, budgetID } = req.params;
    let columns = [];
    let params = [];
    let i = 1;
    for (let key in req.body){
      columns.push(`${key}=$${i++}, `);
      params.push(req.body[key])
    }
    columns[i-2] = columns[i-2].replace(',', '').trim();
    params.push(lineItemID);
    const sqlQuery = `
    UPDATE lineitems
    SET ${columns.join('')}
    WHERE id=$${i}
    RETURNING *
    `;
    db.query(sqlQuery, params)
    .then((data: any) => {
      const lineItem = data.rows[0];
      delete lineItem.isactive;
      res.locals.lineItem = lineItem;
      return next();
    })
    .catch((err: any) => console.log(err));
  }
};

module.exports = lineItemController;
