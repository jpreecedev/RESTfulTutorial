using System.Data.Entity;

namespace RESTfulTutorial.Data
{
    using System;

    public class BlogInitializer : DropCreateDatabaseAlways<BlogContext>
    {
        protected override void Seed(BlogContext context)
        {
            context.BlogPosts.AddRange(new[]
                                        {
                                            new BlogPost { Id = 0, Title = "Resilient Connection for Entity Framework 6", Url = new Uri("http://jpreecedev.com/2014/02/05/resilient-connection-for-entity-framework-6/") },
                                            new BlogPost { Id = 1, Title = "How to pass Microsoft Exam 70-486 (Developing ASP.NET MVC 4 Web Applications) in 30 days", Url = new Uri("http://jpreecedev.com/2014/02/01/how-to-pass-microsoft-exam-70-486-developing-asp-net-mvc-4-web-applications-in-30-days/") },
                                            new BlogPost { Id = 2, Title = "5 easy security enhancements for your ASP .NET application", Url = new Uri("http://jpreecedev.com/2014/01/26/5-easy-security-enhancements-for-your-asp-net-application/") },
                                            new BlogPost { Id = 3, Title = "10 things every software developer should do in 2014", Url = new Uri("http://jpreecedev.com/2014/01/18/10-things-every-software-developer-should-do-in-2014/") },
                                            new BlogPost { Id = 4, Title = "15 reasons why I can’t work without JetBrains ReSharper", Url = new Uri("http://jpreecedev.com/2013/12/28/15-reasons-why-i-cant-work-without-jetbrains-resharper/") }
                                        });
        }
    }
}
