import { Email } from './typings/Email.t';

//@TODO: find a cleaner way?
export class GenerateUser {
    static genUsername(): string {
        return `Test${Date.now().toString()}`;
    }

    static genEmail(): Email {
        return `mail.${Date.now().toString()}@fake.com`;
    }

    static defaultPassword: string = '123456';
}
