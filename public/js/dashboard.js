const plantFormHandler = async (event) => {
  event.preventDefault();

  const common_name = document.querySelector('#common-name').value.trim();
  const scientific_name = document.querySelector('#scientific-name').value.trim();
  const growth_habit = document.querySelector('input[name = "growth-habit"]:checked').value;
  const life_cycle = document.querySelector('input[name = "life-cycle"]:checked').value;
  const lightReqsEl = document.querySelectorAll('input[name = "sun-reqs"]');
  const water_reqs = document.querySelector('input[name = "water-reqs"]:checked').value;

  let light_reqs = "";
  for (let i = 0; i < lightReqsEl.length; i++) {
    if (lightReqsEl[i].checked) {
      light_reqs += lightReqsEl[i].value + ", "
    }
  }

  if (common_name && scientific_name && growth_habit && life_cycle && light_reqs && water_reqs) {
    const response = await fetch('/api/plants/', {
      method: 'POST',
      body: JSON.stringify({ common_name, scientific_name, growth_habit, life_cycle, light_reqs, water_reqs }),
      headers: { 'Content-Type': 'application/json' },
    });
console.log(response)
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