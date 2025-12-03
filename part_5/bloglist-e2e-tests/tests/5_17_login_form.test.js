const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    const loginForm = page.locator("form");
    await expect(loginForm).toBeVisible();

    const loginButton = page.getByRole("button", { name: /login/i });
    await expect(loginButton).toBeVisible();

    const inputs = loginForm.locator("input");
    const inputCount = await inputs.count();
    expect(inputCount).toBeGreaterThan(0);
  });
});
