import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './../shopping-list/shopping.service';
@Injectable()
export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();
   private recipes : Recipe[] = [
        new Recipe(
            'test recipe',
            'simple test recipe',
            'https://cdn.pixabay.com/photo/2017/06/21/22/42/recipe-2428926_960_720.jpg',
            [
                new Ingredient('Meat',1),
                new Ingredient('French Fries',20),
            ]),
        new Recipe('test',
        'simple test',
        'https://cdn.pixabay.com/photo/2017/06/21/22/42/recipe-2428926_960_720.jpg',
        [
            new Ingredient('Buns',2),
            new Ingredient('Meat',1),
        ])
      ];

      constructor(private slService : ShoppingListService){
        this.slService;
      }
      getRecipes(){
          return this.recipes.slice();
      }

      getRecipe(index : number){
          return this.recipes[index];
      }


      addIngredientsToShoppingList(ingredients : Ingredient[]){
this.slService.addIngredients(ingredients);
      }
}