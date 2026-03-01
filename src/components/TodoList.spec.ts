import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoList from './TodoList.vue'

function task(overrides: Record<string, unknown> = {}) {
  return {
    id: '1',
    title: 'Task',
    description: 'Desc',
    isComplete: false,
    editMode: false,
    createdAt: new Date('2025-01-15'),
    priority: 'medium' as const,
    ...overrides,
  }
}

describe('TodoList', () => {
  it('монтується без помилок', () => {
    const wrapper = mount(TodoList, {
      props: { list: [] },
    })
    expect(wrapper.find('[data-testid="todo-list"]').exists()).toBe(true)
  })

  it('рендерить порожній список', () => {
    const wrapper = mount(TodoList, {
      props: { list: [] },
    })
    expect(wrapper.findAll('[data-testid="todo-item"]')).toHaveLength(0)
  })

  it('рендерить список з кількома задачами', () => {
    const list = [task({ id: '1', title: 'First' }), task({ id: '2', title: 'Second' })]
    const wrapper = mount(TodoList, {
      props: { list },
    })
    const items = wrapper.findAll('[data-testid="todo-item"]')
    expect(items).toHaveLength(2)
    expect(wrapper.text()).toContain('First')
    expect(wrapper.text()).toContain('Second')
  })

  it('передає кожній TodoItem правильний task', () => {
    const list = [task({ id: 'a', title: 'Task A' })]
    const wrapper = mount(TodoList, {
      props: { list },
    })
    expect(wrapper.text()).toContain('Task A')
  })
})
