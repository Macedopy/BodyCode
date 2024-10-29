import appCreating from "./app";
import { connectToOracle } from "./Infrastructure/Configurations/connectionToOracle";

const app  = appCreating();
const port = 3000;

app.listen(port, ()=>
    {
        connectToOracle();
        console.log(`Server running on port http://localhost:${port}`);
    });