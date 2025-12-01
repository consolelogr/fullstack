// bloglist-e2e-tests/tests/login.test.js
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page, request }) => {
  await request.post("http://localhost:3003/api/testing/reset");
  await request.post("http://localhost:3003/api/users", {
    data: {
      username: "test",
      name: "Testing account name",
      password: "paaswoord",
    },
  });
  await page.goto("http://localhost:5173");
});

test("user can login", async ({ page }) => {
  await page.getByTestId("username").fill("test");
  await page.getByTestId("password").fill("paaswoord");
  await page.getByRole("button", { name: "login" }).click();
  await expect(page.getByText("Testing account name logged in")).toBeVisible();
});

test("login fails with wrong credentials", async ({ page }) => {
  await page.getByTestId("username").fill("test");
  await page.getByTestId("password").fill("wrong");
  await page.getByRole("button", { name: "login" }).click();
  await expect(page.getByText("wrong credentials").first()).toBeVisible();
});
