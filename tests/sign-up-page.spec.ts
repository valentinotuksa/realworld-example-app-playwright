import { test, expect } from "@playwright/test";
import { SignUpPage } from "./pages/sign-up-page";
import { SignedInHomePage } from "./pages/signed-in-home-page";
import { GenerateUser } from "./util/generateUser";

test.describe.parallel("Validate that the sign up page is working", () => {
  let signUpPage: SignUpPage;

  test.beforeEach(async ({ page }) => {
    await test.step("Go to the sign up page", async () => {
      signUpPage = new SignUpPage(page);
      await signUpPage.goto();
    });
  });

  test("Check if user can sign up with valid credentials", async ({ page }) => {
    await test.step("Enter the username", async () => {
      await signUpPage.usernameInput.fill(GenerateUser.username);
    });

    await test.step("Enter the email", async () => {
      await signUpPage.emailInput.fill(GenerateUser.email);
    });

    await test.step("Enter the password", async () => {
      await signUpPage.passwordInput.fill(GenerateUser.password);
    });

    await test.step("Submit the form", async () => {
      await signUpPage.submitButton.click();
    });

    await test.step("Check if the user is signed in", async () => {
      const signedInHomePage = new SignedInHomePage(page);
      await expect(
        signedInHomePage.signedInHeader.newArticleNavButton,
      ).toBeVisible();
    });
  });
});
