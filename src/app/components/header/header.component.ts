import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isMenuOpen = false;
  private resizeListener: (() => void) | undefined;

  constructor(private sanitizer: DomSanitizer, @Inject(PLATFORM_ID) private platformId: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.resizeListener = this.onResize.bind(this);
      window.addEventListener('resize', this.resizeListener);
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  private onResize() {
    if (isPlatformBrowser(this.platformId) && window.innerWidth > 768) {
      this.isMenuOpen = false; // Close the menu when transitioning to desktop view
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }
}
