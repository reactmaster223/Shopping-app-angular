import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import {  Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit ,OnDestroy{
  //@ViewChild('nameInput') nameInputRef:ElementRef;
  //@ViewChild('amountInput') amountInputRef:ElementRef;
 // @Output() ingredientAdded = new EventEmitter<Ingredient>();
 @ViewChild('f') slform : NgForm;
 subscription :Subscription;
 editMode =false;
 editedItemIndex:number;
 editedItem :Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
   this.subscription =  this.slService.startedEditing
    .subscribe((index:number)=>{
      this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slform.setValue({
          name : this.editedItem.name,
          amount : this.editedItem.amount
        })

    });
  }

  onSubmit(form :NgForm){
    const value = form.value;
   // console.log(form.value);
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      console.log(this.editMode);
      this.slService.updateIngredient(this.editedItemIndex,newIngredient );
    }
    else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();


  //  this.slService.addIngredient(newIngredient);

  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
