import { expect, test } from "@playwright/test";

test("searching for a surname lists the matching MPs", async ({ page }) => {
  await page.goto("/poslowie");

  await page.getByRole("textbox", { name: "Szukaj posła" }).fill("Mazur");

  await expect(
    page.getByRole("heading", { name: "Wyniki dla „Mazur”" }),
  ).toBeVisible();
  await expect(
    page.getByRole("list", { name: "1 poseł" }).getByRole("listitem"),
  ).toHaveCount(1);
});
