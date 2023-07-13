import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { NotifyService } from 'src/app/api-services/common/notify.service';
import { SmartapiService } from 'src/app/api-services/smartapi.service';

@Component({
  selector: 'app-loguploadstatus',
  templateUrl: './loguploadstatus.component.html',
  styleUrls: ['./loguploadstatus.component.css']
})
export class LoguploadstatusComponent implements OnInit {
  @ViewChild('createlog') createlog: any
  resetTable: Subject<boolean> = new Subject<boolean>();
  tableData: any = []
  tableConfig: any;
  singleRowData: any;
  alertModal: Subject<any> = new Subject<any>();
  alertDeleteModal: Subject<any> = new Subject<any>();
  alertAction: string;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private route: Router,
    private api: SmartapiService,
    private notify: NotifyService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.createTable()
  }

  createTable() {
    this.tableConfig = {
      "tableconfig": {
        "name": "VendorsDetails", "title": "Vendors Details", "download": true, "search": true, "showentries": true, "currentpage": false,
        "refresh": true, "showingentries": true, "sorting": true, "pagination": true, "add": false, "colsearch": false, "excelcond": true, "settings": true
      },
      "config": [
        { "type": "date", "customFormat": true, "format": 'dd-MM-yyyy', "title": "Date", "tbody": "cdatetime", "width": "10", "filter": true },
        { "type": "db", "title": "Server Name", "tbody": "server_name", "width": "10", "filter": true },
        { "type": "db", "title": "Job Name", "tbody": "log_type", "width": "10", "filter": true },
        { "type": "db", "title": "Path", "tbody": "log_path", "width": "10", "filter": true },
        { "dhide": true, "type": "db", "title": "jobid", "tbody": "jobid", "width": "10", "filter": true },
        { "dhide": true, "type": "db", "title": "user", "tbody": "user", "width": "10", "filter": true },
        { "dhide": true, "type": "db", "title": "command", "tbody": "command", "width": "10", "filter": true },
        {
          "type": "badge", "title": "Status", "tbody": "status_desc", "width": "10", "filter": true, "cond": [
            { "comp": "Active", "color": "green" },
            { "comp": "In-Active", "color": "red" },
          ]
        },
        {
          "type": "btngroup", "title": "Actions", "width": "20", "btnconfig": [
            { "type": "icon", "action": "ACTIVE", "icon": "fa fa-toggle-on", "title": "View", "color": "green", 'cond': { 'comp': 'status_desc', 'value': ['Active'] } },
            { "type": "icon", "action": "INACTIVE", "icon": "fa fa-toggle-off", "title": "View", "color": "red", 'cond': { 'comp': 'status_desc', 'value': ['In-Active'] } },
            { "type": "icon", "action": "DELETE", "icon": "fa fa-trash", "title": "Cancel Application", "color": "red" },
          ]
        }
      ],
    }
    // dd-MM-yyyy hh:mm  a
    this.getTableData();
  }
  getTableData() {
    this.api.smartGet('CRON_LIST').subscribe((res: any) => {
      this.tableData = res;
    });
  }

  onbodyActionClick(type) {
    if (type) {
      this.singleRowData = type.rowData
      if (type.Action == 'ACTIVE' || type.Action == 'INACTIVE') {
        this.alertModal.next({ open: true });
      }
      if (type.Action == 'DELETE') {
        this.alertDeleteModal.next({ open: true });
      }
    }
  }
  toggleStatus(event: any) {
    let payload = {
      status: this.singleRowData.status == 1 ? 2 : 1
    }
    if (event.result == 'YES') {
      this.api.smartPost('CronFiles/update_data/' + this.singleRowData.ID, payload, true).subscribe((res: any) => {
        this.notify.success('Status Changed Successfully');
        this.alertModal.next({ close: true });
        this.getTableData();
      });
    } else {
      this.alertModal.next({ close: true });
    }
  }
  getDelete(event: any) {
    if (event.result == 'YES') {
      this.api.smartPost('CronFiles/delete_one/' + this.singleRowData.ID, {}, true).subscribe((res: any) => {
        this.notify.success('Log Deleted Successfully');
        this.alertDeleteModal.next({ close: true });
        this.getTableData();
      });

    } else {
      this.alertDeleteModal.next({ close: true });
    }

  }
  headerActionClick(type) {

  }

  createNewLog() {
    this.modalService.open(this.createlog, { size: "lg" })
  }

  getPageChange(page) {
  }
  getAddLogActions() {
    this.getTableData();
    this.modalService.dismissAll()
  }
}
