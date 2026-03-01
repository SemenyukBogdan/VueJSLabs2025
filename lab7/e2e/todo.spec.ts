import { test, expect } from '@playwright/test'

test.describe('Todo E2E', () => {
  test('сценарій 1: відкриття головної сторінки Todo', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('heading', { name: /new task/i })).toBeVisible()
    await expect(page.getByTestId('todo-input')).toBeVisible()
    await expect(page.getByTestId('new-task-desc')).toBeVisible()
    await expect(page.getByRole('button', { name: /create new task/i })).toBeVisible()

    await expect(page.getByText(/Total: \d+/).first()).toBeVisible()
    await expect(page.getByText(/Active: \d+/).first()).toBeVisible()
    await expect(page.getByText(/Completed: \d+/).first()).toBeVisible()
  })

  test('сценарій 2: додавання та видалення задачі', async ({ page }) => {
    await page.goto('/')

    const titleInput = page.getByTestId('todo-input')
    const descInput = page.getByTestId('new-task-desc')
    const createBtn = page.getByRole('button', { name: /create new task/i })

    await titleInput.fill('E2E test task')
    await descInput.fill('Description for E2E')
    await createBtn.click()

    await expect(page.getByText('E2E test task')).toBeVisible()
    await expect(page.getByText('Description for E2E')).toBeVisible()

    const deleteBtn = page.getByTestId('todo-item-delete').first()
    await deleteBtn.click()

    await expect(page.getByText('E2E test task')).not.toBeVisible()
  })

  test('сценарій 3: фільтрація', async ({ page }) => {
    await page.goto('/')

    await page.getByTestId('todo-input').fill('Task one')
    await page.getByTestId('new-task-desc').fill('Desc one')
    await page.getByRole('button', { name: /create new task/i }).click()

    await page.getByTestId('todo-input').fill('Task two')
    await page.getByTestId('new-task-desc').fill('Desc two')
    await page.getByRole('button', { name: /create new task/i }).click()

    await expect(page.getByText('Task one')).toBeVisible()
    await expect(page.getByText('Task two')).toBeVisible()

    await page.getByTestId('filter-status').selectOption({ label: 'Active' })

    await page.getByTestId('filter-title').fill('Task one')
    await expect(page.getByText('Task one')).toBeVisible()
    await expect(page.getByText('Task two')).not.toBeVisible()

    await page.getByTestId('filter-title').fill('')
    await page.getByTestId('filter-status').selectOption({ index: 0 })
  })

  test('скріншот сторінки після додавання задачі', async ({ page }) => {
    await page.goto('/')

    await page.getByTestId('todo-input').fill('Screenshot task')
    await page.getByTestId('new-task-desc').fill('For screenshot')
    await page.getByRole('button', { name: /create new task/i }).click()

    await expect(page.getByText('Screenshot task')).toBeVisible()

    await page.screenshot({ path: 'screenshots/todo-with-task.png' })
  })
})
