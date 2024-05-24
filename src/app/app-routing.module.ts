import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { LoginComponent } from './component/login/login.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { AuthGuard } from './guards/auth.guard';
import { QuestionListsComponent } from './component/question-lists/question-lists.component';
import { QuestionPageComponent } from './component/question-page/question-page.component';
import { CompleteQuestionPageComponent } from './component/complete-question-page/complete-question-page.component';

const routes: Routes = [
  { 
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
  {
    path: 'web',
    component: HomePageComponent,
    children: [
      { 
        path: 'question-list', 
        component: QuestionListsComponent 
      },
      {
        path: 'question-page',
        component: QuestionPageComponent
      },
      {
        path: 'complete-question-page',
        component: CompleteQuestionPageComponent
      }
    ],
    canActivate: [AuthGuard] 
  },
  { path: 'web', loadChildren: () => import('./web/web.module').then(m => m.WebModule) },
  { 
    path: '**', 
    redirectTo: 'page-not-found', 
    pathMatch: 'full' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
