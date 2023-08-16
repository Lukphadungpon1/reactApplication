export interface LoginResult {
  message: string;
  token?: string;
}

export interface Account {
  
  EmpName: string;
  EmpLname: string;
  EmpPosition: string;
  EmpSection: string;
  EmpDepartment: string;
  iss: string;
  EmpEmail: string;
  Site: string;
  Role: string;
}
