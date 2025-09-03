import { NextResponse } from "next/server";
import { todos } from "@/lib/data";
import type { Todo } from "@/lib/types";

export async function GET() {
  return NextResponse.json(todos, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.text || typeof body.text !== "string") {
      return NextResponse.json(
        { message: 'Invalid or missing "text" property in request body.' },
        { status: 400 }
      );
    }

    const newTodo: Todo = {
      id: Date.now(),
      text: body.text,
      completed: false,
      createdAt: new Date(),
    };

    todos.push(newTodo);

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error('Failed to parse request body:', error);
    return NextResponse.json(
      { message: 'Invalid JSON format in request body.' },
      { status: 400 }
    );
  }
}
