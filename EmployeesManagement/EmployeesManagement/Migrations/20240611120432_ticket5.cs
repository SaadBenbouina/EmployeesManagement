﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployeesManagement.Migrations
{
    /// <inheritdoc />
    public partial class ticket5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "Persons",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "AbsenceStatus",
                table: "Persons",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AbsenceStatus",
                table: "Persons");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Persons",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
