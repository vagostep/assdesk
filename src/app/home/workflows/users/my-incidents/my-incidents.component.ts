import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MyIncidentsService } from './my-incidents.service';
import { ToastrService } from 'ngx-toastr';
import { NgbdSortableHeader } from '../../commons/directives/sortable-header.directive';

@Component({
    selector: 'app-my-incidents',
    templateUrl: './my-incidents.component.html',
    styleUrls: ['./my-incidents.component.scss'],
    providers: [
      MyIncidentsService
    ]
})

export class MyIncidentsComponent implements OnInit {

  public filtersForm: FormGroup;
  public incidents: any[];
  public pageSize: number;
  public totalElements: number;
  public page: number;
  public sort: string;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private fb: FormBuilder,
              private myIncidentsService: MyIncidentsService,
              private toastrServ: ToastrService) {

    this.sort = 'createdOn,desc';
  }

  ngOnInit() {

    this.initForm();

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

  public async searchIncidents(page: number = 1) {
    console.log('Sort',this.sort);
    this.filtersForm.disable();
    this.incidents = [];
    // this.pageSize = 0;
    // this.totalElements = 0;

    try {
      
      if (this.filtersForm.get('number').value) {

        this.filtersForm.get('dateInit').setValue(undefined);
        this.filtersForm.get('dateEnd').setValue(undefined);
        this.filtersForm.get('state').setValue('');

        const incident = await this.myIncidentsService.getIncidentByNumber(this.filtersForm.get('number').value);
        
        if (incident) {
          this.incidents.push(incident);
          this.pageSize = 10;
          this.totalElements = 1;
          this.page = 1;
          this.filtersForm.reset(); 
          this.filtersForm.get('state').setValue('');
        } else {

          this.toastrServ.warning(`No se encontró la incidencia ${this.filtersForm.get('number').value}`, 'No existe incidencia');
          this.totalElements = 0;
          this.page = 1;
        }

      } else {
         const resp = await this.myIncidentsService.searchByCustomer(page, 10, this.sort, localStorage.getItem('username'), 
                                                                      this.filtersForm.get('dateInit').value, 
                                                                      this.filtersForm.get('dateEnd').value,
                                                                      this.filtersForm.get('state').value);
        
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
      }
      
    } catch (e) {

    } finally {

      this.filtersForm.enable();
    }
  }

  private initForm() {

    this.filtersForm = this.fb.group({
      number: new FormControl('' ),
      state: new FormControl('' ),
      dateInit: new FormControl('' ),
      dateEnd: new FormControl('' )
    });
  }

}
