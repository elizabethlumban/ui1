const express = require("express"); // eslint-disable-line
const path = require("path"); // eslint-disable-line
const helmet = require("helmet"); // eslint-disable-line
const _ = require("lodash"); // eslint-disable-line
const fs = require("fs"); // eslint-disable-line
const cors = require("cors"); // eslint-disable-line
const { createProxyMiddleware } = require("http-proxy-middleware"); // eslint-disable-line

const isDev = () => !process.env.NODE_ENV || process.env.NODE_ENV === "development" || process.env.NODE_ENV === "dev";

if (isDev()) {
  require("dotenv").config(); //eslint-disable-line @typescript-eslint/no-var-requires
}

// Load the config
const server = process.env.API_LOCATION;

const htmlLocation = path.join(__dirname, "build", "index.html");

// Inject the runtime variables:
const initialHtmlContent = fs.readFileSync(htmlLocation, "utf8");
const htmlWithVariables = initialHtmlContent.replace(
  "%APPLICATION_ENVIRONMENT%",
  process.env.APPLICATION_ENVIRONMENT || "dev"
);
fs.writeFileSync(htmlLocation, htmlWithVariables);

// The app server
const app = express();

// // Uncomment the below for Cloud Foundry:
// // Require HTTPS - Add a handler to inspect the req.secure flag (see
// // http://expressjs.com/api#req.secure). This allows us
// // to know whether the request was via http or https.
// app.enable("trust proxy");
// app.use((req, res, next) => {
//   if (req.secure || isDev()) {
//     next();
//   } else {
//     // request was via http, so redirect to https
//     res.redirect("https://" + req.headers.host + req.url);
//   }
// });

// Guard the app with helmet ...
// Can't set "contentSecurityPolicy" with some CRA apps
// app.use(helmet.contentSecurityPolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

// Allow CORS
app.use(cors());

// Proxy the API
app.use(
  "/apis",
  createProxyMiddleware({
    target: server,
    changeOrigin: true,
  })
);

// Serve the static content
app.use(express.static(path.join(__dirname, "build")));

// Direct all requests to the main page so they can be handled by React Router
app.get("/*", function (req, res) {
  res.sendFile(htmlLocation);
});

// Let's start ...
const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) {
    console.log(`App crashed: ${err}`);
  } else {
    console.log(`Listening on port ${port}`);
  }
});
