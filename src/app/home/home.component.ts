import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    model = {
        left: true,
        middle: false,
        right: false
    };

    public isUser: boolean;
    public isAnalyst: boolean;

    constructor() { 

        this.isUser = localStorage.getItem('authority') === 'USUARIO';
        this.isAnalyst = localStorage.getItem('authority') === 'ANALISTA';
    }

    ngOnInit() {}
}
