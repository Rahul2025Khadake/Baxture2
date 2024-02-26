import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiurl = 'https://jsonplaceholder.typicode.com/users';
  APIURL = ' http://localhost:3000/user';

  private refresh = new Subject<void>
  constructor(private _http: HttpClient) {
  }
  get isRefreshrequired(){
     return this.refresh
  }
  Getuserdata() {
    return this._http.get(this.apiurl);
  }

  getDjsondata() {
    return this._http.get(this.APIURL);
  }

  getuser_data() {
    return this._http.get(this.APIURL);
  }
  postdata(data: any) {
    return this._http.post(this.APIURL, data).pipe(tap(()=>{
      this.isRefreshrequired.next()
    }))
  }
  update(userId: number, userData: any): Observable<any> {
    const url = `${this.APIURL}/${userId}`; 
    return this._http.patch(url, userData).pipe(
      tap(() => {
        this.isRefreshrequired.next();
      }),
      catchError((error: any) => {
        console.error('An error occurred while updating user data:', error);
        return throwError(error); 
      })
    );
  }
  




  DeleteUser_data(id:number):Observable<any>
  {
    return this._http.delete(`${this.APIURL}/${id}`)
  }

 
}
