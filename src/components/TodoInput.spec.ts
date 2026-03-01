import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoInput from './TodoInput.vue'

describe('TodoInput', () => {
  it('монтується без помилок', () => {
    const wrapper = mount(TodoInput, {
      props: { modelValue: '' },
    })
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('приймає prop modelValue і показує його', () => {
    const wrapper = mount(TodoInput, {
      props: { modelValue: 'initial' },
    })
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('initial')
  })

  it('емітить update:modelValue при зміні тексту', async () => {
    const wrapper = mount(TodoInput, {
      props: { modelValue: 'initial' },
    })

    const input = wrapper.find('input')

    await input.setValue('New title')

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
    expect(emitted).toHaveLength(1)
    expect(emitted![0]).toEqual(['New title'])
  })

  it('приймає placeholder', () => {
    const wrapper = mount(TodoInput, {
      props: { modelValue: '', placeholder: 'Enter title' },
    })
    expect((wrapper.find('input').element as HTMLInputElement).placeholder).toBe('Enter title')
  })
})
