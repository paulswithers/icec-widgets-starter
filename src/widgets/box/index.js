import React from "react";
import { render } from "react-dom";
import App from "./components/App";

const container = document.querySelector(".boxcontainer")
/* 
This token value will not work as it is not valid, register for a dev account and create a dev token: https://developer.box.com/ 
*/
let token = "1OZYhu9CfY91jh3iU8fYlDQ4vz61Bshi";   

render(<App token={token} />, container);
