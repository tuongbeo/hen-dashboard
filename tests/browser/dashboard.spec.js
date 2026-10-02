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

for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
  test(`guide explains metrics and preserves dashboard at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport)
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (['error', 'warning'].includes(message.type())) errors.push(message.text()) })
    await page.goto('/')
    await page.getByRole('tab', { name: 'Hướng dẫn', exact: true }).click()
    await expect(page.getByRole('tab', { name: 'Hướng dẫn', exact: true })).toHaveAttribute('aria-selected', 'true')
    await expect(page.getByRole('heading', { name: 'Hướng dẫn đọc dữ liệu & lựa chọn priority', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Platform performance', exact: true })).toHaveCount(0)
    await page.getByRole('link', { name: 'Tra cứu chỉ số', exact: true }).click()
    await expect(page.getByRole('heading', { name: '2. Tra cứu chỉ số của Hẹn', exact: true })).toBeInViewport()
    const cancellation = page.locator('details').filter({ has: page.locator('summary', { hasText: 'Cancellation rate' }) })
    await cancellation.locator('summary').click()
    await expect(cancellation.getByText('Giới hạn kết luận', { exact: true })).toBeVisible()
    await expect(cancellation).toContainText('33,7%')
    const repeat = page.locator('details').filter({ has: page.locator('summary', { hasText: 'Repeat booking' }) })
    await repeat.locator('summary').click()
    await expect(repeat).toContainText('Cần chốt cohort')
    await page.getByRole('link', { name: 'Ví dụ funnel', exact: true }).click()
    await expect(page.getByRole('heading', { name: '3. Cùng đọc một funnel', exact: true })).toBeInViewport()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    await page.screenshot({ path: `/tmp/hen-guide-${viewport.width}.png`, fullPage: true })
    await page.getByRole('tab', { name: 'Hướng dẫn', exact: true }).focus()
    await page.keyboard.press('ArrowLeft')
    await expect(page.getByRole('tab', { name: 'Dashboard', exact: true })).toBeFocused()
    await expect(page.getByRole('heading', { name: 'Platform performance', exact: true })).toBeVisible()
    await expect(page.locator('.recharts-surface')).toHaveCount(4)
    expect(errors).toEqual([])
  })
}

for (const width of [1440, 390]) {
  test(`facilitator password gate at ${width}px`, async ({ page }) => {
    await page.setViewportSize({width, height: 1000})
    await page.goto('/')
    await page.getByRole('tab', {name: 'Hướng dẫn', exact:true}).click()
    await expect(page.getByRole('link', {name: 'Nối với priority', exact:true})).toHaveCount(0)
    await page.getByRole('tab', {name: 'Facilitator', exact:true}).click()
    await expect(page.getByRole('heading', {name: 'Điều phối thảo luận & debrief', exact:true})).toHaveCount(0)
    await page.getByLabel('Password', {exact:true}).fill('incorrect-password')
    await page.getByRole('button', {name:'Đăng nhập', exact:true}).click()
    await expect(page.getByRole('alert')).toContainText('Password không đúng')
    await expect(page.getByLabel('Password', {exact:true})).toHaveValue('')
    if (!process.env.HEN_FACILITATOR_PASSWORD) return
    await page.getByLabel('Password', {exact:true}).fill(process.env.HEN_FACILITATOR_PASSWORD)
    await page.getByRole('button', {name:'Đăng nhập', exact:true}).click()
    await expect(page.getByRole('heading', {name: 'Điều phối thảo luận & debrief', exact:true})).toBeVisible()
    await expect(page.getByRole('heading', {name: '6. Runbook, phản biện & đánh giá phần trình bày', exact:true})).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    await page.getByRole('tab', {name: 'Dashboard', exact:true}).click()
    await page.getByRole('tab', {name: 'Facilitator', exact:true}).click()
    await expect(page.getByRole('button', {name:'Khóa lại', exact:true})).toBeVisible()
    await page.getByRole('button', {name:'Khóa lại', exact:true}).click()
    await expect(page.getByRole('button', {name:'Đăng nhập', exact:true})).toBeVisible()
    await page.reload()
    await page.getByRole('tab', {name: 'Facilitator', exact:true}).click()
    await expect(page.getByRole('button', {name:'Đăng nhập', exact:true})).toBeVisible()
  })
}
