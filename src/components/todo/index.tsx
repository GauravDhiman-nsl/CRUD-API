"use client";
import useSWR, { mutate } from "swr";
import type { Todo } from "@/lib/types";
import {
  Container,
  Title,
  TodoList,
  TodoItem,
  Loading,
  ErrorValue,
  Checkbox,
  ActionButton,
  EditForm,
  Input,
} from "@/components/styles";
import AddTodoForm from "./add-todo-form";
import { useState } from "react";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TodoPage() {
  const {
    data: todos,
    error,
    isLoading,
  } = useSWR<Todo[]>("/api/todos", fetcher);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  const handleToggleComplete = async (todoToUpdate: Todo) => {
    const optimisticTodos = todos?.map((todo) =>
      todo.id === todoToUpdate.id
        ? { ...todo, completed: !todo.completed }
        : todo
    );
    mutate("/api/todos", optimisticTodos, false);

    try {
      await fetch(`/api/todos/${todoToUpdate.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todoToUpdate.completed }),
      });
    } catch (err) {
      console.error("Failed to update todo:", err);
      mutate("/api/todos", todos, false);
    }
  };
  const handleDelete = async (idToDelete: number) => {
    if (!window.confirm("Are you sure you want to delete this todo?")) {
      return;
    }

    const optimisticTodos = todos?.filter((todo) => todo.id !== idToDelete);

    mutate("/api/todos", optimisticTodos, false);
    try {
      await fetch(`/api/todos/${idToDelete}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Failed to delete todo:", err);
      mutate("/api/todos", todos, false);
    }
  };

  const handleStartEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const handleSaveEdit = async () => {
    if (!editingText.trim() || editingId === null) return;
    const optimisticTodos = todos?.map((todo) =>
      todo.id === editingId ? { ...todo, text: editingText } : todo
    );
    mutate('/api/todos', optimisticTodos, false);
    handleCancelEdit(); 
    try {
      await fetch(`/api/todos/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: editingText }),
      });
    } catch (err) {
      console.error('Failed to save edit:', err);

      mutate('/api/todos', todos, false);
    }
  };

  if (error) return <ErrorValue>Failed to load todos.</ErrorValue>;
  if (isLoading) return <Loading>Loading...</Loading>;

  return (
     <Container>
      <Title>My Todos</Title>
      <AddTodoForm />
      <TodoList>
        {todos?.map((todo) => (
          <TodoItem key={todo.id} $completed={todo.completed}>
            <Checkbox
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo)}
              disabled={editingId === todo.id}
            />
            {editingId === todo.id ? (
              <EditForm>
                <Input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  autoFocus
                />
                <ActionButton onClick={handleSaveEdit}>Save</ActionButton>
                <ActionButton onClick={handleCancelEdit}>Cancel</ActionButton>
              </EditForm>
            ) : (
              <>
                <span>{todo.text}</span>
                <ActionButton onClick={() => handleStartEdit(todo)}>Edit</ActionButton>
                <ActionButton
                  onClick={() => handleDelete(todo.id)}
                  className="delete-btn"
                >
                  Delete
                </ActionButton>
              </>
            )}
          </TodoItem>
        ))}
      </TodoList>
    </Container>
  );
}
