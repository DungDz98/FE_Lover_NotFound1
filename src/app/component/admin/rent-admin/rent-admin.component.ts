import { Component, OnInit } from '@angular/core';
import {User} from "../../../model/User";
import {Rent} from "../../../model/Rent";
import {RentService} from "../../../service/rent/rent.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {UserService} from "../../../service/user/user.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {TokenService} from "../../../service/in-out/token.service";

@Component({
  selector: 'app-rent-admin',
  templateUrl: './rent-admin.component.html',
  styleUrls: ['./rent-admin.component.css']
})
export class RentAdminComponent implements OnInit {

  // @ts-ignore
  user: User = {};

  rents: Rent[] = [];
  rent: Rent = {};
  id!: number;
  totalLength: any;
  page: number = 1;

  constructor(private rentService: RentService, private activatedRoute: ActivatedRoute, private router: Router,
              private userService: UserService, private angularFireStorage: AngularFireStorage,
              private tokenService: TokenService) {
    this.checkTonken()
  }
  roles = [];
  // @ts-ignore
  jwt: JwtResponse = JSON.parse(localStorage.getItem('jwtResponse'));
  checkTonken() {
    console.log(this.jwt.roles)
    if (!this.jwt){
      this.router.navigate([''])
    }else {
      // @ts-ignore
      for (let i = 0; i < this.jwt.roles?.length; i++) {
        // @ts-ignore
        if (this.jwt.roles[i].authority === 'ROLE_ADMIN'){
          // @ts-ignore
          this.roles.push(this.jwt.roles[i])
        }
      }
      if (this.roles.length != 0){}
      else {
        this.router.navigate(['error-403'])
      }

    }
  }

  ngOnInit(): void {
this.getAllRent();
  }
getAllRent(){
  this.rentService.getAllRent().subscribe((data) => {
    this.rents = data;
  })
}
  changeStatus(id: any, status: number) {
    this.rentService.changeStatus(id, status).subscribe(data => {
      for (let r of this.rents) {
        if (r.id === id) r.status = data.status;
      }
    })
  }

  getRentById(id: any) {
    this.rentService.getRentById(id).subscribe(rent => this.rent = rent);
  }
  // changeStatus(id: any, status: number) {
  //   this.rentService.changeStatus(id ,status).subscribe(data =>{
  //     this.rent = data;
  //     alert('Thao tác thành công');
  //     window.location.reload()
  //   })
  // }
  // changeStatusAndFeedback(id: any, status: number) {
  //   this.rentService.changeStatusAndFeedback(id ,status, this.feedback).subscribe(data =>{
  //     this.rent = data;
  //     alert('Thao tác thành công');
  //     window.location.reload()
  //   })
  // }
  //
  //
  // feedback: string = '';
  // idFeedback!: number;
  // open(idFeedback: any) {
  //   this.idFeedback = idFeedback;
  // }
  //
  // deleteRentById(id: number | undefined) {
  //   console.log(id);
  //   // @ts-ignore
  //   this.rentService.deleteRentById(id).subscribe(() => {
  //     alert("Thành công!");
  //     window.location.reload();
  //   })
  // }

}
