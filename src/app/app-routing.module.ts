import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent} from './components/books/books.component';
import { BookAddComponent} from './components/book-add/book-add.component';
import { BookEditComponent} from './components/book-edit/book-edit.component';

const routes: Routes = [
  {path:"books",component:BooksComponent},
  {path: 'AddBook', component: BookAddComponent },
  {path: 'EditBook/:bookId', component: BookEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
