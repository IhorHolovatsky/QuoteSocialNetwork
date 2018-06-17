using MvvmHelpers;
using Plugin.Media;
using QSN.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Forms;

namespace QSN.ViewModel
{
    public class AddEditQuotePageViewModel : BaseViewModel
    {
        public AddEditQuotePageViewModel()
        {
            
        }

        public List<GroupModel> Groups { get; set; }

        private string groupId;
        public string GroupId
        {
            get { return groupId; }
            set { SetProperty(ref groupId, value); }
        }

        public QuoteModel QuoteModel
        {
            get
            {
                return new QuoteModel()
                {
                    AuthorName = this.QuoteTitle,
                    Location = this.Group,
                    Text = this.Text,
                    Date = this.Date,
                    Group = new GroupModel()
                    {
                        GroupId = this.Groups.FirstOrDefault(g => g.Name == GroupId).GroupId.ToString()
                    }
                };
            }
        }

        private DateTime _date;
        public DateTime Date
        {
            get { return _date; }
            set { SetProperty(ref _date, value); }
        }
        
        private string _title;

        public string QuoteTitle
        {
            get { return _title; }
            set { SetProperty(ref _title, value); }

        }

        private string _text;
        public string Text  
        {
            get { return _text; }
            set { SetProperty(ref _text, value); }
        }

        private string _group;

        public string Group
        {
            get { return _group; }
            set { SetProperty(ref _group, value); }
        }

        Command createCommand;

        public Command CreateCommand =>
        createCommand ?? (createCommand = new Command<QuoteModel>(async (model) => await ExecuteCreateCommandAsync(model)));

        private async Task<bool> ExecuteCreateCommandAsync(QuoteModel model)
        {
            if (IsBusy)
                return true;

            IsBusy = true;

            await Helpers.WebApiHelper.CreateQuote(model);

            IsBusy = false;
            return true;
        }


        //private ImageSource _avatarSource;

        //public ImageSource AvatarSource
        //{
        //    get { return _avatarSource; }
        //    set { SetProperty(ref _avatarSource, value); }
        //}

        //private string AvatarPath { get; set; }

        //private bool _isTackingPhoto;

        //public bool IsTakingPhoto
        //{
        //    get { return _isTackingPhoto; }
        //    set { SetProperty(ref _isTackingPhoto, value); }
        //}
        //public static bool IsAvatarPicked { get; set; }

        //private ICommand _takePhotoCommand;
        //public ICommand TakePhotoCommand
        //    => _takePhotoCommand ?? (_takePhotoCommand = new Command(async () => await ExecutePickPhotoCommandAsync()));


        //private ICommand _finishedLoadingImageCommand;

        //public ICommand FinishedLoadingImageCommand
        //    => _finishedLoadingImageCommand ??
        //    (_finishedLoadingImageCommand = new Command(ExecuteFinishedLoadingImageCommand));

        //private ICommand _registerCommand;

        //public ICommand RegisterCommand
        //    => _registerCommand ??
        //       (_registerCommand = new Command(async () => await ExecuteRegisterCommandAsync()));


        //public byte[] AvatarBytes { get; set; }

        //private readonly Page _currentPage;

        //public async Task<bool> ExecutePickPhotoCommandAsync()
        //{
        //    try
        //    {
        //        if (!CrossMedia.Current.IsPickPhotoSupported)
        //        {
        //            //await DisplayAlert("Photos Not Supported", ":( Permission not granted to photos.", "OK");
        //            return false;
        //        }
        //        if (IsTakingPhoto)
        //        {
        //            return false;
        //        }

        //        IsTakingPhoto = true;

        //        var file = Device.OS == TargetPlatform.Android
        //            ? await CrossMedia.Current.PickPhotoAsync()
        //            : await CrossMedia.Current.PickPhotoAsync();


        //        if (file == null)
        //        {
        //            IsTakingPhoto = false;
        //            return false;
        //        }

        //        AvatarPath = file.Path;

        //        AvatarSource = ImageSource.FromStream(() =>
        //        {
        //            var stream = file.GetStream();

        //            return stream;
        //        });

        //        return true;
        //    }
        //    catch (Exception ex)
        //    {
        //        IsTakingPhoto = false;
        //        return false;
        //    }
        //}

        //public async void ExecuteFinishedLoadingImageCommand()
        //{
        //    try
        //    {
        //        if (IsAvatarPicked)
        //        {
        //            // await ((SignUpPage)_currentPage).AssignAvatarBytes();

        //        }
        //        else
        //        {
        //            IsAvatarPicked = true;
        //        }
        //        IsTakingPhoto = false;
        //    }
        //    catch (Exception ex)
        //    {
        //    }
        //}

        //public async Task<bool> ExecuteRegisterCommandAsync()
        //{

        //    var validationResult = ValidateForm();

        //    if (!string.IsNullOrEmpty(validationResult))
        //    {
        //        await App.Current.MainPage.DisplayAlert("Error", validationResult, "OK");
        //        return false;
        //    }

        //    try
        //    {
        //        this.IsBusy = true;

        //        //var registrationObject = default(DonationRegistrationObject);

        //        try
        //        {
        //           // do logic
        //        }
        //        catch (Exception exception)
        //        {
        //            return false;
        //        }

        //        //var responseWrapper = default(ResponseWrapper);

        //        try
        //        {
        //            //responseWrapper = await ServiceHelper.RegisterUser(registrationObject);
        //        }
        //        catch (Exception exception)
        //        {


        //            //responseWrapper = new ResponseWrapper()
        //            //{
        //            //    IsSuccess = false,
        //            //    ErrorMessage = exception.Message
        //            //};

        //            return false;
        //        }


        //        if (true)
        //        {

        //            //Settings.UserEmail = Email;
        //            //Settings.UserPasswordNotHashed = Password;
        //            //Settings.UserPasswordHashed = string.Empty;

        //            //var user = responseWrapper.fullUserInfo;

        //            //Settings.UserGuid = user.UserGuid;
        //            //Settings.UserEmail = user.Email;
        //            //Settings.UserLogin = user.Login;
        //            //Settings.UserPasswordNotHashed = Password;
        //            //Settings.UserPasswordHashed = user.Password;
        //            //Settings.UserName = user.DisplayName;

        //            //Profile.SaveAvatar(user.Photo);

        //            //await
        //            //    App.Current.MainPage.DisplayAlert("Registration",
        //            //        "You will get an email notification with confirmation link. You will be able to login after confirmation.",
        //            //        "OK");

        //            //await App.Current.MainPage.Navigation.PushAsync(new LoginPage());
        //            //App.Current.MainPage.Navigation.RemovePage(_currentPage);
        //            //await App.Current.MainPage.Navigation.PopAsync(true);
        //            //App.Current.MainPage = new NavigationPage(new StartPage(targetPage: typeof(LoginPage)));

        //           // Application.Current.MainPage = new NavigationPage(new MyTabbedPage());

        //            return true;
        //        }
        //        else
        //        {
        //            return false;
        //        }
        //    }
        //    catch (Exception ex)
        //    {

        //    }
        //    finally
        //    {
        //        this.IsBusy = false;
        //    }

        //    return true;


        //}

        //private string ValidateForm()
        //{
        //    var validationMessage = new StringBuilder();

        //    try
        //    {
        //        //var isMailValid = (Regex.IsMatch(Email ?? string.Empty, Constants.EMAIL_REGEX, RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds(250)));

        //        //if (!isMailValid)
        //        //{
        //        //    validationMessage.Append($"\n{Constants.EMAIL_VALIDATION_ERROR_MESSAGE}");
        //        //}

        //        //if (string.IsNullOrEmpty(DisplayName))
        //        //{
        //        //    validationMessage.Append($"\n{Constants.DISPLAY_NAME_REQUIRED}");
        //        //}
        //        //else if (DisplayName.Trim().Length == 0)
        //        //{
        //        //    validationMessage.Append($"\n{Constants.DISPLAY_NAME_CANT_CONTAIN_ONLY_SPACES}");
        //        //}
        //        //else if (DisplayName.StartsWith(" "))
        //        //{
        //        //    validationMessage.Append($"\n{Constants.NAME_CANNOT_BEGIN_FROM_WHITESPACE}");
        //        //}

        //        //if (string.IsNullOrEmpty(Password))
        //        //{
        //        //    validationMessage.Append($"\n{Constants.PASSWORD_REQUIRED_MESSAGE}");
        //        //}
        //        //else if (Password.Trim().Length == 0)
        //        //{
        //        //    validationMessage.Append($"\n{Constants.PASSWORD_CANT_CONTAIN_ONLY_SPACES}");
        //        //}
        //        //else if (Password.StartsWith(" "))
        //        //{
        //        //    validationMessage.Append($"\n{Constants.PASSWORD_CANNOT_BEGIN_FROM_WHITESPACE}");
        //        //}

        //        //if (string.IsNullOrEmpty(ConfirmPassword))
        //        //{
        //        //    validationMessage.Append($"\n{Constants.CONFIRM_PASSWORD_REQUIRED}");
        //        //}
        //        //else if (!string.IsNullOrEmpty(Password) && !Password.Equals(ConfirmPassword))
        //        //{
        //        //    validationMessage.Append($"\n{Constants.PASSWORD_MUST_MACH}");
        //        //}
        //    }
        //    catch (Exception ex)
        //    {

        //        return "Error";
        //    }

        //    return validationMessage.ToString();
        //}


    }
}

