import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NewIncidentService } from './new-incident.service';
import { Asset } from 'app/shared/models/asset.interface';

@Component({
    selector: 'app-new-incident',
    templateUrl: './new-incident.component.html',
    styleUrls: ['./new-incident.component.scss'],
    providers: [
      NewIncidentService
    ]
})

export class NewIncidentComponent implements OnInit {

  public newIncidentForm: FormGroup;
  public assets: Asset[];

  constructor(private fb: FormBuilder,
              private newIncidentService: NewIncidentService,
              private toastrServ: ToastrService) { 

    this.assets = [];
  }

  ngOnInit() {

    this.initForm();

    this.getAssets();
  }

  public async saveIncident() {

    this.newIncidentForm.disable();
    try {

      const resp = await this.newIncidentService.saveIndicent(
        this.newIncidentForm.get('failure').value,
        this.newIncidentForm.get('asset').value
      );

      this.toastrServ.success(`Incidencia registrada con el número ${resp.incidentNumber}`, 'Registro exitoso');
      this.newIncidentForm.reset();
    } catch (e) {

    } finally {

      this.newIncidentForm.enable();
    }
  }

  private async getAssets() {

    this.newIncidentForm.disable();
    try {

      this.assets = await this.newIncidentService.getAssets();
    } catch {

    } finally {

      this.newIncidentForm.enable();
    }
  }

  private initForm() {

    this.newIncidentForm = this.fb.group({
      asset: new FormControl('', Validators.required ),
      failure: new FormControl('', Validators.required )
    });
  }

}
