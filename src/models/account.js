import { transformSnakeToCamel } from '../utils/snakeCamelConverter'

export default class Account {
  constructor({
    id,
    email,
    username
  }) {
    this.id = id
    this.email = email
    this.username = username
  }

  static newFromApiResponse = data => {
    return new Account(transformSnakeToCamel(data))
  }
}
