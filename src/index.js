import ReactDOM from "./lib/dom-render.js";
import { createElement as e, useState } from "./lib/reakt.js";

function Counter() {
  const [value, setValue] = useState(0);

  const updateCounter = label => {
    console.log(`updateCounter: `);
    if (label === "-") {
      setValue(value - 1);
    }
    if (label === "+") {
      setValue(value + 1);
    }
    if (label === "reset") {
      setValue(0);
    }
  };

  return e(
    "div",
    {},
    e("h2", {}, value.toString()),
    e(Button, { lable: "+", handleClick: updateCounter }),
    e(Button, { lable: "-", handleClick: updateCounter }),
    e(Button, { lable: "reset", handleClick: updateCounter })
  );
}

function Button(label, handleClick) {
  return e("button", { onClick: () => handleClick(label) }, label);
}

const App = e("div", {}, e("h1", {}, "JS Tree"), e(Counter, {}));

ReactDOM.render(App, document.getElementById("root"));
