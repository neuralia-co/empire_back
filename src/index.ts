import { PORT } from "./utils/config";
import app from "./app";

const server = app.listen(PORT,  () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const port = server.address().port;
    console.log("App listening on port : ", port);
});
