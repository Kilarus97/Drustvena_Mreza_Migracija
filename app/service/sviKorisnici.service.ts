import { User } from  '../model/sviKorisnici.model.js';
import { ispisiUsers } from "../sviKorisnici/sviKorisnici.js";

export function getAll(): void {
  fetch('http://localhost:21271/api/users')
    .then(response => {
      if (!response.ok) {
        throw new Error('Zahtev nije uspeo. Status: ' + response.status);
      }
      return response.json();
    })
    .then((data: { users: User[] }) => {
      console.log("Dobijeni podaci:", data);

      if (!Array.isArray(data.users)) {
        throw new Error("Neispravan format podataka! Očekivao sam niz.");
      }

      ispisiUsers(data.users); // ← Ovo ide do tvoje tabele i lepo prikazuje korisnike
    })
    .catch(error => {
      console.error('Greška:', error.message);

      const table = document.querySelector('table');
      if (table) {
        table.style.display = 'none';
      }

      alert('Došlo je do greške pri učitavanju podataka. Pokušaj ponovo.');
    });
}
