﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuizApp.Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddPublicName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PublicName",
                table: "Users",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PublicName",
                table: "Users");
        }
    }
}
