import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

class CustomEmitter {
  constructor(args) {
    this.listersMap = {};
  }

  on(eventName, functionToExecute) {
    if (this.listersMap[eventName]) {
      this.listersMap[eventName].push(functionToExecute);
    } else {
      this.listersMap[eventName] = [functionToExecute];
    }
  }

  emit(eventName, args) {
    if (this.listersMap[eventName]) {
      this.listersMap[eventName].forEach(func => {
        func(args);
      });
    }
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { a: 3 };
  }

  componentDidMount() {
    this.emitter = new CustomEmitter();
    this.emitter.on("calling", function(args) {
      console.log("Calling is executed : ", args);
    });
  }

  render() {
    console.log("Parent Rendering");
    if (this.emitter) {
      this.emitter.emit("calling", "nothing");
    }
    console.log(this.emitter);
    return (
      <div>
        <h1
          onClick={e => {
            e.preventDefault();
            this.setState({ a: this.state.a + 1 });
          }}
        >
          This is Parent a:{this.state.a}
        </h1>
        <Child a={this.state.a} />
      </div>
    );
  }
}

function Child(props) {
  console.log("Child Rendering");
  return (
    <div className="App">
      <h1>Hello CodeSandbox a:{props.a}</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
