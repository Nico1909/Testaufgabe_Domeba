using Microsoft.EntityFrameworkCore;
using NetCore_Webanwendung.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Add SqlServer Databases
builder.Services.AddDbContext<BusinessDbContext>((options) => {
    options.UseSqlServer(builder.Configuration.GetConnectionString("BusinessConnection"));
    });

builder.Services.AddDbContext<UserDbContext>((options) => {
    options.UseSqlServer(builder.Configuration.GetConnectionString("UserConnection"));
});

//Add SQLite Databases
builder.Services.AddDbContext<BusinessDbContextSQLite>((options) => {
    options.UseSqlite(builder.Configuration.GetConnectionString("BusinessConnectionSQLite"));
});

builder.Services.AddDbContext<UserDbContextSQLite>((options) => {
    options.UseSqlite(builder.Configuration.GetConnectionString("UserConnectionSQLite"));
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.UseAuthorization();

app.MapControllers();

app.Run();
