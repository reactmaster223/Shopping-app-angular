import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService ,AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';

@Component({
   selector :'app-auth',
   templateUrl : './auth.component.html' 
})
export class AuthComponent{
    isLoginMode = true;
    isLoading = false;
    error:string = null;
constructor(private authService:AuthService){

}

    onSwithMode(){
        this.isLoginMode =  !this.isLoginMode;
        //console.log(this.isLoginMode);
    }

    onSubmit(form:NgForm){
      //console.log(form.value);
      if(!form.valid){
          return;
      }
      const email = form.value.email;
      const password = form.value.password;
      let authObs : Observable<AuthResponseData>



      this.isLoading = true;
      if(this.isLoginMode){
        authObs = this.authService.login(email,password);
      }else{
        authObs =this.authService.signup(email,password);
      }


      authObs.subscribe(resData=>{
        console.log(resData);
        this.isLoading = false;
      },errorMessage=>{
          console.log(errorMessage);
        this.error = errorMessage;
          //this.error = 'An error occured!';
          this.isLoading =false;
      });


      form.reset();
    }
}