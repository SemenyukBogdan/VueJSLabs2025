import { describe, it, expect } from 'vitest'
import { getActiveCount, filterTodos, type TodoItem } from './todoHelpers'

function task(overrides: Partial<TodoItem> = {}): TodoItem {
  return {
    id: '1',
    title: 'Test',
    description: '',
    isComplete: false,
    editMode: false,
    createdAt: new Date(),
    priority: 'medium',
    ...overrides,
  }
}

describe('todoHelpers', () => {
  describe('getActiveCount', () => {
    it('повертає кількість активних задач', () => {
      // Arrange - готуємо список з активними та виконаними
      const list: TodoItem[] = [
        task({ id: '1', isComplete: false }),
        task({ id: '2', isComplete: true }),
        task({ id: '3', isComplete: false }),
      ]

      // Act - викликаємо функцію
      const result = getActiveCount(list)

      // Assert - перевіряємо результат
      expect(result).toBe(2)
    })

    it('повертає 0 для порожнього списку', () => {
      const list: TodoItem[] = []
      const result = getActiveCount(list)
      expect(result).toBe(0)
    })

    it('повертає 0 коли всі виконані', () => {
      const list: TodoItem[] = [
        task({ id: '1', isComplete: true }),
        task({ id: '2', isComplete: true }),
      ]
      const result = getActiveCount(list)
      expect(result).toBe(0)
    })
  })

  describe('filterTodos', () => {
    it('status "all" повертає весь список', () => {
      const list: TodoItem[] = [
        task({ id: '1', isComplete: false }),
        task({ id: '2', isComplete: true }),
      ]
      const result = filterTodos(list, 'all')
      expect(result).toEqual(list)
      expect(result).toHaveLength(2)
    })

    it('status "active" повертає тільки активні', () => {
      const list: TodoItem[] = [
        task({ id: '1', isComplete: false }),
        task({ id: '2', isComplete: true }),
        task({ id: '3', isComplete: false }),
      ]
      const result = filterTodos(list, 'active')
      expect(result).toHaveLength(2)
      expect(result.every((t) => !t.isComplete)).toBe(true)
    })

    it('status "done" повертає тільки виконані', () => {
      const list: TodoItem[] = [
        task({ id: '1', isComplete: false }),
        task({ id: '2', isComplete: true }),
      ]
      const result = filterTodos(list, 'done')
      expect(result).toHaveLength(1)
      expect(result[0].isComplete).toBe(true)
    })
  })
})
