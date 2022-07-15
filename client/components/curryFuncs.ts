import { InputEvent, FormEvent } from '../../types';
import { LineItemType, Budget } from '../../types';
import { LineItemActions, Methods } from './Actions';
import axios from 'axios';


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

type CombinedType = LineItemType & Budget;

 
// enum booleanSum {
//   isFixed = 'true',
//   isRecurring = 'true'
// }


//const sumType: LineItemType & Budget =
// type SumType = LineItemType & Budget;
type SumType = {
    budgetID: number
    lineItemID: number
    description: string
    category: string
    expAmount: number
    actAmount: number
    isFixed: boolean
    isRecurring: boolean
    budget: number
    title: string
}


const typeObjectGenerator = (): SumType => {
  return {
    budgetID: 1,
    lineItemID: 1,
    description: '',
    category: '',
    expAmount: 1,
    actAmount: 1,
    isFixed: true,
    isRecurring: true,
    budget: 1,
    title: '',
  }
}

export const curryChange = (editedObject: any, type: keyof typeof LineItemActions ) => {
  return (setter: React.Dispatch<React.SetStateAction<any>>) => {
    const sumType = typeObjectGenerator();
    return (e: InputEvent) => {
      switch ( typeof sumType[type] ) {
        case ('string') : {
          setter({ ...editedObject, [type]: e.target.value })
          return;
          break;
        }
        case ('number') : {
          setter({ ...editedObject, [type]: numFilter(e.target.value) })
          return;
          break;
        }
        case ('boolean') : {
          setter({ ...editedObject, [type]: e.target.checked })
          return;
          break;
        }
      }
    }
  }
}



export const curryFetch = (addedObject: any) => {
  return (url: string) => {
    return (method: keyof typeof Methods) => {
      return (e: InputEvent | FormEvent) => {
        e.preventDefault();
        axios[method](url, addedObject ? addedObject : null)
      }
    }
  }
}





