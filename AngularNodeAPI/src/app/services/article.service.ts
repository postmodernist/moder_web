import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import {Article} from '../Data/article';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private articlesUrl = 'localhost:1337/api/article';
}

