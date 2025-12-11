import type { IUserAdapter } from '../../entities/interface'
import type { User, UserApi } from '../../entities/userTypes'

export class UserAdapter implements IUserAdapter {
  adapt(user: UserApi): User {
    return {
      id: user.Id,
      name: user.unique_name,
      email: user.email,
      role: user.role,
    }
  }
}

export const userAdapter = new UserAdapter()
