import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
 recipes: Recipe[] = [
   new Recipe('A Test Recipe','This is simply test','https://www.flickr.com/photos/sameergoyal/30622968353')
 ];
  constructor() { }

  ngOnInit() {
  }

}
