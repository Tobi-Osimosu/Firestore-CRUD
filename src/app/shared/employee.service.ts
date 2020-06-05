import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Employee } from "./employee.model";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  formData: Employee = {
    id: "",
    fullName: "",
    position: "",
    empCode: "",
    mobile: "",
  };
  
  employeesCollection: AngularFirestoreCollection<Employee>;
  employees: Observable<Employee[]>;
  employeeDoc: AngularFirestoreDocument<Employee>;

  constructor(private afs: AngularFirestore) {
    this.employeesCollection = this.afs.collection(`employees`, (ref) =>
      ref.orderBy("empCode", "asc")
    );

    this.employees = this.employeesCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as Employee;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  submit(data) {
    this.employeesCollection.add(data);
  }

  getEmployees() {
    return this.employees;
  }

  updateEmployee(employee: Employee) {
    this.employeeDoc = this.afs.doc(`employees/${this.formData.id}`);
    this.employeeDoc.update(employee);
  }

  deleteEmployee() {
    this.employeeDoc = this.afs.doc(`employees/${this.formData.id}`);
    this.employeeDoc.delete();
  }
}
