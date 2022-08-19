import { InputEvent, FormEvent, ButtonEvent, LineItemArray } from '../../types';
import { LineItemType, Budget, DataObjects } from '../../types';
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
    return (dataObj: DataObjects) => {
      return (thenHandler: any) => {
        return (catchHandler: any) => {
          return (e: InputEvent | FormEvent | ButtonEvent) => {
            e.preventDefault();
            console.log(url)
            axios[method](url, dataObj)
              .then(thenHandler)
              .catch(catchHandler)
          }
        }
      }
    }
  }
}


export const urlFunc = (item: 'budgets'|'lineItems', firstID: number, secondID: number) => {
  return `http://localhost:3000/${item}/${firstID}/${secondID}`
}





/*
// in selector family for line item, if the line item does not exist in BigLIAtom, then default is the default object.


// what does the data look like?
res.data.budgets = { 42 <-- bID: { title: '', budget: 0 } };
res.data.lineItems = { 3 <-- lID: { desc: '', cat: '', etc.... }};
set big lineItem Atom to res.data.lineItems
set big budgets atom to res.data.budgets;
set budgetID array to Object.keys(res.data.budgets);

maincontainer iterates through BudgetIDArray and returns a Budget for each, drilling down the budgetID.
The budget then imports the budgetimports the lineItemsAtom and sets the lineItemArray(bID) to be an array of lIDs that have a corresponding bID.

the Budget imports the 

create an atom that is a budgetID array.

create an atom family that is a default value selector family that takes in the budget id. it returns the budget information for that budgetID. NO SETTER.
create an atom family of lineItemIDArrays that is a default value of selector families that takes in the budget ID and returns the array of line item IDs for that budget NO SETTer.
create an atom family of lineItems that is a default of selector family that gets the values from the lineitemID key from the big state NO SETTER.


setBudgetIDArrayAtom(prev => [...Object.keys(res.data.budgets))];

for (let id in budgets) {
  [ lineItemIDArray, setLineItemIDArray ] = useRecoilState(lineItemIdArrayAtomFamily(id))
  setLineItemIDArrayAtomFamily()
}


const lineItemIDArrayAtomFamily = atomFamily({
  key: '',
  default: (budgetID) => []
})


*/


