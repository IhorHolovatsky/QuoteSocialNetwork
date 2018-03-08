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
    public partial class QuoteDetailPage : ContentPage
    {
        QuoteDetailPageViewModel _vm;
        QuoteDetailPageViewModel ViewModel => _vm ?? (_vm = BindingContext as QuoteDetailPageViewModel);

        private string _id;
        
        public QuoteDetailPage(string id)
        {
            InitializeComponent();
            BindingContext = new QuoteDetailPageViewModel();
            _id = id;
        }

        protected override void OnAppearing()
        {
            base.OnAppearing();
            ViewModel.InitCommand.Execute(_id);
        }
    }

    
}
