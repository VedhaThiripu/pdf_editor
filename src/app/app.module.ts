import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewModule } from './view/view.module';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SmartpasswordvisibleDirective } from './shared/core/directives/smartpasswordvisible.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './api-services/core/interceptor.service';
import { SmartapiService } from './api-services/smartapi.service';
import { ApiEndpointsService } from './api-services/core/api-endpoints.service';
import { SpinnerInterceptorService } from './api-services/core/spinner.interceptor.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { InitialstartComponent } from './shared/initialstart/initialstart.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SmartServerTableComponent } from './shared/core/components/smart-server-table/smart-server-table.component';
import { LoginComponent } from './shared/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    SmartpasswordvisibleDirective,
    InitialstartComponent,
    LoginComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ViewModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatTabsModule,
    NgbTooltipModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptorService, multi: true },
    SmartapiService, ApiEndpointsService],
  bootstrap: [AppComponent],
})
export class AppModule { }
