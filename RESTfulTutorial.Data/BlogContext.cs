namespace RESTfulTutorial.Data
{
    using System.Data.Entity;

    public class BlogContext : DbContext
    {
        public BlogContext()
            : base("BlogContext")
        {
        }

        public DbSet<BlogPost> BlogPosts { get; set; }
    }
}
