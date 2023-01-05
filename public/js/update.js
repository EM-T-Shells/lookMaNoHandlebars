const updatePlantHandler = async (event) => {
    event.preventDefault();
  console.log("hit")
    const common_name = document.querySelector('#common-name').value.trim();
    const scientific_name = document.querySelector('#scientific-name').value.trim();
    const growth_habit = document.querySelector('input[name = "growth-habit"]:checked').value;
    const life_cycle = document.querySelector('input[name = "life-cycle"]:checked').value;
    const lightReqsEl = document.querySelectorAll('input[name = "sun-reqs"]');
    const water_reqs = document.querySelector('input[name = "water-reqs"]:checked').value;

    let light_reqs = "";
    for (let i = 0; i < lightReqsEl.length; i++) {
      if (lightReqsEl[i].checked) {
        light_reqs += lightReqsEl[i].value + "\n"
      }
    }
console.log("light reqs: ", light_reqs)
console.log(event.target)
    if (event.target.hasAttribute('data-id')) {
      console.log("has data id")
      const id = event.target.getAttribute('data-id');
      const response = await fetch(`/api/plants/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ common_name, scientific_name, growth_habit, life_cycle, light_reqs, water_reqs }),
        headers: { 'Content-Type': 'application/json' },
      });
  console.log(response)
      if (response.ok) {
        document.location.replace(`/plants/${id}`);
      } else {
        alert('Failed to update plant', response);
      }
    }
  };
document
.querySelector('.update-button')
.addEventListener('click', updatePlantHandler);