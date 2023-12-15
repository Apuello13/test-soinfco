import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from '../utils/env';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl: string = env.apiUrl;
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }
}
