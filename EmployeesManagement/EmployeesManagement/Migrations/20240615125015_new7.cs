using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployeesManagement.Migrations
{
    /// <inheritdoc />
    public partial class new7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Persons_WorkingTimes_WorkInfoId",
                table: "Persons");

            migrationBuilder.AlterColumn<int>(
                name: "WorkInfoId",
                table: "Persons",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Persons_WorkingTimes_WorkInfoId",
                table: "Persons",
                column: "WorkInfoId",
                principalTable: "WorkingTimes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Persons_WorkingTimes_WorkInfoId",
                table: "Persons");

            migrationBuilder.AlterColumn<int>(
                name: "WorkInfoId",
                table: "Persons",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Persons_WorkingTimes_WorkInfoId",
                table: "Persons",
                column: "WorkInfoId",
                principalTable: "WorkingTimes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
