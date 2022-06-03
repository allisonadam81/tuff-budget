import React, { Suspense, createContext, useState, useEffect } from 'react';
// const BudgetCardList = React.lazy (() => import ('./BudgetCardList'));
import BudgetCardList from './BudgetCardList';
import axios from 'axios'; 
import { BudgetArray, LineItem, LineItemArray, Budget } from '../../types';
import CrudContext from './crudContext';


const MainContainer: React.FC = () => {

  const [ budgetArray, setBudgetArray ] = useState<BudgetArray>([]);
  const [ userID, setuserID ] = useState(1)
  
  // add budget functionality
  const [ title, setTitle ] = useState('');
  const [ budget, setBudget ] = useState(0);
  
  //make initial fetch to the database for all user budgets.
  const budgetFetch = async () => {
    const result = await axios.get(`http://localhost:3000/budgets/${userID}`)
    setBudgetArray(result.data);
  }
  
  //on initial render, fetch the budgets from the database.
  useEffect(() => {
    budgetFetch();
    console.log('use effect fired off');
  }, [])
  //-------------------------------CRUD CONSTROLLER----------------------------------------------//
  function crudReducer () {

  };

  function myCrudCall (e: any, method: string, budgetID: number, lineItemID: number | null = null){
    console.log('crud call fired off');
    e.preventDefault();
    if (!method) return alert('mistakenly called');
    let url: string, body: any;
    switch (lineItemID === null) {
      // if true, then we're dealing with a budget.
      case true : {
        url = `http://localhost:3000/budgets/${budgetID}`;
        switch (method){
          case 'POST' : {
            const newBudget
            axios.post(url, newBudget)
          }
          case 'DELETE' : {
              axios.delete(url).then((response: any) => {
                // check if response has a status
                const updatedBudgetArray = JSON.parse(JSON.stringify(budgetArray));
                for(let i = 0; i < updatedBudgetArray.length; i++) {
                  if (updatedBudgetArray[i].budgetID === budgetID){
                    delete updatedBudgetArray[i];
                  }
                }
                return setBudgetArray(updatedBudgetArray)
              })
              .catch((err: any) => {
                console.log(err);
                return;
              })
            }
          case 'PATCH' : {

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
              const description = e.target[0].value;
              const category = e.target[1].value;
              const expAmount = parseInt(e.target[2].value);
              let actAmount = parseInt(e.target[3].value);
              const isFixed = e.target[4].checked;
              const isRecurring = e.target[5].checked;
              
              e.target[0].value = '';
              e.target[1].value = '';
              e.target[2].value = '';
              e.target[3].value = '';
              e.target[4].checked = false;
              e.target[5].checked = false;
              
              if (!actAmount) actAmount = -1;
              //console.log('this is the budgetID ', budgetID)
              const newLineItem = { description, category, expAmount, actAmount, isFixed, isRecurring, budgetID }
          
              axios.post(url, newLineItem)
              .then((res: any) => {
                if (actAmount === -1) actAmount = 0;
                const lineItem:LineItem = { description, category, expAmount, actAmount, isFixed, isRecurring, lineItemID: res.data };
                const newBudgetArray = JSON.parse(JSON.stringify(budgetArray));
                for (let budget of newBudgetArray){
                  if (budget.budgetID === budgetID){
                     budget.lineItems.push(lineItem)
                    }
                  }
                setBudgetArray(newBudgetArray)
              })
            }
          case 'DELETE' : {
            axios.delete(url).then((response: any) => {
                const newBudgetArray = JSON.parse(JSON.stringify(budgetArray));
                for (let budget of newBudgetArray){
                  if (budget.budgetID === budgetID){
                    for (let i = 0; i < budget.lineItems.length; i++){
                      if (budget.lineItems[i].lineItemID === lineItemID){
                        console.log('lineItemFound ')
                        delete budget.lineItems[i];
                      }
                    }
                  }
                }
                setBudgetArray(newBudgetArray)
              })
            }
          case 'PATCH' : {

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

  // ------------------------------------- Card CRUD Functionality ---------------------------------------
  
  // handles the deleting of a budget card
  function handleDeleteBudget(id: number) {
    axios.delete(`http://localhost:3000/budgets/${id}`)
    .then(() => {
      const updatedBudgetArray = JSON.parse(JSON.stringify(budgetArray));
      for(let i = 0; i < updatedBudgetArray.length; i++) {
        if (updatedBudgetArray[i].budgetID === id) {
          updatedBudgetArray.splice(i,1)
        }
      }
      setBudgetArray(updatedBudgetArray)
    })
  }

  // handles the creating of budget card 

  // ------------------------------------- Line Item CRUD Functionality ------------------------------------------
  // handles the deleting of a line item
  function handleDeleteLineItem(e: any, id: number, budgetID: number) {
    console.log(e);
    axios.delete(`http://localhost:3000/lineItems/${id}`)
    .then(() => {
      const newBudgetArray = JSON.parse(JSON.stringify(budgetArray));
      for (let budget of newBudgetArray){
        if (budget.budgetID === budgetID){
          for (let i = 0; i < budget.lineItems.length; i++){
            if (budget.lineItems[i].lineItemID === id){
              console.log('lineItemFound ')
              delete budget.lineItems[i];
              break;
            }
          }
        }
      }
      setBudgetArray(newBudgetArray)
    })
  }
  
  function createLineItem (e: any, budgetID: number) {
    e.preventDefault()
    console.log(e);
    const description = e.target[0].value;
    const category = e.target[1].value;
    const expAmount = parseInt(e.target[2].value);
    let actAmount = parseInt(e.target[3].value);
    const isFixed = e.target[4].checked;
    const isRecurring = e.target[5].checked;
    
    e.target[0].value = '';
    e.target[1].value = '';
    e.target[2].value = '';
    e.target[3].value = '';
    e.target[4].checked = false;
    e.target[5].checked = false;
    
    if (!actAmount) actAmount = -1;
    //console.log('this is the budgetID ', budgetID)
    const newLineItem = { description, category, expAmount, actAmount, isFixed, isRecurring, budgetID }

    axios.post('http://localhost:3000/lineItems', newLineItem)
    .then(res => {
      //console.log(res.data);
      if (actAmount === -1) actAmount = 0;
      const lineItem:LineItem = { description, category, expAmount, actAmount, isFixed, isRecurring, lineItemID: res.data };
      const newBudgetArray = JSON.parse(JSON.stringify(budgetArray));
      for (let budget of newBudgetArray){
        if (budget.budgetID === budgetID){
           budget.lineItems.push(lineItem)
          }
        }
      setBudgetArray(newBudgetArray)
    })
  }
  
  //handles the changing of title and budget
  function handleChange(e:React.ChangeEvent<HTMLInputElement>, field:string) {
    e.preventDefault()
    
    if (field === 'title') {
      setTitle(e.target.value)
    } else {
      setBudget(parseInt(e.target.value))
    }
  }
  
  return (
    <CrudContext.Provider value={{ myCrudCall }}>
    <div>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <BudgetCardList
      budgetArray={budgetArray}
      userID={userID}
      />
      <div className='create-budget-form'>
        <form onSubmit = {(e) => createBudget(e)}>
          <input className = 'name-of-project' placeholder = 'name of project' onChange = {(e) => handleChange(e, 'title')}></input>
          <input className = 'budget-amount'placeholder = 'budget' onChange = {(e) => handleChange(e, 'budget')}></input>
          <button>Add Budget</button>
        </form>
      </div>
      {/* </Suspense> */}
    </div>
    </CrudContext.Provider>
  )
}

export default MainContainer;

// function createBudget(e: any) {
//   throw new Error('Function not implemented.');
// }
