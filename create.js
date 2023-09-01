document.addEventListener("DOMContentLoaded", () => {
    const savedRecords = []; // To store saved records

    // Function to populate the category dropdown (replace with your data)
    function populateCategoryDropdown() {
        // Example data (replace with your actual data)
        const categories = ["Category 1", "Category 2", "Category 3"];
        const categoryDropdown = document.getElementById("record-category");

        // Clear existing options
        categoryDropdown.innerHTML = "";

        // Create and append options for each category
        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categoryDropdown.appendChild(option);
        });
    }

    // Call the populateCategoryDropdown function to populate the dropdown when the page loads
    populateCategoryDropdown();

    // Handle form submission for creating/editing records (implement your logic)
    const recordForm = document.getElementById("record-form");
    recordForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // Get data from the form fields (record name, description, category, active status)
        const id = document.getElementById("record-id").value; // If editing, get the record ID
        const name = document.getElementById("record-name").value;
        const description = document.getElementById("record-description").value;
        const category = document.getElementById("record-category").value;
        const active = document.getElementById("record-active").checked;

        if (id) {
            // Editing an existing record
            const existingRecord = savedRecords.find(record => record.id === id);
            if (existingRecord) {
                existingRecord.name = name;
                existingRecord.description = description;
                existingRecord.category = category;
                existingRecord.active = active;
            }
        } else {
            // Creating a new record
            const newRecord = {
                id: Date.now().toString(), // Generate a unique ID (you can use a better method)
                name,
                description,
                category,
                active
            };
            savedRecords.push(newRecord);
        }

        // After creation/editing, clear the form fields
        document.getElementById("record-id").value = "";
        document.getElementById("record-name").value = "";
        document.getElementById("record-description").value = "";
        document.getElementById("record-category").value = "";
        document.getElementById("record-active").checked = true;

        // Update the record list
        fetchRecords();
    });

    // Function to retrieve and display a list of saved records
    function fetchRecords() {
        const recordList = document.getElementById("record-list");
        recordList.innerHTML = ""; // Clear existing records

        savedRecords.forEach(record => {
            // Create and append elements to display the saved record data
            const recordItem = document.createElement("div");
            recordItem.classList.add("record-item");

            const nameElement = document.createElement("h3");
            nameElement.textContent = record.name;
            recordItem.appendChild(nameElement);

            const descriptionElement = document.createElement("p");
            descriptionElement.textContent = record.description;
            recordItem.appendChild(descriptionElement);

            const categoryElement = document.createElement("p");
            categoryElement.textContent = `Category: ${record.category}`;
            recordItem.appendChild(categoryElement);

            const statusElement = document.createElement("p");
            statusElement.textContent = `Status: ${record.active ? "Active" : "Inactive"}`;
            recordItem.appendChild(statusElement);

            // Add an edit button and logic to edit the saved record
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.addEventListener("click", () => {
                // Fill the form fields with the saved record data for editing
                document.getElementById("record-id").value = record.id;
                document.getElementById("record-name").value = record.name;
                document.getElementById("record-description").value = record.description;
                document.getElementById("record-category").value = record.category;
                document.getElementById("record-active").checked = record.active;
            });
            recordItem.appendChild(editButton);

            // Add a delete button and logic to delete the saved record
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => {
                // Implement logic to confirm and delete the saved record
                const index = savedRecords.findIndex(savedRecord => savedRecord.id === record.id);
                if (index !== -1) {
                    savedRecords.splice(index, 1);
                    fetchRecords();
                }
            });
            recordItem.appendChild(deleteButton);

            // Append the record item to the record list
            recordList.appendChild(recordItem);
        });
    }

    // Call the fetchRecords function to load and display saved records when the page loads
    fetchRecords();
});
