import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {Article} from '../Data/article';
import {ArticleService} from '../services/article.service';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
