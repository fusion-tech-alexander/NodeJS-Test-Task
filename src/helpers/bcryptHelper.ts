import * as bcrypt from 'bcrypt';

class BcryptHelper {
  public createHash(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }
  public compareHash(data: string, hash: string): Promise<boolean> {
    return bcrypt.compare(data, hash);
  }
}

export const bcryptHelper = new BcryptHelper();
