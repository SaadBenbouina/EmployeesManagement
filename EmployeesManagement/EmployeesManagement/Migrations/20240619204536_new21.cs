using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployeesManagement.Migrations
{
    /// <inheritdoc />
    public partial class new21 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Persons_ResponsibleId",
                table: "Tickets");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Persons_ResponsibleId",
                table: "Tickets",
                column: "ResponsibleId",
                principalTable: "Persons",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Persons_ResponsibleId",
                table: "Tickets");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Persons_ResponsibleId",
                table: "Tickets",
                column: "ResponsibleId",
                principalTable: "Persons",
                principalColumn: "Id");
        }
    }
}
