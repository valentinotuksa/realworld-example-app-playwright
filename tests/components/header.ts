import { Locator, Page } from "@playwright/test";

export class Header {
  readonly signInNavButton: Locator;
  readonly signUpNavButton: Locator;
  readonly homeNavButton: Locator;

  constructor(page: Page) {
    this.homeNavButton = page.getByRole("link", { name: /home/i });
    this.signInNavButton = page.getByRole("link", { name: /sign in/i });
    this.signUpNavButton = page.getByRole("link", { name: /sign up/i });
  }
}
