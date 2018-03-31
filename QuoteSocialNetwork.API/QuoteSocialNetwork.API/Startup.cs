using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using QuoteSocialNetwork.Data;
using QuoteSocialNetworkAPI.SignalRHubs;

namespace QuoteSocialNetworkAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();    
            services.AddMvc()
                    .AddJsonOptions(opt => {
                        opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                    });
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.IncludeErrorDetails = true;
                        options.Authority = "https://securetoken.google.com/quotesocialnetwork";
                        options.TokenValidationParameters = new TokenValidationParameters
                           {
                            ValidateIssuer = true,
                            ValidIssuer = "https://securetoken.google.com/quotesocialnetwork",
                            ValidateAudience = true,
                            ValidAudience = "quotesocialnetwork",
                            ValidateLifetime = true
                        };
                    });

            services.AddSignalR();    

            services.AddDbContext<QuoteNetDatabaseContext>(options => options.UseSqlServer(Configuration.GetConnectionString(nameof(QuoteNetDatabaseContext)))); 
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseAuthentication();
            app.UseCors(options => options.AllowAnyOrigin()
                                          .AllowAnyMethod()
                                          .AllowAnyHeader()
                                          .AllowCredentials());
            app.UseMvc();
            ConfigureHubs(app);
        }

        public void ConfigureHubs(IApplicationBuilder app) {
            app.UseSignalR(routes =>
            {
                routes.MapHub<QuoteHub>("quotes");
            });
        }
    }
}
