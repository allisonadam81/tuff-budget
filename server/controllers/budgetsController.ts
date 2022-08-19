import { LineItemType, NextFunction } from '../../types';
import { Request, Response } from 'express';
import BudgetMetaDataEditing from '../../client/components/BudgetMetaDataEditing';
const db = require('../models/dbModels');

interface UserBudgetType {
  title: string;
  budget: number;
  budgetID: number;
  lineItems: LineItemType[];
}

type BudgetQueryType = {
  id: number;
  userid?: number;
  title: string;
  budget: number;
  isactive?: boolean;
}

const budgetsController = {
  // middleware to recieve all budgets for a specified user
  getBudgets: (req: Request, res: Response, next: NextFunction) => {
    const { userID } = req.params;
    const params = [userID];

    // define query to recieve all budgets for the specified user
    const sqlQuery = `
    SELECT * 
    FROM budgets
    WHERE userID = $1 AND isActive = true
    ORDER BY id;
    `;

    // query the database and pass the results to the next middleware
    res.locals.userBudgets = [] as UserBudgetType[];
    db.query(sqlQuery, params)
      .then((queryResults: any) => {
        queryResults.rows.forEach((budget: BudgetQueryType) => {
          // convert the budget data to the frontend ready format
          const userBudget: UserBudgetType = {
            title: budget.title,
            budget: budget.budget,
            budgetID: budget.id,
            lineItems: [],
          };

          // attach results to locals
          res.locals.userBudgets.push(userBudget);
        });
        return next();
      })
      .catch((err: any) => {
        return next({
          log: 'Express error in getBudgets middleware',
          status: 400,
          message: {
            err: `budgetsController.getBudgets: ERROR: ${err}`,
          },
        });
      });
  },

  getLineItems: async (req: Request, res: Response, next: NextFunction) => {
    for (let budget of res.locals.userBudgets) {
      const sqlQuery = `
      SELECT * 
      FROM lineitems
      WHERE budgetID = $1 AND isActive = true
      ORDER BY id;
      `;

      const params = [budget.budgetID];
      // query database for all line items pertaining to specified budget
      try {
        const queryResults = await db.query(sqlQuery, params);
        console.log('query results ', queryResults.rows )
        queryResults.rows.forEach((lineItem: any) => {
          const formattedLI: LineItemType = {
            budgetID: lineItem.budgetid,
            lineItemID: lineItem.id,
            description: lineItem.description,
            category: lineItem.category,
            expAmount: lineItem.expamount,
            actAmount: lineItem.actamount,
            isFixed: lineItem.isfixed,
            isRecurring: lineItem.isrecurring,
          }
          budget.lineItems.push(formattedLI);
          //console.log('budget ', budget.lineItems)
        });
        //return next();
      }
      catch (err) {
        return next({
          log: 'Express error in getLineItems middleware',
          status: 400,
          message: {
            err: `budgetsController.getLineItems: ERROR: ${err}`,
          },
        });
      }
    }
    return next();
  },

  // middleware to create a new budget in the database
  createBudget: (req: Request, res: Response, next: NextFunction) => {
    const { userID } = req.params
    const { title, budget, lineItems } = req.body;
    const params = [userID, title, budget];
    const sqlQuery = `
    INSERT INTO budgets (userID, title, budget)
    VALUES ($1, $2, $3)
    RETURNING *;
    `;

    // query the database and insert new budget
    db.query(sqlQuery, params)
      .then((queryResults: any) => {
        // create and attach return object to locals so that frontend can display budget
        res.locals.createdBudget = {
          budgetID: queryResults.rows[0].id,
          title: queryResults.rows[0].title,
          budget: queryResults.rows[0].budget,
          lineItems
        };
        return next();
      })
      .catch((err: any) => {
        console.log(err)
        return next({
          log: 'Express error in createBudget middleware',
          status: 400,
          message: {
            err: `budgetsController.createBudget: ERROR: ${err}`,
          },
        });
      });
  },

  // middleware to deactivate a budget from the database
  deleteBudget: (req: Request, res: Response, next: NextFunction) => {
    const { budgetID, userID } = req.params;
    const params: Number[] = [Number(budgetID)]
    // define query to delete specified budget
    const sqlQuery = `
    UPDATE budgets
    SET isActive = false
    WHERE ID = $1;
    `;
    // const sqlQuery = `
    // DELETE FROM budgets
    // WHERE ID = $1
    // RETURNING *;
    // `
    // query the database and insert new budget
    db.query(sqlQuery, params)
      .then((queryResults: any) => {
        res.locals.budget = queryResults.rows[0];
        return next();
      })
      .catch((err: any) => {
        return next({
          log: 'Express error in deleteBudget middleware',
          status: 400,
          message: {
            err: `budgetsController.deleteBudget: ERROR: ${err}`,
          },
        });
      });
  },

  patchBudget: (req: Request, res: Response, next: NextFunction) => {
    const { userID, budgetID } = req.params;
    let columns = [];
    let params = [];
    let i = 1;
    for (let key in req.body) {
      columns.push(`${key}=$${i++}, `);
      params.push(req.body[key])
    }
    columns[i - 2] = columns[i - 2].replace(',', '').trim();
    params.push(budgetID);
    const sqlQuery = `
    UPDATE budgets
    SET ${columns.join('')}
    WHERE id=$${i}
    RETURNING *
    `;
    db.query(sqlQuery, params)
      .then((data: any) => {
        const budget: BudgetQueryType = data.rows[0]
        delete budget.userid;
        delete budget.isactive;
        res.locals.budget = budget;
        return next();
      })
      .catch((err: any) => console.log(err));
  }
};

module.exports = budgetsController;
