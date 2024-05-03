import { test, expect } from "@playwright/test";
import { SignInPage } from "./pages/sign-in-page";
import { SignedInHomePage } from "./pages/signed-in-home-page";

test.describe("Verify functionality of sign in page", () => {
  let signInPage: SignInPage;

  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page);
    signInPage.goto();
  });

  test("Check if user can sign in with valid credentials", async ({ page }) => {
    await signInPage.emailInput.fill("yesno12@mail.com");
    await signInPage.passwordInput.fill("121212");
    await signInPage.submitButton.click();

    const signedInHomePage = new SignedInHomePage(page);
    expect(
      signedInHomePage.signedInHeader.newArticleNavButton.isVisible(),
    ).toBeTruthy();
  });
});
