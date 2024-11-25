import { IToDoItem } from "../types";
import { Api } from "./base/Api";

export class ToDOApi extends Api {

  readonly baseUrl: string;
  protected options: RequestInit;

  constructor (baseUrl: string, options?: RequestInit) {
   super(baseUrl, options)
  };

  getTasks(): Promise<IToDoItem[]> {
    return this.get<IToDoItem[]>('/todos');
  };

  getTask(data: Pick<IToDoItem, 'id'>): Promise<IToDoItem> {
    return this.get<IToDoItem>(`/todos/${data.id}`);
  };

  editTask(data: Partial<IToDoItem>): Promise<IToDoItem> {
    return this.post<IToDoItem>('/todos', data, 'PATCH');
  };

  deleteTask(data: Partial<IToDoItem>): Promise<IToDoItem> {
    return this.post<IToDoItem>('/todos', data, 'DELETE');
  };

  addTask(data: Partial<IToDoItem>): Promise<IToDoItem> {
    return this.post<IToDoItem>('/todos', data, 'POST');
  };
};

// https://jsonplaceholder.typicode.com/todos