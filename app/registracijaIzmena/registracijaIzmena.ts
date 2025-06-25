import { User } from  '../model/sviKorisnici.model.js';
import { UserService } from '../service/sviKorisnici.service.js';

const userService = new UserService();


const dodajBtn = document.getElementById('dodajBtn') as HTMLButtonElement;
const izmeniBtn = document.getElementById('izmeniBtn') as HTMLButtonElement;
const dodajForm = document.getElementById('dodajForm') as HTMLFormElement;
const izmeniForm = document.getElementById('izmeniForm') as HTMLFormElement;
const submitBtn = document.querySelector("#submitBtn") as HTMLButtonElement;

const tooltip = document.createElement("div");
tooltip.textContent = "Klikom na dugme sačuvaćete podatke.";
tooltip.style.position = "absolute";
tooltip.style.backgroundColor = "#333";
tooltip.style.color = "#fff";
tooltip.style.padding = "5px 10px";
tooltip.style.borderRadius = "5px";
tooltip.style.opacity = "0";
tooltip.style.transition = "opacity 0.5s ease";
tooltip.style.pointerEvents = "none";
document.body.appendChild(tooltip);

submitBtn.addEventListener("mouseover", () => {
    const rect = submitBtn.getBoundingClientRect();
    tooltip.style.left = `${rect.left + window.scrollX}px`;
    tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
    setTimeout(() => {
        tooltip.style.opacity = "1";
    }, 1000); // Prikaz nakon 1 sekunde
});

submitBtn.addEventListener("click", () => {
 
});

submitBtn.addEventListener("mouseout", () => {
    tooltip.style.opacity = "0";
});

submitBtn.addEventListener("click", function() {
  submitBtn.disabled = true;
  submitBtn.style.backgroundColor = "#ccc"; // Zasivljavanje
  submitBtn.style.cursor = "not-allowed"; // Promena kursora
  userService.postNew(null, null)
  })

document.addEventListener('DOMContentLoaded', () => {
  userService.getAll(ispisiUsers);
  
    if (dodajForm) dodajForm.classList.add('hidden');
    if (izmeniForm) izmeniForm.classList.add('hidden');
  });



const korisniciPoId = {};

// Prikazivanje forme za dodavanje
dodajBtn.addEventListener('click', () => {
    dodajForm.classList.remove('hidden');
    izmeniForm.classList.add('hidden');
  });

// Prikazivanje forme za izmenu
izmeniBtn.addEventListener('click', () => {
    izmeniForm.classList.remove('hidden');
    dodajForm.classList.add('hidden');
  });

  export function ispisiUsers(niz: User[]): void {
    const tabela = document.querySelector('#korisniciBody') as HTMLTableElement;
    tabela.innerHTML = '';
  
    niz.forEach(korisnik => {
      const noviRed = tabela.insertRow();
      korisniciPoId[korisnik.id] = korisnik;
  
      const idCell = noviRed.insertCell();
      idCell.textContent = korisnik.id.toString();
  
      const korisnickoImeCell = noviRed.insertCell();
      const korisnickoImeInput = document.createElement('input');
      korisnickoImeInput.type = 'text';
      korisnickoImeInput.value = korisnik.korisnickoIme;
      korisnickoImeCell.appendChild(korisnickoImeInput);
  
      const imeCell = noviRed.insertCell();
      const imeInput = document.createElement('input');
      imeInput.type = 'text';
      imeInput.value = korisnik.ime;
      imeCell.appendChild(imeInput);
  
      const prezimeCell = noviRed.insertCell();
      const prezimeInput = document.createElement('input');
      prezimeInput.type = 'text';
      prezimeInput.value = korisnik.prezime;
      prezimeCell.appendChild(prezimeInput);
  
      const datumCell = noviRed.insertCell();
      const datumInput = document.createElement('input');
      datumInput.type = 'date';
      datumInput.value = korisnik.datumRodjenja;
      datumCell.appendChild(datumInput);
  
      const izmeniCell = noviRed.insertCell();
      const izmeniBtn = document.createElement('button');
      izmeniBtn.textContent = 'Izmeni';
      Object.assign(izmeniBtn.style, {
        width: '190px',
        height: '50px',
        borderRadius: '5px',
        backgroundColor: '#0056b3'
      });
      izmeniCell.appendChild(izmeniBtn);
  
      izmeniBtn.addEventListener('click', () => {
        const red = izmeniBtn.closest('tr')!;
        const id = parseInt(red.cells[0].textContent!);
  
        const korisnickoImeData = (red.cells[1].querySelector('input') as HTMLInputElement).value;
        const imeData = (red.cells[2].querySelector('input') as HTMLInputElement).value;
        const prezimeData = (red.cells[3].querySelector('input') as HTMLInputElement).value;
        const datumRodjenjaInput = (red.cells[4].querySelector('input') as HTMLInputElement).value;
  
        const datumRodjenja = datumRodjenjaInput
          ? new Date(datumRodjenjaInput)
          : new Date(korisniciPoId[id].datumRodjenja);
  
          const godina = datumRodjenja.getFullYear(); // Dobija punu godinu
          const mesec = String(datumRodjenja.getMonth() + 1).padStart(2, '0'); // Meseci su 0-indeksirani, pa dodajemo 1
          const dan = String(datumRodjenja.getDate()).padStart(2, '0'); // Dodaje 0 ispred jednocifrenih dana
          const formatiranDatum = `${godina}-${mesec}-${dan}`; // Formatira datum u yyyy-MM-dd
          
  
        const putData: User = {
          id,
          korisnickoIme: korisnickoImeData,
          ime: imeData,
          prezime: prezimeData,
          datumRodjenja: formatiranDatum
        };
  
        userService.postNew(id, putData);
      });
    });
  }






