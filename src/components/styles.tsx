'use client';

import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 2rem;
  font-family: sans-serif;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  text-align: center;
  color: #333;
`;

export const TodoList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 2rem;
`;

export const TodoItem = styled.li<{ $completed: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  
  span {
    flex-grow: 1;
    text-decoration: ${(props) => (props.$completed ? 'line-through' : 'none')};
    color: ${(props) => (props.$completed ? '#aaa' : '#333')};
    transition: color 0.2s, text-decoration 0.2s;
  }
`;

export const Loading = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

export const ErrorValue = styled.div`
  text-align: center;
  padding: 2rem;
  color: #d32f2f;
  background-color: #ffcdd2;
  border: 1px solid #d32f2f;
  border-radius: 4px;
`;

export const Form = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 2rem;
  margin-top: 1rem;
`;

export const Input = styled.input`
  flex-grow: 1;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

export const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  background-color: #0070f3;
  color: white;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #005bb5;
  }
`;

export const ErrorMessage = styled.p`
  color: #d32f2f;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

export const ActionButton = styled.button`
  padding: 0.4rem 0.8rem;
  border: 1px solid #ccc;
  background-color: #f8f8f8;
  color: #333;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s, border-color 0.2s;

  &:hover {
    background-color: #e9e9e9;
    border-color: #bbb;
  }

  &.delete-btn:hover {
    background-color: #ffcdd2;
    border-color: #d32f2f;
    color: #d32f2f;
  }
`;
export const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
export const EditForm = styled.div`
  display: flex;
  flex-grow: 1;
  gap: 10px;
`;