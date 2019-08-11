import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

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

    onSubmit(form:NgForm){
      console.log(form.value);
      form.reset();
    }
}