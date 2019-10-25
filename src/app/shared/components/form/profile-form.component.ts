import { Component, OnInit} from "@angular/core"
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { currentUser } from "../../../core/clientConfig"

@Component({
  selector: 'profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})

export class ProfileFormComponent {

  formGroup: FormGroup
  defaultCountryName: string = currentUser.country.name
  defaultCountryId: number = currentUser.country.id

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm()
  }

  initForm(){
    this.formGroup = this.formBuilder.group({
      name: ['', [
          Validators.required,
          Validators.pattern(/[А-я]|[A-z]/)
        ]
      ],
      sername: ['', [
          Validators.required,
          Validators.pattern(/[А-я]|[A-z]/)
        ]
      ],
      birthdate: [''],
      email: ['', [
        Validators.required, Validators.email
      ]],
      country: [''],
      city: ['', [
          Validators.required
        ]
      ],
      gender: ['', [
          Validators.required
        ]
      ]
    })

    this.formGroup.controls['country'].setValue(this.defaultCountryId, {onlySelf: true});
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName]
    const result = control.invalid && control.touched

    return result
  }

  onSubmit() {
    const controls = this.formGroup.controls;

    if (this.formGroup.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched())

      return
    }

    console.log(this.formGroup.value)
  }
}
