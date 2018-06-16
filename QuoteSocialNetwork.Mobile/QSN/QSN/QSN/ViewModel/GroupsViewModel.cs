﻿
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
using Xamarin.Forms.Internals;

namespace QSN.ViewModel
{
    public class Grouping<K, T> : ObservableCollection<T>
    {
        public K Key { get; private set; }
        public Grouping(K key, IEnumerable<T> items)
        {
            Key = key;
            foreach (T item in items)
                Items.Add(item);
        }
    }

    public class SelectGroupViewModel
    {
        public string Group { get; set; }
        public bool Selected { get; set; }
    }

    public class GroupsViewModel : BaseViewModel
    {
        public ObservableRangeCollection<Grouping<SelectGroupViewModel, QuoteCellModel>> Sources { get; set; }

        public ObservableRangeCollection<Grouping<SelectGroupViewModel, QuoteCellModel>> VisibleGroups { get; set; }


        public GroupsViewModel()
        {
            
            Sources = new ObservableRangeCollection<Grouping<SelectGroupViewModel, QuoteCellModel >>();
            VisibleGroups = new ObservableRangeCollection<Grouping<SelectGroupViewModel, QuoteCellModel>>();
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

                var groups = quotes.Item.GroupBy(p => p.Groupe.Name).Select(g => new Grouping<SelectGroupViewModel, QuoteCellModel>(
                    new SelectGroupViewModel()
                    {
                        Group = g.Key,
                        Selected = false
                    }, g));

                Sources.ReplaceRange(groups);
                UpdateHeaders();
              
            }
            
            IsBusy = false;
            RefreshCommand.ChangeCanExecute();
            return true;
        }


        public void UpdateHeaders()
        {

            var temp = new ObservableRangeCollection<Grouping<SelectGroupViewModel, QuoteCellModel>>();

            foreach (var group in Sources)
            {
                if(group.Key.Selected == true)
                {
                    temp.Add(group);
                }
                else
                {
                    temp.Add(new Grouping<SelectGroupViewModel, QuoteCellModel>(group.Key, new List<QuoteCellModel>()));
                }
            }

            VisibleGroups.ReplaceRange(temp);
            
        }
    }
}
