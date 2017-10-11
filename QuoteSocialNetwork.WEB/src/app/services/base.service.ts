import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';


export abstract class BaseService {

  protected baseApiUrl: string;

  constructor() {
    this.baseApiUrl = environment.baseApiUrl;
  }
}