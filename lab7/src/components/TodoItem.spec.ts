import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoItem from './TodoItem.vue'

function task(overrides: Record<string, unknown> = {}) {
  return {
    id: '1',
    title: 'Test task',
    description: 'Description',
    isComplete: false,
    editMode: false,
    createdAt: new Date('2025-01-15'),
    priority: 'medium' as const,
    ...overrides,
  }
}

describe('TodoItem', () => {
  it('монтується без помилок', () => {
    const wrapper = mount(TodoItem, {
      props: { task: task() },
    })
    expect(wrapper.find('[data-testid="todo-item"]').exists()).toBe(true)
  })

  it('відображає props task (title, description)', () => {
    const t = task({ title: 'Buy milk', description: 'From shop' })
    const wrapper = mount(TodoItem, {
      props: { task: t },
    })
    expect(wrapper.text()).toContain('Buy milk')
    expect(wrapper.text()).toContain('From shop')
  })

  it('показує кнопку Delete коли не в editMode', () => {
    const wrapper = mount(TodoItem, {
      props: { task: task({ editMode: false }) },
    })
    expect(wrapper.find('[data-testid="todo-item-delete"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="todo-item-save"]').exists()).toBe(false)
  })

  it('показує кнопку Save коли в editMode', () => {
    const wrapper = mount(TodoItem, {
      props: { task: task({ editMode: true }) },
    })
    expect(wrapper.find('[data-testid="todo-item-save"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="todo-item-delete"]').exists()).toBe(false)
  })

  it('емітить remove при кліку на Delete', async () => {
    const t = task({ id: 'task-123' })
    const wrapper = mount(TodoItem, {
      props: { task: t },
    })
    await wrapper.find('[data-testid="todo-item-delete"]').trigger('click')
    expect(wrapper.emitted('remove')).toBeTruthy()
    expect(wrapper.emitted('remove')).toEqual([['task-123']])
  })

  it('емітить save при кліку на Save', async () => {
    const t = task({ id: 'task-456', editMode: true })
    const wrapper = mount(TodoItem, {
      props: { task: t },
    })
    await wrapper.find('[data-testid="todo-item-save"]').trigger('click')
    expect(wrapper.emitted('save')).toEqual([['task-456']])
  })
})
