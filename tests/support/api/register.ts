import { APIResponse, request, expect } from '@playwright/test';
import { StatusCodes } from 'http-status-codes';
import { Email } from '../typings/Email.t';

export default class RegisterAPI {
    static async register(
        username: string,
        email: Email,
        password: string
    ): Promise<APIResponse> {
        const apiRequestContext = await request.newContext();

        const response = await apiRequestContext.post(
            'https://api.realworld.io/api/users',
            {
                data: {
                    user: {
                        username: username,
                        email: email,
                        password: password,
                    },
                },
            }
        );

        // Check if the response status is 201
        expect(response.status()).toBe(StatusCodes.CREATED);

        return response;
    }
}
