export function selectVendor(id) {
  return {
    type: '@vendor/SELECT_VENDOR',
    payload: { id },
  };
}

export function reset() {
  return {
    type: '@vendor/RESET',
  };
}
