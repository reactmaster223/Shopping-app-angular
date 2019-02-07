import { ShoppingListService } from './../shopping.service';
import { Ingredient } from './../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {



  constructor(private slService : ShoppingListService) { }

  ngOnInit() {
  }

  onAddItem(form : NgForm){
    const value= form.value;
    console.log(value);
    const newIngredient = new Ingredient(value.name,value.amount);
    this.slService.addIngredient(newIngredient);
  }

}
