// submit tasks
const submitTaskHandler = async (event) => {
  event.preventDefault();

  const watered = document.querySelector('input[id = "watered"]');
  const pruned = document.querySelector('input[id = "pruned"]');
  const fertilized = document.querySelector('input[id = "fertilized"]');
  const transplanted = document.querySelector('input[id = "transplanted"]');
  const harvested = document.querySelector('input[id = "harvested"]');
  const applied = document.querySelector('input[id = "applied"]');

const bodyObject = {}
if (watered.checked) {
  bodyObject.watered = watered.value;
}
if (pruned.checked) {
  bodyObject.pruned = pruned.value;
}
if (fertilized.checked) {
  bodyObject.fertilized = fertilized.value;
}
if (transplanted.checked) {
  bodyObject.transplanted = transplanted.value;
}
if (harvested.checked) {
  bodyObject.harvested = harvested.value;
}
if (applied.checked) {
  bodyObject.applied = applied.value;
}

  if (watered.checked || pruned.checked || fertilized.checked || transplanted.checked || harvested.checked || applied.checked) {
    const response = await fetch(`/api/plants/${id}`, {
      method: 'POST',
      body: JSON.stringify(bodyObject),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/api/plants/${id}`);
    } else {
      alert('Failed to add tasks.');
    }
  }
};

document
.querySelector('.task-form')
.addEventListener('submit', submitTaskHandler);

// add notes
const addNoteHandler = async (event) => {
  event.preventDefault();

  const note = document.querySelector('#add-note').value.trim();
  const plant_id = document.querySelector('.note-button').getAttribute('id');

  if (note) {
    const response = await fetch('/api/notes', {
      method: 'POST',
      body: JSON.stringify({ note, plant_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/plants/${plant_id}`);
    } else {
      alert('Failed to create note.');
    }
  }
};
document
.querySelector('.note-form')
.addEventListener('submit', addNoteHandler);

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