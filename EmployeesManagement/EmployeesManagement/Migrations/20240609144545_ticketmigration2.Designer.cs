﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace EmployeesManagement.Migrations
{
    [DbContext(typeof(MyContext))]
    [Migration("20240609144545_ticketmigration2")]
    partial class ticketmigration2
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("EmployeesManagement.Model.Absence", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AbsenceId")
                        .HasColumnType("int");

                    b.Property<bool>("Approved")
                        .HasColumnType("bit");

                    b.Property<DateTime>("From")
                        .HasColumnType("datetime2");

                    b.Property<string>("Reason")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("To")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Absences");
                });

            modelBuilder.Entity("EmployeesManagement.Model.Adress", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PostalCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Raum")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("State")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Street")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Adresses");
                });

            modelBuilder.Entity("EmployeesManagement.Model.BusnessTrip", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("Alone")
                        .HasColumnType("bit");

                    b.Property<int>("BusnessTripId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("With_WhomId")
                        .HasColumnType("int");

                    b.Property<int>("WorkInfoId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("With_WhomId");

                    b.HasIndex("WorkInfoId");

                    b.ToTable("BusnessTrips");
                });

            modelBuilder.Entity("EmployeesManagement.Model.Person", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AbsenceDay")
                        .HasColumnType("int");

                    b.Property<string>("Departement")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Salutation")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Speciality")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<int>("WorkInfoId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("WorkInfoId");

                    b.ToTable("Persons");
                });

            modelBuilder.Entity("EmployeesManagement.Model.Ticket", b =>
                {
                    b.Property<int>("TicketID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TicketID"));

                    b.Property<bool>("Attributed")
                        .HasColumnType("bit");

                    b.Property<bool>("Completed")
                        .HasColumnType("bit");

                    b.Property<DateTime>("Deadline")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ResponsibleId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("TicketID");

                    b.HasIndex("ResponsibleId");

                    b.ToTable("Tickets");
                });

            modelBuilder.Entity("EmployeesManagement.Model.WorkingTime", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AbsenceId")
                        .HasColumnType("int");

                    b.Property<int>("AdressId")
                        .HasColumnType("int");

                    b.Property<DateTime>("From")
                        .HasColumnType("datetime2");

                    b.Property<string>("NameOfProject")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("To")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("AbsenceId");

                    b.HasIndex("AdressId");

                    b.ToTable("WorkingTimes");
                });

            modelBuilder.Entity("EmployeesManagement.Model.BusnessTrip", b =>
                {
                    b.HasOne("EmployeesManagement.Model.Adress", "With_Whom")
                        .WithMany()
                        .HasForeignKey("With_WhomId");

                    b.HasOne("EmployeesManagement.Model.WorkingTime", "WorkInfo")
                        .WithMany()
                        .HasForeignKey("WorkInfoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("With_Whom");

                    b.Navigation("WorkInfo");
                });

            modelBuilder.Entity("EmployeesManagement.Model.Person", b =>
                {
                    b.HasOne("EmployeesManagement.Model.WorkingTime", "WorkInfo")
                        .WithMany()
                        .HasForeignKey("WorkInfoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("WorkInfo");
                });

            modelBuilder.Entity("EmployeesManagement.Model.Ticket", b =>
                {
                    b.HasOne("EmployeesManagement.Model.Person", "Responsible")
                        .WithMany("Tickets")
                        .HasForeignKey("ResponsibleId");

                    b.Navigation("Responsible");
                });

            modelBuilder.Entity("EmployeesManagement.Model.WorkingTime", b =>
                {
                    b.HasOne("EmployeesManagement.Model.Adress", "Absence")
                        .WithMany()
                        .HasForeignKey("AbsenceId");

                    b.HasOne("EmployeesManagement.Model.Adress", "Adress")
                        .WithMany()
                        .HasForeignKey("AdressId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Absence");

                    b.Navigation("Adress");
                });

            modelBuilder.Entity("EmployeesManagement.Model.Person", b =>
                {
                    b.Navigation("Tickets");
                });
#pragma warning restore 612, 618
        }
    }
}
