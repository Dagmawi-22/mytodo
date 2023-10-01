import {
  Request,
  Response
} from "express";
import TodoRepository from "../repository/todo.repository";
import Todo from "../entity/todos.model";

export default class UserController {

  async create(req: Request, res: Response) {
      if (!req.body.title) {
          res.status(400).send({
              message: "Content can not be empty!"
          });
          return;
      }

      try {
          const todo: Todo = req.body;
          const savedUser = await TodoRepository.save(todo);

          res.status(201).send(savedUser);
      } catch (err) {
          res.status(500).send({
              message: "Some error occurred while creating todo."
          });
      }
  }

  async findAll(req: Request, res: Response) {

      try {
          let todos = await TodoRepository.retrieveAll();
          let page: string = req.query.page!as string;
          let page1: number = parseInt(page)
          let limit: string = req.query.limit!as string;
          let limit1: number = parseInt(limit)
          const startIndex = page1 - 1;
          const endIndex = page1 * limit1;
          todos = todos.slice(startIndex, endIndex)
          res.status(200).send(todos);
      } catch (err) {
          res.status(500).send({
              message: "Some error occurred while retrieving todos."
          });
      }
  }


  async findOne(req: Request, res: Response) {
      const id: number = parseInt(req.params.id);

      try {
          const todo = await TodoRepository.retrieveById(id);

          if (todo) res.status(200).send(todo);
          else
              res.status(404).send({
                  message: `Cannot find Todo with id=${id}.`
              });
      } catch (err) {
          res.status(500).send({
              message: `Error retrieving Todo with id=${id}.`
          });
      }
  }


  async delete(req: Request, res: Response) {
      const id: number = parseInt(req.params.id);

      try {
          const num = await TodoRepository.delete(id);

          if (num == 1) {
              res.send({
                  message: "Todo was deleted successfully!"
              });
          } else {
              res.send({
                  message: `Cannot delete Todo with id=${id}. Maybe Todo was not found!`,
              });
          }
      } catch (err) {
          res.status(500).send({
              message: `Could not delete Todo with id==${id}.`
          });
      }
  }

  async deleteAll(req: Request, res: Response) {
      try {
          const num = await TodoRepository.deleteAll();

          res.send({
              message: `${num} Todos were deleted successfully!`
          });
      } catch (err) {
          res.status(500).send({
              message: "Some error occurred while removing all todos."
          });
      }
  }

}