import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  input = new FormControl('');
  shortenedUrl = '';
  errorMsg = '';
  copyMsg = 'Copy';

  constructor(private dataService: DataService) {}

  shortify() {
    this.errorMsg = '';
    this.shortenedUrl = '';
    const value = this.input.value?.trim();
    if (value && value?.length > 6) {
      this.dataService.shortify(value).subscribe(
        {
          next: (data) => {
            this.shortenedUrl = `http://localhost:3000/shortener/${data.shortId}`;
            this.input.setValue('');
          },
          error: (error: any) => {
            if(error.status === 400) {
              this.errorMsg = 'Please enter a valid URL';
            } else {
              this.errorMsg = error.error.error;
            }
          }
        }
      );
    } else {
      this.errorMsg = 'Please enter a valid URL';
    }
  }

  copy() {
    navigator.clipboard.writeText(this.shortenedUrl)
    .then(() => {
      this.copyMsg = 'Copied!';
      setTimeout(() => {
        this.copyMsg = 'Copy';
      }, 3000);
    });
  }
}
