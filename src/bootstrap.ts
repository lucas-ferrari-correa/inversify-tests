import "dotenv/config"
import { Container } from "inversify"
import "reflect-metadata"
import { CreateTodoDto } from "./features/todo/create-todo.dto";
import { TodoController } from "./features/todo/todo.controller";
import { TodoModule } from "./features/todo/todo.module";
import { TodoService } from "./features/todo/todo.service";
import { PrismaService } from "./prisma.service";

export async function bootstrap() {
  const container = new Container({
    skipBaseClassChecks: true,
  });
  
  container.load(new TodoModule());
  container.bind(PrismaService).to(PrismaService);
  
  const prisma = container.get(PrismaService);
  await prisma.$connect()

  const dto = new CreateTodoDto('title');
  const result = await container.get(TodoController).store(dto)

  console.log(result);
}

bootstrap()
