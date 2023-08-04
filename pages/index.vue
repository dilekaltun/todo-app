<template>
  <section id="app" class="w-1/3 justify-center flex flex-col my-20 gap-8 absolute m-auto left-0 right-0">
    <div class="flex justify-between">
      <span class="text-4xl font-semibold text-white tracking-[.35em]">TODO</span>
      <button>
        <img src="../images/icon-moon.svg" alt="moon">
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
             class="block w-full p-4 pl-12 text-sm text-gray-900 border border-gray-300 rounded bg-white focus:outline-none focus:border-none dark:bg-white dark:border-none dark:placeholder-gray-400 dark:text-black"
             placeholder="Create a new todo..."
             @keyup.enter="addTodo"
             required>
      <button type="submit" @click="addTodo" class="absolute right-2.5 bottom-2 focus:outline-none px-4 py-2 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 64 64">
          <path fill="currentColor" d="M38 26V2H26v24H2v12h24v24h12V38h24V26z"/>
        </svg>
      </button>
    </div>
    <div class="bg-white rounded flex flex-col h-auto drop-shadow-2xl divide-y divide-gray-200">
      <fieldset v-if="todos.length < 1" class="flex justify-center mx-auto my-10 font-bold">
        No todo items left!
      </fieldset>
      <ul v-for="todo in todos" class="relative flex flex-col items-start justify-center divide-y divide-gray-200">
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
            <button type="button" class="inline-flex items-center mr-2 opacity-0 hover:opacity-100" @click="removeTodo(todo.id)">
              <img src="../images/icon-cross.svg" alt="cross-icon"/>
            </button>
        </li>
      </ul>
      <fieldset class="relative flex p-4 justify-between text-xs text-gray-500">
        <div>
          <p>{{todos.length}} items left</p>
        </div>
        <div class="flex gap-5">
          <a href="#" class="text-blue-500 font-bold hover:text-gray-500">All</a>
          <a href="#" class="hover:text-blue-500 font-bold text-gray-500">Active</a>
          <a href="#" class="hover:text-blue-500 font-bold text-gray-500">Completed</a>
        </div>
        <div>
          <button type="submit" class="focus:outline-none items-center">Clear Completed
          </button>
        </div>
      </fieldset>
    </div>
  </section>
</template>

<script>

export default {
  name: 'IndexPage',
  data: () => ({
    inputContent: "",
    todos: [],
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
    },
    completedTodo(todoId) {
      const todo = this.todos.findIndex(todo => todo.id === todoId);

      this.todos[todo].isCompleted = !this.todos[todo].isCompleted;

    }
  }
}
</script>

<style>
body {
  background-image: url("../images/bg-desktop-light.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  font-family: 'Josefin Sans', sans-serif;
}

input[type="checkbox"]:checked {
  background-image: url('../images/icon-check.svg'), linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%));
  background-size: 50% 50%, 100% 100%;
  background-position: center, center;
  background-repeat: no-repeat, no-repeat;
  border: none;
}
</style>