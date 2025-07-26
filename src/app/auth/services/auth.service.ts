import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://zurichappservice-h5f7hpbadqcsfvfv.centralus-01.azurewebsites.net/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<void> {
    const body: LoginRequest = { email, password };

    return this.http.post<LoginResponse>(`${this.apiUrl}/Auth/login`, body).pipe(
      tap(({ token }) => {
        const role = this.extractRoleFromToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
      }),
      map(() => {}) // Convertimos el observable en tipo void
    );
  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  private extractRoleFromToken(token: string): string {
    try {
      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));
      return payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || 'cliente';
    } catch {
      return 'cliente'; // fallback por defecto
    }
  }
}
