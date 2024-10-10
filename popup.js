document.getElementById('numPeople').addEventListener('input', function() {
  const peopleContainer = document.getElementById('peopleContainer');
  peopleContainer.innerHTML = '';  // Clear previous input fields
  const numPeople = parseInt(this.value);

  for (let i = 1; i <= numPeople; i++) {
      const label = document.createElement('label');
      label.textContent = `Amount for Person ${i}: `;
      const input = document.createElement('input');
      input.type = 'number';
      input.id = `personAmount${i}`;
      input.required = true;
      peopleContainer.appendChild(label);
      peopleContainer.appendChild(input);
      peopleContainer.appendChild(document.createElement('br'));
  }
});

document.getElementById('calculatorForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const totalAmount = parseFloat(document.getElementById('totalAmount').value);
  const numPeople = parseInt(document.getElementById('numPeople').value);
  let paidAmounts = [];
  
  for (let i = 1; i <= numPeople; i++) {
      const personAmount = parseFloat(document.getElementById(`personAmount${i}`).value);
      paidAmounts.push(personAmount);
  }

  // Tính tổng số tiền đã trả
  const totalPaid = paidAmounts.reduce((acc, amount) => acc + amount, 0);
  
  // Tính số tiền mỗi người phải trả theo tỷ lệ
  let resultHTML = '<h3>Amount each person needs to pay:</h3>';
  
  paidAmounts.forEach((amount, index) => {
      const share = (amount / totalPaid) * totalAmount;
      resultHTML += `<p>Person ${index + 1}: $${share.toFixed(2)}</p>`;
  });

  document.getElementById('result').innerHTML = resultHTML;
});
