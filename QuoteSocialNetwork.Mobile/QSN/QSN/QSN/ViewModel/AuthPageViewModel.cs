﻿using MvvmHelpers;
using QSN.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Forms;

namespace QSN.ViewModel
{
    public class AuthPageViewModel: BaseViewModel
    {
        Command googleAuthCommand;
        Command facebookAuthCommand;

        public Command GoogleAuthCommand =>
        googleAuthCommand ?? (googleAuthCommand = new Command(() => Task.Run(ExecuteGoogleAuthCommandAsync)));

        private async Task<bool> ExecuteGoogleAuthCommandAsync()
        {
            if (IsBusy)
                return true;

            IsBusy = true;

            DependencyService.Get<IGoogleAuthentificator>().AuthWithGoogle();

            IsBusy = false;
            return true;
        }

        public Command FacebookAuthCommand =>
        facebookAuthCommand ?? (facebookAuthCommand = new Command(() => Task.Run(ExecuteFacebookAuthCommandAsync)));

        private async Task<bool> ExecuteFacebookAuthCommandAsync()
        {
            if (IsBusy)
                return true;

            IsBusy = true;

            DependencyService.Get<IFacebookAuthentificator>().AuthWithFacebook();

            IsBusy = false;
            return true;
        }

    }
}
