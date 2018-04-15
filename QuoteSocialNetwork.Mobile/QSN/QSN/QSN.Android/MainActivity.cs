
using Android.App;
using Android.Content;
using Android.Content.PM;
using Android.OS;
using Firebase;
using Firebase.Auth;
using ImageCircle.Forms.Plugin.Droid;
using Plugin.CurrentActivity;
using QSN.Droid.Auth;
using Xamarin.Forms.Platform.Android;
using QSN;

namespace QSN.Droid
{
    [Activity(Label = "QSN", Icon = "@drawable/icon", Theme = "@style/MainTheme", MainLauncher = true, ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation)]
    public class MainActivity : global::Xamarin.Forms.Platform.Android.FormsAppCompatActivity
    {
        protected override void OnCreate(Bundle bundle)
        {
            TabLayoutResource = Resource.Layout.Tabbar;
            ToolbarResource = Resource.Layout.Toolbar;

            base.OnCreate(bundle);

            global::Xamarin.Forms.Forms.Init(this, bundle);

            Plugin.Iconize.Iconize.With(new Plugin.Iconize.Fonts.FontAwesomeModule());
            FormsPlugin.Iconize.Droid.IconControls.Init();

            ImageCircleRenderer.Init();
            Xamarin.Forms.DependencyService.Register<GoogleAuthentificator>();
            Xamarin.Forms.DependencyService.Register<FacebookAuthentificator>();

            LoadApplication(new QSN.App());

            FirebaseApp.InitializeApp((FormsAppCompatActivity)CrossCurrentActivity.Current.Activity);

            AndroidAuthHelper.CurrentFirebaseInstance = FirebaseAuth.GetInstance(FirebaseApp.Instance);

        }

        protected override void OnActivityResult(int requestCode, Result resultCode, Intent data)
        {
            if (requestCode == 9001)
            {
                AndroidAuthHelper.AuthWithGoogle(data);
            }
            else
            {
                AndroidAuthHelper.CallbackManager.OnActivityResult(requestCode, (int)resultCode, data);
            }


            base.OnActivityResult(requestCode, resultCode, data);
        }
    }
}

