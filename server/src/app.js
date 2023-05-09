const express = require("express");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const passport = require("passport");
const { v4: uuid } = require("uuid");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");

const schema = require("./services/services.graphql");
const AuthRouter = require("./controllers/auth");
const mongoStore = require("./services/services.store");
const { default: mongoose } = require("mongoose");

const SESSION_SECRETE = process.env.SESSION_SECRETE;

//creating express app
const app = express();
mongoose.Promise = global.process;

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(
  session({
    secret: SESSION_SECRETE,
    genid: (_) => uuid(),
    resave: false,
    saveUninitialized: false,
    name: "cookie-name",

    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      path: "/",
      // secure: true,
      
    },
    store: mongoStore,
  })
);

app.use(morgan("combined"));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.authenticate("session"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/api/users", AuthRouter);

app.get("/images/:filename", (req, res) => {
  const { filename } = req.params;
  res.sendFile(path.join(__dirname, "..", "public", "images", filename));
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

async function startApolloServer() {
  const apolloServer = new ApolloServer({
    schema,
  });
  await apolloServer.start();

  app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
      context: ({ req, _ }) => {
        return {
          getUser: req.user,
          req: req,
          logout: () => req.logout(),
        };
      },
    })
  );
}

startApolloServer();

module.exports = app;
