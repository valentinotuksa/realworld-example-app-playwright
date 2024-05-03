import { test, expect } from "@playwright/test";
import { SignUpPage } from "./pages/sign-up-page";
import { SignedInHomePage } from "./pages/signed-in-home-page";
import { GenerateUser } from "./util/generateUser";

test.describe.parallel("Validate that the sign up page is working", () => {
  let signUpPage: SignUpPage;

  test.beforeEach(async ({ page }) => {
    signUpPage = new SignUpPage(page);
    await signUpPage.goto();
  });

  test("Check if user can sign up with valid credentials", async ({ page }) => {
    await signUpPage.usernameInput.fill(GenerateUser.username);
    await signUpPage.emailInput.fill(GenerateUser.email);
    await signUpPage.passwordInput.fill(GenerateUser.password);
    await signUpPage.submitButton.click();
    const signedInHomePage = new SignedInHomePage(page);
    await expect(
      signedInHomePage.signedInHeader.newArticleNavButton,
    ).toBeVisible();
  });
});
