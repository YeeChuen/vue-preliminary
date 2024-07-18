<template>
    <ul v-if="props.todos.length !== 0">
        <li class="m-2" v-for="todo in props.todos" :key="todo.id" :id="todo.id">
            <!-- not in edit mode -->
            <div v-if="editId !== todo.id" class="d-flex flex-row justify-content-between">
                <div :class="`${todo.complete && 'text-decoration-line-through'}`">{{ todo.content }}</div>
                <div class="d-flex gap-2 gap-2 ">
                    <button :class="`btn btn-outline-success btn-sm m-auto`"
                        @click.prevent="handleComplete(todo.content, todo.complete, todo.id)">
                        {{`${todo.complete ? 'Undo' : 'Complete'}`}}
                    </button>
                    <button :class="`btn btn-outline-primary btn-sm m-auto`"
                        @click.prevent="handleEdit(todo.id, todo.content)">
                        Edit
                    </button>
                    <button :class="`btn btn-outline-danger btn-sm m-auto`" @click.prevent="handleDelete(todo.id)">
                        Delete
                    </button>
                </div>
            </div>
            <!-- in edit mode -->
            <form v-else class="d-flex flex-row justify-content-between gap-2">
                <input type="text" class="form-control " id="form input edit todo" :placeholder="`Edit todo ${todo.id}`"
                    v-model="editValue">
                <div class="d-flex gap-2">
                    <input :class="`btn btn-outline-success btn-sm m-auto`" type="submit" value="Save"
                        @click.prevent="handleSave()">
                    <input :class="`btn btn-outline-${getOppositeTheme} btn-sm m-auto`" type="button" value="Close"
                        @click.prevent="handleClose()">
                </div>
            </form>
        </li>
    </ul>
</template>

<script setup>
import { inject, ref, defineProps } from 'vue';

const getOppositeTheme = inject("getOppositeTheme")

const $todos = inject("$todos");
const $bus = inject("$bus");

const editId = ref(null);
const editValue = ref("");

const props = defineProps(["todos"])

function handleEdit(id, content) {
    editId.value = id;
    editValue.value = content;
}
function handleDelete(id) {
    $todos.deleteTodo(id)
    $bus.$emit("refreshTodo")
}
function handleClose() {
    editId.value = null;
    editValue.value = "";
}
function handleSave() {
    if (editValue.value === "") {
        throw Error("No input value.")
    }
    $todos.updateTodo({content: editValue.value, complete: false}, editId.value);
    $bus.$emit("refreshTodo")
    editId.value = null;
    editValue.value = "";
}

function handleComplete(content, complete, id) {
    $todos.updateTodo({content: content, complete: !complete}, id);
    $bus.$emit("refreshTodo")
}

</script>