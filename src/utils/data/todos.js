const todosKey = "todos";

let todosJson = localStorage.getItem(todosKey);
let todosStore = JSON.parse(todosJson);

const init = function () {
  if (todosStore === null || todosStore === "") {
    localStorage.setItem(todosKey, JSON.stringify([]));
  }
  todosJson = localStorage.getItem(todosKey);
  todosStore = JSON.parse(todosJson);
};

function save() {
  localStorage.setItem(todosKey, JSON.stringify(todosStore));
}

export default {
  getAllTodos() {
    init();
    return todosStore;
  },
  createTodo(newTodo) {
    console.log(todosStore)
    todosStore = [newTodo, ...todosStore];
    save();
  },
  updateTodo(updateTodo, todoId) {
    todosStore = todosStore.map((todo) => {
      if (todo.id === todoId) {
        return { ...updateTodo, id: todoId };
      } else {
        return todo;
      }
    });
    save();
  },
  deleteTodo(todoId) {
    todosStore = todosStore.filter((todo) => {
      return todo.id !== todoId;
    });
    save();
  },
};
