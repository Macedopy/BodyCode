import express from "express";
// import { connectionDB } from "./Infrastructure/Configurations/connectionDB";
import router from "./Web/Controllers/routes";
import { connectToOracle } from "./Infrastructure/Configurations/connectionToOracle";
function appCreating() {
    const app  = express();

    app.use(express.json());
    app.use("/api", router)

    connectToOracle();

    return app;
}
export default appCreating;