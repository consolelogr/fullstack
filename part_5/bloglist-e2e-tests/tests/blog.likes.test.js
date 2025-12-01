// bloglist-e2e-tests/tests/blogLikes.test.js
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page, request }) => {
  // Reset backend
  await request.post("http://localhost:3003/api/testing/reset");

  // Create test user
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
  await page.getByRole("button", { name: "create new blog" }).click();
  await page.getByTestId("title").fill("Blog to Like");
  await page.getByTestId("author").fill("Author Name");
  await page.getByTestId("url").fill("http://example.com");
  await page.getByRole("button", { name: "create" }).click();

  // Wait for the blog to appear
  await page.waitForSelector("text=Blog to Like");
});

test("a user can like a blog", async ({ page }) => {
  // Expand the blog details
  await page
    .locator("div.blog-basic", { hasText: "Blog to Like" })
    .getByRole("button", { name: "view" })
    .click();

  const likesDiv = page.getByText("likes 0");

  // Like the blog
  await likesDiv.locator("..").getByRole("button", { name: "like" }).click();

  // Assert likes incremented
  await expect(page.getByText("likes 1")).toBeVisible();
});
