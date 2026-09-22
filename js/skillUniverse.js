/* Skill Universe Interactive Constellation & Roadmap Explorer */
import { skillUniverseNodes } from './data.js';
import { store } from './state.js';

export function initSkillUniverse() {
  const container = document.getElementById('skill-universe-mount');
  if (!container) return;

  const nodePositions = [
    { x: 22, y: 20 },
    { x: 74, y: 18 },
    { x: 12, y: 55 },
    { x: 82, y: 50 },
    { x: 28, y: 82 },
    { x: 70, y: 80 },
    { x: 48, y: 12 },
    { x: 50, y: 88 },
    { x: 88, y: 28 },
    { x: 10, y: 32 }
  ];

  container.innerHTML = `
    <div class="skill-universe-stage" id="universe-stage">
      <canvas class="skill-constellation-canvas" id="universe-canvas"></canvas>
      
      <!-- Central Core -->
      <div class="skill-universe-core" id="core-node">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-bottom: 4px;">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
        <h3>CAREER READY</h3>
        <span>Core Gateway</span>
      </div>

      <!-- Orbiting Nodes -->
      ${skillUniverseNodes.map((skill, idx) => {
        const pos = nodePositions[idx % nodePositions.length];
        return `
          <div class="skill-orbit-node" 
               style="left: ${pos.x}%; top: ${pos.y}%;" 
               data-skill-id="${skill.id}">
            <span class="node-dot"></span>
            <span>${skill.name}</span>
          </div>
        `;
      }).join('')}
    </div>
  `;

  // Draw dynamic connecting lines on canvas
  const canvas = container.querySelector('#universe-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    function resizeCanvas() {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function drawUniverseLines() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const stage = container.querySelector('#universe-stage');
      const core = container.querySelector('#core-node');
      if (!stage || !core) return;

      const stageRect = stage.getBoundingClientRect();
      const coreRect = core.getBoundingClientRect();
      const coreCenterX = coreRect.left + coreRect.width / 2 - stageRect.left;
      const coreCenterY = coreRect.top + coreRect.height / 2 - stageRect.top;

      const nodes = container.querySelectorAll('.skill-orbit-node');
      nodes.forEach(node => {
        const nodeRect = node.getBoundingClientRect();
        const nodeCenterX = nodeRect.left + nodeRect.width / 2 - stageRect.left;
        const nodeCenterY = nodeRect.top + nodeRect.height / 2 - stageRect.top;

        // Draw line from core to node
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.18)';
        ctx.lineWidth = 1;
        ctx.moveTo(coreCenterX, coreCenterY);
        ctx.lineTo(nodeCenterX, nodeCenterY);
        ctx.stroke();
      });

      requestAnimationFrame(drawUniverseLines);
    }
    drawUniverseLines();
  }

  // Click on skill node opens skill modal
  const nodes = container.querySelectorAll('.skill-orbit-node');
  nodes.forEach(node => {
    node.addEventListener('click', () => {
      const skillId = node.getAttribute('data-skill-id');
      const skill = skillUniverseNodes.find(s => s.id === skillId);
      if (skill) {
        store.setModal({ type: 'skill', data: skill });
      }
    });
  });

  const coreNode = container.querySelector('#core-node');
  coreNode?.addEventListener('click', () => {
    store.showToast('Career Ready Core: All 10 high-impact technical domains mapped!');
  });
}
