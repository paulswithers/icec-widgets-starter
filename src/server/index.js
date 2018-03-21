import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { hostname } from "os";
import cors from "cors";
import ngrok from "ngrok";
import fs from "fs";
import morgan from "morgan";

import regions from "./routes/regions";

const port = process.env.PORT || 8080;
let app = express();
app.use(cors());

app.enable("trust proxy");
app.use(function(req, res, next) {
  if (!req.secure) {
    return res.redirect("https://" + req.headers.host + req.url);
  }
  next();
});

const custom =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms';
app.use(morgan(custom));

const serverConsole = require("./serverConsole");
serverConsole();

app.use(express.static(path.join(__dirname, "../public")));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.get("/regions", regions.findAll);
app.get("/regions/:id", regions.findById);

app.get('/', function (req, res) {
  res.send('Welcome to the ICEC Custom Widgets Lab.');
})

app.listen(port, () =>
  console.log(
    "Server process " +
      process.pid +
      " is listening on " +
      hostname +
      ":" +
      port
  )
);

ngrok.connect(
  {
    proto: "http",
    addr: port
  },
  (err, url) => {
    const ngrok = JSON.stringify({ https: url });
    fs.writeFile("ngrok.json", ngrok, err => {
      if (err) throw err;
      console.log("Use the following url to access the widgets: " + url);
    });
  }
);
