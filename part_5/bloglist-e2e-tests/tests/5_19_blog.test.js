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

  const response = await request.post("http://localhost:3003/api/login", {
    data: { username: "test", password: "paaswoord" },
  });
  const { token } = await response.json();

  await page.addInitScript((token) => {
    window.localStorage.setItem(
      "loggedAppUser",
      JSON.stringify({ token, username: "test", name: "Testing account name" }),
    );
  }, token);

  await page.goto("http://localhost:5173");
});

test("a logged-in user can create a new blog", async ({ page }) => {
  await page.getByRole("button", { name: "create new blog" }).click();

  await page.getByTestId("title").fill("Test Blog");
  await page.getByTestId("author").fill("Author Name");
  await page.getByTestId("url").fill("http://example.com");
  await page.getByRole("button", { name: "create" }).click();

  await expect(page.getByText("Test Blog").first()).toBeVisible();
  await expect(page.getByText("Author Name").first()).toBeVisible();
});
