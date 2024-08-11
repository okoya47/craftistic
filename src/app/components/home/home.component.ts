import { Component, HostListener, OnDestroy, AfterViewInit, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy, AfterViewInit {
  ngAfterViewInit() {
    
    // Add animation effect to cards as they come into view
    const cards = document.querySelectorAll('.image-card');
    const options = {
      threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, options);

    cards.forEach(card => {
      observer.observe(card);
    });
  }

  isMenuOpen = false;
  private resizeListener: () => void;
  showPopup = false;
  videoUrl: SafeResourceUrl;
 

  constructor(private sanitizer: DomSanitizer) {
    this.resizeListener = this.onResize.bind(this);
    window.addEventListener('resize', this.resizeListener);
    // Use DomSanitizer to safely set the video URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/dQw4w9WgXcQ');

    }

  
  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  private onResize() {
    if (window.innerWidth > 768) {
      this.isMenuOpen = false; // Close the menu when transitioning to desktop view
    }
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeListener);
  }

}
