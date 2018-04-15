using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Plugin.CurrentActivity;
using QSN.Droid.Auth;
using QSN.Interfaces;
using Xamarin.Facebook;
using Xamarin.Facebook.Login;
using Xamarin.Forms.Platform.Android;

[assembly: Xamarin.Forms.Dependency(typeof(FacebookAuthentificator))]
namespace QSN.Droid.Auth
{
    public class FacebookAuthentificator : IFacebookAuthentificator
    {
        public void AuthWithFacebook()
        {
            AndroidAuthHelper.CallbackManager = CallbackManagerFactory.Create();

            LoginManager.Instance.RegisterCallback(AndroidAuthHelper.CallbackManager, new MyFacebookCallback<LoginResult>());
            
            LoginManager.Instance.LogInWithReadPermissions((FormsAppCompatActivity)CrossCurrentActivity.Current.Activity, new List<string>() { "email" });
            
        }
    }

    class MyFacebookCallback<TLoginResult> : Java.Lang.Object, IFacebookCallback where TLoginResult : Java.Lang.Object
    {

        public void OnSuccess(Java.Lang.Object obj)
        {
            var loginResult = (LoginResult)obj;

            HandleFacebookAccessToken(loginResult.AccessToken);

        }

        public void OnCancel()
        {
            throw new NotImplementedException();
        }

        public void OnError(FacebookException fbException)
        {
            throw new NotImplementedException();
        }

        private void ShowAlert()
        {
            throw new NotImplementedException();
        }

        void HandleFacebookAccessToken(AccessToken token)
        {
            AndroidAuthHelper.AuthWithFacebook(token);
        }
    }
}