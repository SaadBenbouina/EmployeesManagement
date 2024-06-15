using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployeesManagement.Migrations
{
    /// <inheritdoc />
    public partial class new5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkingTimes_Adresses_AbsenceId",
                table: "WorkingTimes");

            migrationBuilder.DropIndex(
                name: "IX_WorkingTimes_AbsenceId",
                table: "WorkingTimes");

            migrationBuilder.DropColumn(
                name: "AbsenceId",
                table: "WorkingTimes");

            migrationBuilder.DropColumn(
                name: "AbsenceDay",
                table: "Persons");

            migrationBuilder.RenameColumn(
                name: "AbsenceStatus",
                table: "Persons",
                newName: "WorkStatus");

            migrationBuilder.AlterColumn<string>(
                name: "Departement",
                table: "Persons",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "AbsencePerson",
                columns: table => new
                {
                    AbsencesId = table.Column<int>(type: "int", nullable: false),
                    PersonId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AbsencePerson", x => new { x.AbsencesId, x.PersonId });
                    table.ForeignKey(
                        name: "FK_AbsencePerson_Absences_AbsencesId",
                        column: x => x.AbsencesId,
                        principalTable: "Absences",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AbsencePerson_Persons_PersonId",
                        column: x => x.PersonId,
                        principalTable: "Persons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AbsencePerson_PersonId",
                table: "AbsencePerson",
                column: "PersonId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AbsencePerson");

            migrationBuilder.RenameColumn(
                name: "WorkStatus",
                table: "Persons",
                newName: "AbsenceStatus");

            migrationBuilder.AddColumn<int>(
                name: "AbsenceId",
                table: "WorkingTimes",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Departement",
                table: "Persons",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "AbsenceDay",
                table: "Persons",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_WorkingTimes_AbsenceId",
                table: "WorkingTimes",
                column: "AbsenceId");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkingTimes_Adresses_AbsenceId",
                table: "WorkingTimes",
                column: "AbsenceId",
                principalTable: "Adresses",
                principalColumn: "Id");
        }
    }
}
