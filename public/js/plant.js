// update plant
const updatePlantHandler = async (event) => {
  event.preventDefault();

  const common_name = document.querySelector('#common-name').value.trim();
  const scientific_name = document.querySelector('#scientific-name').value.trim();
  const growth_habit = document.querySelector('input[name = "growth-habit"]:checked').value;
  const life_cycle = document.querySelector('input[name = "life-cycle"]:checked').value;
  const light_reqs = document.querySelector('#light-reqs').value.trim();
  const water_reqs = document.querySelector('#water-reqs').value.trim();

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`api/plants/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ common_name, scientific_name, growth_habit, life_cycle, light_reqs, water_reqs }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update plant');
    }
  }
}

document
  .querySelector('.update-button')
  .addEventListener('click', updatePlantHandler);

// delete plant
const delPlantHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`api/plants/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete plant');
    }
  }
};

document
  .querySelector('.delete-post')
  .addEventListener('click', delPlantHandler);