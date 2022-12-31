const plantFormHandler = async (event) => {
  event.preventDefault();

  const common_name = document.querySelector('#common-name').value.trim();
  const scientific_name = document.querySelector('#scientific-name').value.trim();
  const growth_habit = document.querySelector('input[name = "growth-habit"]:checked').value;
  const life_cycle = document.querySelector('input[name = "life-cycle"]:checked').value;
  const light_reqs = document.querySelector('#light-reqs').value.trim();
  const water_reqs = document.querySelector('input[name = "water-reqs"]:checked').value;

  if (common_name && scientific_name) {
    const response = await fetch('/api/plants/', {
      method: 'POST',
      body: JSON.stringify({ common_name, scientific_name, growth_habit, life_cycle, light_reqs, water_reqs }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create plant.');
    }
  }
};

document
  .querySelector('.plant-form')
  .addEventListener('submit', plantFormHandler);