import { User } from  '../model/sviKorisnici.model.js';

export function getAll(callback: (korisnici: User[]) => void): void {
  fetch('http://localhost:21271/api/users')
    .then(response => {
      if (!response.ok) {
        throw new Error('Request failed. Status: ' + response.status);
      }
      return response.json();
    })
    .then((data: { users: User[] }) => {
      if (!Array.isArray(data.users)) {
        throw new Error("Expected an array of users");
      }
      callback(data.users); // ← koristi callback umesto hardkodiranog poziva
    })
    .catch(error => {
      console.error('Error:', error.message);
      const table = document.querySelector<HTMLTableElement>('table');
      if (table) {
        table.style.display = 'none';
      }
      alert('An error occurred while loading the data. Please try again.');
    });
}



export function postNew(userId: number | null = null, jsonData: User | null = null): void {
  const form = document.querySelector('#dodajForm') as HTMLFormElement;
  const formData = new FormData(form);

    const datumRodjenja = new Date(formData.get('datumRodjenja') as string); // Pretvara string u Date objekat
    const godina = datumRodjenja.getFullYear(); // Dobija punu godinu
    const mesec = String(datumRodjenja.getMonth() + 1).padStart(2, '0'); // Meseci su 0-indeksirani, pa dodajemo 1
    const dan = String(datumRodjenja.getDate()).padStart(2, '0'); // Dodaje 0 ispred jednocifrenih dana
    const formatiranDatum = `${godina}-${mesec}-${dan}`; // Formatira datum u yyyy-MM-dd

    const formData1 = {
      id: parseInt((document.getElementById("dodajId") as HTMLInputElement).value),
      korisnickoIme: (document.getElementById("dodajKorisnickoIme") as HTMLInputElement).value,
      ime: (document.getElementById("dodajIme") as HTMLInputElement).value,
      prezime: (document.getElementById("dodajPrezime") as HTMLInputElement).value,
      datumRodjenja: formatiranDatum
    };
     
    let url = 'http://localhost:21271/api/users';
    let method ='POST';

    if (userId != null){
      url = `http://localhost:21271/api/users/${userId}`
      method = 'PUT';
    }


    

    let bodyData = formData1

        if(userId != null) {
            bodyData = jsonData;
        }

        console.log(JSON.stringify(bodyData))
  fetch(url, { // Pravi POST zahtev da se sačuva knjiga
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyData)
  })
  .then(response => {
    if (!response.ok) {
      const error: Error & { response?: Response } = new Error('Request failed. Status: ' + response.status);
      error.response = response;
      throw error;
    }
    return response.text();
  })
  .then(text => {
    const data = text ? JSON.parse(text) : {};
    window.location.href = '../index.html';
    return data;
  })
  .catch(error => {
    console.error('Error:', error.message);
    if (error.response?.status === 400) {
      alert('Podaci nisu validni!');
    } else {
      alert('Došlo je do greške pri slanju podataka.');
    }
  });
}