import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/books.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { imageValidator } from 'src/app/common/validators';

@Component({
  selector: 'app-book-edit',
  standalone: false,
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  bookId: number;
  bookFormGroup!: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  imagePreview: string | null = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private booksService: BooksService,
    private fb: FormBuilder,
    private router: Router
  ) { 
    this.bookId = +activatedRoute.snapshot.params['bookId']; 
  }

  ngOnInit(): void {
    // Charger les données du livre existant
    this.booksService.getBook(this.bookId).subscribe(
      book => {
        console.log("Loaded book:", book);
        // Initialiser le formulaire avec les données du livre
        this.bookFormGroup = this.fb.group({
          id: [book.id],
          title: [book.title, Validators.required],
          author: [book.author, Validators.required],
          year: [book.year, [Validators.required, Validators.min(1)]],
          genre: [book.genre, Validators.required],
          copies: [book.copies, [Validators.required, Validators.min(1)]],
          image: [book.image, [Validators.required, imageValidator]],
          selected: [book.selected],
          available: [book.available]
        });
        this.imagePreview = book.image; 
      },
      error => {
        console.error("Error loading book", error);
        alert("Failed to load book data. Please try again.");
      }
    );
  }

  // Méthode pour prévisualiser l'image lorsque l'URL change
  previewImage(): void {
    const imageUrl = this.bookFormGroup.get('image')?.value;
    if (imageUrl) {
      this.imagePreview = imageUrl; // Met à jour l'aperçu de l'image
    }
  }

  onUpdateBook(): void {
    this.submitted = true;
    if (this.bookFormGroup.invalid) return;

    this.loading = true;
    console.log("Form Data:", this.bookFormGroup.value);

    // Appel à l'API pour mettre à jour les informations du livre
    this.booksService.update(this.bookFormGroup.value).subscribe({
      next: (data) => {
        this.loading = false;
        alert("Success! Book updated.");
        this.router.navigate(['/books']);
      },
      error: (error) => {
        this.loading = false;
        console.error("Error updating book", error);
        alert("Failed to update book. Please try again.");
      }
    });
  }
}
