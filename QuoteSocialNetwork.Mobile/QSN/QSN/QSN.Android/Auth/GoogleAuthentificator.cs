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
using QSN.Interfaces;
using QSN.Droid.Auth;
using Android.Gms.Auth.Api.SignIn;
using Android.Gms.Common.Apis;
using Xamarin.Forms.Platform.Android;
using Android.Gms.Common;
using System.Threading.Tasks;
using Plugin.CurrentActivity;

[assembly: Xamarin.Forms.Dependency(typeof(GoogleAuthentificator))]
namespace QSN.Droid.Auth
{
    public class GoogleAuthentificator : IGoogleAuthentificator
    {
        public void AuthWithGoogle()
        {
            var gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DefaultSignIn)
                .RequestIdToken("15943729790-5jc1vl8ttvmi5a7jqn6a7h08fp2ilns3.apps.googleusercontent.com")
                .RequestEmail()
                .Build();

            var mGoogleApiClient = new GoogleApiClient.Builder((FormsAppCompatActivity)CrossCurrentActivity.Current.Activity)
                .EnableAutoManage((FormsAppCompatActivity)CrossCurrentActivity.Current.Activity, new OnConnectionFailedListener())
                .AddApi(Android.Gms.Auth.Api.Auth.GOOGLE_SIGN_IN_API, gso)
                .Build();

            var signInIntent = Android.Gms.Auth.Api.Auth.GoogleSignInApi.GetSignInIntent(mGoogleApiClient);
            ((FormsAppCompatActivity)CrossCurrentActivity.Current.Activity).StartActivityForResult(signInIntent, 9001);
        }

    }

    class OnConnectionFailedListener : Java.Lang.Object, GoogleApiClient.IOnConnectionFailedListener
    {
        public void OnConnectionFailed(ConnectionResult result)
        {
        }
    }
}