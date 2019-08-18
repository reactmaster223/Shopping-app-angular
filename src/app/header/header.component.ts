import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})
export class HeaderComponent implements OnInit,OnDestroy{
  isAuthenticated = false;
  private userSub : Subscription;
  constructor(private dataStorageService:DataStorageService,private authService:AuthService){

  }
  //  @Output() featureSelected = new EventEmitter<string>();

    // onSelect(feature:string){
    //     this.featureSelected.emit(feature);
    // }

    ngOnInit(){
     this.userSub = this.authService.user.subscribe(user =>{
     this.isAuthenticated = !!user;
     
     });
    }



    onSaveData(){
       this.dataStorageService.storeRecipe();
    }

    onfetchData(){
      this.dataStorageService.fetchRecipe().subscribe();
    }

    ngOnDestroy(){
      this.userSub.unsubscribe();
    }
}