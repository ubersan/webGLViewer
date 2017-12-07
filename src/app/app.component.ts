import { Component, ViewChild, ElementRef } from '@angular/core';

declare const THREE: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('container') container: ElementRef;

  renderer = new THREE.WebGLRenderer();
  scene = null;
  camera = null;
  mesh = null;

  constructor() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 1000;

    var controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

    const geometry = new THREE.BoxGeometry(200, 200, 200);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true
    });
    this.mesh = new THREE.Mesh(geometry, material);

    this.scene.add(this.mesh);
  }

  ngAfterViewInit() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }
}
