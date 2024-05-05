import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  @ViewChild('sideNav') sidenav!: MatSidenav;
  
  isCollapsed = true;

  public static isUserLogin: boolean = false;

  getStaticIsUserLogin (): boolean {
    return AppComponent.isUserLogin;
  }
  

  ToggleMenu() {
    if(this.sidenav.opened) {
      this.sidenav.close();
      this.isCollapsed = this.isCollapsed;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }

  
}
