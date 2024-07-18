const todosKey = "todos";

let todosJson = localStorage.getItem(todosKey);
let todosStore = JSON.parse(todosJson);

const init = function () {
  if (todosStore === null || todosStore === "") {
    localStorage.setItem(todosKey, JSON.stringify([]));
  }
};
init();

function save() {
  localStorage.setItem(todosKey, JSON.stringify(todosStore));
}

export default {
  getAllTodos() {
    return todosStore;
  },
  createTodo(newTodo) {
    todosStore = [newTodo, ...todosStore];
    save();
  },
  updateTodo(newContent, todoId) {
    todosStore = todosStore.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, content: newContent };
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
