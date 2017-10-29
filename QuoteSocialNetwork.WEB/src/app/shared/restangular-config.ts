import { environment } from '../../environments/environment';

export function RestangularConfigFactory(RestangularProvider) {
  RestangularProvider.setBaseUrl(environment.baseApiUrl + '/api');
  RestangularProvider.setPlainByDefault(true);

  RestangularProvider.addFullRequestInterceptor((element, operation, path, url, headers) => {
    const bearerToken = localStorage.getItem('token');

    return {
      headers: Object.assign({}, headers, { 'Authorization': `${bearerToken}` })
    };
  });
}
