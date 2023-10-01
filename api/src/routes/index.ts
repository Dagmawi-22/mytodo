import { Application } from "express";
import homeRoutes from "./home.routes";
import todoRoutes from "./todo.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", homeRoutes);
    app.use("/api/todo", todoRoutes);
  }
}
