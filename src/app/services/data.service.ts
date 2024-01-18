import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ShortUrl } from './../models/shortUrl';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(private http: HttpClient) {}

  shortify(url: string) {
    return this.http.post<ShortUrl>('http://localhost:3000/shortener', { url });
  }
}
