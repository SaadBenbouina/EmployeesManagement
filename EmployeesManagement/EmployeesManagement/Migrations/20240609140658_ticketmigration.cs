using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployeesManagement.Migrations
{
    /// <inheritdoc />
    public partial class ticketmigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NameOfCompany",
                table: "WorkingTimes",
                newName: "NameOfProject");

            migrationBuilder.AddColumn<int>(
                name: "WorkInfoId",
                table: "Persons",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_ResponsibleId",
                table: "Tickets",
                column: "ResponsibleId");

            migrationBuilder.CreateIndex(
                name: "IX_Persons_WorkInfoId",
                table: "Persons",
                column: "WorkInfoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Persons_WorkingTimes_WorkInfoId",
                table: "Persons",
                column: "WorkInfoId",
                principalTable: "WorkingTimes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Persons_ResponsibleId",
                table: "Tickets",
                column: "ResponsibleId",
                principalTable: "Persons",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Persons_WorkingTimes_WorkInfoId",
                table: "Persons");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Persons_ResponsibleId",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_ResponsibleId",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Persons_WorkInfoId",
                table: "Persons");

            migrationBuilder.DropColumn(
                name: "WorkInfoId",
                table: "Persons");

            migrationBuilder.RenameColumn(
                name: "NameOfProject",
                table: "WorkingTimes",
                newName: "NameOfCompany");
        }
    }
}
