import { Component, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
 @Output() recipeWasSelected = new EventEmitter<Recipe>();
recipes : Recipe[] = [
  new Recipe('test recipe','simple test recipe','https://cdn.pixabay.com/photo/2017/06/21/22/42/recipe-2428926_960_720.jpg'),
  new Recipe('test','simple test','https://cdn.pixabay.com/photo/2017/06/21/22/42/recipe-2428926_960_720.jpg')
];
  constructor() { }

  ngOnInit() {
  }
  onRecipeSelected(recipe : Recipe){
this.recipeWasSelected.emit(recipe);
  }
}
