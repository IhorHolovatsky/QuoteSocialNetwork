using System;
using System.Collections.Generic;
using Android.Content;
using Plugin.CurrentActivity;
using QSN.CustomControls;
using QSN.Droid.Auth;
using Xamarin.Facebook;
using Xamarin.Facebook.Login;
using Xamarin.Facebook.Login.Widget;
using Xamarin.Forms;
using Xamarin.Forms.Platform.Android;

[assembly: ExportRenderer(typeof(FacebookButton), typeof(FacebookSignInButtonRenderer))]
namespace QSN.Droid.Auth
{
    public class FacebookSignInButtonRenderer : ButtonRenderer
    {
        public FacebookSignInButtonRenderer(Context context)
            : base(context)
        {
        }

        public FacebookSignInButtonRenderer()
            : base(null)
        {
            // Default constructor needed for Xamarin Forms bug?
            throw new Exception("This constructor should not actually ever be used");
        }

        protected override void OnElementChanged(ElementChangedEventArgs<Button> e)
        {
            base.OnElementChanged(e);

            if (e.NewElement == null) return;
            if (Control == null) return;

            FacebookSdk.ApplicationId = "1690445974340479";

            FacebookSdk.SdkInitialize((FormsAppCompatActivity)CrossCurrentActivity.Current.Activity);

            LoginManager.Instance.LogOut();

            //AndroidAuthHelper.CallbackManager = CallbackManagerFactory.Create();

            //LoginManager.Instance.RegisterCallback(AndroidAuthHelper.CallbackManager, new MyFacebookCallback<LoginResult>());

           

            //Control.Click += (ev,o) =>
            //{
            //    LoginManager.Instance.LogInWithReadPermissions((FormsAppCompatActivity)CrossCurrentActivity.Current.Activity, new List<string>() {"email"});
            //};

            //var fbLoginButton = new LoginButton((FormsAppCompatActivity)CrossCurrentActivity.Current.Activity);

            //fbLoginButton.SetReadPermissions("email");
            //fbLoginButton.RegisterCallback(AndroidAuthHelper.CallbackManager, new MyFacebookCallback<LoginResult>());


            //FacebookSdk.ApplicationId = "1690445974340479";

            //FacebookSdk.SdkInitialize((FormsAppCompatActivity)CrossCurrentActivity.Current.Activity);

            //LoginManager.Instance.LogOut();

            //AndroidAuthHelper.CallbackManager = CallbackManagerFactory.Create();

            //var fbLoginButton = new LoginButton((FormsAppCompatActivity)CrossCurrentActivity.Current.Activity);

            //fbLoginButton.SetReadPermissions("email");
            //fbLoginButton.RegisterCallback(AndroidAuthHelper.CallbackManager, new MyFacebookCallback<LoginResult>());
            
            //SetNativeControl(fbLoginButton);
        }

        private void Control_Click(object sender, EventArgs e)
        {
            throw new NotImplementedException();
        }
    }
    
}