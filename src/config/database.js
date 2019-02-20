import mongoose from "mongoose";
import constants from "./constants";

// Remove the warning with promises
mongoose.Promise = global.Promise;

//connect the db with the url provided

try {
  mongoose.connect(constants.MONGO_URL, { useNewUrlParser: true });
} catch (e) {
  mongoose.createConnection(constants.MONGO_URL);
}

mongoose.connection
  .once("open", () => console.log("MongoDb Running"))
  .on("error", e => {
    throw e;
  });
