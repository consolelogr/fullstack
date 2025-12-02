import { test, expect } from "@playwright/test";

let blogId;

test.beforeEach(async ({ page, request }) => {
  await request.post("http://localhost:3003/api/testing/reset");

  await request.post("http://localhost:3003/api/users", {
    data: {
      username: "user1",
      name: "User One",
      password: "password1",
    },
  });

  await request.post("http://localhost:3003/api/users", {
    data: {
      username: "user2",
      name: "User Two",
      password: "password2",
    },
  });

  const loginRes = await request.post("http://localhost:3003/api/login", {
    data: { username: "user1", password: "password1" },
  });
  const { token } = await loginRes.json();

  await page.addInitScript((token) => {
    window.localStorage.setItem(
      "loggedAppUser",
      JSON.stringify({ token, username: "user1", name: "User One" }),
    );
  }, token);

  await page.goto("http://localhost:5173");

  await page.getByRole("button", { name: "create new blog" }).click();
  await page.getByTestId("title").fill("User1's Blog");
  await page.getByTestId("author").fill("Author1");
  await page.getByTestId("url").fill("http://example.com");
  await page.getByRole("button", { name: "create" }).click();

  await page.waitForSelector("text=User1's Blog");

  const blogsRes = await request.get("http://localhost:3003/api/blogs");
  const blogs = await blogsRes.json();
  blogId = blogs.find((b) => b.title === "User1's Blog").id;
});

test.afterEach(async ({ request }) => {
  if (blogId) {
    await request.delete(`http://localhost:3003/api/blogs/${blogId}`);
    blogId = null;
  }
});

test("only the user who added the blog sees the delete button", async ({
  page,
}) => {
  const blog = page.locator(`[data-blog-id="${blogId}"]`);
  await blog.getByRole("button", { name: "view" }).click();

  const deleteButton = blog.getByRole("button", { name: "delete" });
  await expect(deleteButton).toBeVisible();

  // Log out user1
  await page.evaluate(() => window.localStorage.removeItem("loggedAppUser"));

  // Log in as user2
  const loginRes = await page.request.post("http://localhost:3003/api/login", {
    data: { username: "user2", password: "password2" },
  });
  const { token } = await loginRes.json();

  await page.addInitScript((token) => {
    window.localStorage.setItem(
      "loggedAppUser",
      JSON.stringify({ token, username: "user2", name: "User Two" }),
    );
  }, token);

  await page.reload();

  const blogForUser2 = page.locator(`[data-blog-id="${blogId}"]`);
  await blogForUser2.getByRole("button", { name: "view" }).click();

  const deleteButtonUser2 = blogForUser2.getByRole("button", {
    name: "delete",
  });
  await expect(deleteButtonUser2).toHaveCount(0);
});
