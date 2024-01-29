export function normalizeInput(input) {
    return input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  