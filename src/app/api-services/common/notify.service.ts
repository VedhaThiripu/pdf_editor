import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  config : any

  constructor(private toastr: ToastrService) {
    this.config = {
      toastClass : 'mt-5 ngx-toastr'
    }
   }

  success(message,title=""){
    this.toastr.success(message,"",this.config);
  }
  error(message?,title=""){
      this.toastr.error(message,"",this.config);
  }

  info(message,title=""){
    this.toastr.info(message,"",this.config)
  }

  warning(message,title=""){
    this.toastr.warning(message,"",this.config)
  }
}
