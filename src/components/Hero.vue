  <template>
      <div class="hero">
          <div class="info">
              <h1>Endless Entertainment, Made Just for You</h1>
              <p>Stream the best movies and TV shows on any device, anytime, anywhere. Experience the magic of entertainment tailored to your taste.</p>
              <RouterLink to="/register" class = "entry">Get Started</RouterLink>\
          </div>
      </div>
  </template>

  <style scoped>
  .hero {
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/src/assets/background.jpg);
    height: 90vh;
    background-size: cover;
    color:white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .info {
    padding: 20px;
    border-radius: 8px;
  }

  .info h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-family: 'Arial', sans-serif;
  }

  .info p {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  .entry {
    display: inline-block;
    padding: 10px 20px;
    background-color: red; 
    color: white;
    text-decoration: none;
    font-size: 1rem;
    border-radius: 6px;
    

  }

  .entry:hover {
    background-color: #511400; 
  }

  </style>