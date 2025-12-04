import { Todo, ApiResponse } from "./types";

const API_BASE_URL = "/api";

export type TodoFilter = "all" | "active" | "completed";
export type TodoSort = "dueDate" | "createdAt" | "title" | "order";

interface GetTodosParams {
  status?: TodoFilter;
  sortBy?: TodoSort;
  search?: string;
}

// Helper to handle API responses
async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${url}`, options);
  const data: ApiResponse<T> = await res.json();
  console.log({ json: data });
  if (!data.success) {
    throw new Error(data.error.message || "An error occurred");
  }

  return data.data;
}

export const api = {
  // Get all todos
  getTodos: async (params?: GetTodosParams) => {
    const searchParams = new URLSearchParams();
    if (params?.status && params.status !== "all")
      searchParams.append("status", params.status);
    if (params?.sortBy) searchParams.append("sortBy", params.sortBy);
    if (params?.search) searchParams.append("search", params.search);

    const queryString = searchParams.toString();
    const url = `/todos${queryString ? `?${queryString}` : ""}`;

    // Fix return type: Backend returns { items: Todo[] } inside data
    const response = await fetcher<{ items: Todo[] }>(url);
    return response.items;
  },

  // Create a new todo
  createTodo: (title: string, dueDate?: string) =>
    fetcher<Todo>("/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, ...(dueDate && { dueDate }) }),
    }),

  // Update a todo
  updateTodo: (id: string, updates: Partial<Todo>) =>
    fetcher<Todo>(`/todos/${id}`, {
      method: "PATCH", // Using PATCH for partial updates as per standard REST, ensure backend supports it (or PUT)
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    }),

  // Delete a todo
  deleteTodo: (id: string) =>
    fetcher<{ id: string }>(`/todos/${id}`, {
      method: "DELETE",
    }),

  // Bulk operations (if needed later, based on folder structure seeing /api/todos/bulk)
  // bulkUpdate: ...
};
