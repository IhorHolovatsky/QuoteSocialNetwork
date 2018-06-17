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
    public partial class CreateGroup : ContentPage
    {
        public CreateGroup()
        {
            InitializeComponent();
        }

        protected override void OnAppearing()
        {
            base.OnAppearing();
            AddButton.Clicked += AddButton_Clicked;
        }

        private async void AddButton_Clicked(object sender, EventArgs e)
        {
            await Helpers.WebApiHelper.CreateGroup(titleEntry.Text);
            await Navigation.PopAsync();
        }
    }
}