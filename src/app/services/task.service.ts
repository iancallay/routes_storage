import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private API_URL = 'https://luchandovenceras.online/backend/listatareas.php';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
    withCredentials: false // 🔹 IMPORTANTE: Si no usas autenticación con cookies, debe ser false.
  };

  constructor(private http: HttpClient) {}

  // Obtener todas las tareas
  getTasks(): Observable<any> {
    return this.http.post(this.API_URL, JSON.stringify({ action: 'listar' }), this.httpOptions);
  }

  // Insertar una nueva tarea
  addTask(task: any): Observable<any> {
    return this.http.post(this.API_URL, JSON.stringify({ action: 'insertar', ...task }), this.httpOptions);
  }

  // Eliminar una tarea por ID
  deleteTask(id: number): Observable<any> {
    return this.http.post(this.API_URL, JSON.stringify({ action: 'eliminar', id }), this.httpOptions);
  }

  // Actualizar una tarea
  updateTask(task: any): Observable<any> {
    return this.http.post(this.API_URL, JSON.stringify({ action: 'actualizar', ...task }), this.httpOptions);
  }

  // Obtener una tarea por ID
  getTaskById(id: number): Observable<any> {
    //console.log('ID de tarea recibido:', id);
    return this.http.post(this.API_URL, JSON.stringify({ action: 'obtener', id }), this.httpOptions);
  }
}
