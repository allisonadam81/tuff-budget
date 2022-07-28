import { InputEvent, FormEvent, ButtonEvent } from '../../types';
import { LineItemType, Budget } from '../../types';
import { LineItemActions, Methods } from './Actions';
import axios from 'axios';

export const cheapClone = (object: any) => {
  return JSON.parse(JSON.stringify(object))
}

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

export const curryChange = (editedObject: any) => {
  const sumType = typeObjectGenerator();
  return (setter: React.Dispatch<React.SetStateAction<any>>) => {
    return (field: keyof typeof LineItemActions) => {
      return (e: InputEvent) => {
        switch ( typeof sumType[field] ) {
          case ('string') : {
            setter({ ...editedObject, [field]: e.target.value })
            return;
            break;
          }
          case ('number') : {
            setter({ ...editedObject, [field]: numFilter(e.target.value) })
            return;
            break;
          }
          case ('boolean') : {
            setter({ ...editedObject, [field]: e.target.checked })
            return;
            break;
          }
        }
      }
    }
  }
}

// export const curryThen = (recoilSetter: any) => {
//   return (...resetters: any) => {
//     return (res: any) => {
//       recoilSetter(res.data);
//       if (resetters.length){
//         resetters.forEach((resetter: any) => resetter())
//       }
//     }
//   }  
// }

export const curryFetch = (url: string) => {
  return (method: keyof typeof Methods) => {
    return (dataObj: any) => {
      return (thenHandler: any) => {
        return (catchHandler: any) => {
          return (e: InputEvent | FormEvent | ButtonEvent) => {
            e.preventDefault();
            axios[method](url, dataObj)
              .then(thenHandler)
              .catch(catchHandler)
          }
        }
      }
    }
  }
}


export const urlFunc = (item: 'budget'|'lineItems', firstID: number, secondID: number) => {
  return `http://localhost:3000/${item}/${firstID}/${secondID}`
}


