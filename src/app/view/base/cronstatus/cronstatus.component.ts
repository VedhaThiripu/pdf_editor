import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { SmartapiService } from 'src/app/api-services/smartapi.service';

@Component({
  selector: 'app-cronstatus',
  templateUrl: './cronstatus.component.html',
  styleUrls: ['./cronstatus.component.css']
})
export class CronstatusComponent {
  @ViewChild('createlog') createlog: any
  resetTable: Subject<boolean> = new Subject<boolean>();
  tableData: any = []
  tableConfig: any

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
    this.createTable()
  }

  createTable() {
    this.tableConfig = {
      "tableconfig": {
        "name": "VendorsDetails", "title": "Vendors Details", "download": true, "search": true, "showentries": true, "currentpage": false,
        "refresh": true, "showingentries": true, "sorting": true, "pagination": true, "add": false, "colsearch": false, "excelcond": true, "settings": true
      },
      "config": [
        { "type": "db", "title": "Server name", "tbody": "server_name", "width": "10", "filter": true },
        { "type": "db", "title": "Log Type", "tbody": "log_type", "width": "10", "filter": true },
        { "type": "db", "title": "Log Path", "tbody": "log_path", "width": "10", "filter": true },
        { "type": "db", "title": "Start Time", "tbody": "start_time", "width": "10", "filter": true },
        { "type": "db", "title": "End Time", "tbody": "end_time", "width": "10", "filter": true },
        { "type": "db", "title": "Message", "tbody": "msg", "width": "10", "filter": true },
        {
          "type": "badge", "title": "Status", "tbody": "status", "width": "10", "filter": true, "cond": [
            { "comp": "1", "color": "green" },
            { "comp": "2", "color": "red" },
          ]
        },
      ],
    }
    this.getTableData();
  }
  getTableData() {
    this.api.smartGet('CRON_STATUS').subscribe((res: any) => {
      console.log(res)
      this.tableData = res;
    });
  }

  onbodyActionClick(type) {

  }

  headerActionClick(type) {

  }

  createNewLog() {
    this.api.smartGet('CRON_UPDATE').subscribe((res: any) => {
      this.getTableData();
      // this.tableData=res;
    });
    // this.modalService.open(this.createlog,{size:"lg"})
  }

  getPageChange(page) {
  }
}
