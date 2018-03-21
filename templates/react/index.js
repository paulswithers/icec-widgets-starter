import React from "react";
import { render } from "react-dom";

const container = document.querySelector(".boxcontainer")

const App = () => (
    <div>Hello World</div>
);

render(<App />, container);