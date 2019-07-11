import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NewUserService } from './new-user.service';
import { Router } from '@angular/router';
import { Parameter } from 'app/shared/models/parameter.interface';

@Component({
    selector: 'app-new-user',
    templateUrl: './new-user.component.html',
    styleUrls: ['./new-user.component.scss'],
    providers: [
      NewUserService
    ]
})

export class NewUserComponent implements OnInit {

  public newUserForm: FormGroup;
  public areas: Parameter[]

  constructor(private fb: FormBuilder,
              private newUserService: NewUserService,
              private toastrServ: ToastrService,
              private router: Router) { 

  }

  ngOnInit() {

    this.initForm();
    this.getAreas();
  }

  public async createUser() {

    this.newUserForm.disable();
    try {

      const username = await this.newUserService.createUser(
        this.newUserForm.get('names').value,
        this.newUserForm.get('lastNames').value,
        this.newUserForm.get('phone').value,
        this.newUserForm.get('email').value,
        this.newUserForm.get('area').value,
        this.newUserForm.get('floor').value,
        this.newUserForm.get('role').value
      )
      this.toastrServ.success(`Usuario creado con éxito con USERNAME: ${username}`, 'Creación exitosa');
      this.newUserForm.reset();
      
    } catch (e) {

    } finally {

      this.newUserForm.enable();
    }
  }

  public onRoleChange() {
    
    if (this.newUserForm.get('role').valid) {
      
      switch (this.newUserForm.get('role').value) {

        case 'USUARIO':
        case 'ANALISTA':

          this.newUserForm.removeControl('level');
          this.newUserForm.addControl('area', new FormControl('', Validators.required));
          this.newUserForm.addControl('floor', new FormControl('', Validators.required));
          break;

        case 'ADMINISTRADOR':

          this.newUserForm.removeControl('area');
          this.newUserForm.removeControl('floor');
          this.newUserForm.addControl('level', new FormControl('', Validators.required));
          break;
      }
      
    } 

  }

  public print() {


    console.log('names', this.newUserForm.get('names').valid);
    console.log('lastNames', this.newUserForm.get('lastNames').valid);
    console.log('phone', this.newUserForm.get('phone').valid);
    console.log('email', this.newUserForm.get('email').valid);
    console.log('role', this.newUserForm.get('role').valid);
    console.log('level', this.newUserForm.get('level').valid);
    console.log('area', this.newUserForm.get('area').valid);
    console.log('floor', this.newUserForm.get('floor').valid);
  }

  private async getAreas() {

    this.newUserForm.disable();
    try {

      this.areas = await this.newUserService.getAreas();
    } catch (err) {

      this.toastrServ.error(`Error obteniendo áreas`, 'Error');
    } finally {
      this.newUserForm.enable();
    }
  }

  private initForm() {

    this.newUserForm = this.fb.group({
      names: new FormControl('', Validators.required ),
      lastNames: new FormControl('', Validators.required ),
      email: new FormControl('', Validators.required ),
      phone: new FormControl('', Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(9)]) ),
      role: new FormControl('', Validators.required )
    });
  }

}
