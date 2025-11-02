import { Injectable } from '@angular/core';
import { Right } from './Right.enum';

@Injectable()
export class User {
  userId: number;
  userName: string;
  userEmail: string;
  userAbbreviation: string;
  creationDate: number;
  loginState: boolean; //isActive
  userState: boolean;
  createUser: string; //fullName
  privileges: Right[];
  secLevelModel: any;
  LicenseDomainId: any;
  numberOfGroups: any;
  userPType: number;
  isBlocked: any;
}
