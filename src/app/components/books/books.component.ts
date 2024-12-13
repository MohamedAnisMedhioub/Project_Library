import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../books.service'; 
import { Book } from 'src/Book';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { AppDataState, DataStateEnum } from '../../../state/book.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books$: Observable<AppDataState<Book[]>> | null = null;
  selectedBook: Book | null = null; 
  keyword: string = ''; 
  readonly DataStateEnum = DataStateEnum;

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.onGetAllBooks(); // Charge tous les livres au démarrage
  }

  onGetAllBooks() {
    this.books$ = this.booksService.getBooks().pipe(
      map(data => ({ dataState: DataStateEnum.LOADED, data })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
  }

  onGetSelectedBooks() {
    this.books$ = this.booksService.getSelectedBooks().pipe(
      map(data => ({ dataState: DataStateEnum.LOADED, data })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
  }

  onGetAvailableBooks() {
    this.books$ = this.booksService.getAvailableBooks().pipe(
      map(data => ({ dataState: DataStateEnum.LOADED, data })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
  }
  onSearch(f: any) {    
    const keyword = f.keyword?.trim()     
    if (!keyword) {
        alert("Veuillez entrer un mot-clé pour la recherche.");
        return;
    }
    this.books$ = this.booksService.searchBooks(keyword).pipe(
        map(data => ({
            dataState: DataStateEnum.LOADED,
            data: data  // No need to filter on the client-side if the API already does the search
        })),
        startWith({ dataState: DataStateEnum.LOADING }),
        catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: "No data" }))
    );
}



  onSelect(book: Book) {
    this.booksService.select(book).subscribe(data => {
      book.selected = data.selected;
    });
  }

  onDelete(book: Book) {
    const confirmation = confirm("Are you sure?");
    if (confirmation) {
      this.booksService.deleteBook(book).subscribe(() => {
        this.onGetAllBooks();
      });
    }
  }

  onNewBook() {
    this.router.navigateByUrl("/AddBook");
  }

  onEdit(book: Book | null): void {
    if (!book) {
      alert("No book selected to edit!");
      return;
    }
    this.router.navigateByUrl(`/EditBook/${book.id}`);
  }
  

  openModal(book: Book) {
    this.selectedBook = book;
    const modal = document.getElementById('bookModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  closeModal() {
    this.selectedBook = null;
    const modal = document.getElementById('bookModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }
}
