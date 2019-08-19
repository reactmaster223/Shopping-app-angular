import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import {map, tap, take, exhaustMap} from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn:'root'})
export class DataStorageService{
    constructor(private http:HttpClient,
        private recipeService :RecipeService,
        private authService : AuthService){

    }


    storeRecipe(){
        const recipes = this.recipeService.getRecipes();
        return this.http.put('https://ng-course-recipe-book-1f277.firebaseio.com/recipes.json',recipes).subscribe(
            response =>{
                console.log(response);
            }
        );
    }
    
    fetchRecipe(){
   
            return this.http.get<Recipe[]>('https://ng-course-recipe-book-1f277.firebaseio.com/recipes.json?' 
            
            )
        .pipe(map(recipes=>{
            return recipes.map(recipes =>{
                return {...recipes,ingredients : recipes.ingredients ? recipes.ingredients : []
              };
            });
        }),
        tap(recipes =>{
          this.recipeService.setRecipes(recipes);
        })
        );
    }
}