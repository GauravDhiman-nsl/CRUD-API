'use client';

import { useState } from 'react';
import { mutate } from 'swr';
import { Form, Input, SubmitButton, ErrorMessage } from '../styles';

export default function AddTodoForm() {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!text.trim()) {
      setError('Todo text cannot be empty.');
      return;
    }
    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to add todo');
      }
      setText('');
      setError(null);
      mutate('/api/todos');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        aria-label="New todo text"
      />
      <SubmitButton type="submit">Add Todo</SubmitButton>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Form>
  );
}
