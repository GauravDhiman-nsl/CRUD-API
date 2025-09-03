import { NextResponse } from "next/server";
import { todos } from "@/lib/data";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const id = parseInt(context.params.id);
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return NextResponse.json({ message: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json(todo, { status: 200 });
}

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  const id = parseInt(context.params.id);
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return NextResponse.json({ message: "Todo not found" }, { status: 404 });
  }

  const body = await request.json();

  if (typeof body.text === "string") {
    todo.text = body.text;
  }
  if (typeof body.completed === "boolean") {
    todo.completed = body.completed;
  }

  return NextResponse.json(todo, { status: 200 });
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  const id = parseInt(context.params.id);
  const todoIndex = todos.findIndex((t) => t.id === id);

  if (todoIndex === -1) {
    return NextResponse.json({ message: "Todo not found" }, { status: 404 });
  }

  todos.splice(todoIndex, 1);

  return new NextResponse(null, { status: 204 });
}
