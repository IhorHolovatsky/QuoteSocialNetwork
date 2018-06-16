using MvvmHelpers;
using QSN.Model;
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

        private string dateString;
        public string DateString
        {
            get
            {
                return dateString;
            }
            set
            {
                dateString = value; OnPropertyChanged();
            }
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

        private string location;
        public string Location {
            get
            {
                return location;
            }
            set
            {
                location = value; OnPropertyChanged();
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
            
            ImageSource = quote.Item.ImageSource;
            AuthorName = quote.Item.AuthorName;
            Id = quote.Item.Id;
            Text = quote.Item.Text;
            DateString = quote.Item.Date.ToString();
            Location = quote.Item.Location;

            IsBusy = false;
            return true;
            
        }

    }
}
