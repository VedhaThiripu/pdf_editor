import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() closeAlert : Subject<any>
  @ViewChild('alert') alert : NgbModal;
  @Output('alertActions') alertActions : EventEmitter<any> = new EventEmitter();
  @Input('header') header :  string;
  @Input('questions') questions :  string;

  constructor(
    config: NgbModalConfig,
    public modalService: NgbModal,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.closeAlert.subscribe(data => {
      if(data?.open){
        this.modalService.open(this.alert,{size:'lg'})
      }else if(data?.close){
        this.modalService.dismissAll()
      }
    })
  }

  ngAfterViewInit(): void { 
    //this.modalService.open(this.alert,{size:'sm'})
  }

  close(){
    this.onConfirmation('CLOSE')
    this.modalService.dismissAll();
  }

  onConfirmation(value){
    this.alertActions.emit({'result':value});
  }
}
