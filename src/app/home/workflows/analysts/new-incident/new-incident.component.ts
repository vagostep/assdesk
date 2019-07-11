import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NewIncidentService } from './new-incident.service';
import { Asset } from 'app/shared/models/asset.interface';
import { User } from 'app/shared/models/user.interface';
import { Parameter } from 'app/shared/models/parameter.interface';
import { Analyst } from 'app/shared/models/analyst.interface';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IncidentsByAssetsComponent } from 'app/shared/enums/modals/incidents-by-asset.component';

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
  public user: User;
  public channels: Parameter[];
  public analysts: Analyst[];

  constructor(private fb: FormBuilder,
              private newIncidentService: NewIncidentService,
              private toastrServ: ToastrService,
              private router: Router,
              private modalService: NgbModal) { 

    this.user = { customer: {}, assets: new Array<Asset>()} as User;
    this.channels = [];
  }

  ngOnInit() {

    this.initForm();
    this.getChannels();
  }

  public checkMassive() {

    if (this.newIncidentForm.get('massive').value) {

      this.newIncidentForm.get('priority').setValue('1');
      this.newIncidentForm.get('priority').disable();
    } else {

      this.newIncidentForm.get('priority').enable();
    }
  }

  public async getIncidentsByActive() {

    if (this.newIncidentForm.get('asset').valid) {

      this.newIncidentForm.disable();
      try {

        const incidents = await this.newIncidentService.getIncidentsByAsset(this.newIncidentForm.get('asset').value);
        const modalRef = this.modalService.open(IncidentsByAssetsComponent);
        modalRef.componentInstance.incidents = incidents;
      } catch(err) {

        console.error(err);
      } finally {

        this.newIncidentForm.enable();
      }
    }
  }
  public async saveIncident() {

    this.newIncidentForm.disable();
    try {

      const resp = await this.newIncidentService.saveIndicent(
        this.newIncidentForm.get('failure').value,
        this.newIncidentForm.get('state').value,
        this.newIncidentForm.get('channel').value,
        this.newIncidentForm.get('asset').value,
        this.newIncidentForm.get('analyst').value,
        this.newIncidentForm.get('priority').value,
        this.newIncidentForm.get('cause').value,
        this.newIncidentForm.get('user').value,
        this.newIncidentForm.get('solution').value,
        this.newIncidentForm.get('massive').value
      );

      this.toastrServ.success(`Incidencia registrada con el número ${resp.incidentNumber}`, 'Registro exitoso');
      this.newIncidentForm.reset();
      this.newIncidentForm.get('state').setValue('');
      this.newIncidentForm.get('level').setValue('');
      this.newIncidentForm.get('analyst').setValue('');
      this.newIncidentForm.get('channel').setValue('1');
      this.newIncidentForm.get('priority').setValue('');
      this.newIncidentForm.get('asset').setValue('');
      this.newIncidentForm.get('analyst').disable();
      this.user = { customer: {}, assets: new Array<Asset>()} as User;
    } catch (e) {

    } finally {

      this.newIncidentForm.enable();
    }
  }
  public getAsset() {

    if (this.newIncidentForm.get('asset').valid) {

      return this.user.assets.find((asset) => asset.code === this.newIncidentForm.get('asset').value);
    }

    return {} as Asset;
  }

  public onLevelChange() {

    if (this.newIncidentForm.get('level').valid) {

      this.getAnalystByLevel();
    } else {

      this.newIncidentForm.get('analyst').disable();
    }
  }

  public onStateChange() {

    this.newIncidentForm.removeControl('cause');
    this.newIncidentForm.removeControl('solution');
    
    if (this.newIncidentForm.get('state').value === "CERRADA") {

      this.newIncidentForm.addControl('cause', new FormControl('', Validators.required));
      this.newIncidentForm.addControl('solution', new FormControl('', Validators.required));
    } else {

      this.newIncidentForm.addControl('cause', new FormControl(''));
      this.newIncidentForm.addControl('solution', new FormControl(''));

      this.newIncidentForm.get('cause').setValue('');
      this.newIncidentForm.get('solution').setValue('');
    }
  }

  public async searchUser() {

    console.log('Search User', this.newIncidentForm.get('user').value);

    if (this.newIncidentForm.get('user').valid) {
      this.newIncidentForm.disable();
      try {

        this.user = await this.newIncidentService.getCustomerFull(this.newIncidentForm.get('user').value);
        console.log('searchUser', this.user);
        if (!this.user.customer.username) {

          this.toastrServ.error(`No se encontró el usuario ${this.newIncidentForm.get('user').value}`, 'No existe usuario');
        } 
      } catch {

      } finally {

        this.newIncidentForm.enable();

        if (this.newIncidentForm.get('level').invalid) {

          this.newIncidentForm.get('analyst').disable();
        }
      }
    }
  }

  private async getAnalystByLevel() {

    this.newIncidentForm.disable();
    try {

      this.analysts = await this.newIncidentService.getAnalystsByLevel(this.newIncidentForm.get('level').value);
      this.newIncidentForm.enable();
      this.newIncidentForm.get('analyst').enable();
    } catch (err) {

      this.toastrServ.error(`Error obteniendo analystas`, 'No se encontraron analystas');
      this.newIncidentForm.enable();
      this.newIncidentForm.get('analyst').disable();
    } finally {
      
    }
  }

  private async getChannels() {

    this.newIncidentForm.disable();
    try {

      this.channels = await this.newIncidentService.getChannels();

      const channel = this.channels.find((channel) => channel.name === "TELEFONO");
      this.newIncidentForm.get('channel').setValue(channel ? channel.id : '');
    } catch (err) {

      this.toastrServ.error(`Error obteniendo canales`, 'No existen canales');
    } finally {
      this.newIncidentForm.enable();
      this.newIncidentForm.get('analyst').disable();
      this.newIncidentForm.get('asset').disable();
    }
  }

  private initForm() {

    this.newIncidentForm = this.fb.group({
      asset: new FormControl('', Validators.required ),
      failure: new FormControl('', Validators.required ),
      user: new FormControl('', Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(7)]) ),
      channel: new FormControl('', Validators.required ),
      priority: new FormControl('', Validators.required ),
      level: new FormControl('', Validators.required ),
      analyst: new FormControl('', Validators.required ),
      state: new FormControl('', Validators.required ),
      cause: new FormControl(''),
      solution: new FormControl(''),
      massive: new FormControl('')
    });
  }

}
