using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Firebase.Auth;
using Android.Gms.Auth.Api.SignIn;
using QSN.View;

namespace QSN.Droid.Auth
{
    public static class AndroidAuthHelper
    {

      //  public static ICallbackManager CallbackManager;
        public static FirebaseAuth CurrentFirebaseInstance;


        //public static async Task AuthWithFacebook(AccessToken token)
        //{
        //    var credential = FacebookAuthProvider.GetCredential(token.Token);

        //    await CurrentFirebaseInstance.SignInWithCredential(credential);
        //    var user = CurrentFirebaseInstance.CurrentUser;

        //    //GraphRequest request = GraphRequest.newMeRequest(
        //    //            accessToken,
        //    //        new GraphRequest.GraphJSONObjectCallback() {
        //    //            @Override
        //    //            public void onCompleted(
        //    //                   JSONObject object,
        //    //                   GraphResponse response)
        //    //        {
        //    //            // Application code
        //    //        }
        //    //    });
        //    //Bundle parameters = new Bundle();
        //    //    parameters.putString("fields", "id,name,link");
        //    //request.setParameters(parameters);
        //    //request.executeAsync();

        //    Bundle parameters = new Bundle();
        //    parameters.PutString("fields", "email");

        //    var graphCallBack = new RequestCallback();

        //    var requestTest = new GraphRequest(token, "/me", parameters, HttpMethod.Get, graphCallBack).ExecuteAsync();

        //    //var userModel = new UserModel()
        //    //{
        //    //    Email = user.Email,
        //    //    FirebaseId = user.Uid,
        //    //    Name = user.DisplayName,
        //    //    PhotoUrl = user.PhotoUrl.ToString(),
        //    //    ProviderId = user.ProviderId,
        //    //    AuthToken = token.Token
        //    //};

        //    //FormsAuthHelper.AuthUserWithFacebook(userModel,token.Token);

        //}

        public static void AuthWithGoogle(Intent data)
        {
            var result = Android.Gms.Auth.Api.Auth.GoogleSignInApi.GetSignInResultFromIntent(data);
            
            var credential = GoogleAuthProvider.GetCredential(result.SignInAccount.IdToken, null);

            //QSN.Helpers.Settings.UserToken = result.SignInAccount.IdToken;



            // Get info from Google if needed ?
            #region GetInfo
            //await CurrentFirebaseInstance.SignInWithCredentialAsync(credential);
            //var user = CurrentFirebaseInstance.CurrentUser;

            //var userModel = new UserModel()
            //{
            //    Email = result.SignInAccount.Email,
            //    FirebaseId = user.Uid,
            //    Name = result.SignInAccount.DisplayName,
            //    PhotoUrl = result.SignInAccount.PhotoUrl.ToString(),
            //    ProviderId = result.SignInAccount.Id

            //};
            #endregion

            QSN.Helpers.Settings.UserImage = result.SignInAccount.PhotoUrl.ToString();
            QSN.Helpers.Settings.UserName = result.SignInAccount.DisplayName;

            Xamarin.Forms.Application.Current.MainPage = new Xamarin.Forms.MasterDetailPage()
            {
                Master = new MasterPage() { Title = "Main Page" },
                Detail = new Xamarin.Forms.NavigationPage(new QuotesPage())
            };
        }
    }

    //class RequestCallback : Java.Lang.Object, GraphRequest.ICallback
    //{

    //    public void OnCompleted(GraphResponse response)
    //    {
    //        var lolkekek = response;
    //    }

    //}
}