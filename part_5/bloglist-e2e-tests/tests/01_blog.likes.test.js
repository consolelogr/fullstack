import { test, expect } from "@playwright/test";

let createdBlogId;

test.beforeEach(async ({ page, request }) => {
  await request.post("http://localhost:3003/api/testing/reset");

  await request.post("http://localhost:3003/api/users", {
    data: {
      username: "test",
      name: "Testing account name",
      password: "paaswoord",
    },
  });

  const loginRes = await request.post("http://localhost:3003/api/login", {
    data: { username: "test", password: "paaswoord" },
  });
  const { token } = await loginRes.json();

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

  await page.waitForSelector("text=Blog to Like");

  const blogsRes = await request.get("http://localhost:3003/api/blogs");
  const blogs = await blogsRes.json();
  createdBlogId = blogs.find((b) => b.title === "Blog to Like").id;
});

test.afterEach(async ({ request }) => {
  if (createdBlogId) {
    await request.delete(`http://localhost:3003/api/blogs/${createdBlogId}`);
    createdBlogId = null;
  }
});

test("a user can like a blog", async ({ page }) => {
  const blog = page
    .locator("div.blog-basic", { hasText: "Blog to Like" })
    .last();

  await blog.getByRole("button", { name: "view" }).click();

  const likeButton = blog.getByRole("button", { name: "like" });
  await likeButton.click();

  const likesSpan = blog.getByTestId("likes-count");
  await expect(likesSpan).toBeVisible();
});
