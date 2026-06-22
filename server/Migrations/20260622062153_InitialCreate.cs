using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "allergies",
                columns: table => new
                {
                    allergy_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    allergen = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_allergies", x => x.allergy_id);
                });

            migrationBuilder.CreateTable(
                name: "bunks",
                columns: table => new
                {
                    bunk_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    bunk_name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_bunks", x => x.bunk_id);
                });

            migrationBuilder.CreateTable(
                name: "camper_parents",
                columns: table => new
                {
                    camper_parent_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    camper_id = table.Column<int>(type: "integer", nullable: false),
                    parent_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_camper_parents", x => x.camper_parent_id);
                });

            migrationBuilder.CreateTable(
                name: "gender",
                columns: table => new
                {
                    gender_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_gender", x => x.gender_id);
                });

            migrationBuilder.CreateTable(
                name: "medication_admin_log",
                columns: table => new
                {
                    admin_log_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    camper_medication_id = table.Column<int>(type: "integer", nullable: false),
                    admin_time = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_medication_admin_log", x => x.admin_log_id);
                });

            migrationBuilder.CreateTable(
                name: "medications",
                columns: table => new
                {
                    medication_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    medication_name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_medications", x => x.medication_id);
                });

            migrationBuilder.CreateTable(
                name: "nurse_posts",
                columns: table => new
                {
                    post_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nurse_message = table.Column<string>(type: "text", nullable: false),
                    created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_nurse_posts", x => x.post_id);
                });

            migrationBuilder.CreateTable(
                name: "parent",
                columns: table => new
                {
                    parent_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    first_name = table.Column<string>(type: "text", nullable: false),
                    last_name = table.Column<string>(type: "text", nullable: false),
                    phone = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_parent", x => x.parent_id);
                });

            migrationBuilder.CreateTable(
                name: "campers",
                columns: table => new
                {
                    camper_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    first_name = table.Column<string>(type: "text", nullable: false),
                    last_name = table.Column<string>(type: "text", nullable: false),
                    gender = table.Column<int>(type: "integer", nullable: false),
                    date_of_birth = table.Column<DateOnly>(type: "date", nullable: false),
                    bunk_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_campers", x => x.camper_id);
                    table.ForeignKey(
                        name: "FK_campers_bunks_bunk_id",
                        column: x => x.bunk_id,
                        principalTable: "bunks",
                        principalColumn: "bunk_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "camper_allergies",
                columns: table => new
                {
                    camper_allergies_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    camper_id = table.Column<int>(type: "integer", nullable: false),
                    allergy_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_camper_allergies", x => x.camper_allergies_id);
                    table.ForeignKey(
                        name: "FK_camper_allergies_allergies_allergy_id",
                        column: x => x.allergy_id,
                        principalTable: "allergies",
                        principalColumn: "allergy_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_camper_allergies_campers_camper_id",
                        column: x => x.camper_id,
                        principalTable: "campers",
                        principalColumn: "camper_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "camper_medications",
                columns: table => new
                {
                    camper_medication_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    camper_id = table.Column<int>(type: "integer", nullable: false),
                    medication_id = table.Column<int>(type: "integer", nullable: false),
                    dosage = table.Column<string>(type: "text", nullable: false),
                    dosage_unit = table.Column<string>(type: "text", nullable: false),
                    frequency = table.Column<string>(type: "text", nullable: false),
                    instructions = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_camper_medications", x => x.camper_medication_id);
                    table.ForeignKey(
                        name: "FK_camper_medications_campers_camper_id",
                        column: x => x.camper_id,
                        principalTable: "campers",
                        principalColumn: "camper_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_camper_medications_medications_medication_id",
                        column: x => x.medication_id,
                        principalTable: "medications",
                        principalColumn: "medication_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_camper_allergies_allergy_id",
                table: "camper_allergies",
                column: "allergy_id");

            migrationBuilder.CreateIndex(
                name: "IX_camper_allergies_camper_id",
                table: "camper_allergies",
                column: "camper_id");

            migrationBuilder.CreateIndex(
                name: "IX_camper_medications_camper_id",
                table: "camper_medications",
                column: "camper_id");

            migrationBuilder.CreateIndex(
                name: "IX_camper_medications_medication_id",
                table: "camper_medications",
                column: "medication_id");

            migrationBuilder.CreateIndex(
                name: "IX_campers_bunk_id",
                table: "campers",
                column: "bunk_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "camper_allergies");

            migrationBuilder.DropTable(
                name: "camper_medications");

            migrationBuilder.DropTable(
                name: "camper_parents");

            migrationBuilder.DropTable(
                name: "gender");

            migrationBuilder.DropTable(
                name: "medication_admin_log");

            migrationBuilder.DropTable(
                name: "nurse_posts");

            migrationBuilder.DropTable(
                name: "parent");

            migrationBuilder.DropTable(
                name: "allergies");

            migrationBuilder.DropTable(
                name: "campers");

            migrationBuilder.DropTable(
                name: "medications");

            migrationBuilder.DropTable(
                name: "bunks");
        }
    }
}
