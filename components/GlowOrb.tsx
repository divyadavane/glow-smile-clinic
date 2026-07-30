"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * GlowOrb — the clinic's signature 3D visual.
 *
 * Upgraded to a single persistent fixed background canvas. It listens to
 * scroll coordinates to transition position, scale, and colors between
 * page sections, creating a cohesive, 3D-forward narrative.
 */
export default function GlowOrb() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    mount.appendChild(renderer.domElement);

    // --- Geometry: Fibonacci sphere point distribution -------------------
    const COUNT = 3600;
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);
    const golden = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      positions[i * 3] = x * 1.65;
      positions[i * 3 + 1] = y * 1.65;
      positions[i * 3 + 2] = z * 1.65;
      seeds[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

    const uniforms = {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector3(999, 999, 999) },
      uColorA: { value: new THREE.Color("#D4A054") }, // glow
      uColorB: { value: new THREE.Color("#E28B7D") }, // bloom
      uColorC: { value: new THREE.Color("#FAF7F1") }, // porcelain highlight
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        uniform float uTime;
        uniform vec3 uPointer;
        attribute float aSeed;
        varying float vGlow;
        varying float vSeed;

        void main() {
          vSeed = aSeed;
          vec3 pos = position;

          // gentle organic breathing ripple, layered sine waves stand in for noise
          float wobble =
            sin(pos.x * 2.1 + uTime * 0.6) * 0.05 +
            sin(pos.y * 3.0 + uTime * 0.45) * 0.045 +
            sin(pos.z * 2.6 + uTime * 0.5 + aSeed * 6.28) * 0.05;

          vec3 displaced = pos * (1.0 + wobble);

          // proximity to pointer pushes points outward, like light catching a surface
          float d = distance(displaced, uPointer);
          float influence = smoothstep(1.6, 0.0, d);
          displaced += normalize(pos) * influence * 0.35;

          vGlow = influence;

          vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
          gl_PointSize = (2.0 + influence * 5.0 + aSeed * 2.0) * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform vec3 uColorC;
        varying float vGlow;
        varying float vSeed;

        void main() {
          vec2 uv = gl_PointCoord - vec2(0.5);
          float d = length(uv);
          float alpha = smoothstep(0.5, 0.0, d);
          vec3 base = mix(uColorA, uColorB, vSeed);
          vec3 color = mix(base, uColorC, vGlow * 0.8);
          gl_FragColor = vec4(color, alpha * (0.55 + vGlow * 0.45));
        }
      `,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // faint outer halo ring for depth
    const haloGeo = new THREE.RingGeometry(2.05, 2.08, 96);
    const haloMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#D4A054"),
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    scene.add(halo);

    // --- Keyframe coordinates for scroll positions -----------------------
    const desktopKeyframes = [
      { x: 1.4, y: 0.0, z: 0.0, scale: 1.0, colorA: "#D4A054", colorB: "#E28B7D", speed: 0.08 }, // Hero (top)
      { x: -1.6, y: -0.2, z: -0.5, scale: 0.8, colorA: "#7FA69A", colorB: "#D4A054", speed: 0.04 }, // Services
      { x: 1.5, y: 0.2, z: 0.0, scale: 1.2, colorA: "#E28B7D", colorB: "#7FA69A", speed: 0.06 }, // Doctor
      { x: 0.0, y: 0.0, z: -1.8, scale: 1.6, colorA: "#D4A054", colorB: "#E28B7D", speed: 0.03 }, // Reviews
      { x: 1.3, y: -0.1, z: -0.8, scale: 0.9, colorA: "#7FA69A", colorB: "#D4A054", speed: 0.05 }, // Trust
      { x: -1.3, y: -0.2, z: 0.0, scale: 0.9, colorA: "#D4A054", colorB: "#E28B7D", speed: 0.07 }  // Contact
    ];

    const mobileKeyframes = [
      { x: 0.0, y: -0.7, z: -0.5, scale: 0.75, colorA: "#D4A054", colorB: "#E28B7D", speed: 0.05 }, // Hero (top)
      { x: 0.0, y: 0.0, z: -2.0, scale: 1.3, colorA: "#7FA69A", colorB: "#D4A054", speed: 0.03 }, // Services
      { x: 0.0, y: -0.8, z: -0.5, scale: 0.8, colorA: "#E28B7D", colorB: "#7FA69A", speed: 0.04 }, // Doctor
      { x: 0.0, y: 0.0, z: -2.0, scale: 1.4, colorA: "#D4A054", colorB: "#E28B7D", speed: 0.03 }, // Reviews
      { x: 0.0, y: 0.0, z: -1.8, scale: 1.0, colorA: "#7FA69A", colorB: "#D4A054", speed: 0.04 }, // Trust
      { x: 0.0, y: -0.5, z: -0.5, scale: 0.8, colorA: "#D4A054", colorB: "#E28B7D", speed: 0.05 }  // Contact
    ];

    // --- Interaction -------------------------------------------------------
    const pointerTarget = new THREE.Vector3(999, 999, 999);
    const raycaster = new THREE.Raycaster();
    const planeNormalTarget = new THREE.Vector2();
    const tempVec = new THREE.Vector3();

    function onPointerMove(e: PointerEvent) {
      planeNormalTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
      planeNormalTarget.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(planeNormalTarget, camera);

      // Raycast onto a plane at z=0 in world coordinates
      const dirZ = raycaster.ray.direction.z;
      if (Math.abs(dirZ) > 0.0001) {
        const distanceToPlane = -raycaster.ray.origin.z / dirZ;
        tempVec
          .copy(raycaster.ray.origin)
          .add(raycaster.ray.direction.clone().multiplyScalar(distanceToPlane));

        // Convert world coordinate to local space of the points mesh
        points.worldToLocal(tempVec);

        // Limit interaction to the surface of the sphere
        pointerTarget.copy(tempVec).setLength(1.65);
      }
    }

    function onPointerLeave() {
      pointerTarget.set(999, 999, 999);
    }

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);

    // --- Scroll & Responsive Handling ------------------------------------
    const scrollStateRef = { index: 0, progress: 0 };
    const sectionIds = ["top", "services", "doctor", "reviews", "trust", "contact"];
    const isMobileRef = { current: false };

    const updateDimensions = () => {
      isMobileRef.current = window.innerWidth < 1024;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    const onScroll = () => {
      const scrollY = window.scrollY;

      const offsets = sectionIds.map((id) => {
        const el = document.getElementById(id);
        return el ? el.offsetTop : 0;
      });

      let index = 0;
      let localProgress = 0;

      for (let i = 0; i < offsets.length - 1; i++) {
        if (scrollY >= offsets[i] && scrollY < offsets[i + 1]) {
          index = i;
          const diff = offsets[i + 1] - offsets[i];
          localProgress = diff > 0 ? (scrollY - offsets[i]) / diff : 0;
          break;
        }
      }

      if (scrollY >= offsets[offsets.length - 1]) {
        index = offsets.length - 1;
        localProgress = 0;
      }

      scrollStateRef.index = index;
      scrollStateRef.progress = localProgress;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // --- Resize Observer (extra safety) -----------------------------------
    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(mount);

    // --- Visibility pause (perf) ----------------------------------------
    let isVisible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(mount);

    // --- Animation loop --------------------------------------------------
    const clock = new THREE.Clock();
    let rafId: number;

    function tick() {
      rafId = requestAnimationFrame(tick);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();
      const delta = clock.getDelta();
      uniforms.uTime.value = prefersReducedMotion ? elapsed * 0.15 : elapsed;

      // Smooth pointer interaction
      uniforms.uPointer.value.lerp(pointerTarget, 0.06);

      // Lerp between scroll keyframes
      const { index, progress } = scrollStateRef;
      const keyframes = isMobileRef.current ? mobileKeyframes : desktopKeyframes;
      const currentKF = keyframes[index];
      const nextKF = keyframes[index + 1] || currentKF;

      const targetX = THREE.MathUtils.lerp(currentKF.x, nextKF.x, progress);
      const targetY = THREE.MathUtils.lerp(currentKF.y, nextKF.y, progress);
      const targetZ = THREE.MathUtils.lerp(currentKF.z, nextKF.z, progress);
      const targetScaleVal = THREE.MathUtils.lerp(currentKF.scale, nextKF.scale, progress);
      const targetSpeed = THREE.MathUtils.lerp(currentKF.speed, nextKF.speed, progress);

      const colorA = new THREE.Color(currentKF.colorA).lerp(
        new THREE.Color(nextKF.colorA),
        progress
      );
      const colorB = new THREE.Color(currentKF.colorB).lerp(
        new THREE.Color(nextKF.colorB),
        progress
      );

      // Apply transformations with easing (lerp)
      points.position.x = THREE.MathUtils.lerp(points.position.x, targetX, 0.05);
      points.position.y = THREE.MathUtils.lerp(points.position.y, targetY, 0.05);
      points.position.z = THREE.MathUtils.lerp(points.position.z, targetZ, 0.05);

      const nextScale = THREE.MathUtils.lerp(points.scale.x, targetScaleVal, 0.05);
      points.scale.set(nextScale, nextScale, nextScale);

      // Lerp uniforms & materials
      uniforms.uColorA.value.lerp(colorA, 0.05);
      uniforms.uColorB.value.lerp(colorB, 0.05);
      haloMat.color.copy(uniforms.uColorA.value);

      // Make halo follow points
      halo.position.copy(points.position);
      halo.scale.copy(points.scale);

      // Rotations
      const motionScale = prefersReducedMotion ? 0.15 : 1.0;
      points.rotation.y += targetSpeed * delta * 20.0 * motionScale;
      points.rotation.x = Math.sin(elapsed * 0.15) * 0.08 * motionScale;
      halo.rotation.z += 0.05 * delta * 20.0 * motionScale;

      renderer.render(scene, camera);
    }
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateDimensions);
      geometry.dispose();
      material.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) {
        mount!.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1]"
      role="img"
      aria-label="Animated glowing sphere of light, symbolic of the clinic's name"
    />
  );
}
