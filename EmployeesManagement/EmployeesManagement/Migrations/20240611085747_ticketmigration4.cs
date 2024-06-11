using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployeesManagement.Migrations
{
    /// <inheritdoc />
    public partial class ticketmigration4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BusnessTrips_Adresses_With_WhomId",
                table: "BusnessTrips");

            migrationBuilder.DropIndex(
                name: "IX_BusnessTrips_With_WhomId",
                table: "BusnessTrips");

            migrationBuilder.DropColumn(
                name: "With_WhomId",
                table: "BusnessTrips");

            migrationBuilder.DropColumn(
                name: "AbsenceId",
                table: "Absences");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Persons",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "TripId",
                table: "Persons",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Persons_TripId",
                table: "Persons",
                column: "TripId");

            migrationBuilder.AddForeignKey(
                name: "FK_Persons_BusnessTrips_TripId",
                table: "Persons",
                column: "TripId",
                principalTable: "BusnessTrips",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Persons_BusnessTrips_TripId",
                table: "Persons");

            migrationBuilder.DropIndex(
                name: "IX_Persons_TripId",
                table: "Persons");

            migrationBuilder.DropColumn(
                name: "TripId",
                table: "Persons");

            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "Persons",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "With_WhomId",
                table: "BusnessTrips",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AbsenceId",
                table: "Absences",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_BusnessTrips_With_WhomId",
                table: "BusnessTrips",
                column: "With_WhomId");

            migrationBuilder.AddForeignKey(
                name: "FK_BusnessTrips_Adresses_With_WhomId",
                table: "BusnessTrips",
                column: "With_WhomId",
                principalTable: "Adresses",
                principalColumn: "Id");
        }
    }
}
