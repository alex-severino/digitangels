"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Raymarched liquid-chrome rings, rendered with raw WebGL so there is no
 * runtime dependency. Two scenes share the same shader:
 *   halo  – one thick tilted torus (the "å" halo) with a smaller ring orbiting
 *           and melting into it.
 *   field – an endless drifting grid of chrome rings, the pattern from the
 *           Digitangels brand presentation.
 * Reflections come from a procedural black-and-white studio, so the metal
 * reads as chrome without any texture files.
 */

const VERT = `
attribute vec2 a;
void main() { gl_Position = vec4(a, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uScroll;
uniform float uMode;

mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float sdTorus(vec3 p, vec2 t) {
  vec2 q = vec2(length(p.xz) - t.x, p.y);
  return length(q) - t.y;
}

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float mapHalo(vec3 p) {
  vec3 q = p;
  q.xy *= rot(-0.28 + uMouse.x * 0.35);
  q.yz *= rot(1.12 - uMouse.y * 0.3 + uScroll * 1.6 + sin(uTime * 0.4) * 0.07);
  float ang = atan(q.z, q.x);
  float wob = sin(ang * 3.0 + uTime * 0.9) * 0.025 * (1.0 + uScroll * 2.0);
  float d = sdTorus(q, vec2(1.3, 0.22 + wob));

  vec3 r = p;
  r.xz *= rot(uTime * 0.45);
  r.x -= 1.3 + sin(uTime * 0.6) * 0.25;
  r.y -= sin(uTime * 0.8) * 0.35;
  r.xy *= rot(uTime * 0.9);
  r.yz *= rot(uTime * 0.6);
  float d2 = sdTorus(r, vec2(0.26, 0.07));

  vec3 b = p - vec3(sin(uTime * 0.5) * 0.4, 1.05 + cos(uTime * 0.7) * 0.12, 0.2);
  float d3 = length(b) - 0.12 - uScroll * 0.1;

  return smin(smin(d, d2, 0.28), d3, 0.35);
}

float mapField(vec3 p) {
  p.xy *= rot(-0.1 + uMouse.x * 0.05);
  p.y += uTime * 0.18 + uScroll * 3.0;
  vec2 size = vec2(2.5, 2.2);
  vec2 cell = floor((p.xy + size * 0.5) / size);
  vec3 q = p;
  q.xy = mod(p.xy + size * 0.5, size) - size * 0.5;
  float jitter = sin(cell.x * 1.7 + cell.y * 2.3 + uTime * 0.8) * 0.12;
  q.yz *= rot(1.3 + uMouse.y * 0.25 + jitter);
  q.xy *= rot(uMouse.x * 0.25);
  return sdTorus(q, vec2(0.98, 0.1));
}

float map(vec3 p) { return uMode < 0.5 ? mapHalo(p) : mapField(p); }

vec3 normalAt(vec3 p) {
  vec2 e = vec2(0.0012, 0.0);
  return normalize(vec3(
    map(p + e.xyy) - map(p - e.xyy),
    map(p + e.yxy) - map(p - e.yxy),
    map(p + e.yyx) - map(p - e.yyx)));
}

float env(vec3 d) {
  float y = d.y;
  float c = 0.015;
  c += smoothstep(0.5, 0.9, y) * 1.5;
  c += exp(-abs(y - 0.05) * 16.0) * 0.55;
  float a = atan(d.x, d.z) + uTime * 0.12 + uMouse.x * 0.6;
  c += pow(abs(sin(a * 2.0)), 70.0) * smoothstep(-0.35, 0.25, y) * 2.2;
  c += pow(abs(sin(a * 5.0 + 1.3)), 160.0) * smoothstep(0.1, 0.6, y) * 1.4;
  c += smoothstep(-0.15, -0.9, y) * 0.06;
  return c;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y);
  bool field = uMode > 0.5;
  vec3 ro = field ? vec3(0.0, 0.0, 6.0) : vec3(0.0, 0.0, 4.4 - uScroll * 0.7);
  vec3 rd = normalize(vec3(uv, field ? -1.25 : -1.45));

  float t = 0.0;
  float hit = 0.0;
  float steps = 0.0;
  for (int i = 0; i < 96; i++) {
    vec3 p = ro + rd * t;
    float d = map(p) * (field ? 0.7 : 0.9);
    if (d < 0.0012) { hit = 1.0; break; }
    t += d;
    steps += 1.0;
    if (t > 14.0) break;
  }

  float g = length(uv);
  vec3 col = vec3(0.035 * exp(-g * 2.2)) + vec3(steps / 96.0) * 0.06;

  if (hit > 0.5) {
    vec3 p = ro + rd * t;
    vec3 n = normalAt(p);
    vec3 rf = reflect(rd, n);
    float fres = pow(1.0 - max(dot(-rd, n), 0.0), 3.0);
    float e = env(rf);
    float ao = clamp(map(p + n * 0.12) / 0.12, 0.0, 1.0);
    float c = e * (0.7 + 0.6 * fres) * (0.55 + 0.45 * ao);
    c += pow(max(dot(rf, normalize(vec3(-0.4, 0.8, 0.5))), 0.0), 60.0) * 1.6;
    col = vec3(c) * vec3(0.97, 0.985, 1.0);
    if (field) col *= exp(-max(0.0, t - 5.0) * 0.18);
  }

  col = 1.0 - exp(-col * 1.7);
  col = pow(col, vec3(0.92));
  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function ChromeHalo({
  mode = "halo",
  className = "",
  scale = 1,
}: {
  mode?: "halo" | "field";
  className?: string;
  /** Render resolution multiplier – lower is cheaper. */
  scale?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });
    if (!gl) {
      setFailed(true);
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    if (!vs || !fs || !program) {
      setFailed(true);
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setFailed(true);
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(program, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uMouse = gl.getUniformLocation(program, "uMouse");
    const uScroll = gl.getUniformLocation(program, "uScroll");
    const uMode = gl.getUniformLocation(program, "uMode");
    gl.uniform1f(uMode, mode === "field" ? 1 : 0);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let scroll = 0;
    let visible = true;
    let raf = 0;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5) * scale;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const big = w * h > 1600 * 900 ? 0.75 : 1;
      canvas.width = Math.max(1, Math.floor(w * dpr * big));
      canvas.height = Math.max(1, Math.floor(h * dpr * big));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    const onPointer = (event: PointerEvent) => {
      mouse.tx = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const draw = (now: number) => {
      raf = 0;
      if (!visible) return;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      const host = canvas.closest<HTMLElement>("[data-scene]") ?? canvas;
      const box = host.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw =
        mode === "halo"
          ? -box.top / Math.max(1, box.height - vh)
          : (vh - box.top) / (vh + box.height);
      const target = Math.min(1, Math.max(0, raw));
      scroll += (target - scroll) * 0.08;
      gl.uniform1f(uTime, reduced ? 6 : (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uScroll, scroll);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible && !raf) raf = requestAnimationFrame(draw);
    });

    resize();
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("pointermove", onPointer, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [mode, scale]);

  if (failed) {
    return (
      <div className={`grid place-items-center bg-black ${className}`}>
        <div className="dt-ring dt-ring-spin w-[55vmin]" />
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`block h-full w-full bg-black ${className}`}
    />
  );
}
