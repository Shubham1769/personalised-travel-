import { Transformer } from '@/boat';
import { User } from '@/domain';

export class UserTransformer extends Transformer {
  async transform(user: User): Promise<Record<string, any>> {
    return {
      id: user.uuid,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
