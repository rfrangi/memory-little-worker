export class User {
  email!: string;
  password!: string;

  constructor(data: any = {}) {
    Object.assign(this, data);
  }
}
