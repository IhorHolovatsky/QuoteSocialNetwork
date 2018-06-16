// Helpers/Settings.cs
using Plugin.Settings;
using Plugin.Settings.Abstractions;

namespace QSN.Helpers
{
	/// <summary>
	/// This is the Settings static class that can be used in your Core solution or in any
	/// of your client applications. All settings are laid out the same exact way with getters
	/// and setters. 
	/// </summary>
	public static class Settings
	{
		private static ISettings AppSettings
		{
			get
			{
				return CrossSettings.Current;
			}
		}

		#region Setting Constants

		private const string SettingsKey = "settings_key";
		private static readonly string SettingsDefault = string.Empty;

        private const string UserTokenKey = "user_token";
        private const string UserImageKey = "user_image_token";
        private const string UserNameKey = "user_name_token";
        private const string UserIdKey = "user_id_token";
        private const string UserImageDefault = "profile.jpg";
        #endregion


        public static string GeneralSettings
		{
			get
			{
				return AppSettings.GetValueOrDefault(SettingsKey, SettingsDefault);
			}
			set
			{
				AppSettings.AddOrUpdateValue(SettingsKey, value);
			}
		}

        public static string UserImage
        {
            get
            {
                return AppSettings.GetValueOrDefault(UserImageKey, UserImageDefault);
            }
            set
            {
                AppSettings.AddOrUpdateValue(UserImageKey, value);
            }
        }

        public static string UserName
        {
            get
            {
                return AppSettings.GetValueOrDefault(UserNameKey, null);
            }
            set
            {
                AppSettings.AddOrUpdateValue(UserNameKey, value);
            }
        }

        public static string UserId
        {
            get
            {
                return AppSettings.GetValueOrDefault(UserIdKey, null);
            }
            set
            {
                AppSettings.AddOrUpdateValue(UserIdKey, value);
            }
        }

        public static string UserToken
        {
            get
            {
                return AppSettings.GetValueOrDefault(UserTokenKey, null);
            }
            set
            {
                AppSettings.AddOrUpdateValue(UserTokenKey, value);
            }
        }



    }
}