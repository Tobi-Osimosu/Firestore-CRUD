import { EmployeeService } from "./../../shared/employee.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"],
})
export class EmployeeComponent implements OnInit {
  form: FormGroup;
  constructor(public empSvc: EmployeeService, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      fullName: [null, Validators.required],
      position: [null, Validators.required],
      empCode: [null, Validators.required],
      mobile: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.empSvc.formData.id == "") {
      this.empSvc.submit(this.form.value);
      this.form.reset();
    } else {
      this.empSvc.updateEmployee(this.form.value);
      this.empSvc.formData = {
        id: "",
        fullName: "",
        position: "",
        empCode: "",
        mobile: "",
      };
      this.form.reset();
    }
  }

  onDelete() {
    this.empSvc.deleteEmployee();
    this.empSvc.formData = {
      id: "",
      fullName: "",
      position: "",
      empCode: "",
      mobile: "",
    };
    this.form.reset();
  }
}
