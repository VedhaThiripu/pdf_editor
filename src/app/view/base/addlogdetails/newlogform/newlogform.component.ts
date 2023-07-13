import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { SmartapiService } from 'src/app/api-services/smartapi.service';

@Component({
  selector: 'app-newlogform',
  templateUrl: './newlogform.component.html',
  styleUrls: ['./newlogform.component.css']
})
export class NewlogformComponent {
  @Output('AddLogActions') AddLogActions: EventEmitter<any> = new EventEmitter();
  @Input('source') source: any
  categoryOption: any = [];
  formConfig: any = []
  status: any;
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private route: Router,
    private api: SmartapiService,

  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit(): void {
    if (this.source == 'CRON') {
      this.status = [
        { key: 1, value: 'Active' },
        { key: 2, value: 'Inactive' }
      ]
    }
    this.getCategory();
    this.createForm();

  }
  createForm() {

    if (this.source != 'CRON') {
      this.formConfig = [
        { type: 'text', name: 'title', label: 'Title', validations: { 'required': true }, width: 6 },
        { type: 'select', name: 'category', label: 'Category', validations: { 'required': true }, width: 6, options: this.categoryOption },
        { type: 'text', name: 'file_path', label: 'Upload File Path', validations: { 'required': true }, width: 12 },
        { type: 'button', name: 'filed2', label: 'Submit', class: "", width: 12 },
      ]
    }
    if (this.source == 'CRON') {
      this.formConfig = [
        { type: 'text', name: 'server_name', label: 'Server Name', validations: { 'required': true }, width: 4 },
        { type: 'select', name: 'log_type', label: 'Log Type', validations: { 'required': true }, width: 4, options: this.categoryOption },
        { type: 'select', name: 'status', label: 'Status', validations: { 'required': true }, width: 4, options: this.status },
        { type: 'text', name: 'log_path', label: 'Upload File Path', validations: { 'required': true }, width: 12 },
        { type: 'button', name: 'filed2', label: 'Submit', class: "", width: 12 },
      ]
    }
  }
  getSmartFormData(data) {
    let apiName;
    if (this.source == 'CRON') {
      apiName = 'CRON_ADD';
    } else {
      apiName = 'FILE_UPLOAD';
    }

    this.api.smartPost(apiName, data).subscribe((res: any) => {
      this.AddLogActions.emit()
    });

  }

  getCategory() {
    this.api.smartGet("LIST_CATEGORY").subscribe((res: any) => {
      if (res) {
        this.categoryOption = res;
        this.createForm();
      }
    });
  }
}
