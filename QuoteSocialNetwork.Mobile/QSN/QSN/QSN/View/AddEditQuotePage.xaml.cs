using QSN.ViewModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace QSN.View
{

    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class AddEditQuotePage : ContentPage
    {
        AddEditQuotePageViewModel _vm;
        AddEditQuotePageViewModel ViewModel => _vm ?? (_vm = BindingContext as AddEditQuotePageViewModel);
        
        public AddEditQuotePage()
        {
            BindingContext = new AddEditQuotePageViewModel();
            InitializeComponent();
            
        }

        protected override async void OnAppearing()
        {

            var groups = await Helpers.WebApiHelper.GetGroups();
            ViewModel.Groups = groups.Item;
            GroupsPicker.Items.Add("Без групи");
            foreach (var item in groups.Item)
            {
                GroupsPicker.Items.Add(item.Name);
            }

            base.OnAppearing();
            AddButton.Clicked += AddButton_ClickedAsync;

        }

        private async void AddButton_ClickedAsync(object sender, EventArgs e)
        {
            await Helpers.WebApiHelper.CreateQuote(ViewModel.QuoteModel);
            await Navigation.PopAsync();
        }
    }

    
}
