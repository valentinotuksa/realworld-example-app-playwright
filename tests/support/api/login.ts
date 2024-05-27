import { request, expect, Page } from '@playwright/test';
import { Email } from '../typings/Email.t';
import { StatusCodes } from 'http-status-codes';
import { Pages } from '../typings/Pages';

export default class LoginAPI {
    static async login(email: Email, password: string, page: Page) {
        const apiRequestContext = await request.newContext();
        const response = await apiRequestContext.post(
            'https://api.realworld.io/api/users/login',
            {
                data: {
                    user: {
                        email: email,
                        password: password,
                    },
                },
            }
        );

        // Check if the response status is 200
        expect(response.status()).toBe(StatusCodes.OK);

        // Extract the token from the response
        const responseBody = await response.json();
        const jwtToken = responseBody.user.token;

        // Save the token in local storage
        await page.evaluate((token: string) => {
            localStorage.setItem('jwtToken', token);
        }, jwtToken);

        // Redirect to the home page
        await page.goto(Pages.Home, { waitUntil: 'domcontentloaded' });
    }
}
