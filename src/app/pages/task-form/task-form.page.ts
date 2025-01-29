import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.page.html',
  styleUrls: ['./task-form.page.scss'],
  standalone: false
})
export class TaskFormPage implements OnInit {
  task = { titulo: '', descripcion: '', estado: 'pendiente' };
  taskId: number | null = null;
  isLoading = false;
  tasks: any[] = [];

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.taskId = this.route.snapshot.params['id'];
    if (this.taskId) {
      //console.log('ID de tarea:', this.taskId);
      this.isLoading = true;
      this.taskService.getTaskById(this.taskId).subscribe(response => {
        if (response.estado) {
          //console.log('Respuesta del servidor:', response);
          this.task = response.tarea;
        }
        this.isLoading = false;
      });
    }
  }

  async saveTask() {
    this.isLoading = true;
    if (this.taskId) {
      this.taskService.updateTask({ id: this.taskId, ...this.task }).subscribe(async () => {
        await this.presentToast('Tarea actualizada correctamente');
        this.isLoading = false;
        this.navCtrl.navigateBack('/task-list', { queryParams: { reload: true } });
      });
    } else {
      this.taskService.addTask(this.task).subscribe(async () => {
        await this.presentToast('Tarea creada correctamente');
        this.isLoading = false;
        this.navCtrl.navigateBack('/task-list', { queryParams: { reload: true } });
      });
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }


}