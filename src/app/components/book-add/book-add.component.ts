import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksService } from 'src/app/books.service';
import { imageValidator } from 'src/app/common/validators';

@Component({
  selector: 'AddBook',
  standalone: false,
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit{
  bookFormGroup!: FormGroup;
  submitted: boolean = false;
  imagePreview: string | null = null;  
  isFormVisible: boolean = false;  

  constructor(private fb: FormBuilder, private booksService: BooksService) {}

  
  ngOnInit(): void {
    this.bookFormGroup = this.fb.group({
      title: ['', Validators.required], 
      author: ['', Validators.required], 
      year: ['', [Validators.required, Validators.min(1500)]], 
      genre: ['', Validators.required], 
      copies: ['', [Validators.required, Validators.min(1)]], 
      image: ['', [Validators.required, imageValidator]]
    });
  }

 
  previewImage() {
    const imageUrl = this.bookFormGroup.get('image')?.value;
    if (imageUrl && this.isValidUrl(imageUrl)) {
      this.imagePreview = imageUrl;  
    } else {
      this.imagePreview = null;  
    }
  }

  isValidUrl(url: string): boolean {
    const pattern = new RegExp('(https?://.*\\.(?:png|jpg|jpeg))');
    return pattern.test(url);
  }

  onSaveBook() {
    this.submitted = true;
    if (this.bookFormGroup.invalid) return;

    this.booksService.save(this.bookFormGroup.value).subscribe({
      next: (data) => {
        alert('Livre sauvegardé avec succès !');
        this.bookFormGroup.reset();
        this.submitted = false;
        this.imagePreview = null; 
      },
      error: (error) => {
        console.error('Erreur lors de la sauvegarde du livre', error);
        alert('Échec de la sauvegarde. Veuillez réessayer.');
      },
      complete: () => {
        console.log('Sauvegarde terminée.');
      }
    });
  }

  toggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;
  }
}
