export class User {
  constructor(
    public name: string,
    public password: string,
    public role?: Role,
    public supName?: string,
    public fund?: number
  ) {}
}

type Role = 'Emp' | 'Sup' | 'DeptHead' | 'Benco' | 'King';
