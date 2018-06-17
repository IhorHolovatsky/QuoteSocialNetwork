using Newtonsoft.Json;
using QSN.InternalEntities;
using QSN.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
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

        public static async Task<ResponseWrapper<List<QuoteCellModel>>> GetAllQuotesForCurrentUser()
        {

            var client = GetClient();
            var url = "https://quotesocialnetwork.azurewebsites.net/api/Quote/user/"+ "Ahydh0N6FQbiXduWwCPfd2bvir33";

            //Constants.API_URL + Constants.ACCOUNT_INFO_URL;
            client.DefaultRequestHeaders.Remove("Authorization");
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {QSN.Helpers.Settings.UserToken}");
                //$"Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjdhM2QxOTA0ZjE4ZTI1Nzk0ODgzMWVhYjgwM2UxMmI3OTcxZTEzYWIifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcXVvdGVzb2NpYWxuZXR3b3JrIiwibmFtZSI6ImFuZHJpb2xleHNpdSIsInBpY3R1cmUiOiJodHRwczovL2xoNS5nb29nbGV1c2VyY29udGVudC5jb20vLXgyV2s3QTMzTjJnL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUVZL3AzbzRHZUMtR0E0L3M5Ni1jL3Bob3RvLmpwZyIsImF1ZCI6InF1b3Rlc29jaWFsbmV0d29yayIsImF1dGhfdGltZSI6MTUyOTE3MzU1NCwidXNlcl9pZCI6IkFoeWRoME42RlFiaVhkdVd3Q1BmZDJidmlyMzMiLCJzdWIiOiJBaHlkaDBONkZRYmlYZHVXd0NQZmQyYnZpcjMzIiwiaWF0IjoxNTI5MTczNTU0LCJleHAiOjE1MjkxNzcxNTQsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTgxNDEwNjEyNDAwOTkwMzIyMjciXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.RjX0jBzZL78U2ROiH8aYulNbYu8B4eIhJmgawgBcxcRK_pUIQQVkli4Lu4LlN1YSHa6DXCgq-rbUusiHHpqpOE415_6qFYWiPBpGXPa0x6LsS7a8MJPauq5GLx7tORyEqBuV9qy0ewY4ZJxQ_cTcXodCTyVY11-yx_a6fE6tEjGj9J3kbbNiIeyEMymI5zrgDtytFGELheNzfvazw-vPkhxmSJZYQIQQFCifFIzneNLPTJQjt1I2QGdCtvPJy3sIoSvJ0wL5kkSx6dPU3OCywuc9VkxWvgNWRSBQAD5ILbmO0TaPRtkfhR75I321dhupcXprddpKrQ6O44QNCr-PLw");

            var response = await client.GetAsync(url);

            var result = await response.Content.ReadAsStringAsync();

            var itemsList = JsonConvert.DeserializeObject<List<Quote>>(result);

            var viewResult = new ResponseWrapper<List<QuoteCellModel>>
            {
                IsError = false,
                Item = itemsList.Select(item => new QuoteCellModel()
                {
                    AuthorName = item.Author,
                    Title = item.Text.Length <= 10 ? item.Text : item.Text.Substring(0, 10) + "...",
                    ImageSource = "profile.jpg",
                    Id = item.Id.ToString(),
                    Groupe = new GroupModel()
                    {
                        GroupId = item.GroupId != null ? item.GroupId.ToString() : "",
                        Name = item.Group != null ? item.Group.Name : ""
                    }
                }).ToList()
            };

            return viewResult;

        }



        public static async Task<ResponseWrapper<List<QuoteCellModel>>> GetAllGroupQuotesForCurrentUser()
        {

            var client = GetClient();
            var url = "https://quotesocialnetwork.azurewebsites.net/api/Quote/user/" + "Ahydh0N6FQbiXduWwCPfd2bvir33";

            //Constants.API_URL + Constants.ACCOUNT_INFO_URL;
            client.DefaultRequestHeaders.Remove("Authorization");
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {QSN.Helpers.Settings.UserToken}");

            var response = await client.GetAsync(url);

            var result = await response.Content.ReadAsStringAsync();

            var itemsList = JsonConvert.DeserializeObject<List<Quote>>(result);

            var viewResult = new ResponseWrapper<List<QuoteCellModel>>
            {
                IsError = false,
                Item = itemsList.Select(item => new QuoteCellModel()
                {
                    AuthorName = item.Author,
                    Title = item.Text.Length <= 10 ? item.Text : item.Text.Substring(0, 10) + "...",
                    ImageSource = "profile.jpg",
                    Id = item.Id.ToString(),
                    Groupe = new GroupModel()
                    {
                        GroupId = item.GroupId != null ? item.GroupId.ToString() : "",
                        Name = item.Group != null ? item.Group.Name : ""
                    }
                }).ToList()
            };

            return viewResult;

        }
        
        public static async Task<ResponseWrapper<QuoteModel>> GetQuoteById(string id)
        {
            var client = GetClient();
            var url = "https://quotesocialnetwork.azurewebsites.net/api/Quote/" + id;

            //Constants.API_URL + Constants.ACCOUNT_INFO_URL;
            client.DefaultRequestHeaders.Remove("Authorization");
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {QSN.Helpers.Settings.UserToken}");

            var response = await client.GetAsync(url);

            var result = await response.Content.ReadAsStringAsync();

            var item = JsonConvert.DeserializeObject<Quote>(result);

            return new ResponseWrapper<QuoteModel>()
            {
                Item = new QuoteModel()
                {
                    AuthorName = item.Author,
                    Title = item.Text,
                    ImageSource = "profile.jpg",
                    Id = item.Id.ToString(),
                    Date = item.Date,
                    Location = item.Location,
                    Text = item.Text
                }
            };

        }

        public static async Task<ResponseWrapper<QuoteModel>> CreateQuote(QuoteModel model)
        {
            var apiModel = new Quote()
            {
                Author = model.AuthorName,
                Location = model.Location,
                Text = model.Text,
                Date = model.Date,
                UserId = "Ahydh0N6FQbiXduWwCPfd2bvir33"
            };

            if(model.Group?.GroupId != "Без групи" && !string.IsNullOrEmpty(model.Group?.GroupId))
            {
                apiModel.GroupId = new Guid(model.Group.GroupId);
            }
            var client = GetClient();
            var url = "https://quotesocialnetwork.azurewebsites.net/api/Quote";

            //Constants.API_URL + Constants.ACCOUNT_INFO_URL;
            client.DefaultRequestHeaders.Remove("Authorization");
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {QSN.Helpers.Settings.UserToken}");
            client.DefaultRequestHeaders.Add("Accept", "application/json");

            var content = new StringContent(JsonConvert.SerializeObject(apiModel), Encoding.UTF8, "application/json");

            var result = await client.PostAsync(url,content );

            return new ResponseWrapper<QuoteModel>()
            {
                IsError = false
            };

        }
        
        public static async Task<ResponseWrapper<QuoteModel>> DeleteQuote(string id)
        {
            var client = GetClient();
            var url = "https://quotesocialnetwork.azurewebsites.net/api/Quote/" + id;

            client.DefaultRequestHeaders.Remove("Authorization");
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {QSN.Helpers.Settings.UserToken}");

            var result = await client.DeleteAsync(url);

            return new ResponseWrapper<QuoteModel>()
            {
                IsError = false
            };
        }
        //public static async Task<ResponseWrapper<QuoteModel>> EditQuote(QuoteModel model)
        //{
        //    return null;
        //}

        //public static async Task<ResponseWrapper<List<GroupModel>>> GetAllGroupsForCurrentUser()
        //{
        //    return null;

        //}

        public static async Task<ResponseWrapper<List<GroupModel>>> GetGroups()
        {
            var client = GetClient();
            var url = "https://quotesocialnetwork.azurewebsites.net/api/Group/user/";

            //Constants.API_URL + Constants.ACCOUNT_INFO_URL;
            client.DefaultRequestHeaders.Remove("Authorization");
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {QSN.Helpers.Settings.UserToken}");
            //$"Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjdhM2QxOTA0ZjE4ZTI1Nzk0ODgzMWVhYjgwM2UxMmI3OTcxZTEzYWIifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcXVvdGVzb2NpYWxuZXR3b3JrIiwibmFtZSI6ImFuZHJpb2xleHNpdSIsInBpY3R1cmUiOiJodHRwczovL2xoNS5nb29nbGV1c2VyY29udGVudC5jb20vLXgyV2s3QTMzTjJnL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUVZL3AzbzRHZUMtR0E0L3M5Ni1jL3Bob3RvLmpwZyIsImF1ZCI6InF1b3Rlc29jaWFsbmV0d29yayIsImF1dGhfdGltZSI6MTUyOTE3MzU1NCwidXNlcl9pZCI6IkFoeWRoME42RlFiaVhkdVd3Q1BmZDJidmlyMzMiLCJzdWIiOiJBaHlkaDBONkZRYmlYZHVXd0NQZmQyYnZpcjMzIiwiaWF0IjoxNTI5MTczNTU0LCJleHAiOjE1MjkxNzcxNTQsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTgxNDEwNjEyNDAwOTkwMzIyMjciXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.RjX0jBzZL78U2ROiH8aYulNbYu8B4eIhJmgawgBcxcRK_pUIQQVkli4Lu4LlN1YSHa6DXCgq-rbUusiHHpqpOE415_6qFYWiPBpGXPa0x6LsS7a8MJPauq5GLx7tORyEqBuV9qy0ewY4ZJxQ_cTcXodCTyVY11-yx_a6fE6tEjGj9J3kbbNiIeyEMymI5zrgDtytFGELheNzfvazw-vPkhxmSJZYQIQQFCifFIzneNLPTJQjt1I2QGdCtvPJy3sIoSvJ0wL5kkSx6dPU3OCywuc9VkxWvgNWRSBQAD5ILbmO0TaPRtkfhR75I321dhupcXprddpKrQ6O44QNCr-PLw");
            var response = await client.GetAsync(url);

            var result = await response.Content.ReadAsStringAsync();

            var parsedResult = JsonConvert.DeserializeObject<List<Group>>(result);

            var listItems = parsedResult.Select(g => new GroupModel()
            {
                GroupId = g.Id.ToString(),
                Name = g.Name
            }).ToList();

            return new ResponseWrapper<List<GroupModel>>()
            {
                Item = listItems
            };
        }

        public static async Task<ResponseWrapper<List<Group>>> GetGroupsModel()
        {
            var client = GetClient();
            var url = "https://quotesocialnetwork.azurewebsites.net/api/Group/user/";

            //Constants.API_URL + Constants.ACCOUNT_INFO_URL;
            client.DefaultRequestHeaders.Remove("Authorization");
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {QSN.Helpers.Settings.UserToken}");
            //$"Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjdhM2QxOTA0ZjE4ZTI1Nzk0ODgzMWVhYjgwM2UxMmI3OTcxZTEzYWIifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcXVvdGVzb2NpYWxuZXR3b3JrIiwibmFtZSI6ImFuZHJpb2xleHNpdSIsInBpY3R1cmUiOiJodHRwczovL2xoNS5nb29nbGV1c2VyY29udGVudC5jb20vLXgyV2s3QTMzTjJnL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUVZL3AzbzRHZUMtR0E0L3M5Ni1jL3Bob3RvLmpwZyIsImF1ZCI6InF1b3Rlc29jaWFsbmV0d29yayIsImF1dGhfdGltZSI6MTUyOTE3MzU1NCwidXNlcl9pZCI6IkFoeWRoME42RlFiaVhkdVd3Q1BmZDJidmlyMzMiLCJzdWIiOiJBaHlkaDBONkZRYmlYZHVXd0NQZmQyYnZpcjMzIiwiaWF0IjoxNTI5MTczNTU0LCJleHAiOjE1MjkxNzcxNTQsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTgxNDEwNjEyNDAwOTkwMzIyMjciXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.RjX0jBzZL78U2ROiH8aYulNbYu8B4eIhJmgawgBcxcRK_pUIQQVkli4Lu4LlN1YSHa6DXCgq-rbUusiHHpqpOE415_6qFYWiPBpGXPa0x6LsS7a8MJPauq5GLx7tORyEqBuV9qy0ewY4ZJxQ_cTcXodCTyVY11-yx_a6fE6tEjGj9J3kbbNiIeyEMymI5zrgDtytFGELheNzfvazw-vPkhxmSJZYQIQQFCifFIzneNLPTJQjt1I2QGdCtvPJy3sIoSvJ0wL5kkSx6dPU3OCywuc9VkxWvgNWRSBQAD5ILbmO0TaPRtkfhR75I321dhupcXprddpKrQ6O44QNCr-PLw");
            var response = await client.GetAsync(url);

            var result = await response.Content.ReadAsStringAsync();

            var parsedResult = JsonConvert.DeserializeObject<List<Group>>(result);

            var resultItems = new List<Group>();

            foreach(var item in parsedResult)
            {
                var gUrl = "https://quotesocialnetwork.azurewebsites.net/api/Group/" + item.Id;
                var gResponse = await client.GetAsync(gUrl);

                var gResult = await gResponse.Content.ReadAsStringAsync();

                resultItems.Add(JsonConvert.DeserializeObject<Group>(gResult));
            }

            return new ResponseWrapper<List<Group>>()
            {
                Item = resultItems
            };
        }

        public static async Task<ResponseWrapper<GroupModel>> CreateGroup(string name)
        {
            //var apiModel = new Quote()
            //{
            //    Author = model.AuthorName,
            //    Location = model.Location,
            //    Text = model.Text,
            //    Date = model.Date,
            //    UserId = "Ahydh0N6FQbiXduWwCPfd2bvir33"
            //};

            var apiModel = new Group()
            {
                Name = name
            };

            var client = GetClient();
            var url = "https://quotesocialnetwork.azurewebsites.net/api/Group";

            //Constants.API_URL + Constants.ACCOUNT_INFO_URL;
            client.DefaultRequestHeaders.Remove("Authorization");
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {QSN.Helpers.Settings.UserToken}");
            client.DefaultRequestHeaders.Add("Accept", "application/json");

            var content = new StringContent(JsonConvert.SerializeObject(apiModel), Encoding.UTF8, "application/json");

            var responseMessage = await client.PostAsync(url, content);

            var result = await responseMessage.Content.ReadAsStringAsync();
            
            var group = JsonConvert.DeserializeObject<Group>(result);

            url = "https://quotesocialnetwork.azurewebsites.net/api/Group/join/" + group.Id;

            client.DefaultRequestHeaders.Remove("Accept");

            var addResponse = await client.PostAsync(url,null);

            return new ResponseWrapper<GroupModel>()
            {
                IsError = false
            };
        }

        //public static async Task<ResponseWrapper<GroupModel>> EditGroup(GroupModel model)
        //{
        //    return null;
        //}

        //public static async Task<ResponseWrapper<GroupModel>> DeleteGroup(string id)
        //{
        //    return null;
        //}
    }
}
