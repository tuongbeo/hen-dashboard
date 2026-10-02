import { test, expect } from '@playwright/test'
for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
  test(`dashboard renders and navigation works at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport)
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (['error', 'warning'].includes(message.type())) errors.push(message.text()) })
    await page.goto('/')
    await expect(page).toHaveTitle('Hẹn Analytics')
    await expect(page.getByRole('heading', { name: 'Platform performance' })).toBeVisible()
    for (const name of ['Booking trend', 'Booking funnel', 'Cancellation rate', 'Cancellation reasons', 'Customer behaviour', 'Studio operations', 'Business snapshot', 'Support tickets']) {
      await expect(page.getByRole('heading', { name, exact: true })).toBeVisible()
    }
    await expect(page.locator('.recharts-surface')).toHaveCount(4)
    await page.getByRole('link', { name: 'Evidence', exact: true }).click()
    await expect(page).toHaveURL(/#section-4$/)
    await expect(page.getByRole('heading', { name: 'Evidence board' })).toBeInViewport()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    await page.screenshot({ path: `test-results/dashboard-${viewport.width}.png`, fullPage: true })
    expect(errors).toEqual([])
  })
}
