import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class IsUserGuard implements CanActivate {

  constructor() {}

  canActivate(): boolean {

    const authority = localStorage.getItem('authority');

    return authority === 'USUARIO';
  }
}