import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Visualizer = ({ audioData, isListening, intensity = 0, width = 600, height = 400 }) => {
    const canvasRef = useRef(null);

    const audioDataRef = useRef(audioData);
    const intensityRef = useRef(intensity);
    const isListeningRef = useRef(isListening);

    useEffect(() => {
        audioDataRef.current = audioData;
        intensityRef.current = intensity;
        isListeningRef.current = isListening;
    }, [audioData, intensity, isListening]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        let animationId;
        let time = 0;

        const draw = () => {
            const w = canvas.width;
            const h = canvas.height;
            const centerX = w / 2;
            const centerY = h / 2;

            const currentIntensity = intensityRef.current;
            const currentIsListening = isListeningRef.current;

            const baseRadius = Math.min(w, h) * 0.28;
            const radius = baseRadius + (currentIntensity * 30);

            ctx.clearRect(0, 0, w, h);
            time += 0.008;

            // Outer ambient glow
            const outerGlow = ctx.createRadialGradient(centerX, centerY, radius * 0.5, centerX, centerY, radius * 2.2);
            outerGlow.addColorStop(0, 'rgba(0, 229, 255, 0.06)');
            outerGlow.addColorStop(0.5, 'rgba(0, 180, 220, 0.03)');
            outerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = outerGlow;
            ctx.fillRect(0, 0, w, h);

            // Inner sphere gradient
            const sphereGrad = ctx.createRadialGradient(
                centerX - radius * 0.2, centerY - radius * 0.2, radius * 0.1,
                centerX, centerY, radius
            );
            sphereGrad.addColorStop(0, 'rgba(0, 229, 255, 0.12)');
            sphereGrad.addColorStop(0.4, 'rgba(0, 180, 200, 0.06)');
            sphereGrad.addColorStop(0.8, 'rgba(10, 30, 60, 0.08)');
            sphereGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fillStyle = sphereGrad;
            ctx.fill();

            // Glow edge ring
            const ringGrad = ctx.createRadialGradient(centerX, centerY, radius - 4, centerX, centerY, radius + 6);
            ringGrad.addColorStop(0, 'rgba(0, 229, 255, 0)');
            ringGrad.addColorStop(0.4, currentIsListening ? 'rgba(0, 229, 255, 0.5)' : 'rgba(0, 229, 255, 0.25)');
            ringGrad.addColorStop(1, 'rgba(0, 229, 255, 0)');

            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.strokeStyle = ringGrad;
            ctx.lineWidth = 3;
            ctx.stroke();

            // Wave particles on sphere surface
            const particleCount = 200;
            for (let i = 0; i < particleCount; i++) {
                const angle = (i / particleCount) * Math.PI * 2;
                const yPos = (i / particleCount) * 2 - 1;
                const ringRadius = Math.sqrt(1 - yPos * yPos) * radius;

                const waveOffset = Math.sin(angle * 3 + time * 3) * (currentIntensity * 15 + 3);
                const waveOffset2 = Math.cos(angle * 5 + time * 2) * (currentIntensity * 8 + 2);
                const totalOffset = waveOffset + waveOffset2;

                const px = centerX + Math.cos(angle) * (ringRadius + totalOffset);
                const py = centerY + yPos * radius + Math.sin(angle * 2 + time) * 2;

                const dist = Math.sqrt((px - centerX) ** 2 + (py - centerY) ** 2);
                const normalizedDist = dist / radius;
                const alpha = Math.max(0, 0.7 - normalizedDist * 0.3) * (currentIsListening ? 1 : 0.5);

                const particleSize = 1 + Math.random() * 1.5;

                ctx.beginPath();
                ctx.arc(px, py, particleSize, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 229, 255, ${alpha})`;
                ctx.fill();
            }

            // Equatorial wave ring
            ctx.beginPath();
            ctx.strokeStyle = currentIsListening ? 'rgba(0, 229, 255, 0.6)' : 'rgba(0, 229, 255, 0.25)';
            ctx.lineWidth = 1.5;
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgba(0, 229, 255, 0.4)';

            for (let i = 0; i <= 360; i++) {
                const angle = (i / 180) * Math.PI;
                const wave = Math.sin(angle * 4 + time * 4) * (10 + currentIntensity * 25);
                const r = radius * 0.85 + wave;
                const px = centerX + Math.cos(angle) * r;
                const py = centerY + Math.sin(angle) * r * 0.3;

                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Breathing pulse ring
            if (currentIsListening) {
                const pulseRadius = radius + Math.sin(time * 3) * 8 + 15;
                ctx.beginPath();
                ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(0, 229, 255, ${0.08 + Math.sin(time * 2) * 0.06})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            animationId = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(animationId);
    }, [width, height]);

    return (
        <div className="relative flex items-center justify-center" style={{ width, height }}>
            <canvas
                ref={canvasRef}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
};

export default Visualizer;
