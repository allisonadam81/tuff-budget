import React from "react";

export type BudgetArray = Budget[] | []

export type LineItemArray = LineItemType[] | []

export type Budget = {
  title: string,
  budgetID: number,
  budget: number,
  lineItems: LineItemArray
};

export type LineItemType = {
  budgetID: number,
  lineItemID: number,
  description: string,
  category: string,
  expAmount: number,
  actAmount: number,
  isFixed: boolean,
  isRecurring: boolean,
}

export type LineItemResponse = {
  lineItemID: number
}

export type BudgetCardResponse = {
  budgetID: number
}

export type BudgetCardPostRequest = {
  title: string,
  budget: number
}

export type ActionObject = {
  type: string,
  payload?: any
}

export type LineItemPatchRequest= {
  lineItemID: number,
  field: string,
  newValue: string | boolean | number
}

export type DataObjects = {
  title?: string,
  budget?: number,
  budgetID?: number,
  lineItems?: LineItemArray,
  description?: string,
  category?: string,
  expAmount?: number,
  actAmount?: number,
  isFixed?: boolean,
  isRecurring?: boolean
}

export type LineItemPostRequest = {
  budgetID: number
  newData: {
    description: string,
    category: string,
    expAmount: number,
    actAmount: number,
    isFixed: boolean,
    isRecurring: boolean
  }
}

export type HandleFunctions = () => void

export interface NextFunction {
  (err?: any): void;
}

export interface RequestHandler {
(req: Request, res: Response, next: NextFunction): any;
}

// export interface ErrorRequestHandler {
//   (err: any, req: Request, res: Response, next: NextFunction): any;
// }

export interface MiddlewareFunction {
  (req: Request, res: Response, next: NextFunction): void;
}


export type InputEvent = React.ChangeEvent<HTMLInputElement>;
export type ButtonEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>
export type OnClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>
export type FormEvent = React.FormEvent<HTMLFormElement>
