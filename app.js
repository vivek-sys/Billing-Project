document.addEventListener("DOMContentLoaded", () => {
    const prices = {
        "chicken-1kg": 300, 
        "chicken-1-2": 150,
        "chicken-1-4": 75,
        "kushka-1kg": 250,
        "kushka-1-2": 125,
        "kushka-1-4": 65,
        "egg-1kg": 180,
        "egg-1-2": 90,
        "mutton-1kg": 400,
        "mutton-1-2": 200,
        "mutton-100gm": 45
    };

    const searchBtn = document.getElementById("search-btn");
    const totalBtn = document.getElementById("total-btn");
    const generateBillBtn = document.getElementById("generate-bill-btn");
    const clearBtn = document.getElementById("clear-btn");
    const exitBtn = document.getElementById("exit-btn");
    const downloadBtn = document.getElementById("download-btn");
    
    const customerName = document.getElementById("customer-name");
    const phone = document.getElementById("phone");
    const billNumber = document.getElementById("bill-number");

    const billOutput = document.getElementById("bill-output");

    function calculateTotal() {
        let total = 0;
        let billDetails = "";
        
        Object.keys(prices).forEach(item => {
            const quantity = document.getElementById(item).value;
            if (quantity > 0) {
                const price = prices[item];
                total += price * quantity;
                billDetails += `${item.replace("-", " ")} x ${quantity} @ ${price} = ${price * quantity}\n`;
            }
        });

        return { total, billDetails };
    }

    totalBtn.addEventListener("click", () => {
        const { total, billDetails } = calculateTotal();
        billOutput.value = `Welcome Ambur Biryani\n\nBill Number: ${billNumber.value}\nCustomer Name: ${customerName.value}\nPhone Number: ${phone.value}\n\n====================================\nProducts     QTY      Price\n====================================\n${billDetails}\n====================================\nTotal: ${total}`;
    });

    generateBillBtn.addEventListener("click", () => {
        const { total, billDetails } = calculateTotal();
        billOutput.value = `Welcome Ambur Biryani\n\nBill Number: ${billNumber.value}\nCustomer Name: ${customerName.value}\nPhone Number: ${phone.value}\n\n====================================\nProducts     QTY      Price\n====================================\n${billDetails}\n====================================\nTotal: ${total}`;
    });

    clearBtn.addEventListener("click", () => {
        customerName.value = "";
        phone.value = "";
        billNumber.value = "";
        document.querySelectorAll("input[type='number']").forEach(input => {
            input.value = 0;
        });
        billOutput.value = "";
    });

    exitBtn.addEventListener("click", () => {
        window.close(); 
    });

    searchBtn.addEventListener("click", () => {
        if (billNumber.value) {
            alert("Searching for bill number: " + billNumber.value);
        } else {
            alert("Please enter a bill number to search");
        }
    });

    downloadBtn.addEventListener("click", () => {
        const billText = billOutput.value;

        if (!billText.trim()) {
            alert("The bill is empty. Generate the bill before downloading.");
            return;
        }

        const blob = new Blob([billText], { type: "text/plain" }); // Create a Blob object with bill content
        const url = URL.createObjectURL(blob); // Create a URL for the Blob

        const a = document.createElement("a"); // Create an anchor element
        a.href = url;
        a.download = `Bill_${billNumber.value || "NoNumber"}.txt`; // Set the filename
        document.body.appendChild(a); // Append the anchor to the DOM
        a.click(); // Trigger a click to start the download
        document.body.removeChild(a); // Remove the anchor from the DOM
        URL.revokeObjectURL(url); // Free up memory by revoking the object URL
    });
});
