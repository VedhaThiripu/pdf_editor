import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './shared/base/notfound/notfound.component';
import { UndermaintenanceComponent } from './shared/base/undermaintenance/undermaintenance.component';
import { InitialstartComponent } from './shared/initialstart/initialstart.component';
import { ViewComponent } from './view/view.component';
import { AddlogdetailsComponent } from './view/base/addlogdetails/addlogdetails.component';
import { BaseComponent } from './view/base/base.component';
import { ViewlogdetailsComponent } from './view/base/viewlogdetails/viewlogdetails.component';
import { LoguploadstatusComponent } from './view/base/loguploadstatus/loguploadstatus.component';
import { CronstatusComponent } from './view/base/cronstatus/cronstatus.component';
import { LoginComponent } from './shared/login/login.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: InitialstartComponent
  // },
  {
    path : '',
    component : LoginComponent
  },
  {
    path: '',
    component: ViewComponent,
    children: [
      {
        path: '',
        component: AddlogdetailsComponent,
      },
      {
        path: 'home',
        component: BaseComponent
      },
      {
        path: 'add',
        component: AddlogdetailsComponent,
      },
      {
        path: 'cron',
        component: LoguploadstatusComponent,
      },
      {
        path: 'report',
        component: ViewlogdetailsComponent,
      },
      {
        path: 'cronstatus',
        component: CronstatusComponent
      }
    ],
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
  {
    path: 'notfound',
    component: NotfoundComponent,
  },
  {
    path: 'undermaintenance',
    component: UndermaintenanceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
