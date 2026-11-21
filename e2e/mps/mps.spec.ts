import { expect, test } from "@playwright/test";

test("searching for a city shows its constituency and MPs", async ({
  page,
}) => {
  // Given a user opens the Posłowie page
  await page.goto("/poslowie");

  // When they type "Warszawa" in the search
  await page
    .getByRole("textbox", { name: "Szukaj okręgu lub posła" })
    .fill("Warszawa");

  // Then they see "Okręg nr 19 · Warszawa" and 20 MPs
  await expect(
    page.getByRole("heading", { name: "Okręg nr 19 · Warszawa" }),
  ).toBeVisible();

  const mpsGrid = page.getByRole("list", { name: "20 posłów" });
  await page.getByRole("button", { name: "Pokaż wszystkich (20)" }).click();
  await expect(mpsGrid.getByRole("listitem")).toHaveCount(20);
});
