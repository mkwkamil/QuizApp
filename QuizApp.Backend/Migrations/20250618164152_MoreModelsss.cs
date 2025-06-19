using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuizApp.Backend.Migrations
{
    /// <inheritdoc />
    public partial class MoreModelsss : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BlackListedTokens",
                columns: table => new
                {
                    Token = table.Column<string>(type: "text", nullable: false),
                    ExpiryDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlackListedTokens", x => x.Token);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BlackListedTokens_Token",
                table: "BlackListedTokens",
                column: "Token",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BlackListedTokens");
        }
    }
}
