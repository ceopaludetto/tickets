interface ApiErrorConstructorProps {
  message: string;
  status: number;
  type: 'ClassValidator' | 'Sequelize' | 'Runtime' | 'Http' | 'Other';
}

export class ApiError extends Error {
  public status = 200;

  public type: 'ClassValidator' | 'Sequelize' | 'Runtime' | 'Http' | 'Other' = 'Other';

  public constructor({ message, status }: ApiErrorConstructorProps) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}
