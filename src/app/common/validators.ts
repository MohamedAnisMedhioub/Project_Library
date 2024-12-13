import { AbstractControl, ValidationErrors } from '@angular/forms';

export function imageValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  // Regex for HTTP(S) URLs ending with .png, .jpg, or .jpeg
  const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg))$/i;

  // Regex for Base64-encoded images
  const base64Pattern = /^data:image\/(png|jpg|jpeg);base64,[a-zA-Z0-9+/=]+$/;

  // Check if the value matches either the URL or Base64 pattern
  if (urlPattern.test(value) || base64Pattern.test(value)) {
    return null; // Valid
  }

  return { invalidImage: true }; // Invalid
}
