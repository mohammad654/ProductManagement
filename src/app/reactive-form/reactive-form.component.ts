import { Component ,OnInit} from '@angular/core';
import { Customer } from './customer';

// import{FormGroup,FormControl}from '@angular/forms'
import{FormGroup,FormBuilder,Validators,AbstractControl,ValidatorFn,FormArray}from '@angular/forms'

function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { range: true };
    }
    return null;
  };
}
function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');
  if (emailControl?.pristine || confirmControl?.pristine) {
    return null;
  }

  if (emailControl?.value === confirmControl?.value) {
    return null;
  }
  return { match: true };
}

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit{
 customer = new Customer();
 customerForm!:FormGroup;
constructor(private fb: FormBuilder) { }
  get addresses(): FormArray {
    return this.customerForm.get('addresses') as FormArray;
  }


   ngOnInit():void{
//      this.customerForm=new FormGroup({
//          firstName: new FormControl(''),
//          lastName: new FormControl(''),
//          email: new FormControl(''),
//          sendCatalog: new FormControl(''),
//      });
     this.customerForm=this.fb.group({
      firstName:['' ,[Validators.required, Validators.minLength(3)]],
      lastName:['',[Validators.required, Validators.minLength(3)]],
      phone: '',
      notification:'',
      emailGroup: this.fb.group({
             email: ['', [Validators.required, Validators.email]],
             confirmEmail: ['', Validators.required],
           }, { validator: emailMatcher }),
      rating:[null,ratingRange(1, 5)],
      sendCatalog:true,
     addresses: this.fb.array([this.buildAddress()])
     })
//
     this.customerForm.get('notification')?.valueChanges.subscribe( value=>{
//      console.log(value)
       this.setNotification(value);
     })
//       this.customerForm.valueChanges.subscribe( value=>{
// //      console.log(value);
//      this.setNotification(value);
//      })

   }
   save(){
      console.log(this.customerForm);
      console.log('Saved: ' + JSON.stringify(this.customerForm.value));
   }
  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone');
    if (notifyVia === 'text') {
      phoneControl?.setValidators(Validators.required);
    } else {
      phoneControl?.clearValidators();
    }
    phoneControl?.updateValueAndValidity();
  }
   populateTestData(){
       this.customerForm.patchValue({  //patchValue
         firstName: 'Mohammad Ali',
         lastName: 'Shikhi',
         emailGroup: {
               email: 'Mo@gmail.com',
               confirmEmail: 'emil'
             },
          sendCatalog: true,
          phone: '+31',
          notification: 'text@gmail.com',
          rating:'5'

       });
   }
     addAddress(): void {
       this.addresses.push(this.buildAddress());
     }
  buildAddress(): FormGroup {
    return this.fb.group({
      addressType: 'home',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: ''
    });
  }
}
