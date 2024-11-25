import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

export interface IPage {
  itemList: HTMLElement[];
  taskTotal: number;
  taskDone: number;
}

export class Page extends Component<IPage> implements IPage{

  protected itemContainer: HTMLUListElement;
  protected elementTotal: HTMLElement;
  protected elementDone: HTMLElement;

  constructor(protected container: HTMLElement) {
    super(container);

    this.itemContainer = ensureElement<HTMLUListElement>('.todos__list', this.container);
    this.elementTotal = ensureElement('.todos__total', this.container);
    this.elementDone = ensureElement('.todos__done', this.container);
  };

  set itemList(items: HTMLElement[]) {
    this.itemContainer.replaceChildren(...items);
  };

  set taskTotal(value: number) {
    this.setText(this.elementTotal, `Всего дел: ${value}`);
  };

  set taskDone(value: number) {
    this.setText(this.elementDone, `Выполнено: ${value}`);
  };
};