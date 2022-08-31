import { Todo } from './index';

type SetUserActionType = {
  type: 'SET_USER';
  payload: string;
};

type SetTodosActionType = {
  type: 'SET_TODOS';
  payload: Todo[];
};

type UpdateTodoActionType = {
  type: 'UPDATE_TODO';
  payload: { todo: Todo };
};

type AddTodoActionType = {
  type: 'ADD_TODO';
  payload: Todo;
};

type DeleteTodoActionType = {
  type: 'DELETE_TODO';
  payload: string;
};

export type ActionType =
  | SetUserActionType
  | SetTodosActionType
  | UpdateTodoActionType
  | AddTodoActionType
  | DeleteTodoActionType;
