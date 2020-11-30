import { from } from 'rxjs';
import {Image} from './Image';
export interface Article{
  id: string;
  title: string;
  author: string;
  description: string;
  Images: Image[];
  modified: Date;
}
