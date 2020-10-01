using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using TrainingManagement.FirestoreLogger;
using TrainingManagement.Interfaces;
using TrainingManagement.Services;
using TrainingsManagament.Configs;


namespace TrainingManagement
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
            services.AddControllersWithViews();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp2/dist";
            });
            services.AddSession();
            FirebaseApp.Create(new AppOptions()
            {
                Credential = GoogleCredential.FromFile(@"C:\Users\Mihai-AlexandruIstra\Downloads\trainingmanagement-5cda0-firebase-adminsdk-j780k-902a921430.json"),

            });
            services.AddLocalization();
            services.AddScoped<IFirestore, FirestoreService>();
            services.AddScoped<ITraining>(x => new TrainingsService(x.GetService<IFirestore>(),x.GetService<IEmailSender>()));
            services.AddScoped<IEmployee>(x => new EmployeeService(x.GetService<IFirestore>()));
            services.Configure<SmtpConfig>(Configuration.GetSection("SmtpSettings"));
            services.AddSingleton<IEmailSender, EmailService>();

        }
   

            // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
            public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();
            app.UseSession();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });
            loggerFactory.AddFirestoreLogger(config=> { } 
            );
            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp2";

                if (env.IsDevelopment())
                {
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                }
            });
        }
    }
}
