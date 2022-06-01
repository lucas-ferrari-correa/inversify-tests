import { injectable } from "inversify";
import { PrismaService } from "../../prisma.service";
import { CreateTodoDto } from "./create-todo.dto";
import { TodoEntity } from "./todo.entity";

@injectable()
export class TodoService {
    private readonly _todos: TodoEntity[] = [];

    public constructor(
        private readonly _prisma: PrismaService
    ) {}

    public async createOne(dto: CreateTodoDto): Promise<TodoEntity>{
        const id = this._todos.length + 1;

        const createdTodo = await this._prisma.todo.create({
            data: {
                title: dto.title,
            }
        })

        const entity = new TodoEntity(createdTodo.title, createdTodo.id, createdTodo.isCompleted)
        this._todos.push()

        return entity
    }
}