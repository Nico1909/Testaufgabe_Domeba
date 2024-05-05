import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { Business } from '../models/business.model';
import { BusinessAndUser } from '../models/businessAndUser.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseApiUrl: string = "https://localhost:7168";

  constructor(private http: HttpClient) { }

  registerBusinessWithUser(busAndUser: BusinessAndUser): Observable<BusinessAndUser> {
    return this.http.post<BusinessAndUser>(this.baseApiUrl + '/api/User/SaveBusinessWithUser', busAndUser);
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(this.baseApiUrl + '/api/User/Login', user);
  }

  checkIfUsernameExists(username: string): Observable<boolean> {
    return this.http.get<boolean>(this.baseApiUrl + '/api/User/Username/' + username);
  }

  getAllIndustryTypesOfDb(): Observable<string[]> {
    return this.http.get<string[]>(this.baseApiUrl + '/api/User/GetIndustryTypes');
  }

}
