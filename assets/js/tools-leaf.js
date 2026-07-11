// --- Canvas & Context Setup ---
const canvas = document.getElementById("riverCanvas");
const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
const ui = document.getElementById("ui");
const input = document.getElementById("worryInput");
const uiTrigger = document.getElementById("ui-trigger");
const breathText = document.getElementById("breath-text");
const inputModal = document.getElementById("inputModal");

// --- Global State ---
let w,
	h,
	time = 0,
	lastTime = 0;
let leaves = [],
	grass = [],
	mistParticles = [],
	waterRipples = [];
const mountains = { far: [], near: [] };
let isInputOpen = true; // START OPEN BY DEFAULT
let animationId = null;
let _breathPhase = 0;

// --- River Configuration ---
const CONFIG = {
	// River bounds
	riverStart: 0.22,
	riverEnd: 0.78,
	waterfallStart: 0.82,

	// Natural colors (with JS fallback)
	colors: {
		skyTop: getCSSVar("--sky-top", "#1a2a4a"),
		skyBottom: getCSSVar("--sky-bottom", "#2a4a6a"),
		mountainFar: getCSSVar("--mountain-far", "#1a2a3a"),
		mountainNear: getCSSVar("--mountain-near", "#2a3a4a"),
		waterDeep: getCSSVar("--water-deep", "#1a3a52"),
		waterMid: getCSSVar("--water-mid", "#2a5a7a"),
		waterLight: getCSSVar("--water-light", "#3a7a9a"),
		waterFoam: getCSSVar("--water-foam", "rgba(255,255,255,0.12)"),
		grassSurface: getCSSVar("--grass-surface", "#3d6b4f"),
		grassShadow: getCSSVar("--grass-shadow", "#2a4a35"),
		earthBase: getCSSVar("--earth-base", "#4a3728"),
		earthShadow: getCSSVar("--earth-shadow", "#2a1f15"),
		leafGold: getCSSVar("--leaf-gold", "#c9a961"),
		leafShadow: getCSSVar("--leaf-shadow", "#8b7345"),
	},

	// Physics - TARGET 4-5 SECOND TRAVERSAL
	leafMinWidth: 70,
	leafPadding: 40,
	leafLineHeight: 16,
	leafMaxLines: 3,
	baseSpeed: 0.0022, // ~4.5s at linear speed
	accelerationFactor: 0.0015, // Gentle ease-in
	waterfallPull: 0.025,

	// Visuals
	grassCount: 75,
	rippleCount: 12,
	mistDensity: 3,
	mountainPeaksFar: 4,
	mountainPeaksNear: 3,

	// Timing
	breathCycleMs: 5000,
	leafLifetime: 1.0,
};

// --- Utility: Safe CSS Variable Fallback ---
function getCSSVar(name, fallback) {
	try {
		const val = getComputedStyle(document.documentElement)
			.getPropertyValue(name)
			.trim();
		return val || fallback;
	} catch {
		return fallback;
	}
}

// --- Initialization ---
function init() {
	try {
		resize();
		initMountains();
		initGrass();
		initWaterRipples();
		startAnimation();

		// Event Listeners (SINGLE handler for toggle)
		window.addEventListener("resize", resize, { passive: true });
		uiTrigger.addEventListener("click", toggleInput);
		input.addEventListener("keypress", (e) => {
			if (e.key === "Enter") releaseLeaf();
		});

		// Prevent context menu on mobile
		document.addEventListener("contextmenu", (e) => e.preventDefault());

		// Focus input on load
		setTimeout(() => {
			try {
				input.focus();
			} catch (_e) {
				/* ignore */
			}
		}, 500);
	} catch (err) {
		console.error("Init error:", err);
		// Fallback: ensure canvas is visible
		if (ctx) {
			ctx.fillStyle = CONFIG.colors.earthShadow;
			ctx.fillRect(0, 0, w || 800, h || 600);
		}
	}
}

function resize() {
	try {
		w = canvas.width = window.innerWidth;
		h = canvas.height = window.innerHeight;
		initMountains();
		initGrass();
		initWaterRipples();
	} catch (err) {
		console.error("Resize error:", err);
	}
}

function initMountains() {
	try {
		mountains.far = [];
		mountains.near = [];

		const { mountainPeaksFar, mountainPeaksNear, colors } = CONFIG;
		const riverX = w * CONFIG.riverStart;
		const riverW = w * (CONFIG.riverEnd - CONFIG.riverStart);

		// Far mountains (slow parallax, minimalist silhouettes)
		for (let i = 0; i < mountainPeaksFar; i++) {
			const peakX = riverX + (i + 0.5) * (riverW / mountainPeaksFar);
			const peakH = 80 + Math.random() * 60;
			const peakW = 60 + Math.random() * 40;
			mountains.far.push({
				x: peakX,
				baseY: h * 0.4,
				height: peakH,
				width: peakW,
				color: colors.mountainFar,
				parallax: 0.2,
			});
		}

		// Near hills (medium parallax, rounded shapes)
		for (let i = 0; i < mountainPeaksNear; i++) {
			const hillX = riverX + (i + 0.7) * (riverW / mountainPeaksNear);
			const hillH = 40 + Math.random() * 30;
			const hillW = 80 + Math.random() * 50;
			mountains.near.push({
				x: hillX,
				baseY: h * 0.6,
				height: hillH,
				width: hillW,
				color: colors.mountainNear,
				parallax: 0.5,
			});
		}
	} catch (err) {
		console.error("Mountain init error:", err);
	}
}

function initGrass() {
	try {
		grass = [];
		const { riverStart, riverEnd, grassCount, colors } = CONFIG;

		for (let i = 0; i < grassCount * 2; i++) {
			const side = Math.random() > 0.5 ? "left" : "right";
			const bankWidth = side === "left" ? w * riverStart : w * (1 - riverEnd);
			const xBase =
				side === "left"
					? Math.random() * (bankWidth - 15) + 8
					: w - Math.random() * (bankWidth - 15) - 8;

			grass.push({
				x: xBase,
				y: Math.random() * h * 0.95,
				length: 8 + Math.random() * 18,
				thickness: 1 + Math.random() * 1.2,
				sways: Math.random() > 0.4,
				phase: Math.random() * Math.PI * 2,
				swaySpeed: 0.02 + Math.random() * 0.03,
				color: Math.random() > 0.6 ? colors.grassSurface : colors.grassShadow,
			});
		}
	} catch (err) {
		console.error("Grass init error:", err);
	}
}

function initWaterRipples() {
	try {
		waterRipples = [];
		const { riverStart, riverEnd, rippleCount } = CONFIG;
		const riverW = w * (riverEnd - riverStart);

		for (let i = 0; i < rippleCount; i++) {
			waterRipples.push({
				x: w * riverStart + Math.random() * riverW,
				y: Math.random() * h * 0.9,
				radius: 15 + Math.random() * 25,
				speed: 0.3 + Math.random() * 0.4, // SLOW water flow
				opacity: 0.03 + Math.random() * 0.04,
				phase: Math.random() * Math.PI * 2,
			});
		}
	} catch (err) {
		console.error("Ripple init error:", err);
	}
}

// --- UI Interaction (ROBUST SINGLE HANDLER) ---
function toggleInput(e) {
	try {
		if (e) e.stopPropagation();
		isInputOpen = !isInputOpen;

		if (isInputOpen) {
			ui.classList.remove("hidden");
			inputModal.classList.remove("hidden");
			uiTrigger.classList.add("active");

			setTimeout(() => {
				try {
					input.focus();
					input.select();
				} catch {}
			}, 200);
		} else {
			ui.classList.add("hidden");
			inputModal.classList.add("hidden");
			uiTrigger.classList.remove("active");
		}
	} catch (err) {
		console.error("Toggle error:", err);
	}
}

// --- Leaf Class with Dynamic Sizing & Word-Wrap ---
class Leaf {
	constructor(text) {
		this.text = text.trim();
		this.measureAndSize();
		this.resetPosition();
		this.initPhysics();
	}

	measureAndSize() {
		try {
			ctx.font = "italic 14px 'Outfit', sans-serif";
			ctx.textAlign = "center";

			const words = this.text.split(" ");
			const lines = [];
			let currentLine = "";

			// Word-wrap logic
			for (const word of words) {
				const testLine = currentLine ? `${currentLine} ${word}` : word;
				const metrics = ctx.measureText(testLine);

				if (metrics.width > CONFIG.leafMinWidth - 20 && currentLine) {
					lines.push(currentLine);
					currentLine = word;
				} else {
					currentLine = testLine;
				}
			}
			if (currentLine) lines.push(currentLine);

			// Limit to max lines, truncate with ellipsis if needed
			if (lines.length > CONFIG.leafMaxLines) {
				lines.length = CONFIG.leafMaxLines;
				lines[CONFIG.leafMaxLines - 1] =
					`${lines[CONFIG.leafMaxLines - 1].slice(0, -3)}…`;
			}

			this.lines = lines;
			this.lineCount = lines.length;

			// Dynamic leaf sizing
			const maxLineWidth = Math.max(
				...lines.map((line) => ctx.measureText(line).width),
			);
			this.leafWidth = Math.max(
				CONFIG.leafMinWidth,
				maxLineWidth + CONFIG.leafPadding,
			);
			// Calculate text block height
			const textBlockHeight = this.lineCount * CONFIG.leafLineHeight;
			// Add generous padding for leaf's curved shape (top/bottom taper)
			const verticalPadding = 35; // Was 28 - increased for safety margin
			this.leafHeight = Math.max(45, textBlockHeight + verticalPadding);
		} catch (err) {
			console.error("Leaf measure error:", err);
			// Fallback sizing
			this.lines = [this.text.slice(0, 30)];
			this.lineCount = 1;
			this.leafWidth = CONFIG.leafMinWidth;
			this.leafHeight = 28;
		}
	}

	resetPosition() {
		try {
			const riverW = w * (CONFIG.riverEnd - CONFIG.riverStart);
			const riverX = w * CONFIG.riverStart;
			this.x = riverX + riverW * 0.35 + Math.random() * riverW * 0.3;
			this.y = -80;
			this.progress = 0;
			this.baseAngle = (Math.random() - 0.5) * 0.3;
			this.wobblePhase = Math.random() * Math.PI * 2;
			this.wobbleSpeed = 0.015 + Math.random() * 0.01;
			this.opacity = 1;
			this.scale = 1;
			this.inWaterfall = false;
			this.dissolving = false;
		} catch (err) {
			console.error("Leaf reset error:", err);
			this.x = w * 0.5;
			this.y = -80;
			this.progress = 0;
		}
	}

	initPhysics() {
		this.angle = this.baseAngle;
		this.angularVel = (Math.random() - 0.5) * 0.005;
		this.vx = (Math.random() - 0.5) * 0.3;
	}

	update(deltaTime) {
		try {
			const dt = deltaTime / 16.67;

			// TARGET: 4-5 second traversal with gentle ease
			const speed =
				CONFIG.baseSpeed + this.progress * CONFIG.accelerationFactor;
			this.progress += speed * dt;
			this.y = this.progress * h;

			// Gentle drift + wobble
			this.x +=
				this.vx +
				Math.sin(time * 0.015 + this.y * 0.006 + this.wobblePhase) * 0.25;
			this.angle =
				this.baseAngle +
				Math.sin(this.wobblePhase + time * this.wobbleSpeed) * 0.15;
			this.wobblePhase += 0.01 * dt;

			// Soft bank containment
			const riverX = w * CONFIG.riverStart;
			const riverW = w * (CONFIG.riverEnd - CONFIG.riverStart);
			const margin = this.leafWidth * 0.55;

			if (this.x < riverX + margin) {
				this.x = riverX + margin;
				this.vx = Math.abs(this.vx) * 0.3 + 0.1;
			}
			if (this.x > riverX + riverW - margin) {
				this.x = riverX + riverW - margin;
				this.vx = -Math.abs(this.vx) * 0.3 - 0.1;
			}

			// Waterfall transition
			if (this.progress > CONFIG.waterfallStart && !this.inWaterfall) {
				this.inWaterfall = true;
				this.angularVel = (Math.random() - 0.5) * 0.04;
			}

			// Waterfall physics
			if (this.inWaterfall) {
				this.scale *= 0.97;
				this.opacity *= 0.96;
				this.angularVel *= 1.05;
				this.angle += this.angularVel * dt;

				if (Math.random() > 0.6) {
					for (let i = 0; i < CONFIG.mistDensity; i++) {
						mistParticles.push(
							new MistParticle(
								this.x + (Math.random() - 0.5) * this.leafWidth * 0.4,
								this.y + (Math.random() - 0.5) * this.leafHeight * 0.4,
							),
						);
					}
				}

				if (this.scale < 0.3 && !this.dissolving) {
					this.dissolving = true;
				}
			}
		} catch (err) {
			console.error("Leaf update error:", err);
		}
	}

	draw(breathScale) {
		try {
			if (this.opacity < 0.02) return;

			ctx.save();
			ctx.translate(this.x, this.y);
			ctx.rotate(this.angle);
			ctx.scale(this.scale * breathScale, this.scale * breathScale);
			ctx.globalAlpha = this.opacity;

			const hw = this.leafWidth / 2;
			const hh = this.leafHeight / 2;

			// Create clipping path for text safety
			// Scale control points proportionally to leaf dimensions
			const curveFactor = Math.min(0.85, 0.75 + this.leafHeight / 200); // Adaptive curvature
			ctx.beginPath();
			ctx.moveTo(0, -hh * 0.88); // Slightly less extreme tip
			ctx.quadraticCurveTo(hw * curveFactor, -hh * 0.28, hw * 0.82, 0);
			ctx.quadraticCurveTo(hw * curveFactor, hh * 0.28, 0, hh * 0.78);
			ctx.quadraticCurveTo(-hw * curveFactor, hh * 0.28, -hw * 0.82, 0);
			ctx.quadraticCurveTo(-hw * curveFactor, -hh * 0.28, 0, -hh * 0.88);
			ctx.closePath();
			ctx.clip(); // Text won't render outside leaf

			// Leaf gradient (natural golden tones)
			const leafGrad = ctx.createLinearGradient(-hw, -hh, hw, hh);
			leafGrad.addColorStop(0, CONFIG.colors.leafGold);
			leafGrad.addColorStop(0.5, CONFIG.colors.leafGold);
			leafGrad.addColorStop(1, CONFIG.colors.leafShadow);

			ctx.fillStyle = leafGrad;
			ctx.shadowBlur = this.inWaterfall ? 8 : 15;
			ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
			ctx.fill();

			// Text rendering (multi-line, centered, clipped to leaf)
			ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
			ctx.font = "italic 13px 'Outfit', sans-serif";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.shadowBlur = 4;
			ctx.shadowColor = "rgba(0, 0, 0, 0.5)";

			// Calculate safe text area (85% of leaf width/height to avoid edge clipping)
			const safeWidth = this.leafWidth * 0.85;
			const _safeHeight = this.leafHeight * 0.75;
			const textBlockHeight = this.lineCount * CONFIG.leafLineHeight;
			const startY = -textBlockHeight / 2 + 2; // Small visual centering offset

			this.lines.forEach((line, idx) => {
				const metrics = ctx.measureText(line);
				let displayLine = line;

				// Truncate with ellipsis if line exceeds safe width
				if (metrics.width > safeWidth) {
					while (
						ctx.measureText(`${displayLine}…`).width > safeWidth &&
						displayLine.length > 4
					) {
						displayLine = displayLine.slice(0, -1);
					}
					displayLine += "…";
				}

				ctx.fillText(displayLine, 0, startY + idx * CONFIG.leafLineHeight);
			});

			ctx.restore();
		} catch (err) {
			console.error("Leaf draw error:", err);
		}
	}

	isExpired() {
		return this.opacity < 0.02 || this.scale < 0.05 || this.y > h + 100;
	}
}

// --- Mist Particle Class ---
class MistParticle {
	constructor(x, y) {
		this.x = x + (Math.random() - 0.5) * 30;
		this.y = y;
		this.vx = (Math.random() - 0.5) * 2.5;
		this.vy = -Math.random() * 2 - 1;
		this.alpha = 0.35 + Math.random() * 0.3;
		this.size = 1 + Math.random() * 3;
		this.decay = 0.008 + Math.random() * 0.006;
	}

	update(deltaTime) {
		const dt = deltaTime / 16.67;
		this.x += this.vx * dt;
		this.y += this.vy * dt;
		this.alpha -= this.decay * dt;
		this.size *= 0.99;
	}

	draw() {
		if (this.alpha <= 0) return;
		ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
	}

	isExpired() {
		return this.alpha <= 0.01;
	}
}

// --- Core Functions ---
function releaseLeaf() {
	try {
		const text = input.value.trim();
		if (!text) {
			input.style.animation = "none";
			setTimeout(() => {
				input.style.animation = null;
			}, 200);
			return;
		}

		leaves.push(new Leaf(text));
		input.value = "";
		// Keep modal open for next worry
		input.focus();

		// Haptic feedback
		if (navigator.vibrate) {
			navigator.vibrate([10, 25, 10]);
		}
	} catch (err) {
		console.error("Release error:", err);
	}
}

// --- Rendering Functions (Parallax Layers) ---
function drawSky() {
	try {
		const grad = ctx.createLinearGradient(0, 0, 0, h * 0.6);
		grad.addColorStop(0, CONFIG.colors.skyTop);
		grad.addColorStop(1, CONFIG.colors.skyBottom);
		ctx.fillStyle = grad;
		ctx.fillRect(0, 0, w, h * 0.6);
	} catch (_err) {
		ctx.fillStyle = CONFIG.colors.skyBottom;
		ctx.fillRect(0, 0, w, h);
	}
}

function drawMountains(parallaxOffset) {
	try {
		// Far mountains (slow parallax)
		ctx.fillStyle = CONFIG.colors.mountainFar;
		mountains.far.forEach((m) => {
			const x = m.x - parallaxOffset * m.parallax;
			ctx.beginPath();
			ctx.moveTo(x - m.width / 2, m.baseY);
			ctx.lineTo(x, m.baseY - m.height);
			ctx.lineTo(x + m.width / 2, m.baseY);
			ctx.closePath();
			ctx.fill();
		});

		// Near hills (medium parallax)
		ctx.fillStyle = CONFIG.colors.mountainNear;
		mountains.near.forEach((h) => {
			const x = h.x - parallaxOffset * h.parallax;
			ctx.beginPath();
			ctx.ellipse(x, h.baseY, h.width / 2, h.height, 0, Math.PI, 0);
			ctx.fill();
		});
	} catch (err) {
		console.error("Mountain draw error:", err);
	}
}

function drawBanks() {
	try {
		const { riverStart, riverEnd, colors } = CONFIG;
		const bankWidth = w * riverStart;

		// Left Bank
		ctx.fillStyle = colors.earthShadow;
		ctx.fillRect(0, 0, bankWidth, h);
		ctx.fillStyle = colors.earthBase;
		ctx.fillRect(0, 0, bankWidth - 8, h);

		// Right Bank
		ctx.fillStyle = colors.earthShadow;
		ctx.fillRect(w - bankWidth, 0, bankWidth, h);
		ctx.fillStyle = colors.earthBase;
		ctx.fillRect(w - bankWidth + 8, 0, bankWidth, h);
	} catch (err) {
		console.error("Bank draw error:", err);
	}
}

function drawWater() {
	try {
		const { riverStart, riverEnd, colors } = CONFIG;
		const riverX = w * riverStart;
		const riverW = w * (riverEnd - riverStart);

		// Base water gradient
		const waterGrad = ctx.createLinearGradient(riverX, 0, riverX + riverW, h);
		waterGrad.addColorStop(0, colors.waterDeep);
		waterGrad.addColorStop(0.4, colors.waterMid);
		waterGrad.addColorStop(1, colors.waterLight);
		ctx.fillStyle = waterGrad;
		ctx.fillRect(riverX, 0, riverW, h);

		// Subsurface caustic patterns (SLOWED for calm effect)
		ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
		ctx.lineWidth = 1;

		for (let i = 0; i < 14; i++) {
			const speedVar = 0.4 + (i % 3) * 0.15; // SLOW: 0.4-0.85 range
			const offset = (time * speedVar + i * 140) % h;
			const xPos = riverX + i * (riverW / 14);
			const curve = Math.sin(time * 0.005 + i * 0.2) * 8;

			ctx.beginPath();
			ctx.moveTo(xPos, offset);
			ctx.quadraticCurveTo(
				xPos + curve,
				offset + 35,
				xPos + curve * 0.5,
				offset + 70,
			);
			ctx.stroke();
		}

		// Surface ripple rings
		waterRipples.forEach((ripple) => {
			ripple.y += ripple.speed;
			if (ripple.y > h) ripple.y = -ripple.radius;

			const pulse = 0.5 + Math.sin(time * 0.015 + ripple.phase) * 0.3;
			ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.opacity * pulse})`;
			ctx.lineWidth = 0.7;
			ctx.beginPath();
			ctx.ellipse(
				ripple.x,
				ripple.y,
				ripple.radius * (0.8 + pulse * 0.3),
				ripple.radius * 0.25,
				0,
				Math.PI * 2,
			);
			ctx.stroke();
		});

		// Waterfall foam zone
		const foamGrad = ctx.createLinearGradient(
			0,
			h * CONFIG.waterfallStart,
			0,
			h,
		);
		foamGrad.addColorStop(0, "transparent");
		foamGrad.addColorStop(0.7, CONFIG.colors.waterFoam);
		foamGrad.addColorStop(1, "rgba(255,255,255,0.2)");
		ctx.fillStyle = foamGrad;
		ctx.fillRect(
			riverX,
			h * CONFIG.waterfallStart,
			riverW,
			h * (1 - CONFIG.waterfallStart),
		);
	} catch (err) {
		console.error("Water draw error:", err);
	}
}

function drawGrass(deltaTime) {
	try {
		const _dt = deltaTime / 16.67;

		grass.forEach((g) => {
			const swayAmount = g.sways
				? Math.sin(time * g.swaySpeed + g.phase) * 6
				: 0;

			ctx.strokeStyle = g.color;
			ctx.lineWidth = g.thickness;
			ctx.lineCap = "round";

			ctx.beginPath();
			ctx.moveTo(g.x, g.y);
			ctx.quadraticCurveTo(
				g.x + swayAmount * 0.4,
				g.y - g.length * 0.5,
				g.x + swayAmount + (g.thickness - 1) * 1.5,
				g.y - g.length,
			);
			ctx.stroke();
		});
	} catch (err) {
		console.error("Grass draw error:", err);
	}
}

function drawBreathPulse() {
	try {
		const breathProgress =
			(Date.now() % CONFIG.breathCycleMs) / CONFIG.breathCycleMs;
		_breathPhase = breathProgress;

		if (breathProgress < 0.5) {
			breathText.textContent = `Inhale ${Math.round(breathProgress * 200)}%`;
		} else {
			breathText.textContent = `Exhale ${Math.round((breathProgress - 0.5) * 200)}%`;
		}

		return 0.99 + Math.sin(breathProgress * Math.PI * 2) * 0.015;
	} catch {
		return 1.0;
	}
}

function drawLeaves(breathScale, deltaTime) {
	try {
		const dt = deltaTime / 16.67;

		for (let i = leaves.length - 1; i >= 0; i--) {
			const leaf = leaves[i];
			leaf.update(dt);
			leaf.draw(breathScale);

			if (leaf.isExpired()) {
				leaves.splice(i, 1);
			}
		}
	} catch (err) {
		console.error("Leaf draw error:", err);
	}
}

function drawMist(deltaTime) {
	try {
		const dt = deltaTime / 16.67;

		for (let i = mistParticles.length - 1; i >= 0; i--) {
			const p = mistParticles[i];
			p.update(dt);
			p.draw();

			if (p.isExpired()) {
				mistParticles.splice(i, 1);
			}
		}
	} catch (err) {
		console.error("Mist draw error:", err);
	}
}

// --- Main Animation Loop (Time-based, Error-Resilient) ---
function animate(timestamp) {
	try {
		if (!lastTime) lastTime = timestamp;
		const deltaTime = Math.min(timestamp - lastTime, 100); // Cap delta to prevent jumps
		lastTime = timestamp;

		// Clear canvas
		ctx.fillStyle = CONFIG.colors.earthShadow;
		ctx.fillRect(0, 0, w, h);

		// Draw parallax layers (back to front)
		drawSky();
		drawMountains(time * 0.05); // Slow parallax scroll
		drawBanks();
		drawWater();
		drawGrass(deltaTime);

		// Calculate breath-synced scale
		const breathScale = drawBreathPulse();

		// Draw interactive elements
		drawMist(deltaTime);
		drawLeaves(breathScale, deltaTime);

		time++;
		animationId = requestAnimationFrame(animate);
	} catch (err) {
		console.error("Animation error:", err);
		// Continue animation even if one frame fails
		if (animationId) cancelAnimationFrame(animationId);
		animationId = requestAnimationFrame(animate);
	}
}

function startAnimation() {
	if (animationId) cancelAnimationFrame(animationId);
	lastTime = 0;
	animate(0);
}

// --- Cleanup on Page Hide ---
document.addEventListener("visibilitychange", () => {
	if (document.hidden && animationId) {
		cancelAnimationFrame(animationId);
		animationId = null;
	} else if (!document.hidden && !animationId) {
		startAnimation();
	}
});

// --- Initialize App ---
init();
