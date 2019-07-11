import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BinnacleService } from './binnacle.service';
import { Binnacle } from '../commons/models/binnacle.interface';

@Component({
    selector: 'app-binnacle',
    templateUrl: './binnacle.component.html',
    styleUrls: ['./binnacle.component.scss'],
    providers: [
      BinnacleService
    ]
})

export class BinnacleComponent implements OnInit {

  public binnacleForm: FormGroup;
  public binnacles: Binnacle[];

  constructor(private fb: FormBuilder,
              private binnacleService: BinnacleService,
              private toastrServ: ToastrService) {

    this.binnacles = [];
  }

  ngOnInit() {

    this.initForm();
  }

  public async searchByCause() {

    this.binnacleForm.disable();
    this.binnacles = [];
    try {

      this.binnacles = await this.binnacleService.getBinnaclesByCause(this.binnacleForm.get('cause').value);
    } catch (err) {

      this.toastrServ.error(`Error consultand la bitácora`, 'Error');
    } finally {
      this.binnacleForm.reset();
      this.binnacleForm.enable();
    }
  }

  public async searchByFailure() {

    this.binnacleForm.disable();
    this.binnacles = [];
    try {

      this.binnacles = await this.binnacleService.getBinnaclesByFailure(this.binnacleForm.get('failure').value);
    } catch (err) {

      this.toastrServ.error(`Error consultand la bitácora`, 'Error');
    } finally {
      this.binnacleForm.reset();
      this.binnacleForm.enable();
    }
  }

  private initForm() {

    this.binnacleForm = this.fb.group({
      cause: new FormControl('' ),
      failure: new FormControl('' )
    });
  }

}
