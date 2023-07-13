import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SmartFormComponent } from '../shared/core/components/smart-form/smart-form.component';
import { SmartValidationComponent } from '../shared/core/components/smart-validation/smart-validation.component';
import { SmartTableComponent } from '../shared/core/components/smart-table/smart-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SmarterrormessageDirective } from '../shared/core/directives/smarterrormessage.directive';
import { SmartmandatoryDirective } from '../shared/core/directives/smartmandatory.directive';
import { SmartuppercaseDirective } from '../shared/core/directives/smartuppercase.directive';
import { SmartallowonlyDirective } from '../shared/core/directives/smartallowonly.directive';
import { SmartinputborderDirective } from '../shared/core/directives/smartinputborder.directive';
import { SmartChartComponent } from '../shared/core/components/smart-chart/smart-chart.component';
import { SmartDashboardCardsComponent } from '../shared/core/components/smart-dashboard-cards/smart-dashboard-cards.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SmarttableshortDirective } from '../shared/core/directives/smarttableshort.directive';
import { NgbDateParserFormatter, NgbDropdownModule, NgbModalConfig, NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SmartautoheightDirective } from '../shared/core/directives/smartautoheight.directive';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CustomdateformatService } from '../api-services/common/customdateformat.service';
import { ImageCropperModule } from 'ngx-image-cropper';
import { WebcamModule } from 'ngx-webcam';
import { UploadComponent } from '../shared/upload/upload.component';
import { CameraComponent } from '../shared/upload/camera/camera.component';
import { ImageCropperComponent } from '../shared/upload/image-cropper/image-cropper.component';
import { AlertComponent } from '../shared/alert/alert.component';
import { ViewlogdetailsComponent } from './base/viewlogdetails/viewlogdetails.component';
import { LoguploadstatusComponent } from './base/loguploadstatus/loguploadstatus.component';
import { ViewComponent } from './view.component';
import { RouterModule } from '@angular/router';
import { TopheaderComponent } from '../shared/base/topheader/topheader.component';
import { NotfoundComponent } from '../shared/base/notfound/notfound.component';
import { FooterComponent } from '../shared/base/footer/footer.component';
import { BaseComponent } from './base/base.component';
import { AddlogdetailsComponent } from './base/addlogdetails/addlogdetails.component';
import { NewlogformComponent } from './base/addlogdetails/newlogform/newlogform.component';
import { SidenavComponent } from '../shared/base/sidenav/sidenav.component';
import { CronstatusComponent } from './base/cronstatus/cronstatus.component';
import { SmartServerTableComponent } from '../shared/core/components/smart-server-table/smart-server-table.component';

@NgModule({
  declarations: [
    ViewComponent,
    SmartFormComponent,
    SmartValidationComponent,
    SmartTableComponent,
    SmartChartComponent,
    SmartDashboardCardsComponent,
    UploadComponent,
    CameraComponent,
    ImageCropperComponent,
    SmarterrormessageDirective,
    SmartmandatoryDirective,
    SmartuppercaseDirective,
    SmartallowonlyDirective,
    SmartinputborderDirective,
    SmarttableshortDirective,
    SmartautoheightDirective,
    AlertComponent,
    FooterComponent,
    NotfoundComponent,
    AddlogdetailsComponent,
    ViewlogdetailsComponent,
    LoguploadstatusComponent,
    NewlogformComponent,
    TopheaderComponent,
    BaseComponent,
    SidenavComponent,
    CronstatusComponent,
    SmartServerTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    RouterModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ImageCropperModule,
    WebcamModule,
    NgbDropdownModule,
    ToastrModule.forRoot(),
    NgbTooltipModule,
    DatePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe, NgbModalConfig, { provide: NgbDateParserFormatter, useClass: CustomdateformatService }],
  exports: [SmartFormComponent, SmartValidationComponent, SmartTableComponent, SmarterrormessageDirective, SmartmandatoryDirective]
})
export class ViewModule { }
