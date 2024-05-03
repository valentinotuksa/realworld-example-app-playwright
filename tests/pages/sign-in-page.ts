import { Locator, Page } from "@playwright/test";
import { Header } from "tests/components/header";

export class SignInPage {
  readonly page: Page;
  readonly header: Header;

  readonly signInHeader: Locator;

  constructor(page: Page) {
    this.header = new Header(page);
    this.page = page;
    this.signInHeader = page.getByRole("heading", { name: /sign in/i });
  }

  goto() {
    return this.page.goto("/login");
  }
}
