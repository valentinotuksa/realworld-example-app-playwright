//@TODO: find a better way? maybe a faker library?
export class GenerateUser {
  static email: string = `test${Date.now().toString()}@fake.com`;
  static username: string = `Test${Date.now().toString()}`;
  static password: string = "1234";
}
