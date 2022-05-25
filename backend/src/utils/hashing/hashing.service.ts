import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  private saltRounds = 10;

  async hash(text: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    const hashedText = await bcrypt.hash(text, salt);
    return hashedText;
  }

  async compare(text: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(text, hash);
    return isMatch;
  }
}
