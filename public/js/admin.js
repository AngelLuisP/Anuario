const lista = document.getElementById('lista');

function showData (data) {
    data.map((item) => {     

        lista.innerHTML += `
        <tr>
        <td>${item.fullName}</td>
        <td>${item.course}</td>
          <td >
        <a type="button" href="/api/delete-student?id=${item.id}" class="btn-close"></a>
        </td>
         </tr>
        `;
    });
}