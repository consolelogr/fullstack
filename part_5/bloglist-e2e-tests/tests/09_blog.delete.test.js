// tests/09_blog.delete.test.js
import { test, expect } from "@playwright/test";

let createdBlogId;

test.beforeEach(async ({ page, request }) => {
  await request.post("http://localhost:3003/api/testing/reset");

  await request.post("http://localhost:3003/api/users", {
    data: { username: "test", name: "Testing Account", password: "paaswoord" },
  });

  const loginRes = await request.post("http://localhost:3003/api/login", {
    data: { username: "test", password: "paaswoord" },
  });
  const { token } = await loginRes.json();
  await page.addInitScript((token) => {
    window.localStorage.setItem(
      "loggedAppUser",
      JSON.stringify({ token, username: "test", name: "Testing Account" }),
    );
  }, token);

  await page.goto("http://localhost:5173");

  await page.getByRole("button", { name: "create new blog" }).click();
  await page.getByTestId("title").fill("Blog to Delete");
  await page.getByTestId("author").fill("Author Name");
  await page.getByTestId("url").fill("http://example.com");
  await page.getByRole("button", { name: "create" }).click();

  const blogsRes = await request.get("http://localhost:3003/api/blogs");
  const blogs = await blogsRes.json();
  createdBlogId = blogs.find((b) => b.title === "Blog to Delete").id;

  await page.waitForSelector(`[data-blog-id="${createdBlogId}"]`);
});

test("the user who added the blog can delete it", async ({ page }) => {
  const blog = page.locator(`[data-blog-id="${createdBlogId}"]`);

  const viewButton = blog.getByRole("button", { name: "view" });
  await viewButton.click();

  const deleteButton = blog.getByRole("button", { name: "delete" });
  page.on("dialog", (dialog) => dialog.accept());
  await deleteButton.click();

  await expect(blog).toHaveCount(0, { timeout: 5000 });
});

test.afterEach(async ({ request }) => {
  if (createdBlogId) {
    await request.delete(`http://localhost:3003/api/blogs/${createdBlogId}`);
    createdBlogId = null;
  }
});
