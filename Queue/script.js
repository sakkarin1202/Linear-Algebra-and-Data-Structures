let queue = [];
const maxQueueAllowed = 5;

document.getElementById("enqueueBtn").addEventListener("click", () => {
  const customerPhone = document.getElementById("customerPhone").value;
  const customerName = document.getElementById("customerName").value;

  if (queue.length < maxQueueAllowed && customerPhone && customerName) {
    queue.push({ name: customerName, phone: customerPhone });
    document.getElementById("customerName").value = ""; // Clear the name input
    document.getElementById("customerPhone").value = ""; // Clear the phone input
    updateQueueDisplay();
  } else if (queue.length >= maxQueueAllowed) {
    alert("Maximum queue limit reached. Cannot enqueue more customers.");
  } else {
    alert("Please enter customer name and phone.");
  }
});

document.getElementById("dequeueBtn").addEventListener("click", () => {
  if (queue.length > 0) {
    const nextCustomer = queue.shift();
    alert(`Next customer: ${nextCustomer.name} - ${nextCustomer.phone}`);
    updateQueueDisplay();
  } else {
    alert("No more customers in the queue.");
  }
});
function updateQueueDisplay() {
  const queueList = document.getElementById("queueList");
  queueList.innerHTML = `<h3>Queue (${queue.length}/${maxQueueAllowed})</h3>`;
  queue.forEach((customer, index) => {
    queueList.innerHTML += `<div class="customerq">
            <p>${index + 1}. Name: ${customer.name}, Phone: ${
      customer.phone
    }</p>
        </div>`;
  });
}
