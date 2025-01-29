import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TaskService } from 'src/app/services/task.service';
import { LoadingController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
  standalone: false
})
export class TaskListPage implements OnInit {
  tasks: any[] = []; // Lista filtrada
  allTasks: any[] = []; // Lista original sin filtrar
  searchText: string = '';

  constructor(private taskService: TaskService, private navCtrl: NavController, private loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.loadTasks();
  }

  ionViewWillEnter() {
    this.loadTasks();  // 🔄 Se recarga la lista cada vez que se entra a la pantalla
  }


  loadTasks() {
    this.presentLoading();
    this.taskService.getTasks().subscribe(response => {
      if (response.estado) {
        this.tasks = response.tareas;
        this.allTasks = [...response.tareas];
        this.loadingCtrl.dismiss();
      } else {
        console.error('Error al cargar tareas:', response.mensaje);
      }
    });
  }

  filterTasks(event: any) {
    const searchTerm = event.target.value ? event.target.value.toLowerCase().trim() : '';
  
    if (searchTerm.length === 0) {
      console.log('Búsqueda vacía: restaurando lista original');
      this.tasks = [...this.allTasks]; // ✅ Restaurar lista completa si el input está vacío
      return;
    }
  
    const filteredTasks = this.allTasks.filter(task =>
      task.titulo.toLowerCase().includes(searchTerm)
    );
  
    if (filteredTasks.length > 0) {
      this.tasks = filteredTasks; // ✅ Asigna solo si hay coincidencias
    } else {
      console.log('No se encontraron coincidencias');
      this.tasks = [...this.allTasks]; // ✅ Mantiene la lista original si no hay coincidencias
    }
  }

  addTask() {
    this.navCtrl.navigateForward('/task-form');
    this.loadTasks();
  }

  viewTaskDetail(id: number) {
    this.navCtrl.navigateForward(`/task-detail/${id}`);
  }

  editTask(id: number) {
    this.navCtrl.navigateForward(`/task-form/${id}`);
  }
  exit() {
    this.navCtrl.navigateForward(`/`);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(response => {
      if (response.estado) {
        this.loadTasks();
      }
    });
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando tareas...',
      duration: 3000,
      spinner: 'bubbles'
    });
    await loading.present();
  }
}