// bloglist-e2e-tests/tests/01_blog.likes.test.js
import { test, expect } from "@playwright/test";

let blogId;

test.beforeEach(async ({ page, request }) => {
  // 1. Reset database
  await request.post("http://localhost:3003/api/testing/reset");

  // 2. Create user
  await request.post("http://localhost:3003/api/users", {
    data: { username: "testuser", name: "Test User", password: "secret" },
  });

  // 3. Login user
  const loginRes = await request.post("http://localhost:3003/api/login", {
    data: { username: "testuser", password: "secret" },
  });
  const { token } = await loginRes.json();

  // 4. Create blog via API *before opening page*
  const blogRes = await request.post("http://localhost:3003/api/blogs", {
    data: {
      title: "Blog to Like",
      author: "Author Name",
      url: "http://example.com",
      likes: 0,
    },
    headers: { Authorization: `Bearer ${token}` },
  });
  const blog = await blogRes.json();
  blogId = blog.id;

  // 5. Open page AFTER blog exists
  await page.addInitScript((token) => {
    window.localStorage.setItem(
      "loggedAppUser",
      JSON.stringify({ token, username: "testuser", name: "Test User" }),
    );
  }, token);

  await page.goto("http://localhost:5173");

  // 6. Wait for blog to appear in UI
  await page.waitForSelector(`[data-blog-id="${blogId}"]`);
});

test("a user can like a blog", async ({ page }) => {
  const blog = page.locator(`[data-blog-id="${blogId}"]`);

  // Open details
  const viewButton = blog.getByRole("button", { name: "view" });
  await viewButton.click();

  // Click like button
  const likeButton = blog.locator("button", { hasText: "like" });
  await likeButton.click();

  // Check likes count
  const likesSpan = blog.getByTestId("likes-count");
  await expect
    .poll(async () => parseInt(await likesSpan.textContent(), 10))
    .toBe(1);
});
