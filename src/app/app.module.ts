import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { BookAddComponent } from './components/book-add/book-add.component';
import { BooksComponent } from './components/books/books.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    BookEditComponent,
    BookAddComponent,
    BooksComponent,
    NavBarComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),  // Replaces HttpClientModule
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
