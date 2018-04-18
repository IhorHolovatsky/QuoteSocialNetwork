using QSN.Model;
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
    public partial class QuotesPage : ContentPage
    {
        QuotesViewModel _vm;
        QuotesViewModel ViewModel => _vm ?? (_vm = BindingContext as QuotesViewModel);

        public QuotesPage()
        {
            InitializeComponent();
            BindingContext = new QuotesViewModel();
            FloatingActionButtonAdd.Clicked = async (sender, args) =>
            {
                await Navigation.PushAsync(new AddEditQuotePage());
            };
            this.Title = "Quotes";
        }

        protected override void OnAppearing()
        {
            base.OnAppearing();
            ViewModel.RefreshCommand.Execute(null);
            QuotesList.ItemTapped += QuotesList_ItemTappedAsync;
            
        }
        

        private async void QuotesList_ItemTappedAsync(object sender, ItemTappedEventArgs e)
        {
            QuotesList.SelectedItem = null;
            await Navigation.PushAsync(new QuoteDetailPage((e.Item as QuoteCellModel)?.Id));
        }

        private void Quotes_Refreshing(object sender, EventArgs e)
        {
            ViewModel.RefreshCommand.Execute(null);
        }

        public void OnEdit(object sender, EventArgs e)
        {
            var mi = ((MenuItem)sender);
            // navigate to AddEditPage with id parametr
        }

        public async void OnDelete(object sender, EventArgs e)
        {
            var mi = ((MenuItem)sender);
            if(await DisplayAlert("Delete", "Are you sure?", "OK", "No"))
            {
                // call delete logic from ViewModel
            }

        }

        protected override void OnDisappearing()
        {
            base.OnDisappearing();
            QuotesList.ItemTapped -= QuotesList_ItemTappedAsync;
        }


    }
}
