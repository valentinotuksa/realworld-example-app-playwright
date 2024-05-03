import { Page } from "@playwright/test";
import { SignedInHeader } from "tests/components/signed-in-header";

export class SignedInHomePage {
  readonly page: Page;
  readonly signedInHeader: SignedInHeader;

  constructor(page: Page) {
    this.page = page;
    this.signedInHeader = new SignedInHeader(page);
  }

  goto() {
    return this.page.goto("/");
  }
}
