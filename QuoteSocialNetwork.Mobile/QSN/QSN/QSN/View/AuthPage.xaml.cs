using QSN.Interfaces;
using QSN.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace QSN.View
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class AuthPage : ContentPage
    {
        public AuthPage()
        {
            InitializeComponent();
            BindingContext = new AuthPageViewModel();
            Title = "Hello there ^_^";
            SignUpButton.Clicked += SignUpButton_Clicked;
        }

        private void SignUpButton_Clicked(object sender, EventArgs e)
        {
            Navigation.PushAsync(new SignUpPage());
        }

        protected override void OnDisappearing()
        {
            base.OnDisappearing();
        }
    }
}
