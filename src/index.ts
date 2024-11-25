import "./styles/styles.css";
import { todos } from './utils/constants';
import { ToDoModel } from './components/ToDOModel';
import { ToDOApi } from './components/ApiToDo'
import { cloneTemplate, ensureElement } from "./utils/utils";
import { Item } from "./components/Item";
import { EventEmitter } from './components/base/Events';
import { Page } from "./components/Page";


const itemTemplate = ensureElement<HTMLTemplateElement>('#todo-item-template');
const pageContainer = ensureElement('.page__content');

const api = new ToDOApi('https://jsonplaceholder.typicode.com');
const events = new EventEmitter;
const modelData = new ToDoModel(events);
const page = new Page(pageContainer);

api.getTasks()
  .then(data => {
    modelData.items = data;
  }).catch(err => console.error(err));

events.on('item:changed', () => {
  const todosHTMLArray = modelData.items.map(item => 
    new Item(cloneTemplate(itemTemplate), events).render(item)).reverse();
  page.render({
    itemList: todosHTMLArray,
    taskTotal: modelData.getTotal(),
    taskDone: modelData.getDoneItem(),
  });
});

events.on('item:check', ({id}: {id: number}) => {
  modelData.checkItem(id);
});
events.on('item:copy', ({id}: {id: number}) => {
  const {title} = modelData.getItem(id);
  api.addTask({title, completed: false})
    .then(data => modelData.addItem(data))
    .catch(err => console.error(err));
});
events.on('item:delete', ({id}: {id: number}) => {
  modelData.deleteItem(id);
});






