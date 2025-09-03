'use client';
import useSWR from 'swr';
import type { Todo } from '../lib/types';
import {
  Container,
  Title,
  TodoList,
  TodoItem,
  Loading,
  ErrorValue,
} from './styles'; 
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TodoPage() {
 
  const {
    data: todos,
    error,
    isLoading,
  } = useSWR<Todo[]>('/api/todos', fetcher);
  if (error) {
    return <ErrorValue>Failed to load todos. Please try again later.</ErrorValue>;
  }

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Container>
      <Title>My Todos</Title>
      <TodoList>
        {todos?.map((todo) => (
          <TodoItem key={todo.id} $completed={todo.completed}>
            {todo.text}
          </TodoItem>
        ))}
      </TodoList>
    </Container>
  );
}
