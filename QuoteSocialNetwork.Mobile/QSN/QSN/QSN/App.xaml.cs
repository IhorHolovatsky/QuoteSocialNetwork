using QSN.View;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Xamarin.Forms;
using QSN.Helpers;

namespace QSN
{
    public partial class App : Application
    {
        public App()
        {
            InitializeComponent();

            MainPage = new MasterDetailPage()
            {
                Master = new MasterPage() { Title = "Main Page" },
                Detail = new NavigationPage(new QuotesPage())
            };

            //if (!string.IsNullOrEmpty(Settings.UserToken))
            //{
            //    MainPage = new MasterDetailPage()
            //    {
            //        Master = new MasterPage() { Title = "Main Page" },
            //        Detail = new NavigationPage(new QuotesPage())
            //    };
            //}
            //else
            //{
            //    MainPage = new NavigationPage(new AuthPage());
            //}

           
        }

        protected override void OnStart()
        {
            // Handle when your app starts
        }

        protected override void OnSleep()
        {
            // Handle when your app sleeps
        }

        protected override void OnResume()
        {
            // Handle when your app resumes
        }
    }
}
