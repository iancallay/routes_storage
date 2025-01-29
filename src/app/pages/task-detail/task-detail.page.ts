import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import {  NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
  standalone: false
})
export class TaskDetailPage implements OnInit {
  task: any = null;
  taskId: number | null = null;
  isLoading = false;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.taskId = this.route.snapshot.paramMap.get('id') ? Number(this.route.snapshot.paramMap.get('id')) : 1;
    if (this.taskId) {
      this.isLoading = true;
      this.taskService.getTaskById(this.taskId).subscribe(response => {
        if (response.estado) {
          this.task = response.tarea;
        }
        this.isLoading = false;
      });
    }
  }

  editTask() {
    if (this.taskId) {
      this.navCtrl.navigateForward(`/task-form/${this.taskId}`);
    }
  }

  deleteTask() {
    if (this.taskId) {
      this.isLoading = true;
      this.taskService.deleteTask(this.taskId).subscribe(async response => {
        if (response.estado) {
          await this.presentToast('Tarea eliminada correctamente');
          this.navCtrl.navigateBack('/task-list');
        }
        this.isLoading = false;
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