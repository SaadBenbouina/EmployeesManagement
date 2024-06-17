using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployeesManagement.Migrations
{
    /// <inheritdoc />
    public partial class new11 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BusnessTrips_WorkingTimes_WorkInfoId",
                table: "BusnessTrips");

            migrationBuilder.DropForeignKey(
                name: "FK_Persons_WorkingTimes_WorkInfoId",
                table: "Persons");

            migrationBuilder.DropTable(
                name: "WorkingTimes");

            migrationBuilder.RenameColumn(
                name: "WorkInfoId",
                table: "Persons",
                newName: "AdressId");

            migrationBuilder.RenameIndex(
                name: "IX_Persons_WorkInfoId",
                table: "Persons",
                newName: "IX_Persons_AdressId");

            migrationBuilder.RenameColumn(
                name: "WorkInfoId",
                table: "BusnessTrips",
                newName: "AdressId");

            migrationBuilder.RenameIndex(
                name: "IX_BusnessTrips_WorkInfoId",
                table: "BusnessTrips",
                newName: "IX_BusnessTrips_AdressId");

            migrationBuilder.AddColumn<DateTime>(
                name: "From",
                table: "Persons",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "To",
                table: "Persons",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "From",
                table: "BusnessTrips",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "To",
                table: "BusnessTrips",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddForeignKey(
                name: "FK_BusnessTrips_Adresses_AdressId",
                table: "BusnessTrips",
                column: "AdressId",
                principalTable: "Adresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Persons_Adresses_AdressId",
                table: "Persons",
                column: "AdressId",
                principalTable: "Adresses",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BusnessTrips_Adresses_AdressId",
                table: "BusnessTrips");

            migrationBuilder.DropForeignKey(
                name: "FK_Persons_Adresses_AdressId",
                table: "Persons");

            migrationBuilder.DropColumn(
                name: "From",
                table: "Persons");

            migrationBuilder.DropColumn(
                name: "To",
                table: "Persons");

            migrationBuilder.DropColumn(
                name: "From",
                table: "BusnessTrips");

            migrationBuilder.DropColumn(
                name: "To",
                table: "BusnessTrips");

            migrationBuilder.RenameColumn(
                name: "AdressId",
                table: "Persons",
                newName: "WorkInfoId");

            migrationBuilder.RenameIndex(
                name: "IX_Persons_AdressId",
                table: "Persons",
                newName: "IX_Persons_WorkInfoId");

            migrationBuilder.RenameColumn(
                name: "AdressId",
                table: "BusnessTrips",
                newName: "WorkInfoId");

            migrationBuilder.RenameIndex(
                name: "IX_BusnessTrips_AdressId",
                table: "BusnessTrips",
                newName: "IX_BusnessTrips_WorkInfoId");

            migrationBuilder.CreateTable(
                name: "WorkingTimes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AdressId = table.Column<int>(type: "int", nullable: false),
                    From = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NameOfProject = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    To = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkingTimes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkingTimes_Adresses_AdressId",
                        column: x => x.AdressId,
                        principalTable: "Adresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WorkingTimes_AdressId",
                table: "WorkingTimes",
                column: "AdressId");

            migrationBuilder.AddForeignKey(
                name: "FK_BusnessTrips_WorkingTimes_WorkInfoId",
                table: "BusnessTrips",
                column: "WorkInfoId",
                principalTable: "WorkingTimes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Persons_WorkingTimes_WorkInfoId",
                table: "Persons",
                column: "WorkInfoId",
                principalTable: "WorkingTimes",
                principalColumn: "Id");
        }
    }
}
