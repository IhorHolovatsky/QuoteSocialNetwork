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

        protected override void OnAppearing()
        {
            base.OnAppearing();
        }
    }

    
}
