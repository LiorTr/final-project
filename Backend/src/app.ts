import express from "express";
import { appConfig } from "./2-utils/app-config";
import { errorsMiddleware } from "./6-middleware/errors-middleware";
import { securityMiddleware } from "./6-middleware/security-middleware";
import { userController } from "./5-controllers/user-controller";
import expressFileUpload from "express-fileupload";
import { fileSaver } from "uploaded-file-saver";
import path from "path";
import cors from "cors";
import expressRateLimit from "express-rate-limit"
import { dal } from "./2-utils/dal";
import { vacationController } from "./5-controllers/vacation-controller";
import { likeController } from "./5-controllers/like-controller";
class App {

    // Configure fileSaver once: 

    // Create main server object: 
    private server = express();

    public async start() {
        fileSaver.config(path.join(__dirname, "1-assets", "images"));

        this.server.use(expressRateLimit({
            windowMs: 50000,
            limit: 3,
        }));

        // Enable CORS:
        this.server.use(cors());

        // Create the body from json: 
        this.server.use(express.json());

        // Read files into request.files:
        this.server.use(expressFileUpload());

        // Register middleware: 
        // server.use(logsMiddleware.logRequest);
        this.server.use(securityMiddleware.preventXssAttack);

        // Register routes:
        this.server.use("/api", userController.router);
        this.server.use("/api", vacationController.router);
        this.server.use("/api", likeController.router);

        // Register route not found middleware: 
        this.server.use("*", errorsMiddleware.routeNotFound);

        // Register catchAll middleware:
        this.server.use(errorsMiddleware.catchAll);
        // Connect to MongoDB:
        await dal.connect();

        // Run server:
        this.server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));
    }
}
const app = new App();
app.start();
