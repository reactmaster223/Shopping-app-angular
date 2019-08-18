import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData{
    kind : string;
    idToken:string,
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId : string;
    resgisterd? : boolean;
}
@Injectable({providedIn :'root'})
export class AuthService{

   user = new BehaviorSubject<User>(null);
   //token:string  = null;
    constructor(private http:HttpClient){

    }
  signup(email:string,password:string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCIMgb4kta0CZpxBmCrq96_5UJg1kqTgR8',
    {
       email: email,
       password:password,
       returnSecureToken:true
    }).pipe(catchError(this.handleError),tap(resData =>{
     this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
    }));
  }


  login(email:string,password:string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCIMgb4kta0CZpxBmCrq96_5UJg1kqTgR8',
    {
      email: email,
      password:password,
      returnSecureToken:true
   }).pipe(catchError(this.handleError),tap(resData =>{
    this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
   }));
  }


  handleAuthentication(email:string,userId:string ,token:string,expiresIn:number){
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate);
      this.user.next(user);
      console.log(user);
      
  }

  private handleError(errorRes : HttpErrorResponse){
    let errorMessage = 'An unknown errr occured';
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }
    switch(errorRes.error.error.message){
      case 'EMAIL_EXISTS' :
          errorMessage = 'This email exists already';
          break;
          case 'EMAIL_NOT_FOUND' :
            errorMessage = 'This email does not exists';
            break;
            case 'INVALID_PASSWORD':
              errorMessage = 'This password is not correct';
              break;
  }
  return throwError(errorMessage);
  }
}