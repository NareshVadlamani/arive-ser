import express, { json } from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import * as xp from "./src/utils/express-utils";
import config from "./config";
import Mongo from "./src/models/mongo";
import { getUserRouter } from "./src/controller/user";
import { getHobbyRouter } from "./src/controller/hobby";

const swaggerOptions = {
  definition: {
    swagger: "3.0",
    openapi: "3.0.3",
    info: {
      title: "API Documentation for Arrive Server App",
      version: "1.0.0",
      description: "API Documentation for Arrive Server App",
      contact: {
        name: "Naresh",
        email: "nareshvadlamani@gmail.com",
      },

      servers: ["http://localhost:4000"],
    },

    basePath: "",
  },
  apis: ["**/*.ts"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

async function main() {
  await Mongo.init();
  express()
    .use(express.json())
    .use("/user", getUserRouter())
    .use("/hobby", getHobbyRouter())
    .use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
    .use(xp.notFound)
    .listen(config.port, () => {
      console.log(`server listening on http://localhost:${config.port}`);
    });

  // ad User
  // await Mongo.user.addUser("naresh");

  // list all users

  // const allUsers = await Mongo.user.getUserList();
  // console.log("allUsers", JSON.stringify(allUsers));

  // add hobby

  // await Mongo.hobby.addHobby("60ff77341b67198f3d5cc73c", {
  //   name: "carrom",
  //   passionLevel: "high",
  //   date: "2005",
  // });

  // get hobby by ids

  // const hobbyList = await Mongo.hobby.getHobbiesListByIds([
  //   "60ff77ddb945558ff948d9c1",
  //   "60ff7871a9b46b9059c4e895",
  // ]);
  // console.log("hobbyList", hobbyList);
}

main().catch((err) => console.error("app.init.failed", err));

// http://localhost:4000/user/list
// http://localhost:4000/user/add-user
// http://localhost:4000/hobby/list?userName=aaaa
// http://localhost:4000/hobby/add-hobby
