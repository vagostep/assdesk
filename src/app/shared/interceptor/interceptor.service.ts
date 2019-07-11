import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any> {
        
        return next.handle( this.addHeaders(req) );
    }

    private addHeaders(request: HttpRequest<any>): HttpRequest<any> {

        const headers = { 'Ocp-Apim-Subscription-Key': 'e8d3e45eac6747d59a37f6b93a510e81' };

        if (localStorage.getItem('token')) {

            headers['Authorization'] = `${localStorage.getItem('type')} ${localStorage.getItem('token')}`;
        }

        return request.clone({setHeaders: headers});
    }

}