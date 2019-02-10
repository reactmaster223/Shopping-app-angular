import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
export class ShoppingListService{
    ingredientsChanged = new EventEmitter<Ingredient[]>();
    startedEditing = new Subject<number>();
   private ingredients : Ingredient[] = [
        new Ingredient('Apple',5),
        new Ingredient('Tomatos',10),
      ];

      getIngredients(){
          return this.ingredients.slice();
      }

      getIngredient(index: number){
           return this.ingredients[index];
      }

      addIngredient(ingredient : Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
      }

     addIngredients(ingredients : Ingredient[]){
// for(let ingredient of this.ingredients){
//   this.addIngredient(ingredient);
// }
this.ingredients.push(...ingredients);
this.ingredientsChanged.emit(this.ingredients.slice());
     }

}