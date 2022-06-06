import React, { Suspense, createContext, useState, useEffect, useReducer } from 'react';
// const BudgetCardList = React.lazy (() => import ('./BudgetCardList'));
import BudgetCardList from './BudgetCardList';
import axios from 'axios'; 
import { BudgetArray, LineItem, LineItemArray, Budget } from '../../types';
import { CrudContext } from './crudContext';
import BudgetCard from './BudgetCard';

function budgetReducer (state: any, action: any) {
  const deepCopyState = JSON.parse(JSON.stringify(state));
  const { budgetArray } = deepCopyState;
  switch (action.type) {
    case 'RELOAD_BUDGETS' : {
      console.log('here is state', state, 'here is action', action);
      return { ...state, budgetArray: action.payload }
    }
    case 'DELETE_BUDGET' : {
      for (let i = 0; i < budgetArray.length; i++){
        if (budgetArray[i].budgetID === action.payload){
          delete budgetArray[i];
          return { ... state, budgetArray }
        }
      }
      return state;
    }
    case 'CREATE_BUDGET' : {
      budgetArray.push(action.payload);
      return {...state, budgetArray };
    }
    case 'PATCH_BUDGET' : {
      const { title, budgetID, budget } = action.payload;
      for (let i = 0; i < budgetArray.length; i++){
        if (budgetArray[i].budgetID === budgetID){
          budgetArray[i] = { ...budgetArray[i], title, budgetID, budget }
          return { ...state, budgetArray }
        }
      }
      return state;
    }
    case 'DELETE_LINEITEM' : {
      const { budgetID, lineItemID } = action.payload;
      for (let i = 0; i < budgetArray.length; i++){
        if (budgetArray[i].budgetID === budgetID){
          const { lineItemArray } = budgetArray[i];
          lineItemArray.map((lineItem: LineItem, index: number) => {
            if (lineItem.lineItemID === lineItemID){
              delete lineItemArray[index];
            }
          })
          return { ...state, budgetArray }
        }
      }
    }
    case 'CREATE_LINEITEM' : {
      const { budgetID, lineItem } = action.payload;
      for (let i = 0; i < budgetArray.length; i++){
        if (budgetArray[i].budgetID === budgetID){
          const { lineItemArray } = budgetArray[i];
          lineItemArray.push(lineItem);
          return { ...state, budgetArray }
        }
      }
      return state;
    }
    case 'PATCH_LINEITEM' : {
      return 'do not patch yet please';
    }
    default : {
      return state
    }
  }
};


//----------------------------------------------START COMPONENT--------------------------------------------//


const MainContainer: React.FC = () => {
  // declare a fetching method to get budgets upon render.
  const budgetFetch = async () => {
    const result = await axios.get(`http://localhost:3000/budgets/${userID}`)
    dispatch({type: 'RELOAD_BUDGETS', payload: result.data})
    return result.data;
  }

  //upon component did mount, go fetch budgets.
  useEffect(() => {
    budgetFetch()
  }, [])

  //
  const [{ budgetArray, userID}, dispatch ] = useReducer(budgetReducer, { budgetArray: [], userID: 1});

  //-------------------------------CRUD CONSTROLLER----------------------------------------------//

  function myCrudCall (e: any, newObject: any, method: string, budgetID: number, lineItemID: number | null = null){
    console.log('crud call fired off');
    e.preventDefault();
    // if no method passed in, then return out immediately.
    if (!method) return alert('mistakenly called');
    // take the target body off of the event object for future use.
    const { target } = e;
    // declare a url and body
    let url: string, body: any;
    switch (lineItemID === null) {
      // if true, then we're dealing with a budget.
      case true : {
        url = `http://localhost:3000/budgets/${budgetID}`;
        switch (method){
          case 'POST' : {
              axios.post(url, newObject).then((res: any) => {
                newObject.budgetID = res.data;
                dispatch({type: 'CREATE_BUDGET', payload: newObject});
                return;
              })
              return;
            }
          case 'DELETE' : {
              axios.delete(url).then((response: any) => {
                // check if response has a status
                dispatch({type: 'DELETE_BUDGET', payload: budgetID})
                return;
              })
              .catch((err: any) => {
                console.log(err);
                return;
              })
            }
          case 'PATCH' : {
            return 'please do not patch yet please';
          }
          default : {
            return 'budgetID fell through whole switch case, which should not happen'
          }
        }

      }
      // if false, we're dealing with a line item.
      case false : {
        url = `http://localhost:3000/lineItems/${budgetID}/${lineItemID}`;
        switch (method){
          case 'POST' : {
              const description = target[0].value;
              const category = target[1].value;
              const expAmount = parseInt(target[2].value);
              let actAmount = parseInt(target[3].value);
              const isFixed = target[4].checked;
              const isRecurring = target[5].checked;
              
              target[0].value = '';
              target[1].value = '';
              target[2].value = '';
              target[3].value = '';
              target[4].checked = false;
              target[5].checked = false;
              
              if (!actAmount) actAmount = -1;
              //console.log('this is the budgetID ', budgetID)
              const newLineItem: any = { description, category, expAmount, actAmount, isFixed, isRecurring, budgetID, lineItemID }
          
              axios.post(url, newLineItem)
              .then((res: any) => {
                if (actAmount === -1) actAmount = 0;
                newLineItem.lineItemID = res.data;
                dispatch({type: 'CREATE_LINEITEM', payload: { newLineItem, budgetID }})
                return;
              })
            }
          case 'DELETE' : {
            axios.delete(url).then((response: any) => {
              // send stuff off to the reducer to set state.
              dispatch({type: 'DELETE_LINEITEM', payload: lineItemID})
              console.log('delete fired off')
              return;
              })
            }
          case 'PATCH' : {
            return
          }
          default : {
            return 'fell through whole switch case which should never happen'
          }
        }
      }
      default : {
        return 'fell through initial CRUD switch case, which should never happen'
      }
    }
  };
    
// for update requests, create an object that gets attached to the event object from the line item as a piece of state.
// Have it trigger with some sort of focus to turn all items into inputs.
// Then use some sort of on change to put into an object a key that is the column name, and then a value that is the onchange value.
// On unfocus, send a database call with the object attached to the node as 'updateObject'.
// Additionally, immediately change the color to a grey scale something until the database recieves a good response.

  const blankBudget: Budget = { title: '', budgetID: 0, budget: 0, lineItems: [] }
  const newBudgetActions = {
    title: 'TITLE',
    budget: 'BUDGET'
  }
  const [title, setTitle] = useState('');
  const [budget, setBudget] = useState(0);

  function newBudgetHandleChange (e: any, action: string) {
    switch (action) {
      case newBudgetActions.title : {
        return setTitle(e.target.value)
      }
      case newBudgetActions.budget : {
        return setBudget(Number(e.target.value))
      }
      default : {
        return 'incorrect field sent'
      }
    }
  }

  // ------------------------------------- Line Item CRUD Functionality ------------------------------------------
  
  return (
    <CrudContext.Provider value={{ myCrudCall, userID }}>
    <div>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <BudgetCardList
      budgetArray={budgetArray}
      />
      <div className='create-budget-form'>
        <form onSubmit = {(e) => {
          const newBudget: Budget = {
            title, budget, budgetID: 0, lineItems: []
          }
            myCrudCall(e, newBudget, 'POST', 0, null);
            setTitle('');
            setBudget(0);
            return;
          }}>
          <input className='name-of-project' placeholder='name of project' onChange={(e: any) => newBudgetHandleChange(e, newBudgetActions.title)}>
          </input>
          <input className='budget-amount' placeholder='budget' onChange={(e: any) => newBudgetHandleChange(e, newBudgetActions.budget)}></input>
          <button>Add Budget</button>
        </form>
      </div>
      {/* </Suspense> */}
    </div>
    </CrudContext.Provider>
  )
}

export default MainContainer;
