using QSN.View;
using System.Windows.Input;
using Xamarin.Forms;

namespace QSN.ViewModel
{
    public class MasterViewModel
    {
        public ICommand NavigationCommand
        {
            get
            {
                return new Command((value) =>
                {
                    var mdp = (Application.Current.MainPage as MasterDetailPage);
                   
                    // Hide the Master page
                    mdp.IsPresented = false;

                    switch (value)
                    {
                        case "1":
                            mdp.Detail = new NavigationPage(new QuotesPage());
                            break;
                        case "2":
                            mdp.Detail = new NavigationPage(new GroupsPage());
                            break;
                    }

                });
            }
        }
    }
}
