// tests/5_23_order.test.js
import { test, expect } from "@playwright/test";

test.describe("Blog app - blogs ordered by likes", () => {
  let token;

  test.beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");

    await request.post("http://localhost:3003/api/users", {
      data: { username: "order", name: "Order User", password: "pass" },
    });

    const login = await request.post("http://localhost:3003/api/login", {
      data: { username: "order", password: "pass" },
    });
    token = (await login.json()).token;

    await page.addInitScript((token) => {
      window.localStorage.setItem(
        "loggedAppUser",
        JSON.stringify({ token, username: "order", name: "Order User" }),
      );
    }, token);

    await page.goto("http://localhost:5173");

    // Create 3 blogs via API
    const blogs = [
      {
        title: "First Blog",
        author: "Author A",
        url: "http://1.com",
        likes: 0,
      },
      {
        title: "Second Blog",
        author: "Author B",
        url: "http://2.com",
        likes: 0,
      },
      {
        title: "Third Blog",
        author: "Author C",
        url: "http://3.com",
        likes: 0,
      },
    ];

    for (const blog of blogs) {
      await request.post("http://localhost:3003/api/blogs", {
        headers: { Authorization: `Bearer ${token}` },
        data: blog,
      });
    }

    // Reload page to render blogs
    await page.reload();

    // Wait until 3 blogs are visible
    const blogsLocator = page.locator(".blog-basic");
    await expect(blogsLocator).toHaveCount(3, { timeout: 5000 });
  });

  test("blogs are ordered by likes (most liked first)", async ({ page }) => {
    const blogsLocator = page.locator(".blog-basic");
    const count = await blogsLocator.count();

    // Expand all blogs
    for (let i = 0; i < count; i++) {
      await blogsLocator.nth(i).getByRole("button", { name: "view" }).click();
    }

    // Like first blog 3 times
    const firstLike = blogsLocator.nth(0).getByText("like");
    await firstLike.click();
    await firstLike.click();
    await firstLike.click();

    // Like second blog 1 time
    const secondLike = blogsLocator.nth(1).getByText("like");
    await secondLike.click();

    // Wait for React to re-render
    await page.waitForTimeout(500);

    // Re-fetch blogs
    const updatedBlogs = page.locator(".blog-basic");
    const titles = [];
    for (let i = 0; i < 3; i++) {
      const text = await updatedBlogs
        .nth(i)
        .locator("div")
        .first()
        .textContent();
      titles.push(text?.trim());
    }

    expect(titles[0]).toContain("First Blog"); // 3 likes
    expect(titles[1]).toContain("Second Blog"); // 1 like
    expect(titles[2]).toContain("Third Blog"); // 0 likes
  });
});
