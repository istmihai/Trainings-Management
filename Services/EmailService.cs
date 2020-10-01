using System.Collections.Generic;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using TrainingManagement.Interfaces;
using TrainingManagement.Models;
using TrainingsManagament.Configs;

namespace TrainingManagement.Services
{
    public class EmailService : IEmailSender
    {
      public async Task TrainingEditNotification(IEnumerable<Employee> employees,Training training)
        {
            foreach(var employee in employees)
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("traniningmanagament@gmail.com", "traniningmanagament@gmail.com"));
                message.To.Add(new MailboxAddress(employee.Username, "mihallex14@gmail.com"));
                message.Subject = "Training Change    Mail";
                message.Body = new TextPart("html")
                {
                    Text = training.Title
                };
                using (var client = new SmtpClient())
                {
                    await client.ConnectAsync("smtp.gmail.com", 587, false);
                    await client.AuthenticateAsync("traniningmanagament@gmail.com", "fNhGcSn6GGqsCkS");
                    await client.SendAsync(message);
                    await client.DisconnectAsync(true);
                }
            }
        }
        public async Task SendActivation(Employee user,string code)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("traniningmanagament@gmail.com", "traniningmanagament@gmail.com"));
            message.To.Add(new MailboxAddress(user.Username, "mihallex14@gmail.com"));
            message.Subject = "Activation Mail";
            message.Body = new TextPart("html")
            {
                Text = code
            };
            using (var client = new SmtpClient())
            {
                await client.ConnectAsync("smtp.gmail.com", 587, false);
                await client.AuthenticateAsync("traniningmanagament@gmail.com", "fNhGcSn6GGqsCkS");
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
        }

        public async Task SendInvitation(Employee user)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("traniningmanagament@gmail.com", "traniningmanagament@gmail.com"));
            message.To.Add(new MailboxAddress(user.Username, "mihallex14@gmail.com"));
            message.Subject = "Invitation Mail";
            message.Body = new TextPart("html")
            {
                Text = $"{user.Username} <br> {user.Email}"
            };
            using (var client = new SmtpClient())
            {
                await client.ConnectAsync("smtp.gmail.com", 587, false);
                await client.AuthenticateAsync("traniningmanagament@gmail.com", "fNhGcSn6GGqsCkS");
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
        }
    }
}
