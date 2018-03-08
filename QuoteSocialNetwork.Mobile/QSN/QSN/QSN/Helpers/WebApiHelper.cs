

using Java.Lang;
using Java.Util;
using QSN.InternalEntities;
using QSN.Model;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace QSN.Helpers
{
    public class WebApiHelper
    {
        private static string webApi = Constants.WEB_API_URL;
        private static HttpClient httpClient;
        private static HttpClient GetClient()
        {
            if (httpClient == null)
            {
                httpClient = new HttpClient();
                httpClient.DefaultRequestHeaders.Add("Accept", "application/json");
            }
            return httpClient;
        }

        public static async Task<List<QuoteCellModel>> GetAllQuotesForCurrentUser()
        {
            Thread.Sleep(2000);

            return new List<QuoteCellModel> { new QuoteCellModel() {
            Title = "Test 1", AuthorName = "A 1", ImageSource = "profile.jpg", Id="1"},
            new QuoteCellModel() {
            Title = "Test 2", AuthorName = "A 2", ImageSource = "profile.jpg", Id="2"},
            new QuoteCellModel() {
            Title = "Test 3", AuthorName = "A 3", ImageSource = "profile.jpg", Id="3"}};
        }

        public static async Task<QuoteModel> GetQuoteById(string id)
        {
            Thread.Sleep(1000);

            return new QuoteModel()
            {
                Title = "Test 1",
                AuthorName = "A 1",
                ImageSource = "profile.jpg",
                Text = "asdf fa sdf as df asdf a sdf sadf a sdf asdf as df sadfas df asdf as df asdffadsfdsaf  asdf as df sadf a sdf asf",
                Id = "1"
            };
        }
    }
}
