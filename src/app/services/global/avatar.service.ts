// Angular/Ionic
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

// Modelos
import { ApiResponse } from 'src/app/models/apiResponse';

export interface Avatar {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  avatares: Avatar[] = [];

  constructor(private http: HttpClient) { }


  // Obtener un avatar aleatorio
  async obtenerAvatar() {
    try {
      const apiUrl = "https://rickandmortyapi.com/api/character";
      const response = await lastValueFrom(this.http.get<ApiResponse>(apiUrl));
      this.avatares = response.results;
      return this.avatares[Math.floor(Math.random() * this.avatares.length)].image;
    } catch (error) {
      console.error("Error al cargar avatares", error);
      return "";
    }
  }
}
