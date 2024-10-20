<template>
  <div class="container">
    <div
      v-for="(shape, index) in shapes"
      :key="index"
      :class="['shape', shape.type]"
      :style="shape.style"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shapes: [],
      colors: [
        { start: '#DDEFBB', end: '#ccf7f4' },
        { start: '#fbc2eb', end: '#FFEEEE' },
        { start: '#FFEEEE', end: '#1cefff' },
        { start: '#f6d5f7', end: '#fbe9d7' },
      ],
    };
  },
  mounted() {
    this.generateRandomShapes();
  },
  methods: {
    generateRandomShapes() {
      const shapeTypes = ['circle', 'square'];
      const availableColors = [...this.colors]; // Copie de la liste des couleurs disponibles
      const minSpacing = 20; // Espace minimum entre les formes en pourcentage

      for (let i = 0; i < 4; i++) {
        const randomShape = shapeTypes[i % shapeTypes.length];
        const randomColorIndex = Math.floor(Math.random() * availableColors.length);
        const randomColor = availableColors.splice(randomColorIndex, 1)[0]; // Retirer la couleur utilisée
        const randomIncline = Math.random() * 360; // Générer une inclinaison aléatoire pour le dégradé
        const randomRotation = Math.random() * 360; // Générer une rotation aléatoire pour la forme

        // Générer des positions aléatoires avec un espace minimum
        const top = Math.random() * (80 - minSpacing);
        const left = Math.random() * (80 - minSpacing);

        this.shapes.push({
          type: randomShape,
          style: {
            background: `linear-gradient(${randomIncline}deg, ${randomColor.start}, ${randomColor.end})`,
            top: `${top}%`,
            left: `${left}%`,
            transform: `rotate(${randomRotation}deg)`, // Appliquer la rotation aléatoire
          },
        });
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.shape {
  width: 200px;
  height: 200px;
  position: absolute;
  transform: translate(-50%, -50%);
  animation: scaleUp 0.5s ease-out forwards;
}

.circle {
  border-radius: 50%;
}

.square {
  border-radius: 5px;
}

@keyframes scaleUp {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>