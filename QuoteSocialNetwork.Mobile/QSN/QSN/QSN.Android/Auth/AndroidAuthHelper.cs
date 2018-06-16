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
using Xamarin.Facebook;
using Org.Json;
using Newtonsoft.Json;

namespace QSN.Droid.Auth
{
    public static class AndroidAuthHelper
    {

        public static ICallbackManager CallbackManager;
        public static FirebaseAuth CurrentFirebaseInstance;


        public static async Task AuthWithFacebookAsync(AccessToken token)
        {
            var credential = FacebookAuthProvider.GetCredential(token.Token);

            CurrentFirebaseInstance.SignInWithCredential(credential);
            var user = CurrentFirebaseInstance.CurrentUser;

            QSN.Helpers.Settings.UserId = user.Uid;
            var tokenObject = await user.GetIdTokenAsync(false);
            QSN.Helpers.Settings.UserToken = tokenObject.Token;

            QSN.Helpers.Settings.UserImage = user.ProviderData.FirstOrDefault((x) => x.ProviderId == "facebook.com").PhotoUrl.ToString();
            QSN.Helpers.Settings.UserName = user.DisplayName;

            Xamarin.Forms.Application.Current.MainPage = new Xamarin.Forms.MasterDetailPage()
            {
                Master = new MasterPage() { Title = "Main Page" },
                Detail = new Xamarin.Forms.NavigationPage(new QuotesPage())
            };

            //Use, if email needed 

            //GraphRequest request = GraphRequest.NewMeRequest(token, new GraphJsonCallback());

            //Bundle parameters = new Bundle();
            //request.Parameters.PutString("fields", "id,name,link,email");
            //request.ExecuteAsync();


        }

        public static async Task AuthWithGoogleAsync(Intent data)
        {
            var result = Android.Gms.Auth.Api.Auth.GoogleSignInApi.GetSignInResultFromIntent(data);
            
            var credential = GoogleAuthProvider.GetCredential(result.SignInAccount.IdToken, null);

            CurrentFirebaseInstance.SignInWithCredential(credential);
            var user = CurrentFirebaseInstance.CurrentUser;

            QSN.Helpers.Settings.UserId = user.Uid;
            var tokenObject = await user.GetIdTokenAsync(false);
            QSN.Helpers.Settings.UserToken = tokenObject.Token;

            QSN.Helpers.Settings.UserImage = result.SignInAccount.PhotoUrl.ToString();
            QSN.Helpers.Settings.UserName = result.SignInAccount.DisplayName;

            Xamarin.Forms.Application.Current.MainPage = new Xamarin.Forms.MasterDetailPage()
            {
                Master = new MasterPage() { Title = "Main Page" },
                Detail = new Xamarin.Forms.NavigationPage(new QuotesPage())
            };


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
        }
    }

    //class GraphJsonCallback : Java.Lang.Object, GraphRequest.IGraphJSONObjectCallback
    //{
    //    public void OnCompleted(JSONObject @object, GraphResponse response)
    //    {
    //        dynamic userInfo = JsonConvert.DeserializeObject(response.RawResponse);
            
    //    }
    //}
}