import { InputEvent } from '../../types';
import { LineItemType, Budget } from '../../types';

// type SumType = LineItemType & Budget;
// type SumKeys = keyof LineItemType;
// type BudgetKeys = keyof Budget;

// type sum = {
//   budgetID: number,
//   lineItemID: number,
//   description: string,
//   category: string,
//   expAmount: number,
//   actAmount: number,
//   isFixed: boolean,
//   isRecurring: boolean,
//   budget: number,
//   title: string,
//   lineItems: any[]
// }

// const sumType: any = {
//   budgetID: 1,
//   lineItemID: 1,
//   description: '',
//   category: '',
//   expAmount: 1,
//   actAmount: 1,
//   isFixed: true,
//   isRecurring: true,
//   budget: 1,
//   title: '',
//   lineItems: []
// }

export const numFilter = (string: string): number => {
  return Number(string.replace(/\D/g, ''))
}

export const numHandler = function (setter: React.Dispatch<React.SetStateAction<string | number>>) {
  return (e: InputEvent) => setter(numFilter(e.target.value));
};

export const changeHandler = function (setter: React.Dispatch<React.SetStateAction<string>>) {
  return (e: InputEvent) => setter(e.target.value);
}

export const checkHandler = function (setter: React.Dispatch<React.SetStateAction<boolean>>) {
  return (e: InputEvent) => setter(e.target.checked);
}

  
// export const curryChange = (editedObject: any, type: string) => {
//     return (setter: React.Dispatch<React.SetStateAction<any>>) => {
//       return (e: InputEvent) => {
//         switch ((typeof sumType[type])) {
//           case ('string') : {
//             setter({ ...editedObject, [type]: e.target.value })
//             return;
//             break;
//           }
//           case ('number') : {
//             setter({ ...editedObject, [type]: numFilter(e.target.value) })
//             return;
//             break;
//           }
//           case ('boolean') : {
//             setter({ ...editedObject, [type]: e.target.checked })
//             return;
//             break;
//           }
//         }
//       }
//     }
//   }
