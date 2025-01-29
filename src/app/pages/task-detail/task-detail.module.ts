import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { TaskDetailPage } from './task-detail.page';

const routes: Routes = [  // ✅ Definimos correctamente la constante `routes`
  { path: '', component: TaskDetailPage }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)  // ✅ Aquí usamos `routes`, no `Routes`
  ],
  declarations: [TaskDetailPage]
})
export class TaskDetailPageModule {}
