import { Employee } from "./../../shared/employee.model";
import { EmployeeService } from "./../../shared/employee.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];

  constructor(private empSvc: EmployeeService) {}

  ngOnInit() {
    this.empSvc.getEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }

  onEdit(employee: Employee) {
    this.empSvc.formData = employee;
  }
}
