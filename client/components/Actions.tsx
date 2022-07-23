// type LineItemActions = {
//   description: 'description',
//   category: 'category',
//   expAmount: 'expAmount',
//   actAmount: 'actAmount',
//   isFixed: 'isFixed',
//   isRecurring: 'isRecurring'
// }

// export const LineItemActions: LineItemActions = {
//   description: 'description',
//   category: 'category',
//   expAmount: 'expAmount',
//   actAmount: 'actAmount',
//   isFixed: 'isFixed',
//   isRecurring: 'isRecurring'
// }

export enum BudgetProps {
  budgetID = 'budgetID',
  title = 'title',
  budget = 'budget',
  lineItems = 'lineItems'
}

export enum Methods {
  get = 'get',
  post = 'post',
  put = 'put',
  patch = 'patch',
  delete = 'delete'
}

export enum LineItemActions {
  description = 'description',
  category = 'category',
  expAmount = 'expAmount',
  actAmount = 'actAmount',
  isFixed = 'isFixed',
  isRecurring = 'isRecurring',
  budget = 'budget',
  title = 'title'
}