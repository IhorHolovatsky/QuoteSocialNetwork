using MvvmHelpers;
using QSN.Model;
using QSN.View;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Forms;

namespace QSN.ViewModel
{
    public class QuotesViewModel : BaseViewModel
    {
        public ObservableRangeCollection<QuoteCellModel> Sources { get; set; }
        
        public QuotesViewModel()
        {

            Sources = new ObservableRangeCollection<QuoteCellModel>();
            
        }

        Command _refreshCommand;
        
        public Command RefreshCommand =>
            _refreshCommand ?? (_refreshCommand = new Command(() => Task.Run(ExecuteRefreshCommandAsync)));

        private async Task<bool> ExecuteRefreshCommandAsync()
        {

            if (IsBusy)
                return true;

            IsBusy = true;

            RefreshCommand.ChangeCanExecute();

            var quotes = await Helpers.WebApiHelper.GetAllQuotesForCurrentUser();

            if (quotes != null && quotes.Item.Any())
            {
                Sources.ReplaceRange(quotes.Item);
            }
            
            IsBusy = false;
            RefreshCommand.ChangeCanExecute();
            return true;
        }
    }
}
