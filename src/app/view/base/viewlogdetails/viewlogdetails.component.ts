import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { DateAdapter } from 'chart.js';
import { Subject } from 'rxjs';
import { CommonService } from 'src/app/api-services/common/common.service';
import { SmartapiService } from 'src/app/api-services/smartapi.service';
import { REPORTS } from 'src/app/helpers/Reports';

@Component({
  selector: 'app-viewlogdetails',
  templateUrl: './viewlogdetails.component.html',
  styleUrls: ['./viewlogdetails.component.css'],
})
export class ViewlogdetailsComponent {
  @Output('backAction') backAction: EventEmitter<any> = new EventEmitter();
  @Input("data") data: any;
  @Input('title') title = "Log Reports"
  @Input('source') source = "REPORTS"
  resetTable: Subject<any> = new Subject<any>();
  tableData: any = []
  tableConfig: any = REPORTS['AUDIT']
  formConfig: any = []
  cardConfig: any = []
  reportData: any = []
  sdate: any;
  edate: any;
  categoryOption: any = []
  dashboardData: any = []
  formDataValue: any;
  reportTypes: any = []
  formData: any = []
  start: number = 1;
  limit: number = 100;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private route: Router,
    private api: SmartapiService,
    private commonServices: CommonService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.createForm();
    this.createCard();
    this.getCategory();
  }

  createCard() {
    this.cardConfig = []
    if (this.dashboardData) {
      for (let ddate of this.dashboardData) {
        this.cardConfig.push({
          title: ddate.type,
          icon: "fas fa-hourglass-end",
          data: ddate.totcount,
          color: this.getRandomColor(),
          width: 2
        })
      }
    }
  }

  getRandomColor() {
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 10);
    }
    return color;
  }

  getDates(type) {
    let d = new Date();
    if (type == "STRATDATE") {
      return (d.getDate() < 10 ? "0" + d.getDate() : d.getDate()) + "-" + (d.getMonth() < 10 ? "0" + d.getMonth() : d.getMonth()) + "-" + (d.getFullYear() - 3)

    } else if ("ENDDATE") {
      return (d.getDate() < 10 ? "0" + d.getDate() : d.getDate()) + "-" + (d.getMonth() < 10 ? "0" + d.getMonth() : d.getMonth()) + "-" + d.getFullYear()

    }
  }
  getLogDetails(data?) {
    let sDate = this.formDataValue?.sdate ? this.commonServices.convertDateFormat(this.formDataValue?.sdate) : this.getDates("STRATDATE");
    let eDate = this.formDataValue?.edate ? this.commonServices.convertDateFormat(this.formDataValue?.edate) : this.getDates("ENDDATE");
    let apiRoutingURL
    apiRoutingURL = this.source == 'REPORTS' ? 'LogShow/getDataWithType' : "LogShow/getData/" + this.data?.ID
    let ssdate = this.formDataValue?.sdate?.year + '-' + this.formDataValue?.sdate?.month + '-' + this.formDataValue?.sdate?.day
    let eedate = this.formDataValue?.edate?.year + '-' + this.formDataValue?.edate?.month + '-' + this.formDataValue?.edate?.day
    let payload = {
      "search_type": data?.search_type ? data?.search_type : 'DATE',
      "start": this.start ? this.start : 1,
      "limit": this.limit ? this.limit : 10000,
      "sdate": sDate,
      "edate": eDate,

    }
    if (this.source == 'REPORTS') {
      payload['log_type'] = data?.log_type ? data?.log_type : 'AUDIT'
    }

    this.tableConfig = data?.log_type ? REPORTS[data?.log_type] : REPORTS['AUDIT']
    this.api.smartPost(apiRoutingURL, payload, true).subscribe((res: any) => {
      if (res) {
        this.reportData = res?.data
        this.tableData = res?.data
        this.resetTable.next({ data: res?.data, totalCount: res?.total_count })
        this.dashboardData = res?.group_ccount
        this.createCard()
      }
    })
  }

  createForm(autofetch: boolean = false) {
    this.formConfig = [
      // {
      //   type: 'select', name: 'search_type', label: 'Select Type', validations: { 'required': true }, width: 2, default: "DATE", options: [
      //     { key: 'DATE', value: 'Date' },
      //     { key: 'DATES', value: 'Dates' },
      //   ]
      // },
      { type: 'date', name: 'sdate', label: 'Start Date', width: 2 },
      { type: 'date', name: 'edate', label: 'End Date', width: 2 },
      { type: 'button', name: 'filed2', label: 'Search', class: "", width: 2 },
    ]
    if (this.source == 'REPORTS') {
      let category = {
        type: 'select', name: 'category', label: 'Select Type', width: 2, options: this.reportTypes
      }
      let logType = { type: 'select', name: 'log_type', label: 'Select Log Type ', validations: { 'required': true }, width: 2, default: this.formDataValue?.log_type ? this.formDataValue?.log_type : '', options: this.categoryOption }
      this.formConfig.unshift(category)
      this.formConfig.unshift(logType)
    }
    this.formDataValue = { log_type: this.formDataValue?.log_type ? this.formDataValue?.log_type : this.categoryOption[0]?.key, category: autofetch ? this.reportTypes[0]?.key : this.formDataValue?.category ? this.formDataValue?.category : this.reportTypes[0]?.key, search_type: "DATE", sdate: this.sdate, edate: this.edate }
    if (autofetch && this.source === "REPORTS") {
      // this.getOnViewMoreAction()
    } else if (!autofetch && this.source != "REPORTS") {
      this.getLogDetails()
    }
  }

  onViewMoreAction(data) {
    this.formDataValue['category'] = data
    this.getOnViewMoreAction();
  }

  onbodyActionClick(type) {

  }

  headerActionClick(type) {

  }

  getSmartFormData(data) {
    this.formDataValue = data
    if (this.source == 'REPORTS') {
      this.getOnViewMoreAction()
    } else {
      this.getLogDetails()
    }
  }

  goBack() {
    this.backAction.emit()
  }

  getCategory() {
    if (this.source == 'REPORTS') {
      this.api.smartGet("LIST_CATEGORY").subscribe((res: any) => {
        if (res) {
          this.categoryOption = res;
          this.createForm();
          // this.getReportTypes(this.categoryOption[0].key)
        }
      });
    }
  }

  getReportTypes(type) {
    if (this.source == 'REPORTS') {
      let payload = {
        "log_type": type
      }
      this.api.smartPost("LIST_CATEGORY_OPT", payload).subscribe((res: any) => {
        if (res) {
          this.reportTypes = res;
          this.createForm(true);
        }
      });
    }
  }

  getPageChange(page) {
    if (page) {
      this.start = page?.start
      this.limit = page?.entries
    }
    if (this.source === "REPORTS") {
      this.getOnViewMoreAction()
    } else if (this.source != "REPORTS") {
      this.getLogDetails()
    }
  }

  getOnViewMoreAction(data?) {
    let form = this.formDataValue
    let payload;
    let sDate = form?.sdate ? this.commonServices.convertDateFormat(form?.sdate) : this.getDates("STRATDATE");
    let eDate = form?.edate ? this.commonServices.convertDateFormat(form?.edate) : this.getDates("ENDDATE");
    if(this.formDataValue.sdate!=null){
      payload = {
        log_type: this.formDataValue.log_type,
        search_type: 'DATE_TYPE',
        type: this.formDataValue?.category ? this.formDataValue?.category : 'All',
        start: this.start ? this.start : 1,
        limit: this.limit ? this.limit : 10000,
        sdate: sDate,
        edate: eDate
      }
    }else{
      payload = {
        log_type: this.formDataValue.log_type,
        search_type: 'DATE_TYPE',
        type: this.formDataValue?.category ? this.formDataValue?.category : 'All',
        start: this.start ? this.start : 1,
        limit: this.limit ? this.limit : 10000,
        // sdate: sDate,
        // edate: eDate
      }
    }
    
    let apiRoutingURL
    apiRoutingURL = this.source == 'REPORTS' ? 'LogShow/getDataWithType' : "LogShow/getData/" + this.data?.ID
    this.tableConfig = this.formDataValue?.log_type ? REPORTS[this.formDataValue?.log_type] : REPORTS['AUDIT']
    this.api.smartPost(apiRoutingURL, payload, true).subscribe((res: any) => {
      if (res) {
        this.reportData = res?.data
        this.tableData = res?.data
        this.resetTable.next({ data: res?.data, totalCount: res?.total_count })
        this.dashboardData = res?.group_ccount
        this.createCard()
      }
    });

  }

  getSmartFormOnChange(data) {
    this.formDataValue = data?.data
    if (this.source == 'REPORTS') {
      if (data) {
        if (data?.onchange == 'log_type') {
          this.getReportTypes(data?.data?.log_type)
        } else if (data?.onchange == 'category') {
          // this.getOnViewMoreAction()
        }
      }
    }
  }
}
