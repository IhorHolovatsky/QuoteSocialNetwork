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
    public partial class GroupsPage : ContentPage
    {

        GroupsViewModel _vm;
        GroupsViewModel ViewModel => _vm ?? (_vm = BindingContext as GroupsViewModel);

        public GroupsPage()
        {
            InitializeComponent();
            BindingContext = new GroupsViewModel();
            this.Title = "Groups";
        }

        protected override void OnAppearing()
        {
            base.OnAppearing();
            ViewModel.RefreshCommand.Execute(null);
            GroupedQuotesList.ItemTapped += QuotesList_ItemTappedAsync;
            FloatingActionButtonAdd.Clicked += CreateGroup;
            
        }

        async void CreateGroup(object sender, EventArgs e)
        {
            await Navigation.PushAsync(new CreateGroup());
        }

        private async void QuotesList_ItemTappedAsync(object sender, ItemTappedEventArgs e)
        {
            GroupedQuotesList.SelectedItem = null;
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
            if (await DisplayAlert("Delete", "Are you sure?", "OK", "No"))
            {
                // call delete logic from ViewModel
            }

        }

        private void HeaderClicked(object sender, EventArgs e)
        {
            var groupIdentifier = (string)((Button)sender).CommandParameter;
            int selectedIndex = _vm.Sources.IndexOf(_vm.Sources.FirstOrDefault(x => x.Key.Group == groupIdentifier));
            _vm.Sources[selectedIndex].Key.Selected = !_vm.Sources[selectedIndex].Key.Selected;
            _vm.UpdateHeaders();
        }


        protected override void OnDisappearing()
        {
            base.OnDisappearing();
            GroupedQuotesList.ItemTapped -= QuotesList_ItemTappedAsync;
        }

    }
}
