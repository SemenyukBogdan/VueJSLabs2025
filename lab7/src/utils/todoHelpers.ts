export type TodoStatus = 'all' | 'active' | 'done'

export interface TodoItem {
  id: string
  title: string
  description: string
  isComplete: boolean
  editMode: boolean
  createdAt: Date
  priority: string
}

export function getActiveCount(list: TodoItem[]): number {
  return list.filter((t) => !t.isComplete).length
}

export function filterTodos(
  list: TodoItem[],
  status: TodoStatus
): TodoItem[] {
  if (status === 'all') return list
  if (status === 'active') return list.filter((t) => !t.isComplete)
  return list.filter((t) => t.isComplete)
}
