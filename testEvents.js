const axios = require('axios');

const API_URL = 'http://localhost:3000/api/v1/events'; // ajuste a porta se necessário

// Helper para exibir resultados no terminal
function log(title, result) {
  console.log(`\n--- ${title} ---`);
  if (result instanceof Error) {
    console.error(result.response ? result.response.data : result.message);
  } else {
    console.log(result.data || result);
  }
}

// Teste de criação de evento válido
async function testCreateValidEvent() {
  try {
    const res = await axios.post(API_URL, {
      description: 'Reunião de planejamento',
      dateTime: '2025/07/03'
    });
    log('Create Event (Valid)', res);
    return res.data.data.eventData.id;
  } catch (err) {
    log('Create Event (Valid) - ERROR', err);
  }
}

// Teste de criação de evento com data inválida
async function testCreateInvalidEvent() {
  try {
    await axios.post(API_URL, {
      description: 'Evento com data inválida',
      dateTime: '2025-07-03' // formato inválido
    });
  } catch (err) {
    log('Create Event (Invalid Date) - EXPECTED ERROR', err);
  }
}

// Teste de consulta de todos os eventos
async function testGetAllEvents() {
  try {
    const res = await axios.get(API_URL);
    log('Get All Events', res);
  } catch (err) {
    log('Get All Events - ERROR', err);
  }
}

// Teste de consulta de evento por ID
async function testGetEventById(id) {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    log('Get Event By ID', res);
  } catch (err) {
    log('Get Event By ID - ERROR', err);
  }
}

// Teste de deleção de evento por ID
async function testDeleteEventById(id) {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    log('Delete Event By ID', res);
  } catch (err) {
    log('Delete Event By ID - ERROR', err);
  }
}

// Fluxo de execução dos testes
(async () => {
  await testCreateInvalidEvent();
  const eventId = await testCreateValidEvent();
  if (eventId) {
    await testGetEventById(eventId);
    await testDeleteEventById(eventId);
  }
  await testGetAllEvents();
})();
