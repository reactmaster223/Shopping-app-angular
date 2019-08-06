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
 subscription :Subscription;
 editMode =false;
 editedItemIndex:number;
  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
   this.subscription =  this.slService.startedEditing
    .subscribe((index:number)=>{
      this.editedItemIndex = index;
        this.editMode = true;
    });
  }

  onAddItem(form :NgForm){
    const value = form.value;
    console.log(form.value);
    const newIngredient = new Ingredient(value.name,value.amount);
    this.slService.addIngredient(newIngredient);

  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
