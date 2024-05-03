import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/home-page";
import { SignInPage } from "./pages/sign-in-page";
import { SignUpPage } from "./pages/sign-up-page";

test.describe("Test home page nav buttons", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test("Check if home nav button is visible", async () => {
    await expect(homePage.header.homeNavButton).toBeVisible();
  });

  test("Check if home page nav button does not change your location", async () => {
    await homePage.header.homeNavButton.click();
    await expect(homePage.homeHeading).toHaveText(/conduit/i);
  });

  test("Check if sign in nav button is visible", async () => {
    await expect(homePage.header.signInNavButton).toBeVisible();
  });

  test("Check if sign in button sends you to sign in page", async ({
    page,
  }) => {
    await homePage.header.signInNavButton.click();
    const signInPage = new SignInPage(page);
    await expect(signInPage.signInHeader).toHaveText(/sign in/i);
  });

  test("Check if sign up nav button is visible", async () => {
    await expect(homePage.header.signUpNavButton).toBeVisible();
  });

  test("Check if sign up button sends you to sign up page", async ({
    page,
  }) => {
    await homePage.header.signUpNavButton.click();
    const signUpPage = new SignUpPage(page);
    await expect(signUpPage.signUpTitle).toHaveText(/sign up/i);
  });
});
