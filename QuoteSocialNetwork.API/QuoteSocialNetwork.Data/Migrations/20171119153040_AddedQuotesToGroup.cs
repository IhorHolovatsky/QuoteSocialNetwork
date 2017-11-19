using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace QuoteSocialNetwork.Data.Migrations
{
    public partial class AddedQuotesToGroup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "GroupId",
                table: "Quotes",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Quotes_GroupId",
                table: "Quotes",
                column: "GroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_Quotes_Groups_GroupId",
                table: "Quotes",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Quotes_Groups_GroupId",
                table: "Quotes");

            migrationBuilder.DropIndex(
                name: "IX_Quotes_GroupId",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "GroupId",
                table: "Quotes");
        }
    }
}
