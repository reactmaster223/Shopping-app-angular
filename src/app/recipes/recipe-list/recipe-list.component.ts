import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'; 
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
 //@Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];
  subscription : Subscription;

  constructor(private recipeService:RecipeService,
    private route:ActivatedRoute,
    private router:Router
    ){

  }
  ngOnInit() {
   this.subscription = this.recipeService.recipesChanged
    .subscribe(
      (recipes:Recipe[]) =>{
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  // onRecipeSelected(recipe: Recipe){
  //   this.recipeWasSelected.emit(recipe);
  // }
  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route});
    //this.router.navigate(['../',this.id,'edit'])
  }

  ngOnDestroy(){
  this.subscription.unsubscribe();
  }
}
