import { test, expect } from "@playwright/test";

let createdBlogId;

test.beforeEach(async ({ page, request }) => {
  await request.post("http://localhost:3003/api/testing/reset");

  await request.post("http://localhost:3003/api/users", {
    data: { username: "test", name: "Test User", password: "paaswoord" },
  });

  const loginRes = await request.post("http://localhost:3003/api/login", {
    data: { username: "test", password: "paaswoord" },
  });
  const { token } = await loginRes.json();

  const blogRes = await request.post("http://localhost:3003/api/blogs", {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      title: "Blog to Delete",
      author: "Author",
      url: "http://example.com",
    },
  });
  const createdBlog = await blogRes.json();
  createdBlogId = createdBlog.id;

  await page.addInitScript((token) => {
    window.localStorage.setItem(
      "loggedAppUser",
      JSON.stringify({ token, username: "test", name: "Test User" }),
    );
  }, token);

  await page.goto("http://localhost:5173");
});

test("the user who added the blog can delete it", async ({ page }) => {
  const blog = page.locator(`[data-blog-id="${createdBlogId}"]`);
  await blog.waitFor();

  await blog.getByRole("button", { name: "view" }).click();

  const deleteButton = blog.getByRole("button", { name: "delete" });
  await deleteButton.waitFor();

  page.once("dialog", (dialog) => dialog.accept());
  await deleteButton.click();

  await expect(blog).toHaveCount(0);
});

test.afterEach(async ({ request }) => {
  if (createdBlogId) {
    await request.delete(`http://localhost:3003/api/blogs/${createdBlogId}`);
    createdBlogId = null;
  }
});
