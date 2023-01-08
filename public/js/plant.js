// submit tasks
const submitTaskHandler = async (event) => {
  event.preventDefault();

  const watered = document.querySelector('input[id = "watered"]');
  const pruned = document.querySelector('input[id = "pruned"]');
  const fertilized = document.querySelector('input[id = "fertilized"]');
  const transplanted = document.querySelector('input[id = "transplanted"]');
  const harvested = document.querySelector('input[id = "harvested"]');
  const applied = document.querySelector('input[id = "applied"]');
  const id = document.querySelector('.task-button').getAttribute('id');

  const bodyObject = {
    watered:watered.value === "on" ? 1 : 0,
    pruned:pruned.value === "on" ? 1 : 0,
    fertilized:fertilized.value === "on" ? 1 : 0,
    transplanted:transplanted.value === "on" ? 1 : 0,
    harvested:harvested.value === "on" ? 1 : 0,
    applied:applied.value === "on" ? 1 : 0,
    plant_id:id,
  }


  if (watered.checked || pruned.checked || fertilized.checked || transplanted.checked || harvested.checked || applied.checked) {
    console.log("##################")
    const response = await fetch('/api/tasks/', {
      method: 'POST',
      body: JSON.stringify(bodyObject),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
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
console.log("add notes")
  const note = document.querySelector('#add-note').value.trim();
  const plant_id = document.querySelector('.note-button').getAttribute('id');

  if (note) {
    console.log("if note")
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

    const response = await fetch(`/api/plants/${id}`, {
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
  .querySelector('.del-btn')
  .addEventListener('click', delPlantHandler);

// delete note
const delNoteHandler = async (event) => {
  const id = event.target.id;
  console.log("id", id)
  const response = await fetch(`/api/notes/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.reload();
  } else {
    console.log("response", response)
    const parsedResponse = await response.json();
    console.log(parsedResponse)
    alert('Failed to delete note');
  }
};

const deleteNote = document.getElementsByClassName('delete-note');
  for (let i = 0; i < deleteNote.length; i++) {
    deleteNote[i].addEventListener('click', delNoteHandler)
  }
