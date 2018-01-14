import { environment } from '../../environments/environment';
import { AngularFireAuth } from 'angularfire2/auth';

export function RestangularConfigFactory(RestangularProvider, router, firebase: AngularFireAuth) {
  RestangularProvider.setBaseUrl(environment.baseApiUrl + '/api');
  RestangularProvider.setPlainByDefault(true);

  RestangularProvider.addFullRequestInterceptor((element, operation, path, url, headers) => {
    const bearerToken = localStorage.getItem('token');

    return {
      headers: Object.assign({}, headers, { 'Authorization': `Bearer ${bearerToken}` })
    };
  });

  RestangularProvider.addErrorInterceptor((response, subject, responseHandler) => {
    if ((response.status === 401
         || response.status === 403)) {
          firebase.auth.signOut();
          router.navigate(['/login']);
      return true; // error handled
    }
    return false; // error not handled
  });
}
