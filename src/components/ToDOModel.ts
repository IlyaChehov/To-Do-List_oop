import { IToDoItem } from '../types/index'

export interface IToDoModel {
  items: IToDoItem[];
  getItem(id: string): IToDoItem;
  addItem(data: IToDoItem): void;
  deleteItem(id: string): void;
  checkItem(id: string): void;
  getTotal(): number;
  getDoneItem(): number;
};

export class ToDoModel implements IToDoModel {
  protected _items: IToDoItem[] = [];

  constructor() {};

  set items(data: IToDoItem[]) {
    this._items = data;
  };

  get items() {
    return this._items;
  };

  getItem(id: string): IToDoItem {
    return this._items.find(item => item.id === id);
  };

  addItem(data: IToDoItem) {
    this._items.push(data);
  };

  deleteItem(id: string) {
    this._items = this._items.filter(item => item.id !== id);
  };

  checkItem(id: string) {
    const itemComplited = this.getItem(id);
    itemComplited.completed = !itemComplited.completed;
  };

  getTotal() {
    return this._items.length;
  };

  getDoneItem() {
    return this._items.filter(item => item.completed === true).length;
  };
};