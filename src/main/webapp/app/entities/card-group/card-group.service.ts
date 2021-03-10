import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICardGroup } from 'app/shared/model/card-group.model';

type EntityResponseType = HttpResponse<ICardGroup>;
type EntityArrayResponseType = HttpResponse<ICardGroup[]>;

@Injectable({ providedIn: 'root' })
export class CardGroupService {
  public resourceUrl = SERVER_API_URL + 'api/card-groups';

  constructor(protected http: HttpClient) { }

  create(cardGroup: ICardGroup): Observable<EntityResponseType> {
    return this.http.post<ICardGroup>(this.resourceUrl, cardGroup, { observe: 'response' });
  }

  update(cardGroup: ICardGroup): Observable<EntityResponseType> {
    return this.http.put<ICardGroup>(this.resourceUrl, cardGroup, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICardGroup>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findAll(): Observable<EntityArrayResponseType> {
    return this.http.get<ICardGroup[]>(`${this.resourceUrl}/all`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICardGroup[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
