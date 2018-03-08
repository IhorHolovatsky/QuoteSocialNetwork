using Java.Lang;
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
            //{
            //    new QuoteCellModel() {
            //    Title = " ", AuthorName = " ", ImageSource = " "}
            //};
            
        }

        Command _refreshCommand;

        // </summary>
        public Command RefreshCommand =>
            _refreshCommand ?? (_refreshCommand = new Command(() => Task.Run(ExecuteRefreshCommandAsync)));

        private async Task<bool> ExecuteRefreshCommandAsync()
        {

            if (IsBusy)
                return true;

            IsBusy = true;

            RefreshCommand.ChangeCanExecute();

            var quotes = await Helpers.WebApiHelper.GetAllQuotesForCurrentUser();

            if (quotes != null && quotes.Any())
            {
                Sources.ReplaceRange(quotes);
            }
            
            IsBusy = false;
            RefreshCommand.ChangeCanExecute();
            return true;
        }
    }
}
