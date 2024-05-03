import { Locator, Page } from "@playwright/test";

export class SignedInHeader {
  readonly page: Page;
  readonly homeNavButton: Locator;
  readonly newArticleNavButton: Locator;
  readonly settingsNavButton: Locator;
  // readonly profileNavButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeNavButton = page.getByRole("link", { name: /home/i });
    this.newArticleNavButton = page.getByRole("link", { name: /new article/i });
    this.settingsNavButton = page.getByRole("link", { name: /settings/i });
    // this.profileNavButton = page.getByRole("link", { name: /sign out/i });
  }
}
