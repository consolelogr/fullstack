import { test, expect } from "@playwright/test";

let blogId;

test.beforeEach(async ({ page, request }) => {
  await request.post("http://localhost:3003/api/testing/reset");

  await request.post("http://localhost:3003/api/users", {
    data: { username: "testuser", name: "Test User", password: "secret" },
  });

  const loginRes = await request.post("http://localhost:3003/api/login", {
    data: { username: "testuser", password: "secret" },
  });
  const { token } = await loginRes.json();

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

  await page.addInitScript((token) => {
    window.localStorage.setItem(
      "loggedAppUser",
      JSON.stringify({ token, username: "testuser", name: "Test User" }),
    );
  }, token);

  await page.goto("http://localhost:5173");

  await page.waitForSelector(`[data-blog-id="${blogId}"]`);
});

test("a user can like a blog", async ({ page }) => {
  const blog = page.locator(`[data-blog-id="${blogId}"]`);

  const viewButton = blog.getByRole("button", { name: "view" });
  await viewButton.click();

  const likeButton = blog.locator("button", { hasText: "like" });
  await likeButton.click();

  const likesSpan = blog.getByTestId("likes-count");
  await expect
    .poll(async () => parseInt(await likesSpan.textContent(), 10))
    .toBe(1);
});
