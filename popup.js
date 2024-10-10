function formatNumber(value) {
  // Tách phần nguyên và phần thập phân
  let parts = value.split(".");
  // Định dạng phần nguyên với dấu phẩy
  parts[0] = parts[0].replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Nếu có phần thập phân, ghép lại với phần nguyên
  return parts.join(".");
}

document.getElementById('totalAmount').addEventListener('input', function () {
  let inputVal = this.value;

  // Định dạng lại giá trị trong input
  this.value = formatNumber(inputVal);
})


document.getElementById('numPeople').addEventListener('input', function() {
  const peopleContainer = document.getElementById('peopleContainer');
  peopleContainer.innerHTML = '';  // Clear previous input fields
  const numPeople = parseInt(this.value);

  for (let i = 1; i <= numPeople; i++) {
      const label = document.createElement('label');
      label.for = `personAmount${i}`;
      label.textContent = `Amount for Person ${i}: `;
      const input = document.createElement('input');
      input.type = 'text';
      input.id = `personAmount${i}`;
      input.required = true;

      input.addEventListener('input', function() {
        this.value = formatNumber(this.value)
      })

      peopleContainer.appendChild(label);
      peopleContainer.appendChild(input);
  }
});

document.getElementById('calculatorForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const totalAmount = parseFloat(document.getElementById('totalAmount').value.replace(/,/g, ''));
  const numPeople = parseInt(document.getElementById('numPeople').value);
  let paidAmounts = [];
  
  for (let i = 1; i <= numPeople; i++) {
      const personAmount = parseFloat(document.getElementById(`personAmount${i}`).value);
      paidAmounts.push(personAmount);
  }

  // Tính tổng số tiền đã trả
  const totalPaid = paidAmounts.reduce((acc, amount) => acc + amount, 0);
  
  // Tính số tiền mỗi người phải trả theo tỷ lệ
  let resultHTML = '<h3>Results:</h3>';
  
  paidAmounts.forEach((amount, index) => {
      const share = (amount / totalPaid) * totalAmount;
      resultHTML += `<p>Person ${index + 1}: ₫ ${formatNumber(share.toFixed(0))}</p>`;
  });

  document.getElementById('result').innerHTML = resultHTML;
});
