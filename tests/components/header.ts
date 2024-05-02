import { Locator, Page } from "@playwright/test";

export class Header {
  readonly signInNavButton: Locator;
  readonly signUpNavButton: Locator;
  readonly homeNavButton: Locator;

  constructor(page: Page) {
    this.homeNavButton = page.getByRole("link", { name: "Home" });
    this.signInNavButton = page.getByRole("link", { name: "Sign in" });
    this.signUpNavButton = page.getByRole("link", { name: "Sign up" });
  }
}
