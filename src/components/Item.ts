import { IToDoItem } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/Events";

export class Item extends Component<IToDoItem> {

  protected itemTitle: HTMLElement;
  protected checkButton: HTMLButtonElement;
  protected copyButton: HTMLButtonElement;
  protected deleteButton: HTMLButtonElement;
  protected _id: number;

  constructor(protected container: HTMLElement, protected event: IEvents) {
    super(container);

    this.itemTitle = ensureElement('.todo-item__text', this.container);
    this.checkButton = ensureElement('.todo-item__flag-off', this.container) as HTMLButtonElement;
    this.copyButton = ensureElement('.todo-item__copy', this.container) as HTMLButtonElement;
    this.deleteButton = ensureElement('.todo-item__del', this.container) as HTMLButtonElement;

    this.checkButton.addEventListener('click', () => this.event.emit('item:check', {id: this._id}));

    this.copyButton.addEventListener('click', () => this.event.emit('item:copy', {id: this._id}));

    this.deleteButton.addEventListener('click', () => this.event.emit('item:delete', {id: this._id}));
  };

  set title(value: string) {
    this.setText(this.itemTitle, value);
  };

  set completed(value: boolean) {
    this.toggleClass(this.checkButton, 'todo-item__flag-on', value);
    this.toggleClass(this.checkButton, 'todo-item__flag-off', !value);
  };

  set id(value: number) {
    this._id = value;
  }
};