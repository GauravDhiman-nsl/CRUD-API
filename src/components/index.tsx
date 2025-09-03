'use client'; // This component fetches data on the client and manages state, so it must be a Client Component.

import useSWR from 'swr';
import type { Todo } from '../lib/types';
import {
  Container,
  Title,
  TodoList,
  TodoItem,
  Loading,
  Error,
} from './styles'; // We will create these styled-components next

// Define a reusable "fetcher" function. SWR will use this to make the actual API calls.
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TodoPage() {
  // Use the SWR hook to fetch data from our API endpoint.
  // The first argument is the API URL (the "key").
  // The second argument is our fetcher function.
  const {
    data: todos,
    error,
    isLoading,
  } = useSWR<Todo[]>('/api/todos', fetcher);

  // Handle the error state
  if (error) {
    return <Error>Failed to load todos. Please try again later.</Error>;
  }

  // Handle the loading state
  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Container>
      <Title>My Todos</Title>
      <TodoList>
        {todos?.map((todo) => (
          <TodoItem key={todo.id} completed={todo.completed}>
            {todo.text}
          </TodoItem>
        ))}
      </TodoList>
    </Container>
  );
}
