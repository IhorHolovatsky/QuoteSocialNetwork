using MvvmHelpers;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Forms;

namespace QSN.ViewModel
{
    public class QuoteDetailPageViewModel : BaseViewModel
    {
        public QuoteDetailPageViewModel()
        {
            InitCommand = new Command((quoteId) => Task.Run(() => ExecuteInitCommandAsync(quoteId)));
        }
        
        private string id;
        public string Id
        {
            get
            {
                return id;
            }
            set
            {
                id = value; OnPropertyChanged();
            }
        }

        private string quoteTitle;
        public string QuoteTitle {
            get
            {
                return quoteTitle;
            }
            set
            {
                quoteTitle = value; OnPropertyChanged();
            }
        }

        private string text;
        public string Text
        {
            get
            {
                return text;
            }
            set
            {
                text = value; OnPropertyChanged();
            }
        }

        private string authorName;
        public string AuthorName
        {
            get
            {
                return authorName;
            }
            set
            {
                authorName = value; OnPropertyChanged();
            }
        }

        private string imageSource;
        public string ImageSource
        {
            get
            {
                return imageSource;
            }
            set
            {
                imageSource = value; OnPropertyChanged();
            }
        }

        public ICommand InitCommand;

        private async Task<bool> ExecuteInitCommandAsync(object quoteId)
        {
            if (IsBusy)
                return true;

            IsBusy = true;

            var quote = await Helpers.WebApiHelper.GetQuoteById((string)quoteId);

            ImageSource = quote.ImageSource;
            AuthorName = quote.AuthorName;
            QuoteTitle = quote.Title;
            Id = quote.Id;
            Text = quote.Text;

            IsBusy = false;
            return true;
            
        }

    }
}
