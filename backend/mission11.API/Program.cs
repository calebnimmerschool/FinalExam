using Microsoft.EntityFrameworkCore;
using mission11.API.Data;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Prevent cycles when serializing EF Core navigation properties
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi(); // Swagger/OpenAPI

// Enable CORS for React frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOrigin", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// Configure SQLite database using the connection string from appsettings.json
builder.Services.AddDbContext<AgencyContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Enable CORS
app.UseCors("AllowAnyOrigin");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi(); // Swagger UI
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();


