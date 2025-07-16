let currentPage = 1;
const limit = 10;

async function loadUsers(page = 1) {
  const res = await fetch(`/api/v1/users?page=${page}&limit=${limit}`);
  const { data, pagination } = await res.json();

  const tbody = document.querySelector("#usersTable tbody");
  tbody.innerHTML = "";

  data.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.city}</td>
      <td>${user.images_count}</td>
    `;
    tbody.appendChild(row);
  });

  renderPagination(pagination);
}

function renderPagination({ page, totalPages }) {
  const container = document.getElementById("pagination");
  container.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.disabled = i === page;
    btn.addEventListener("click", () => {
      currentPage = i;
      loadUsers(currentPage);
    });
    container.appendChild(btn);
  }
}

document.querySelector("#userForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  try {
    const res = await fetch("/api/v1/users", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.error || "Unknown error");
    alert("User created successfully!");
    form.reset();
    loadUsers(currentPage);
  } catch (err) {
    alert("Error: " + err.message);
  }
});

loadUsers();
