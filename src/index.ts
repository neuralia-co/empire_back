import { PORT } from "./lib/config";
import app from "./lib/createServer";

const server = app.listen(PORT,  () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const port = server.address().port;
    console.log("App listening on port : ", port);
});
