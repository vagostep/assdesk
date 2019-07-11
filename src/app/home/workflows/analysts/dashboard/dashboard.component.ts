import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from './dashboard.service';
import { NgbdSortableHeader } from '../../commons/directives/sortable-header.directive';
import * as Chartist from 'chartist';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [
      DashboardService
    ]
})

export class DashboardComponent implements OnInit {

  public filtersForm: FormGroup;
  public incidents: any[];
  public pageSize: number;
  public totalElements: number;
  public page: number;
  public sort: string;
  public attentionsData: any;
  public attentionsColumns: any;
  public incidentsData: any;
  public incidentsColumns: any;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private fb: FormBuilder,
              private dashboardService: DashboardService,
              private toastrServ: ToastrService,
              private router: Router) {

    this.sort = 'createdOn,desc';
    this.attentionsColumns = ['Tipo', 'Cantidad'];
    this.incidentsColumns = ['Incidencias', 'Cantidad'];
  }

  ngOnInit() {

    this.initForm();

    this.searchAttentions();
    this.searchOpen();

    this.searchIncidents();
  }

  public onPageChange(page: number) {

    console.log('onPageChange', page);

    if (!isNaN(page)) {
      this.searchIncidents(page);
    }
  }

  public onSort({column, direction}) {

    console.log('onSort', column, direction);

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.sort = `${column},${direction}`;
    this.searchIncidents(this.page);

    // sorting countries
    /*if (direction === '') {
      this.countries = COUNTRIES;
    } else {
      this.countries = [...COUNTRIES].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }*/
  }

  public async searchIncidentByNumber() {

    if (this.filtersForm.get('number').valid) {

      this.filtersForm.disable();
      this.incidents = [];

      try {
        const incident = await this.dashboardService.getIncidentByNumber(this.filtersForm.get('number').value);

        if (incident) {

          this.incidents.push(incident);
          this.pageSize = 10;
          this.totalElements = 1;
          this.page = 1;
          this.filtersForm.reset(); 
        } else {

          this.toastrServ.warning(`No se encontró la incidencia ${this.filtersForm.get('number').value}`, 'No existe incidencia');
          this.totalElements = 0;
          this.page = 1;
        }
      } catch (e) {

      } finally {

        this.filtersForm.enable();
      }
    }
  }

  public selectUser(user: any) {

    if (user.length > 0) {
      const index = user[0].row
      
      console.log('selectUser', index);
      if (index !== undefined) {

        this.filtersForm.get('user').setValue(this.incidentsData[index][0]);
        this.searchIncidents();
      }
    } else {

      this.filtersForm.get('user').setValue('');
    }

  }

  public async searchIncidentByUser() {

    if (this.filtersForm.get('user').valid) {

      this.searchIncidents();
    }
  }

  public rowClicked(incident) {

    console.log('rowClicked', incident);

    this.router.navigate([`home/analysts/edit-incident/${incident}`]);
  }

  private async searchAttentions() {

    this.filtersForm.disable();

    try {

      const resp = await this.dashboardService.getAttentions();
      console.log('que', resp);
      this.attentionsData = resp.map((val: any) => [val.status, val.incidentSize]);
      // this.createGraph('attentions', resp);
    } catch (e) {
      
    } finally {

      this.filtersForm.enable();
    }
  }

  private async searchOpen() {

    this.filtersForm.disable();

    try {

      const resp = await this.dashboardService.getOpen();
      this.incidentsData = resp.map((val: any) => [val.analystUsername, val.incidentSize]);
      console.log('graph', this.incidentsData);
      // this.createGraph('open', resp);
    } catch (e) {
      
    } finally {

      this.filtersForm.enable();
    }
  }

  private createGraph(id: string, data: any) {

    new Chartist.Pie(`.${id}`, {
      labels: data.map((val: any) => val.status),
      series: [
        ...data.map((val: any) => val.incidentSize)
      ]
    }, {
      labelInterpolationFnc: function(value) {
        return value;
      }
    })
  }

  private async searchIncidents(page: number = 1) {
    
    this.filtersForm.disable();
    this.incidents = [];

    try {
      
      const resp = await this.dashboardService.searchByCustomer(page, 10, this.sort, this.filtersForm.get('user').value);
      
      if (resp.content.length > 0) {
        this.incidents = resp.content;
        this.pageSize = resp.size;
        this.totalElements = resp.totalElements;
        this.page = page;
      } else {

        this.toastrServ.warning(`No se encontraron incidencias`, 'Sin incidencias');
        this.totalElements = 0;
        this.page = 1;
      }
      
    } catch (e) {

    } finally {
      this.filtersForm.reset();
      this.filtersForm.enable();
    }
  }

  private initForm() {

    this.filtersForm = this.fb.group({
      number: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)]) ),
      user: new FormControl('', Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(7)]) )
    });
  }

}
