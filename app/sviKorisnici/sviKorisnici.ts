import { User } from  '../model/sviKorisnici.model.js';
import { UserService } from '../service/sviKorisnici.service.js';

const userService = new UserService();

function ispisiUsers(nizUsera: User[]): void{
    const tabela = document.querySelector('#usersBody') as HTMLTableElement
    
    if (!tabela) {
        console.error('Tabela sa ID-jem "usersBody" nije pronađena.');
        return;
    }
    
    tabela.innerHTML = ''

    
    for(const user of nizUsera){
        const noviRed = tabela.insertRow()
    
        const idCell = noviRed.insertCell()
        idCell.textContent = user.id.toString() // Pretvara id u string

        const korisnickoImeCell = noviRed.insertCell()
        korisnickoImeCell.textContent = user.korisnickoIme

        const imeCell = noviRed.insertCell()
        imeCell.textContent = user.ime

        const prezimeCell = noviRed.insertCell()
        prezimeCell.textContent = user.prezime

        const datumCell = noviRed.insertCell();
        const originalniDatum = new Date(user.datumRodjenja); // Pretvara string u Date objekat
        const dan = String(originalniDatum.getDate()).padStart(2, '0'); // Dodaje 0 ispred jednocifrenih dana
        const mesec = String(originalniDatum.getMonth() + 1).padStart(2, '0'); // Meseci su 0-indeksirani, pa dodajemo 1
        const godina = originalniDatum.getFullYear(); // Dobija punu godinu
        datumCell.textContent = `${dan}/${mesec}/${godina}`; // Formatira datum u dd/MM/yyyy

        const izbrisiCell = noviRed.insertCell();
        const izbrisiBtn = document.createElement('button');
        izbrisiBtn.textContent = 'Izbrisi';
        Object.assign(izbrisiCell.style, {
            width: '190px',
            height: '50px',
            borderRadius: '5px',
            backgroundColor: '#0056b3',  
        });
        Object.assign(izbrisiBtn.style, {
            width: '100%',
            height: '100%',
            borderRadius: '5px',
            backgroundColor: '#ff4d4d',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
        });
        izbrisiCell.appendChild(izbrisiBtn);

        izbrisiBtn.addEventListener('click', () => {
            const red = izbrisiBtn.closest('tr')!;
            const id = parseInt(red.cells[0].textContent!);

            userService.deleteUser(id);
        });

    }
}

document.addEventListener('DOMContentLoaded', () => userService.getAll(ispisiUsers));