import { Component } from '@angular/core';

@Component({
   selector :'app-auth',
   templateUrl : './auth.component.html' 
})
export class AuthComponent{
    isLoginMode = true;


    onSwithMode(){
        this.isLoginMode =  !this.isLoginMode;
        //console.log(this.isLoginMode);
    }
}