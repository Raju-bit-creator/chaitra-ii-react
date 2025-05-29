import React, { Component } from "react";

export default class ClassBased extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 10 };
    console.log("constructor: initialized");
  }
  //mounting phase
  componentDidMount() {
    console.log("componentDidMount: mounted");
  }
  // updating phase
  componentDidUpdate() {
    console.log("componentDidUpdate: updated");
  }
  // unmounting phase
  componentWillUnmount() {
    console.log("componentWillUnmount: unmounted");
  }
  render() {
    return (
      <div>
        <h4> this is class based component</h4>
        <h6>this is total count: {this.state.count}</h6>
        <button onClick={() => this.setState({ count: this.state.count + 5 })}>
          {" "}
          click me!
        </button>
        <button onClick={() => this.setState({ count: this.state.count - 5 })}>
          {" "}
          click me! to decrease
        </button>
      </div>
    );
  }
}
