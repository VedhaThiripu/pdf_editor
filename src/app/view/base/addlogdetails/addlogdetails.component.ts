import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { NotifyService } from 'src/app/api-services/common/notify.service';
import { SmartapiService } from 'src/app/api-services/smartapi.service';

@Component({
  selector: 'app-addlogdetails',
  templateUrl: './addlogdetails.component.html',
  styleUrls: ['./addlogdetails.component.css']
})
export class AddlogdetailsComponent implements OnInit {
  @ViewChild('createlog') createlog: any
  resetTable: Subject<boolean> = new Subject<boolean>();
  tableData: any = []
  tableConfig: any;
  isLogDetailsEnable: boolean = false
  alertModal: Subject<any> = new Subject<any>();
  singleRowData: any;
  childData: any;
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
        { "type": "db", "title": "SNO", "tbody": "position", "width": "10", "filter": true, "export": true },
        { "type": "db", "title": "Category", "tbody": "category", "width": "10", "filter": true, "export": true },
        { "type": "db", "title": "Title", "tbody": "title", "width": "10", "filter": true, "export": true },
        { "type": "date", "customFormat": true, "format": 'dd-MM-yyyy ', "title": "Uploaded Date", "tbody": "created_time", "width": "10", "filter": true, "export": true },
        {
          "type": "btngroup", "title": "Actions", "width": "20", "btnconfig": [
            { "type": "icon", "action": "VIEW", "icon": "fa fa-eye", "title": "View", "color": "green", "returnData": "ID", "returnData1": "category" },
            { "type": "icon", "action": "DELETE", "icon": "fa fa-trash", "title": "Delete", "color": "red", "returnData": "ID" },
          ]
        }
      ],
    }
    this.getTableData();
  }
  getTableData() {
    this.tableData = [];
    let payload = {
    }
    this.api.smartGet('LIST_LOG').subscribe((res: any) => {
      let position = 1
      res?.forEach((element: any) => {
        element = {
          ...element,
          position: position,
        };
        this.tableData?.push(element);
        position = position + 1;
      })
      this.resetTable.next(true)

    });
  }
  onbodyActionClick(type) {
    if (type) {
      this.singleRowData = type.rowData
      if (type.Action == 'VIEW') {
        this.childData = type.rowData;
        this.isLogDetailsEnable = true;
      } else if (type.Action == 'DELETE') {
        this.alertModal.next({ open: true });
        // this.deleteLogDetails(type.returnData)
      }
    }
  }
  toggleStatus(event: any) {
    let payload = {
      status: this.singleRowData.status == 1 ? 2 : 1
    }
    if (event.result == 'YES') {
      let urlRouting = 'LogAdd/delete_one/' + this.singleRowData.ID
      this.api.smartDelete(urlRouting, true).subscribe((res: any) => {
        this.notify.success('Status Changed Successfully');
        this.alertModal.next({ close: true });
        this.getTableData();
      });
    } else {
      this.alertModal.next({ close: true });
    }
  }
  deleteLogDetails(data) {
    let urlRouting = 'LogAdd/delete_one/' + data
    this.api.smartDelete(urlRouting, true).subscribe((res: any) => {
      this.notify.success("Log Deleted Successfully")
      this.getTableData();
    })
  }

  headerActionClick(type) {

  }

  createNewLog() {
    this.modalService.open(this.createlog, { size: "lg" })
  }

  getAddLogActions() {
    this.getTableData();
    this.modalService.dismissAll()
  }
}
