import React, { Suspense, createContext, useState, useLayoutEffect, useReducer } from 'react';
// const BudgetCardList = React.lazy (() => import ('./BudgetCardList'));
import BudgetCardList from './BudgetCardList';
import axios from 'axios'; 
import { BudgetArray, LineItemType, LineItemArray, Budget } from '../../types';
import { CrudContext } from './CrudContext';
import BudgetCard from './BudgetCard';
import { budgetReducer, budgetReducerActionTypes as types } from './BudgetReducer';


//----------------------------------------------START COMPONENT--------------------------------------------//

const MainContainer: React.FC = () => {
  // declare a fetching method to get budgets upon render.
  const budgetFetch = async () => {
    const result = await axios.get(`http://localhost:3000/budgets/${userID}`)
    dispatch({type: types.reloadBudgets, payload: result.data})
    return result.data;
  }

  //upon component did mount, go fetch budgets.
  useLayoutEffect(() => {
    budgetFetch()
  }, [])

  //
  const [{ budgetArray, userID}, dispatch ] = useReducer(budgetReducer, { budgetArray: [], userID: 2 });
  
  //-------------------------------CRUD CONSTROLLER----------------------------------------------//

  function myCrudCall (e: any, dataObject: any, method: string, budgetID: number, lineItemID: number | null = null){
    e.preventDefault();
    //console.log(e)
    if (!method) return alert('mistakenly called');
    const { target } = e;
    let url: string;
    switch (lineItemID === null) {
      // if true, then we're dealing with a budget.
      case true : {
        url = `http://localhost:3000/budgets/${userID}/${budgetID}`;
        switch (method){
          case 'POST' : {
              axios.post(url, dataObject)
              .then((res: any) => {
                dataObject = res.data;
                dispatch({type: types.createBudget, payload: dataObject});
                return;
              })
              .catch((err: any) => console.log(err));
              return;
            }
          case 'DELETE' : {
              axios.delete(url).then((response: any) => {
                // check if response has a status
                const { bIndex } = dataObject;
                dispatch({type: types.deleteBudget, payload: { bIndex }})
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
              const { newLineItem, bIndex } = dataObject;
              axios.post(url, newLineItem)
              .then((res: any) => {
                newLineItem.lineItemID = res.data;
                dispatch({type: types.createLineItem, payload: { newLineItem, budgetID, bIndex }})
                return;
              })
            }
          case 'DELETE' : {
            axios.delete(url).then((response: any) => {
              const { bIndex, lIndex } = dataObject;
              dispatch({ type: types.deleteLineItem, payload: { lineItemID, bIndex, lIndex }})
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

  const newBudgetActions = {
    title: 'TITLE',
    budget: 'BUDGET'
  }
  const [title, setTitle] = useState('');
  const [budget, setBudget] = useState('');

  function newBudgetHandleChange (e: any, action: string) {
    switch (action) {
      case newBudgetActions.title : {
        return setTitle(e.target.value)
      }
      case newBudgetActions.budget : {
        return setBudget(e.target.value.replace(/\D/g, ''))
      }
      default : {
        return 'incorrect field sent'
      }
    }
  }

  // ------------------------------------- Line Item CRUD Functionality ------------------------------------------
  
  return (
    <CrudContext.Provider value={{ myCrudCall, userID, dispatch }}>
    <div>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <BudgetCardList
      budgetArray={budgetArray}
      />
      <div className='create-budget-form'>
        <form onSubmit = {(e) => {
          const newBudget: Budget = {
            title, budget: Number(budget), budgetID: 0, lineItems: [], bIndex: budgetArray.length
          }
            myCrudCall(e, newBudget, 'POST', 0, null);
            setTitle('');
            setBudget('');
            return;
          }}>
          <input className='name-of-project' value={title} placeholder='name of project' onChange={(e: any) => newBudgetHandleChange(e, newBudgetActions.title)}>
          </input>
          <input className='budget-amount' value={budget} placeholder='budget' onChange={(e: any) => newBudgetHandleChange(e, newBudgetActions.budget)}></input>
          <button>Add Budget</button>
        </form>
      </div>
      {/* </Suspense> */}
    </div>
    </CrudContext.Provider>
  )
}

export default MainContainer;
