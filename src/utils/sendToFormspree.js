export async function sendToFormspree(endpoint, payload) {
  try {
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.error("Formspree backup failed", err);
  }
}
