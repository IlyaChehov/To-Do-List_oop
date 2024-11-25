import { IToDoItem } from '../types/index'
import { IEvents } from './base/Events';

export interface IToDoModel {
  items: IToDoItem[];
  getItem(id: number): IToDoItem;
  addItem(data: IToDoItem): void;
  deleteItem(id: number): void;
  checkItem(id: number): void;
  getTotal(): number;
  getDoneItem(): number;
};

export class ToDoModel implements IToDoModel {
  protected _items: IToDoItem[] = [];

  constructor(protected event: IEvents) {};

  set items(data: IToDoItem[]) {
    this._items = data;
    this.event.emit('item:changed');
  };

  get items() {
    return this._items;
  };

  getItem(id: number): IToDoItem {
    return this._items.find(item => item.id === id);
  };

  addItem(data: IToDoItem) {
    this._items.push(data);
    this.event.emit('item:changed');
  };

  deleteItem(id: number) {
    this._items = this._items.filter(item => item.id !== id);
    this.event.emit('item:changed');
  };

  checkItem(id: number) {
    const itemComplited = this.getItem(id);
    itemComplited.completed = !itemComplited.completed;
    this.event.emit('item:changed');
  };

  getTotal() {
    return this._items.length;
  };

  getDoneItem() {
    return this._items.filter(item => item.completed === true).length;
  };
};