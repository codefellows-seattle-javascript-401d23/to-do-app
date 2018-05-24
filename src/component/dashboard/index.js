import React from 'react';
import uuid from 'uuid/v4';
import ExpenseForm from './../expense-form/index';
import autoBind from '../../utils/index';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expenses: [],
      error: null,
    };

    autoBind.call(this, Dashboard);
  }

  handleAddExpense(expense) {
    if (expense.title === '') {
      return this.setState({ error: true });
    }

    expense.createdOn = new Date();
    expense.id = uuid();

    return this.setState((previousState) => {
      return {
        expenses: [...previousState.expenses, expense],
        error: null,
      };
    });
  }

  handleExpensesList() {
    return (
        <ul>
          {
            this.state.expenses.map((expense) => {
              return (
                  <li key={expense.id}>
                    {expense.title} : ${expense.content}
                  </li>
              );
            })
          }
        </ul>
    );
  }

  render() {
    return (
        <section className="dashboard">
          <h1>UA notes Dashboard</h1>
          <ExpenseForm
              handleAddExpense={this.handleAddExpense}
          />
          { this.state.error && <h2 className="error">You must enter a title.</h2> }
          { this.handleExpensesList() }
        </section>
    );
  }
}
