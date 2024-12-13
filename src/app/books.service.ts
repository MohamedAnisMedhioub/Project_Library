import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs';
import { Book } from '../Book';


@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private readonly host = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}
  

  getBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${this.host}/books`);
  }

  getSelectedBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${this.host}/books?selected=true`);
  }
  
  getAvailableBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${this.host}/books?available=true`);
  }

  searchBooks(keyword: string): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${this.host}/books?title=${keyword}`);
  }
  

  select(book: Book): Observable<Book> {
    book.selected = !book.selected;
    return this.httpClient.put<Book>(`${this.host}/books/${book.id}`, book);
  }

  deleteBook(book: Book): Observable<void> {
    return this.httpClient.delete<void>(`${this.host}/books/${book.id}`);
  }

  save(book: any): Observable<any> {
    return this.getBooks().pipe(
      map((books: any[]) => {
        const lastId = books.length? Math.max(...books.map((p) => parseInt(p.id))):0;
        const newBook = { ...book, id: (lastId + 1).toString() };
        return newBook;
      }),
      switchMap((newBook) => this.httpClient.post<Book>(`${this.host}/books`, newBook))
    );
  }

  getBook(id: number): Observable<Book> {
    return this.httpClient.get<Book>(`${this.host}/books/${id}`);
  }

  update(book: Book): Observable<Book> {
    return this.httpClient.put<Book>(`${this.host}/books/${book.id}`, book);
  }
}
