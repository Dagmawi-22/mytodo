import { Router } from "express";
import TodoController from "../controllers/todo.controller";


class BookRoutes {
  router = Router();
  controller = new TodoController();
  
  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new todo
    this.router.post("/", this.controller.create);

    // Get todos
    this.router.get("/", this.controller.findAll);


    // Retrieve a single todo
    this.router.get("/:id", this.controller.findOne);

  }
}

export default new BookRoutes().router;
