import { PORT } from "./utils/config";
import { connectToDatabase } from "./utils/db";
import app from "./app";

const server = app.listen(PORT, async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const port = server.address().port;
    await connectToDatabase();
    console.log("App listening on port : ", port);
});