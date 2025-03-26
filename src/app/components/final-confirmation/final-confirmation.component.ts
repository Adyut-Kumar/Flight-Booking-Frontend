import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-final-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './final-confirmation.component.html',
  styleUrls: ['./final-confirmation.component.css']
})
export class FinalConfirmationComponent implements OnInit {
  referenceNumber: string = '';

  constructor(private route: ActivatedRoute,private router: Router) {}

 
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.referenceNumber  = params['referenceNumber'];
    });
  }
  goHome() {
    this.router.navigate(['/']);
  }
  
}
