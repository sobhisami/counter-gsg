import './App.css'
import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleIncrement = () => {
    const { value } = this.state;
    const { onIncrement } = this.props;
    const newValue = value + 1;
    this.setState({ value: newValue });
    if (onIncrement) {
      onIncrement(newValue);
    }
  };

  handleDecrement = () => {
    const { value } = this.state;
    const { onDecrement } = this.props;
    const newValue = value - 1;
    this.setState({ value: newValue });
    if (onDecrement) {
      onDecrement(newValue);
    }
  };

  render() {
    const { value } = this.state;

    return (
      <div className='test'>
        <button onClick={this.handleIncrement}>+</button>
        <span>{value}</span>
        <button onClick={this.handleDecrement}>-</button>
      </div>
    );
  }
}

class Total extends Component {
  render() {
    const { counters } = this.props;
    const total = counters.reduce((acc, counter) => acc + counter, 0);

    return (
      <div>
        <h2>Total: {total}</h2>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counters: [0, 0, 0, 0],
    };
  }

  handleCounterChange = (index, value) => {
    this.setState((prevState) => {
      const counters = [...prevState.counters];
      counters[index] = value;
      return { counters };
    });
  };

  render() {
    const { counters } = this.state;

    return (
      <div>
        {counters.map((counter, index) => (
          <Counter
            key={index}
            onIncrement={(value) => this.handleCounterChange(index, value)}
            onDecrement={(value) => this.handleCounterChange(index, value)}
          />
        ))}
        <Total counters={counters} />
      </div>
    );
  }
}

export default App;
