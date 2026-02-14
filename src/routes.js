import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (request, response) => {
      const { search } = request.query;

      const tasks = database.select(
        "tasks",
        search
          ? {
              title: search,
              description: search,
            }
          : null,
      );

      return response.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (request, response) => {
      const task = {
        id: randomUUID(),
        title: request.body.title,
        description: request.body.description,
        created_at: new Date(),
        updated_at: new Date(),
        completed_at: null,
      };

      const createdTask = database.insert("tasks", task);

      return response.writeHead(201).end(JSON.stringify(createdTask));
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (request, response) => {
      const taskId = request.params.id;
      if (database.find("tasks", taskId)) {
        database.delete("tasks", taskId);

        return response.writeHead(204).end();
      }

      return response.writeHead(404).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (request, response) => {
      const taskId = request.params.id;
      const taskToUpdate = database.find("tasks", taskId);
      const taskToUpdateJSON = JSON.parse(taskToUpdate);

      if (taskToUpdate) {
        database.update("tasks", taskId, {
          id: taskToUpdateJSON.id,
          title: taskToUpdateJSON.title,
          description: taskToUpdateJSON.description,
          created_at: taskToUpdateJSON.created_at,
          updated_at: taskToUpdateJSON.updated_at,
          completed_at: new Date(),
        });

        return response.writeHead(204).end(JSON.stringify(taskToUpdateJSON));
      }

      return response.writeHead(404).end(
        JSON.stringify({
          error: "O id informado não foi encontrado",
        }),
      );
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (request, response) => {
      const taskId = request.params.id;
      const taskToUpdate = JSON.parse(database.find("tasks", taskId));

      if (taskToUpdate) {
        database.update("tasks", taskId, {
          title: request.body.title,
          description: request.body.description,
          created_at: taskToUpdate.created_at,
          updated_at: new Date(),
          completed_at: null,
        });

        return response.writeHead(204).end();
      }

      return response.writeHead(404).end();
    },
  },
];
