<template>
  <section id="app"
           class="dark font-josefin w-1/3 justify-center flex flex-col my-20 gap-8 absolute m-auto left-0 right-0">
    <div class="flex justify-between">
      <span class="text-4xl font-semibold text-white tracking-[.35em] not-italic">TODO</span>
      <button @click="toggleDarkMode">
        <img :src="require(`../images/icon-${themeIcon}.svg`)" :alt="themeIcon">
      </button>
    </div>
    <div class="relative">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg class="text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" width="25" height="25"
             viewBox="0 0 256 256">
          <path fill="currentColor"
                d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Z"/>
        </svg>
      </div>
      <input type="text"
             v-model="inputContent"
             class="block w-full p-4 pl-12 text-sm text-gray-900 rounded bg-white focus:border-none"
             placeholder="Create a new todo..."
             @keyup.enter="addTodo"
             required>
    </div>
    <div class="bg-white rounded flex flex-col h-auto mb-10 drop-shadow-2xl divide-y divide-gray-200">
      <fieldset v-if="listTodos().length < 1" class="flex justify-center mx-auto my-10 font-bold">
        No todo items left!
      </fieldset>
      <ul v-for="todo in listTodos()"
          :key="todo.id"
          :draggable="true"
          @dragstart="startDrag(todo.id)"
          @dragover.prevent
          @drop="endDrag(todo.id)"
          class="relative flex flex-col items-start justify-center divide-y divide-gray-200">
        <li class="w-full p-4 flex items-center justify-between w-full">
          <div class="flex items-center">
            <input type="checkbox"
                   :id="todo.id"
                   v-model="todo.isCompleted"
                   @click="completedTodo(todo.id)"
                   class='appearance-none h-6 w-6 border-gray-300 border-[1px] rounded-full peer'/>
            <label :for='todo.id'
                   class='flex flex-col justify-center px-2 peer-checked:text-gray-300 peer-checked:line-through select-none'>
              <span>{{ todo.content }}</span>
            </label>
          </div>
          <button type="button" class="inline-flex items-center mr-2 opacity-0 hover:opacity-100"
                  @click="removeTodo(todo.id)">
            <img src="../images/icon-cross.svg" alt="cross-icon"/>
          </button>
        </li>
      </ul>
      <fieldset class="relative flex p-4 justify-between text-xs text-gray-500">
        <div>
          <p>{{ todos.length }} items left</p>
        </div>
        <div class="flex gap-5 font-bold">
          <a href="#" @click="filterAllTodos"
             :class="filterType === 'all' ? 'text-blue-500 hover:text-gray-500' : 'text-gray-500 hover:text-blue-500'">All</a>
          <a href="#" @click="filterActiveTodos"
             :class="filterType === 'active' ? 'text-blue-500 hover:text-gray-500' : 'text-gray-500 hover:text-blue-500'">Active</a>
          <a href="#" @click="filterCompletedTodos"
             :class="filterType === 'completed' ? 'text-blue-500 hover:text-gray-500' : 'text-gray-500 hover:text-blue-500'">Completed</a>
        </div>
        <div>
          <a href="#" @click="clearCompleted"
             class="hover:text-blue-500 text-gray-500">
            Clear Completed
          </a>
        </div>
      </fieldset>
    </div>

    <p class="flex justify-center items-center text-dark-dark-grayish-blue">Drag and drop to reorder list</p>

  </section>
</template>

<script>
export default {
  name: 'IndexPage',
  data: () => ({
    inputContent: "",
    todos: [],
    filterType: "all",
    draggingTodoId: null,
    isDarkMode: false,
    themeIcon: 'moon'
  }),
  methods: {
    addTodo() {
      const lastObject = this.todos.slice(-1)
      let lastNumber = lastObject.length > 0 ? lastObject[0].id + 1 : 1;

      const todoItem = {
        id: lastNumber,
        content: this.inputContent,
        isCompleted: false,
        sorting: lastNumber
      };

      this.todos.push(todoItem)
      this.inputContent = "";
    },
    removeTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
      this.updateFilteredLists();
    },
    completedTodo(todoId) {
      const todoIndex = this.todos.findIndex(todo => todo.id === todoId);
      this.todos[todoIndex].isCompleted = !this.todos[todoIndex].isCompleted;
      this.updateFilteredLists();
    },
    filterCompletedTodos() {
      this.filterType = "completed";
      if (this.completedTodos.length < 1) {
        window.alert("No completed items!");
      }
    },
    filterAllTodos() {
      this.filterType = "all";
    },
    filterActiveTodos() {
      this.filterType = "active";
      if (this.activeTodos.length < 1) {
        window.alert("No active items left!");
      }
    },
    listTodos() {
      if (this.filterType === "completed") {
        return this.todos.filter(todo => todo.isCompleted === true);
      }
      if (this.filterType === "active") {
        return this.todos.filter(todo => todo.isCompleted === false);
      }
      return this.todos;
    },
    updateFilteredLists() {
      this.completedTodos = this.todos.filter(todo => todo.isCompleted === true);
      this.activeTodos = this.todos.filter(todo => todo.isCompleted === false);
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.isCompleted);
      this.updateFilteredLists();
    },
    updateLocalStorage() {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('todos', JSON.stringify(this.todos));
      }
    },
    loadLocalStorage() {
      if (typeof window !== 'undefined') {
        const savedTodos = window.localStorage.getItem('todos');
        if (savedTodos) {
          this.todos = JSON.parse(savedTodos);
        }
      }
    },
    startDrag(todoId) {
      this.draggingTodoId = todoId;
    },
    endDrag(targetTodoId) {
      if (this.draggingTodoId !== targetTodoId) {
        const draggedIndex = this.todos.findIndex(todo => todo.id === this.draggingTodoId);
        const targetIndex = this.todos.findIndex(todo => todo.id === targetTodoId);

        const draggedTodo = this.todos[draggedIndex];
        this.todos.splice(draggedIndex, 1);
        this.todos.splice(targetIndex, 0, draggedTodo);

        this.todos.forEach((todo, index) => {
          todo.id = index + 1;
          todo.sorting = index + 1;
        });

        this.updateFilteredLists();
      }
      this.draggingTodoId = null;
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      document.body.dataset.theme = this.isDarkMode ? 'dark' : 'light';
      localStorage.setItem('isDarkMode', this.isDarkMode);
      this.themeIcon = this.isDarkMode ? 'sun' : 'moon';
    },
  },
  watch: {
    todos: {
      handler() {
        this.updateLocalStorage();
      },
      deep: true,
    },
  },
  created() {
    this.loadLocalStorage();
    this.updateFilteredLists();

    if (process.client) {
      const storedDarkMode = localStorage.getItem('isDarkMode');
      if (storedDarkMode !== null) {
        this.isDarkMode = JSON.parse(storedDarkMode);
        document.body.dataset.theme = this.isDarkMode ? 'dark' : 'light';
        this.themeIcon = this.isDarkMode ? 'sun' : 'moon';
      }
    }
  },
}
</script>


<style>

body[data-theme="dark"] {
  background-image: url('../images/bg-desktop-dark.jpg');
  background-color: #161722;
}

body[data-theme="light"] {
  background-image: url("../images/bg-desktop-light.jpg");
  background-color: hsl(236, 33%, 92%);
}

body {
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

input[type="checkbox"]:checked {
  background-image: url('../images/icon-check.svg'), linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%));
  background-size: 50% 50%, 100% 100%;
  background-position: center, center;
  background-repeat: no-repeat, no-repeat;
  border: none;
}
</style>
