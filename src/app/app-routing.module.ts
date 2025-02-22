import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'task-list',
    loadChildren: () => import('./pages/task-list/task-list.module').then( m => m.TaskListPageModule)
  },
  {
    path: 'task-form',
    loadChildren: () => import('./pages/task-form/task-form.module').then( m => m.TaskFormPageModule)
  },
  { 
    path: 'task-form/:id', 
    loadChildren: () => import('./pages/task-form/task-form.module').then(m => m.TaskFormPageModule) 
  },
  {
    path: 'task-detail/:id',
    loadChildren: () => import('./pages/task-detail/task-detail.module').then( m => m.TaskDetailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
